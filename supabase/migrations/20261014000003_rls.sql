-- Platforma internă de vânzări Elevio: Row Level Security pe toate tabelele.
-- Regula de bază: un cont dezactivat nu vede nimic; vânzătorul vede doar ce e al lui; adminul vede tot.

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activitate enable row level security;
alter table public.predari enable row level security;
alter table public.clienti_comision enable row level security;
alter table public.bonusuri_config enable row level security;
alter table public.bonusuri_acordate enable row level security;
alter table public.progres_ghid enable row level security;
alter table public.insigne enable row level security;
alter table public.sesiuni enable row level security;
alter table public.anunturi enable row level security;

-- Nimic pentru vizitatorii fără cont.
revoke all on all tables in schema public from anon;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create policy "profil: citesc profilul meu" on public.profiles
  for select to authenticated
  using (id = auth.uid() and activ);

create policy "profil: adminul și trainerul citesc tot" on public.profiles
  for select to authenticated
  using (public.is_staff());

-- Câmpurile protejate (rol, titlu, comision, nivel, activ) sunt blocate de triggerul profiles_protejeaza.
create policy "profil: îmi actualizez profilul" on public.profiles
  for update to authenticated
  using (id = auth.uid() and activ)
  with check (id = auth.uid());

create policy "profil: adminul actualizează" on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Conturile se creează doar din Edge Function (service_role), deci fără politică de insert.

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------

create policy "lead: vânzătorul își vede lead-urile" on public.leads
  for select to authenticated
  using (vanzator_id = auth.uid() and public.is_activ());

create policy "lead: vânzătorul își adaugă lead-uri" on public.leads
  for insert to authenticated
  with check (vanzator_id = auth.uid() and sursa = 'adaugat_de_vanzator' and public.is_activ());

create policy "lead: vânzătorul își actualizează lead-urile" on public.leads
  for update to authenticated
  using (vanzator_id = auth.uid() and public.is_activ())
  with check (vanzator_id = auth.uid());

create policy "lead: adminul are acces complet" on public.leads
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- lead_activitate
-- ---------------------------------------------------------------------------

create policy "jurnal: citesc jurnalul lead-urilor mele" on public.lead_activitate
  for select to authenticated
  using (
    public.is_activ()
    and exists (select 1 from public.leads l where l.id = lead_id and l.vanzator_id = auth.uid())
  );

create policy "jurnal: adaug notițe și apeluri la lead-urile mele" on public.lead_activitate
  for insert to authenticated
  with check (
    autor_id = auth.uid()
    and tip in ('notita', 'apel')
    and public.is_activ()
    and exists (select 1 from public.leads l where l.id = lead_id and l.vanzator_id = auth.uid())
  );

create policy "jurnal: adminul are acces complet" on public.lead_activitate
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- predari
-- ---------------------------------------------------------------------------

create policy "predare: îmi văd predările" on public.predari
  for select to authenticated
  using (vanzator_id = auth.uid() and public.is_activ());

create policy "predare: predau o întâlnire pentru lead-ul meu" on public.predari
  for insert to authenticated
  with check (
    vanzator_id = auth.uid()
    and public.is_activ()
    and exists (select 1 from public.leads l where l.id = lead_id and l.vanzator_id = auth.uid())
  );

create policy "predare: adminul are acces complet" on public.predari
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- clienti_comision și bonusuri
-- ---------------------------------------------------------------------------

create policy "comision: îmi văd comisioanele" on public.clienti_comision
  for select to authenticated
  using (vanzator_id = auth.uid() and public.is_activ());

create policy "comision: adminul are acces complet" on public.clienti_comision
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "bonus: toți văd pragurile" on public.bonusuri_config
  for select to authenticated
  using (public.is_activ());

create policy "bonus: adminul setează pragurile" on public.bonusuri_config
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "bonus: îmi văd bonusurile" on public.bonusuri_acordate
  for select to authenticated
  using (vanzator_id = auth.uid() and public.is_activ());

create policy "bonus: adminul are acces complet" on public.bonusuri_acordate
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- progres_ghid
-- ---------------------------------------------------------------------------

create policy "ghid: îmi gestionez progresul" on public.progres_ghid
  for all to authenticated
  using (user_id = auth.uid() and public.is_activ())
  with check (user_id = auth.uid() and public.is_activ());

create policy "ghid: adminul și trainerul văd progresul" on public.progres_ghid
  for select to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------------
-- insigne (se acordă doar automat, prin triggere)
-- ---------------------------------------------------------------------------

create policy "insigne: toată echipa le vede" on public.insigne
  for select to authenticated
  using (public.is_activ());

create policy "insigne: adminul are acces complet" on public.insigne
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- sesiuni și anunțuri
-- ---------------------------------------------------------------------------

create policy "sesiuni: toată echipa le vede" on public.sesiuni
  for select to authenticated
  using (public.is_activ());

create policy "sesiuni: adminul le gestionează" on public.sesiuni
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "anunturi: toată echipa le vede" on public.anunturi
  for select to authenticated
  using (public.is_activ());

create policy "anunturi: adminul le gestionează" on public.anunturi
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
