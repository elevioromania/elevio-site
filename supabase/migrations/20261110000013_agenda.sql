-- Agenda pentru agentul vocal al clinicilor stomatologice.
--
-- iStoma trimite programările fiecărui medic într-un Google Calendar separat.
-- Site-ul citește calendarele (adresa secretă iCal), calculează orele libere
-- și trimite recepției cererile de programare prinse de agent.
--
-- Tabelele au RLS fără nicio politică: nimeni nu le citește direct.
-- Accesul se face doar prin funcțiile de mai jos, cu cheia secretă a clinicii.

-- ---------------------------------------------------------------------------
-- Tabele
-- ---------------------------------------------------------------------------

create table public.agenda_clinici (
  id uuid primary key default gen_random_uuid(),
  nume text not null,
  -- sha256 (hex) al cheii secrete pe care o trimite agentul în antetul x-agenda-cheie
  cheie_hash text not null unique,
  email_receptie text not null,
  fus_orar text not null default 'Europe/Bucharest',
  -- durata unei programări propuse de agent
  durata_minute int not null default 30 check (durata_minute between 10 and 240),
  -- din cât în cât pornesc orele propuse (09:00, 09:30, ...)
  pas_minute int not null default 30 check (pas_minute between 5 and 120),
  -- cel mai devreme peste câte minute de acum poate fi o programare
  preaviz_minute int not null default 120 check (preaviz_minute between 0 and 10080),
  -- cât de departe în viitor caută agentul
  zile_inainte int not null default 21 check (zile_inainte between 1 and 90),
  activa boolean not null default true,
  -- ultima alertă trimisă lui David că un calendar nu se poate citi
  alerta_trimisa_la timestamptz,
  creat_la timestamptz not null default now()
);

create table public.agenda_medici (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.agenda_clinici (id) on delete cascade,
  nume text not null,
  specialitate text,
  -- adresa secretă în format iCal a calendarului Google creat de iStoma pentru medic
  calendar_ics text not null,
  -- Programul de lucru, pe zilele săptămânii (1 = luni ... 7 = duminică):
  --   {"1": [["09:00","15:00"]], "3": [["14:00","21:00"]]}
  -- sau, pentru program pe săptămâni pare / impare (ca în iStoma):
  --   {"para": {...}, "impara": {...}}
  program jsonb not null default '{}'::jsonb,
  activ boolean not null default true,
  ordine int not null default 0,
  creat_la timestamptz not null default now()
);

create index agenda_medici_clinica on public.agenda_medici (clinica_id);

-- Orele ținute de agent:
--   propunere = ore spuse pacientului în apel, ținute câteva minute
--   cerere    = ora aleasă de pacient, ținută până o trece recepția în iStoma
create table public.agenda_rezervari (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.agenda_clinici (id) on delete cascade,
  medic_id uuid references public.agenda_medici (id) on delete cascade,
  tip text not null check (tip in ('propunere', 'cerere')),
  inceput timestamptz,
  sfarsit timestamptz,
  expira_la timestamptz not null,
  call_id text,
  nume_pacient text,
  telefon text,
  motiv text,
  observatii text,
  email_trimis boolean not null default false,
  creat_la timestamptz not null default now(),
  check (sfarsit is null or sfarsit > inceput)
);

create index agenda_rezervari_active on public.agenda_rezervari (clinica_id, expira_la);
create index agenda_rezervari_apel on public.agenda_rezervari (call_id);

alter table public.agenda_clinici enable row level security;
alter table public.agenda_medici enable row level security;
alter table public.agenda_rezervari enable row level security;

-- ---------------------------------------------------------------------------
-- Funcții (apelate de site cu cheia clinicii)
-- ---------------------------------------------------------------------------

create or replace function public.agenda_clinica_dupa_cheie(p_cheie text)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from agenda_clinici
  where activa
    and p_cheie is not null
    and length(p_cheie) >= 24
    and cheie_hash = encode(sha256(convert_to(p_cheie, 'UTF8')), 'hex');
$$;

revoke execute on function public.agenda_clinica_dupa_cheie(text) from public, anon, authenticated;

