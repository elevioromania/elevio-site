-- Status nou: i-am trimis mesaj sau mail persoanei de contact.
alter table public.leads drop constraint leads_status_check;
alter table public.leads add constraint leads_status_check
  check (status in ('nou', 'nu_a_raspuns', 'mesaj_trimis', 'de_resunat', 'aproape', 'intalnire', 'neinteresat', 'invalid'));
