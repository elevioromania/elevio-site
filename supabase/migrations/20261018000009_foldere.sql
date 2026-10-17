-- Foldere care grupează fișierele de lead-uri (tabelul „liste” = fișierele încărcate).
-- Adminul le creează și le numește; vânzătorul vede folderele în care are lead-uri.

create table public.foldere (
  id uuid primary key default gen_random_uuid(),
  nume text not null check (length(trim(nume)) > 0),
  creat_de uuid references public.profiles (id) on delete set null,
  creat_la timestamptz not null default now()
);

alter table public.liste add column folder_id uuid references public.foldere (id) on delete set null;
create index liste_folder_idx on public.liste (folder_id);

alter table public.foldere enable row level security;

create policy "foldere: adminul are acces complet" on public.foldere
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "foldere: vânzătorul vede folderele cu lead-urile lui" on public.foldere
  for select to authenticated using (
    public.is_activ()
    and exists (
      select 1
      from public.liste f
      join public.leads l on l.lista_id = f.id
      where f.folder_id = foldere.id and l.vanzator_id = auth.uid()
    )
  );
