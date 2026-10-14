-- Testul RLS: doi vânzători (Andrei și Maria), un admin și un cont dezactivat.
-- Verifică faptul că un vânzător nu vede și nu modifică datele altuia, că duplicatele
-- sunt blocate, că predarea și închiderea clientului calculează comisionul.
--
-- Rulare pe un Postgres local gol (NU pe proiectul Supabase):
--   psql -d test -f supabase/tests/00_simulare_supabase.sql
--   for f in supabase/migrations/*.sql; do psql -d test -f "$f"; done
--   psql -d test -f supabase/tests/test_rls.sql
-- Fiecare rezultat are în coloana „t” ce ar trebui să iasă.

\set ON_ERROR_STOP 0
\pset footer off
-- utilizatori
insert into auth.users (id, email) values
 ('00000000-0000-0000-0000-00000000000a','david@x.ro'),
 ('00000000-0000-0000-0000-0000000000a1','andrei@x.ro'),
 ('00000000-0000-0000-0000-0000000000b1','maria@x.ro'),
 ('00000000-0000-0000-0000-0000000000c1','dezactivat@x.ro');
insert into public.profiles (id, nume, email, rol, activ, comision_instalare) values
 ('00000000-0000-0000-0000-00000000000a','David','david@x.ro','admin',true,80),
 ('00000000-0000-0000-0000-0000000000a1','Andrei','andrei@x.ro','vanzator',true,100),
 ('00000000-0000-0000-0000-0000000000b1','Maria','maria@x.ro','vanzator',true,80),
 ('00000000-0000-0000-0000-0000000000c1','Ion','dezactivat@x.ro','vanzator',false,80);

-- ADMIN
set role authenticated; set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000a';
insert into leads (id, vanzator_id, afacere, oras, telefon_afacere, nisa) values
 ('10000000-0000-0000-0000-0000000000a1','00000000-0000-0000-0000-0000000000a1','Clinica Zâmbet','Cluj-Napoca','0264 111 222','stomatologie'),
 ('10000000-0000-0000-0000-0000000000b1','00000000-0000-0000-0000-0000000000b1','Salon Bella','București','+40 721 333 444','salon'),
 ('10000000-0000-0000-0000-0000000000c1','00000000-0000-0000-0000-0000000000c1','Spa Relax','Iași','0232 555 666','spa');
select 'admin vede lead-uri:' t, count(*) from leads;

-- VANZATOR A
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000a1';
select 'A vede lead-uri (trebuie 1):' t, count(*) from leads;
select 'A vede lead B prin id (trebuie 0):' t, count(*) from leads where id='10000000-0000-0000-0000-0000000000b1';
update leads set notite='hack' where id='10000000-0000-0000-0000-0000000000b1';
select 'A vede profiluri (trebuie 1):' t, count(*) from profiles;
update profiles set rol='admin', titlu='Șef', comision_instalare=1000, nivel=9, telefon='0700' where id=auth.uid();
select 'A profil dupa hack:' t, rol, titlu, comision_instalare, nivel, telefon from profiles where id=auth.uid();
-- duplicat cu lead-ul lui B (acelasi telefon, alt format)
insert into leads (vanzator_id, afacere, oras, telefon_afacere, sursa) values (auth.uid(),'Alt nume','Brașov','0721333444','adaugat_de_vanzator');
-- duplicat dupa nume + oras (diacritice si majuscule diferite)
insert into leads (vanzator_id, afacere, oras, sursa) values (auth.uid(),'salon bella','Bucuresti','adaugat_de_vanzator');
select 'verifica_duplicat (true):' t, verifica_duplicat('0721 333 444', null, null);
select 'verifica_duplicat (false):' t, verifica_duplicat('0799 999 999', 'Nou', 'Nicaieri');
-- lead nou valid, incercand sa-l puna la B
insert into leads (vanzator_id, afacere, oras, telefon_afacere, sursa, calitate) values ('00000000-0000-0000-0000-0000000000b1','Service Auto Max','Timișoara','0256 777 888','adaugat_de_vanzator', 5);
select 'A lead nou:' t, afacere, vanzator_id = auth.uid() as al_meu, calitate from leads where afacere='Service Auto Max';
-- realocare de catre vanzator (ignorata)
update leads set vanzator_id='00000000-0000-0000-0000-0000000000b1' where id='10000000-0000-0000-0000-0000000000a1';
select 'A inca are lead-ul:' t, count(*) from leads where id='10000000-0000-0000-0000-0000000000a1';
-- verde fara predare
update leads set status='intalnire' where id='10000000-0000-0000-0000-0000000000a1';
update leads set status='aproape' where id='10000000-0000-0000-0000-0000000000a1';
insert into lead_activitate (lead_id, autor_id, tip, text) values ('10000000-0000-0000-0000-0000000000a1', auth.uid(), 'notita', 'A zis să revin');
insert into lead_activitate (lead_id, autor_id, tip, text) values ('10000000-0000-0000-0000-0000000000b1', auth.uid(), 'notita', 'hack');
-- predare pentru lead-ul lui B (refuzata)
insert into predari (lead_id, vanzator_id, data_intalnire, format, decident_nume, decident_functie, decident_telefon, decident_email, a_sunat_demo, reactie_demo, problema, participanti)
values ('10000000-0000-0000-0000-0000000000b1', auth.uid(), now()+interval '1 day','online','X','manager','07','x@x','true','ok','p','Nu');
-- predare valida
insert into predari (lead_id, vanzator_id, data_intalnire, format, decident_nume, decident_functie, decident_telefon, decident_email, a_sunat_demo, reactie_demo, problema, participanti, rezultat, pret_lunar)
values ('10000000-0000-0000-0000-0000000000a1', auth.uid(), now()+interval '1 day','online','Dr. Pop','medic','0722000000','pop@x.ro',true,'Impresionat','Nu răspunde nimeni după 18:00','Nu','inchis', 999);
select 'A lead dupa predare:' t, status, decident_nume from leads where id='10000000-0000-0000-0000-0000000000a1';
select 'A predare rezultat fortat noua:' t, rezultat, pret_lunar from predari;
update predari set rezultat='inchis';
select 'A jurnal:' t, tip, de_la, la, text from lead_activitate order by creat_la;
select 'A comisioane (0):' t, count(*) from clienti_comision;
select 'A insigne:' t, cod_insigna from insigne where user_id=auth.uid();
select 'A statistici (eroare):' t, * from statistici_echipa();

-- VANZATOR B
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000b1';
select 'B vede lead-uri (1):' t, count(*) from leads;
select 'B vede jurnal A (0):' t, count(*) from lead_activitate where lead_id='10000000-0000-0000-0000-0000000000a1';
select 'B vede predari (0):' t, count(*) from predari;
select 'B notite neschimbate:' t, notite from leads;

-- ADMIN inchide clientul
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000a';
update predari set rezultat='inchis', pachet='Standard', pret_lunar=150;
select 'comision:' t, vanzator_id, transa1_suma, transa2_suma from clienti_comision;
select 'bonusuri:' t, vanzator_id, prag, suma from bonusuri_acordate;
update clienti_comision set taxa_instalare_platita = true;
select 'data taxa:' t, taxa_instalare_platita_la is not null from clienti_comision;
select 'statistici admin:' t, nume, leaduri, apeluri, intalniri, clienti from statistici_echipa();
update leads set vanzator_id='00000000-0000-0000-0000-0000000000b1' where id='10000000-0000-0000-0000-0000000000c1';
select 'realocare jurnal:' t, tip, text from lead_activitate where tip='realocare';

-- A dupa inchidere
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000a1';
select 'A comision:' t, transa1_suma, transa2_suma, taxa_instalare_platita from clienti_comision;
select 'A bonus:' t, prag, suma from bonusuri_acordate;
select 'clasament:' t, * from clasament('saptamana');
select 'clasament total:' t, * from clasament('total');
select 'feed:' t, nume, tip, detaliu from feed_echipa(10);
select 'membri:' t, nume, titlu, insigne from membri_echipa();
select 'A update predare (0 randuri):' t; update predari set rezultat='neinchis';
select 'A exista_lead (eroare):' t, exista_lead('1', 'a', 'b');

-- DEZACTIVAT
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000c1';
select 'C lead-uri (0):' t, count(*) from leads;
select 'C profil (0):' t, count(*) from profiles;
select 'C clasament (eroare):' t, count(*) from clasament();
insert into leads (vanzator_id, afacere, sursa) values (auth.uid(), 'Test', 'adaugat_de_vanzator');

-- ANON
reset request.jwt.claim.sub; set role anon;
select 'anon leads (eroare):' t, count(*) from leads;
select 'anon clasament (eroare):' t, count(*) from clasament();
reset role;
