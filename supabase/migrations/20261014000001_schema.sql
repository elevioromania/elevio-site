-- Platforma internă de vânzări Elevio: tabelele.
-- Rulează fișierele din supabase/migrations în ordinea numelui.

-- ---------------------------------------------------------------------------
-- Funcții de normalizare (folosite la verificarea de duplicate)
-- ---------------------------------------------------------------------------

-- Telefon: doar cifre, fără prefixul de țară sau 0 de la început.
-- "0773 807 222", "+40 773 807 222" și "0040773807222" devin "773807222".
create or replace function public.normalizeaza_telefon(t text)
returns text
language sql
immutable
as $$
  select nullif(
    case
      when d like '0040%' then substr(d, 5)
      when d like '40%' and length(d) = 11 then substr(d, 3)
      when d like '0%' then substr(d, 2)
      else d
    end,
    '')
  from (select regexp_replace(coalesce(t, ''), '[^0-9]', '', 'g') as d) x;
$$;

-- Text: litere mici, fără diacritice, fără semne, spații simple.
create or replace function public.normalizeaza_text(t text)
returns text
language sql
immutable
as $$
  select trim(regexp_replace(
    regexp_replace(
      translate(lower(coalesce(t, '')), 'ăâîșşțţáéíóúöüëè', 'aaissttaeiououeee'),
      '[^a-z0-9]+', ' ', 'g'),
    '\s+', ' ', 'g'));
$$;

create or replace function public.cheie_lead(afacere text, oras text)
returns text
language sql
immutable
as $$
  select case
    when public.normalizeaza_text(afacere) = '' then null
    else public.normalizeaza_text(afacere) || '|' || public.normalizeaza_text(oras)
  end;
$$;

-- ---------------------------------------------------------------------------
-- Profiluri
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nume text not null,
  telefon text,
  email text not null,
  rol text not null default 'vanzator' check (rol in ('admin', 'vanzator', 'trainer')),
  titlu text not null default 'Echipa de marketing Elevio',
  activ boolean not null default true,
  comision_instalare numeric(10, 2) not null default 80,
  -- „Power levels” (pentru mai târziu): vânzătorul va primi lead-uri cu calitate <= nivel.
  nivel int not null default 1,
  -- Onboarding: pașii bifați manual și dacă a văzut ecranul de bun venit.
  onboarding jsonb not null default '{}'::jsonb,
  bun_venit_vazut boolean not null default false,
  creat_la timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Lead-uri
-- ---------------------------------------------------------------------------

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  vanzator_id uuid references public.profiles (id) on delete set null,
  afacere text not null check (length(trim(afacere)) > 0),
  nisa text not null default 'altele'
    check (nisa in ('stomatologie', 'salon', 'spa', 'clinica', 'hotel', 'restaurant', 'service_auto', 'altele')),
  oras text,
  adresa text,
  telefon_afacere text,
  telefon_normalizat text generated always as (public.normalizeaza_telefon(telefon_afacere)) stored,
  cheie_nume text generated always as (public.cheie_lead(afacere, oras)) stored,
  site text,
  google_maps text,
  decident_nume text,
  decident_functie text,
  decident_telefon text,
  decident_email text,
  status text not null default 'nou'
    check (status in ('nou', 'nu_a_raspuns', 'de_resunat', 'aproape', 'intalnire', 'neinteresat', 'invalid')),
  urmatorul_pas_data timestamptz,
  urmatorul_pas_text text,
  notite text,
  obiectii text[] not null default '{}',
  obiectii_text text,
  a_sunat_demo boolean not null default false,
  sursa text not null default 'alocat' check (sursa in ('alocat', 'adaugat_de_vanzator')),
  -- „Power levels” (pentru mai târziu).
  calitate int not null default 1,
  creat_de uuid references public.profiles (id) on delete set null,
  creat_la timestamptz not null default now(),
  actualizat_la timestamptz not null default now(),
  ultimul_contact timestamptz
);

create index leads_vanzator_idx on public.leads (vanzator_id);
create index leads_status_idx on public.leads (status);
create index leads_telefon_normalizat_idx on public.leads (telefon_normalizat);
create index leads_cheie_nume_idx on public.leads (cheie_nume);
create index leads_urmatorul_pas_idx on public.leads (urmatorul_pas_data);

-- Jurnalul de activitate al fiecărui lead.
create table public.lead_activitate (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  autor_id uuid references public.profiles (id) on delete set null,
  tip text not null check (tip in ('status', 'notita', 'apel', 'realocare')),
  de_la text,
  la text,
  text text,
  creat_la timestamptz not null default now()
);

