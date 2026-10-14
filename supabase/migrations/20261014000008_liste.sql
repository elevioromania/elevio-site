-- Liste (foldere) de lead-uri: fiecare import devine o listă care se poate da cuiva dintr-un click.

create table public.liste (
  id uuid primary key default gen_random_uuid(),
  nume text not null check (length(trim(nume)) > 0),
  creat_de uuid references public.profiles (id) on delete set null,
  creat_la timestamptz not null default now()
);

alter table public.leads add column lista_id uuid references public.liste (id) on delete set null;
create index leads_lista_idx on public.leads (lista_id);

alter table public.liste enable row level security;
revoke all on public.liste from anon;

create policy "liste: adminul are acces complet" on public.liste
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "liste: vânzătorul vede listele cu lead-urile lui" on public.liste
  for select to authenticated using (
    public.is_activ()
    and exists (select 1 from public.leads l where l.lista_id = liste.id and l.vanzator_id = auth.uid())
  );

-- În triggerele lead-urilor, vânzătorul nu poate schimba lista_id
-- (vezi leads_inainte_de_inserare și leads_inainte_de_actualizare, aplicate la fel în Supabase).
