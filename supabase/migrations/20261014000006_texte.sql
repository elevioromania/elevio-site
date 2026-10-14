-- Textul automat al următorului pas după predare: „Întâlnire de closing”.

create or replace function public.predari_dupa_inserare()
returns trigger language plpgsql security definer set search_path = public
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
    urmatorul_pas_text = 'Întâlnire de closing'
  where id = new.lead_id;
  if new.vanzator_id is not null then
    perform public.acorda_insigne(new.vanzator_id);
  end if;
  return null;
end;
$$;

update public.leads set urmatorul_pas_text = 'Întâlnire de closing' where urmatorul_pas_text = 'Întâlnire cu David';