-- Tot ce îi trebuie site-ului ca să calculeze orele libere.
-- Întoarce null dacă cheia nu e bună.
create or replace function public.agenda_date(p_cheie text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_clinica uuid := agenda_clinica_dupa_cheie(p_cheie);
begin
  if v_clinica is null then
    return null;
  end if;

  return jsonb_build_object(
    'clinica', (
      select jsonb_build_object(
        'id', c.id,
        'nume', c.nume,
        'email_receptie', c.email_receptie,
        'fus_orar', c.fus_orar,
        'durata_minute', c.durata_minute,
        'pas_minute', c.pas_minute,
        'preaviz_minute', c.preaviz_minute,
        'zile_inainte', c.zile_inainte)
      from agenda_clinici c
      where c.id = v_clinica),
    'medici', coalesce((
      select jsonb_agg(jsonb_build_object(
          'id', m.id,
          'nume', m.nume,
          'specialitate', m.specialitate,
          'calendar_ics', m.calendar_ics,
          'program', m.program)
        order by m.ordine, m.nume)
      from agenda_medici m
      where m.clinica_id = v_clinica and m.activ), '[]'::jsonb),
    'rezervari', coalesce((
      select jsonb_agg(jsonb_build_object(
          'medic_id', r.medic_id,
          'tip', r.tip,
          'inceput', r.inceput,
          'sfarsit', r.sfarsit,
          'call_id', r.call_id))
      from agenda_rezervari r
      where r.clinica_id = v_clinica
        and r.expira_la > now()
        and r.inceput is not null), '[]'::jsonb)
  );
end;
$$;

-- Ține câteva minute orele spuse pacientului, ca agentul să nu le dea
-- și altui apelant în același timp. Înlocuiește propunerile mai vechi din același apel.
create or replace function public.agenda_propune(p_cheie text, p_call_id text, p_ore jsonb)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clinica uuid := agenda_clinica_dupa_cheie(p_cheie);
  v_numar int;
begin
  if v_clinica is null then
    raise exception 'cheie invalida';
  end if;
  if coalesce(p_call_id, '') = '' then
    return 0;
  end if;

  delete from agenda_rezervari
  where clinica_id = v_clinica and call_id = p_call_id and tip = 'propunere';

  insert into agenda_rezervari (clinica_id, medic_id, tip, inceput, sfarsit, expira_la, call_id)
  select v_clinica, m.id, 'propunere', (o ->> 'inceput')::timestamptz, (o ->> 'sfarsit')::timestamptz,
         now() + interval '15 minutes', p_call_id
  from jsonb_array_elements(coalesce(p_ore, '[]'::jsonb)) o
  join agenda_medici m on m.id = (o ->> 'medic_id')::uuid and m.clinica_id = v_clinica;

  get diagnostics v_numar = row_count;
  return v_numar;
end;
$$;

-- Salvează cererea pacientului. Dacă altă cerere a luat între timp aceeași oră
-- la același medic, întoarce {"ok": false, "motiv": "ocupat"}.
-- Fără medic / oră, cererea e doar „sunați-mă pentru programare”.
create or replace function public.agenda_cere(
  p_cheie text,
  p_call_id text,
  p_medic_id uuid,
  p_inceput timestamptz,
  p_sfarsit timestamptz,
  p_nume text,
  p_telefon text,
  p_motiv text,
  p_observatii text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clinica uuid := agenda_clinica_dupa_cheie(p_cheie);
  v_id uuid;
begin
  if v_clinica is null then
    raise exception 'cheie invalida';
  end if;

  if p_medic_id is not null
     and not exists (select 1 from agenda_medici where id = p_medic_id and clinica_id = v_clinica) then
    raise exception 'medic necunoscut';
  end if;

  if p_medic_id is not null and p_inceput is not null then
    perform pg_advisory_xact_lock(hashtext(p_medic_id::text));

    if exists (
      select 1
      from agenda_rezervari r
      where r.medic_id = p_medic_id
        and r.tip = 'cerere'
        and r.expira_la > now()
        and coalesce(r.call_id, '') is distinct from coalesce(p_call_id, '')
        and tstzrange(r.inceput, r.sfarsit) && tstzrange(p_inceput, p_sfarsit)
    ) then
      return jsonb_build_object('ok', false, 'motiv', 'ocupat');
    end if;
  end if;

  if coalesce(p_call_id, '') <> '' then
    delete from agenda_rezervari
    where clinica_id = v_clinica and call_id = p_call_id and tip = 'propunere';
  end if;

  insert into agenda_rezervari (
    clinica_id, medic_id, tip, inceput, sfarsit, expira_la, call_id,
    nume_pacient, telefon, motiv, observatii)
  values (
    v_clinica, p_medic_id, 'cerere', p_inceput, p_sfarsit,
    -- ținută până o trece recepția în iStoma (apare apoi în calendar),
    -- dar nu mai mult de 18 ore și nu după ce a trecut ora
    case when p_sfarsit is null then now() + interval '18 hours'
         else least(p_sfarsit, now() + interval '18 hours') end,
    nullif(p_call_id, ''),
    left(p_nume, 200), left(p_telefon, 40), left(p_motiv, 500), left(p_observatii, 1000))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

create or replace function public.agenda_email_trimis(p_cheie text, p_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update agenda_rezervari
  set email_trimis = true
  where id = p_id and clinica_id = agenda_clinica_dupa_cheie(p_cheie);
$$;

-- true dacă trebuie trimisă acum alerta „nu pot citi calendarul” (cel mult una pe oră).
create or replace function public.agenda_alerta(p_cheie text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_trimite boolean;
begin
  update agenda_clinici
  set alerta_trimisa_la = now()
  where id = agenda_clinica_dupa_cheie(p_cheie)
    and (alerta_trimisa_la is null or alerta_trimisa_la < now() - interval '1 hour')
  returning true into v_trimite;

  return coalesce(v_trimite, false);
end;
$$;

revoke execute on function
  public.agenda_date(text),
  public.agenda_propune(text, text, jsonb),
  public.agenda_cere(text, text, uuid, timestamptz, timestamptz, text, text, text, text),
  public.agenda_email_trimis(text, uuid),
  public.agenda_alerta(text)
from public;

grant execute on function
  public.agenda_date(text),
  public.agenda_propune(text, text, jsonb),
  public.agenda_cere(text, text, uuid, timestamptz, timestamptz, text, text, text, text),
  public.agenda_email_trimis(text, uuid),
  public.agenda_alerta(text)
to anon, authenticated;