create index lead_activitate_lead_idx on public.lead_activitate (lead_id, creat_la desc);
create index lead_activitate_autor_idx on public.lead_activitate (autor_id, creat_la desc);

-- ---------------------------------------------------------------------------
-- Întâlniri predate lui David
-- ---------------------------------------------------------------------------

create table public.predari (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  vanzator_id uuid references public.profiles (id) on delete set null,
  data_intalnire timestamptz not null,
  format text not null check (format in ('online', 'locatie')),
  adresa text,
  decident_nume text not null,
  decident_functie text not null,
  decident_telefon text not null,
  decident_email text not null,
  a_sunat_demo boolean not null,
  reactie_demo text not null,
  problema text not null,
  participanti text not null,
  notite text,
  rezultat text not null default 'noua'
    check (rezultat in ('noua', 'confirmata', 'neprezentat', 'reprogramata', 'inchis', 'neinchis')),
  pachet text,
  pret_lunar numeric(10, 2),
  inchis_la timestamptz,
  creat_la timestamptz not null default now(),
  check (format = 'online' or length(trim(coalesce(adresa, ''))) > 0)
);

create index predari_vanzator_idx on public.predari (vanzator_id);
create index predari_lead_idx on public.predari (lead_id);
create index predari_rezultat_idx on public.predari (rezultat);

-- ---------------------------------------------------------------------------
-- Comisioane și bonusuri
-- ---------------------------------------------------------------------------

create table public.clienti_comision (
  id uuid primary key default gen_random_uuid(),
  predare_id uuid not null unique references public.predari (id) on delete cascade,
  vanzator_id uuid references public.profiles (id) on delete set null,
  taxa_instalare_platita boolean not null default false,
  taxa_instalare_platita_la timestamptz,
  prima_luna_incheiata boolean not null default false,
  prima_luna_incheiata_la timestamptz,
  anulat boolean not null default false,
  anulat_la timestamptz,
  transa1_suma numeric(10, 2) not null default 0,
  transa1_platita boolean not null default false,
  transa1_platita_la timestamptz,
  transa2_suma numeric(10, 2) not null default 0,
  transa2_platita boolean not null default false,
  transa2_platita_la timestamptz,
  creat_la timestamptz not null default now()
);

create index clienti_comision_vanzator_idx on public.clienti_comision (vanzator_id);

-- Pragurile de bonus (de câți clienți închiși e nevoie și cât se plătește).
create table public.bonusuri_config (
  id uuid primary key default gen_random_uuid(),
  prag int not null unique check (prag > 0),
  suma numeric(10, 2) not null check (suma >= 0),
  descriere text,
  creat_la timestamptz not null default now()
);

-- Bonusurile câștigate de fiecare vânzător.
create table public.bonusuri_acordate (
  id uuid primary key default gen_random_uuid(),
  vanzator_id uuid not null references public.profiles (id) on delete cascade,
  config_id uuid references public.bonusuri_config (id) on delete set null,
  prag int not null,
  suma numeric(10, 2) not null,
  platit boolean not null default false,
  platit_la timestamptz,
  creat_la timestamptz not null default now(),
  unique (vanzator_id, prag)
);

-- ---------------------------------------------------------------------------
-- Ghid, insigne, comunitate
-- ---------------------------------------------------------------------------

create table public.progres_ghid (
  user_id uuid not null references public.profiles (id) on delete cascade,
  sectiune_id text not null,
  citit_la timestamptz not null default now(),
  primary key (user_id, sectiune_id)
);

create table public.insigne (
  user_id uuid not null references public.profiles (id) on delete cascade,
  cod_insigna text not null,
  obtinuta_la timestamptz not null default now(),
  primary key (user_id, cod_insigna)
);

-- Sesiuni de apeluri în grup (power hours).
create table public.sesiuni (
  id uuid primary key default gen_random_uuid(),
  titlu text not null,
  incepe_la timestamptz not null,
  link text,
  locatie text,
  descriere text,
  creat_de uuid references public.profiles (id) on delete set null,
  creat_la timestamptz not null default now()
);

create index sesiuni_incepe_idx on public.sesiuni (incepe_la);

create table public.anunturi (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  activ boolean not null default true,
  creat_de uuid references public.profiles (id) on delete set null,
  creat_la timestamptz not null default now()
);
