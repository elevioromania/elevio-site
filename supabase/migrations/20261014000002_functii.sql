-- Platforma internă de vânzări Elevio: funcții și triggere.

-- ---------------------------------------------------------------------------
-- Cine e utilizatorul curent (folosite în RLS)
-- ---------------------------------------------------------------------------

create or replace function public.is_activ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and activ);
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and activ and rol = 'admin');
$$;

-- Admin sau trainer: pot citi statisticile.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and activ and rol in ('admin', 'trainer'));
$$;

-- ---------------------------------------------------------------------------
-- Duplicate
-- ---------------------------------------------------------------------------

-- Răspunde doar „există” sau „nu există”, fără să spună cui aparține lead-ul.
create or replace function public.exista_lead(
  p_telefon text,
  p_afacere text,
  p_oras text,
  p_exclude uuid default null
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.leads l
    where (p_exclude is null or l.id <> p_exclude)
      and (
        (public.normalizeaza_telefon(p_telefon) is not null
          and l.telefon_normalizat = public.normalizeaza_telefon(p_telefon))
        or (public.cheie_lead(p_afacere, p_oras) is not null
          and l.cheie_nume = public.cheie_lead(p_afacere, p_oras))
      )
  );
$$;

create or replace function public.verifica_duplicat(p_telefon text, p_afacere text, p_oras text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_activ() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;
  return public.exista_lead(p_telefon, p_afacere, p_oras);
end;
$$;

-- Pentru importul CSV (doar admin): pentru fiecare rând, true dacă există deja în baza de date.
create or replace function public.duplicate_import(p_telefoane text[], p_afaceri text[], p_orase text[])
returns boolean[]
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  rezultat boolean[] := '{}';
  i int;
begin
  if not public.is_admin() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;
  for i in 1 .. coalesce(array_length(p_afaceri, 1), 0) loop
    rezultat := rezultat || public.exista_lead(p_telefoane[i], p_afaceri[i], p_orase[i]);
  end loop;
  return rezultat;
end;
$$;

-- ---------------------------------------------------------------------------
-- Profiluri: vânzătorul nu își poate schimba rolul, titlul, comisionul sau nivelul.
-- ---------------------------------------------------------------------------

create or replace function public.profiles_protejeaza()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- auth.uid() e gol în SQL Editor și în Edge Functions (service_role): acolo e voie.
  if auth.uid() is not null and not public.is_admin() then
    new.id := old.id;
    new.email := old.email;
    new.rol := old.rol;
    new.titlu := old.titlu;
    new.activ := old.activ;
    new.comision_instalare := old.comision_instalare;
    new.nivel := old.nivel;
    new.creat_la := old.creat_la;
  end if;
  return new;
end;
$$;

create trigger profiles_protejeaza
before update on public.profiles
for each row execute function public.profiles_protejeaza();

-- ---------------------------------------------------------------------------
-- Lead-uri
-- ---------------------------------------------------------------------------

create or replace function public.leads_inainte_de_inserare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.creat_de is null then
    new.creat_de := auth.uid();
  end if;

  if auth.uid() is not null and not public.is_admin() then
    new.vanzator_id := auth.uid();
    new.sursa := 'adaugat_de_vanzator';
    new.calitate := 1;
    new.creat_la := now();
    if new.status = 'intalnire' then
      new.status := 'nou';
    end if;
    if public.exista_lead(new.telefon_afacere, new.afacere, new.oras) then
      raise exception 'DUPLICAT' using errcode = 'P0001',
        hint = 'Lead-ul ăsta e deja alocat. Vorbește cu David.';
    end if;
  end if;

  new.actualizat_la := now();
  return new;
end;
$$;

create trigger leads_inainte_de_inserare
before insert on public.leads
for each row execute function public.leads_inainte_de_inserare();

create or replace function public.leads_inainte_de_actualizare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.id := old.id;
    new.vanzator_id := old.vanzator_id;
    new.sursa := old.sursa;
    new.calitate := old.calitate;
    new.creat_de := old.creat_de;
    new.creat_la := old.creat_la;

    -- Verde (Întâlnire programată) se pune doar prin formularul de predare.
    if new.status = 'intalnire' and old.status is distinct from 'intalnire'
      and not exists (select 1 from public.predari p where p.lead_id = new.id and p.creat_la = now()) then
      raise exception 'PREDARE_NECESARA' using errcode = 'P0001',
        hint = 'Completează formularul de predare ca să treci lead-ul pe verde.';
    end if;

    if (new.telefon_afacere is distinct from old.telefon_afacere
        or new.afacere is distinct from old.afacere
        or new.oras is distinct from old.oras)
      and public.exista_lead(new.telefon_afacere, new.afacere, new.oras, new.id) then
      raise exception 'DUPLICAT' using errcode = 'P0001',
        hint = 'Lead-ul ăsta e deja alocat. Vorbește cu David.';
    end if;
  end if;

  if new.status is distinct from old.status then
    new.ultimul_contact := now();
  end if;
  new.actualizat_la := now();
  return new;
end;
$$;

create trigger leads_inainte_de_actualizare
before update on public.leads
for each row execute function public.leads_inainte_de_actualizare();

-- Jurnalul: fiecare schimbare de status și fiecare realocare.
create or replace function public.leads_jurnal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  nume_vechi text;
  nume_nou text;
begin
  if new.status is distinct from old.status then
    insert into public.lead_activitate (lead_id, autor_id, tip, de_la, la)
    values (new.id, auth.uid(), 'status', old.status, new.status);
  end if;

  if new.vanzator_id is distinct from old.vanzator_id then
    select nume into nume_vechi from public.profiles where id = old.vanzator_id;
    select nume into nume_nou from public.profiles where id = new.vanzator_id;
    insert into public.lead_activitate (lead_id, autor_id, tip, de_la, la, text)
    values (new.id, auth.uid(), 'realocare', old.vanzator_id::text, new.vanzator_id::text,
      'Realocat: ' || coalesce(nume_vechi, 'nealocat') || ' → ' || coalesce(nume_nou, 'nealocat'));
  end if;

  return null;
end;
$$;

create trigger leads_jurnal
after update on public.leads
for each row execute function public.leads_jurnal();

-- ---------------------------------------------------------------------------
-- Jurnal: notițele și apelurile marcate de vânzător
-- ---------------------------------------------------------------------------

create or replace function public.activitate_inainte_de_inserare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.autor_id := auth.uid();
    new.creat_la := now();
  end if;
  return new;
end;
$$;

create trigger activitate_inainte_de_inserare
before insert on public.lead_activitate
for each row execute function public.activitate_inainte_de_inserare();

create or replace function public.activitate_dupa_inserare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.tip = 'apel' then
    update public.leads set ultimul_contact = now() where id = new.lead_id;
  end if;
  if new.autor_id is not null then
    perform public.acorda_insigne(new.autor_id);
  end if;
  return null;
end;
$$;

-- ---------------------------------------------------------------------------
-- Insigne
-- ---------------------------------------------------------------------------

create or replace function public.acorda_insigne(p_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  nr_intalniri int;
  nr_clienti int;
  nr_apeluri int;
  zile_active int;
  coduri text[] := '{}';
begin
  select count(*) into nr_intalniri from public.predari where vanzator_id = p_user;
  select count(*) into nr_clienti from public.predari where vanzator_id = p_user and rezultat = 'inchis';
  select count(*) into nr_apeluri from public.lead_activitate
    where autor_id = p_user and tip in ('status', 'apel');
  select count(distinct (creat_la at time zone 'Europe/Bucharest')::date) into zile_active
    from public.lead_activitate
    where autor_id = p_user
      and (creat_la at time zone 'Europe/Bucharest')::date
        > (now() at time zone 'Europe/Bucharest')::date - 7;

  if nr_apeluri >= 1 then coduri := array_append(coduri, 'primul_apel'); end if;
  if nr_apeluri >= 100 then coduri := array_append(coduri, 'o_suta_apeluri'); end if;
  if nr_intalniri >= 1 then coduri := array_append(coduri, 'prima_intalnire'); end if;
  if nr_intalniri >= 10 then coduri := array_append(coduri, 'zece_intalniri'); end if;
  if nr_clienti >= 1 then coduri := array_append(coduri, 'primul_client'); end if;
  if nr_clienti >= 5 then coduri := array_append(coduri, 'cinci_clienti'); end if;
  if zile_active >= 7 then coduri := array_append(coduri, 'serie_7_zile'); end if;

  insert into public.insigne (user_id, cod_insigna)
  select p_user, unnest(coduri)
  on conflict do nothing;
end;
$$;

create trigger activitate_dupa_inserare
after insert on public.lead_activitate
for each row execute function public.activitate_dupa_inserare();

-- ---------------------------------------------------------------------------
-- Predări
-- ---------------------------------------------------------------------------

create or replace function public.predari_inainte_de_inserare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.vanzator_id := auth.uid();
    new.rezultat := 'noua';
    new.pachet := null;
    new.pret_lunar := null;
    new.inchis_la := null;
    new.creat_la := now();
  end if;
  if new.vanzator_id is null then
    select vanzator_id into new.vanzator_id from public.leads where id = new.lead_id;
  end if;
  return new;
end;
$$;

create trigger predari_inainte_de_inserare
before insert on public.predari
for each row execute function public.predari_inainte_de_inserare();

-- Lead-ul trece pe verde și preia datele decidentului din predare.
create or replace function public.predari_dupa_inserare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.leads set
    status = 'intalnire',
    a_sunat_demo = new.a_sunat_demo,
    decident_nume = new.decident_nume,
    decident_functie = new.decident_functie,
    decident_telefon = new.decident_telefon,
    decident_email = new.decident_email,
    urmatorul_pas_data = new.data_intalnire,
    urmatorul_pas_text = 'Întâlnire cu David'
  where id = new.lead_id;

  if new.vanzator_id is not null then
    perform public.acorda_insigne(new.vanzator_id);
  end if;
  return null;
end;
$$;

create trigger predari_dupa_inserare
after insert on public.predari
for each row execute function public.predari_dupa_inserare();

create or replace function public.predari_inainte_de_actualizare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.rezultat = 'inchis' and old.rezultat is distinct from 'inchis' then
    new.inchis_la := now();
  elsif new.rezultat is distinct from 'inchis' then
    new.inchis_la := null;
  end if;
  return new;
end;
$$;

create trigger predari_inainte_de_actualizare
before update on public.predari
for each row execute function public.predari_inainte_de_actualizare();

-- Client închis: se creează comisionul, se acordă bonusurile și insignele.
create or replace function public.predari_dupa_actualizare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_comision numeric;
  nr_clienti int;
begin
  if new.vanzator_id is null then
    return null;
  end if;

  if new.rezultat = 'inchis' then
    select p.comision_instalare into v_comision from public.profiles p where p.id = new.vanzator_id;

    insert into public.clienti_comision (predare_id, vanzator_id, transa1_suma, transa2_suma)
    values (new.id, new.vanzator_id, coalesce(v_comision, 80), round(coalesce(new.pret_lunar, 0) * 0.5, 2))
    on conflict (predare_id) do update
      set transa2_suma = case when clienti_comision.transa2_platita then clienti_comision.transa2_suma
                              else excluded.transa2_suma end;
  elsif old.rezultat = 'inchis' then
    -- Rezultatul a fost corectat: scoatem comisionul, dacă nu s-a plătit nimic din el.
    delete from public.clienti_comision
    where predare_id = new.id and not transa1_platita and not transa2_platita;
  end if;

  select count(*) into nr_clienti from public.predari where vanzator_id = new.vanzator_id and rezultat = 'inchis';

  insert into public.bonusuri_acordate (vanzator_id, config_id, prag, suma)
  select new.vanzator_id, c.id, c.prag, c.suma
  from public.bonusuri_config c
  where c.prag <= nr_clienti
  on conflict (vanzator_id, prag) do nothing;

  delete from public.bonusuri_acordate
  where vanzator_id = new.vanzator_id and prag > nr_clienti and not platit;

  perform public.acorda_insigne(new.vanzator_id);
  return null;
end;
$$;

create trigger predari_dupa_actualizare
after update on public.predari
for each row execute function public.predari_dupa_actualizare();

-- ---------------------------------------------------------------------------
-- Comisioane: datele se completează automat când adminul bifează.
-- ---------------------------------------------------------------------------

create or replace function public.comision_date()
returns trigger
language plpgsql
as $$
begin
  if new.taxa_instalare_platita and not old.taxa_instalare_platita then new.taxa_instalare_platita_la := now(); end if;
  if not new.taxa_instalare_platita then new.taxa_instalare_platita_la := null; end if;
  if new.prima_luna_incheiata and not old.prima_luna_incheiata then new.prima_luna_incheiata_la := now(); end if;
  if not new.prima_luna_incheiata then new.prima_luna_incheiata_la := null; end if;
  if new.anulat and not old.anulat then new.anulat_la := now(); end if;
  if not new.anulat then new.anulat_la := null; end if;
  if new.transa1_platita and not old.transa1_platita then new.transa1_platita_la := now(); end if;
  if not new.transa1_platita then new.transa1_platita_la := null; end if;
  if new.transa2_platita and not old.transa2_platita then new.transa2_platita_la := now(); end if;
  if not new.transa2_platita then new.transa2_platita_la := null; end if;
  return new;
end;
$$;

create trigger comision_date
before update on public.clienti_comision
for each row execute function public.comision_date();

create or replace function public.bonus_date()
returns trigger
language plpgsql
as $$
begin
  if new.platit and not old.platit then new.platit_la := now(); end if;
  if not new.platit then new.platit_la := null; end if;
  return new;
end;
$$;

create trigger bonus_date
before update on public.bonusuri_acordate
for each row execute function public.bonus_date();

-- ---------------------------------------------------------------------------
-- Cifre agregate (fără date despre lead-uri)
-- ---------------------------------------------------------------------------

create or replace function public.inceput_perioada(p_perioada text)
returns timestamptz
language sql
stable
as $$
  select case p_perioada
    when 'saptamana' then date_trunc('week', now() at time zone 'Europe/Bucharest') at time zone 'Europe/Bucharest'
    when 'luna' then date_trunc('month', now() at time zone 'Europe/Bucharest') at time zone 'Europe/Bucharest'
    else '-infinity'::timestamptz
  end;
$$;

-- Clasamentul: clienți închiși, apoi întâlniri, apoi apeluri.
-- Un „apel marcat” = un lead la care vânzătorul a schimbat statusul sau a marcat un apel, într-o zi.
create or replace function public.clasament(p_perioada text default 'saptamana')
returns table (
  user_id uuid,
  nume text,
  titlu text,
  clienti int,
  intalniri int,
  apeluri int,
  pozitie int
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_de_la timestamptz := public.inceput_perioada(p_perioada);
begin
  if not public.is_activ() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;

  return query
  with cifre as (
    select
      p.id,
      p.nume,
      p.titlu,
      (select count(*) from public.predari d
        where d.vanzator_id = p.id and d.rezultat = 'inchis' and d.inchis_la >= v_de_la)::int as clienti,
      (select count(*) from public.predari d
        where d.vanzator_id = p.id and d.creat_la >= v_de_la)::int as intalniri,
      (select count(distinct (a.lead_id, (a.creat_la at time zone 'Europe/Bucharest')::date))
        from public.lead_activitate a
        where a.autor_id = p.id and a.tip in ('status', 'apel') and a.creat_la >= v_de_la)::int as apeluri
    from public.profiles p
    where p.activ and p.rol = 'vanzator'
  )
  select c.id, c.nume, c.titlu, c.clienti, c.intalniri, c.apeluri,
    (rank() over (order by c.clienti desc, c.intalniri desc, c.apeluri desc))::int
  from cifre c
  order by 7, c.nume;
end;
$$;

-- Feed-ul echipei: cine a programat, cine a închis, cine a primit o insignă. Fără numele clienților.
create or replace function public.feed_echipa(p_limita int default 20)
returns table (nume text, tip text, detaliu text, la timestamptz)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_activ() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;

  return query
  select * from (
    select p.nume, 'intalnire'::text, null::text, d.creat_la
    from public.predari d join public.profiles p on p.id = d.vanzator_id
    union all
    select p.nume, 'client'::text, null::text, d.inchis_la
    from public.predari d join public.profiles p on p.id = d.vanzator_id
    where d.rezultat = 'inchis' and d.inchis_la is not null
    union all
    select p.nume, 'insigna'::text, i.cod_insigna, i.obtinuta_la
    from public.insigne i join public.profiles p on p.id = i.user_id
  ) f
  order by 4 desc
  limit least(greatest(p_limita, 1), 100);
end;
$$;

-- Membrii echipei: nume, titlu, insigne. Fără date de contact.
create or replace function public.membri_echipa()
returns table (user_id uuid, nume text, titlu text, rol text, insigne text[])
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_activ() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;

  return query
  select p.id, p.nume, p.titlu, p.rol,
    coalesce(array(select i.cod_insigna from public.insigne i where i.user_id = p.id order by i.obtinuta_la), '{}')
  from public.profiles p
  where p.activ
  order by case p.rol when 'admin' then 0 when 'trainer' then 1 else 2 end, p.nume;
end;
$$;

-- Statistici pe vânzător (admin și trainer).
create or replace function public.statistici_echipa()
returns table (
  user_id uuid,
  nume text,
  titlu text,
  rol text,
  activ boolean,
  leaduri int,
  apeluri_saptamana int,
  apeluri int,
  intalniri int,
  clienti int
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_saptamana timestamptz := public.inceput_perioada('saptamana');
begin
  if not public.is_staff() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;

  return query
  select p.id, p.nume, p.titlu, p.rol, p.activ,
    (select count(*) from public.leads l where l.vanzator_id = p.id)::int,
    (select count(distinct (a.lead_id, (a.creat_la at time zone 'Europe/Bucharest')::date))
      from public.lead_activitate a
      where a.autor_id = p.id and a.tip in ('status', 'apel') and a.creat_la >= v_saptamana)::int,
    (select count(distinct (a.lead_id, (a.creat_la at time zone 'Europe/Bucharest')::date))
      from public.lead_activitate a
      where a.autor_id = p.id and a.tip in ('status', 'apel'))::int,
    (select count(*) from public.predari d where d.vanzator_id = p.id)::int,
    (select count(*) from public.predari d where d.vanzator_id = p.id and d.rezultat = 'inchis')::int
  from public.profiles p
  order by p.activ desc, p.nume;
end;
$$;

-- ---------------------------------------------------------------------------
-- Drepturi de execuție: funcțiile nu se pot apela fără cont.
-- ---------------------------------------------------------------------------

revoke execute on all functions in schema public from public, anon;

grant execute on function
  public.normalizeaza_telefon(text),
  public.normalizeaza_text(text),
  public.cheie_lead(text, text),
  public.is_activ(),
  public.is_admin(),
  public.is_staff(),
  public.verifica_duplicat(text, text, text),
  public.duplicate_import(text[], text[], text[]),
  public.inceput_perioada(text),
  public.clasament(text),
  public.feed_echipa(int),
  public.membri_echipa(),
  public.statistici_echipa()
to authenticated;

-- Funcțiile interne (exista_lead, acorda_insigne și triggerele) nu se apelează din aplicație.
revoke execute on function public.exista_lead(text, text, text, uuid) from authenticated;
revoke execute on function public.acorda_insigne(uuid) from authenticated;
