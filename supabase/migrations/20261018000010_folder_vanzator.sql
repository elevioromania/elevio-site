-- Un folder poate fi „pe numele” unui om: lead-urile din fișierele lui trec la acel om.
alter table public.foldere add column vanzator_id uuid references public.profiles (id) on delete set null;
