-- Agenda: păstrăm motivul pentru care mailul către recepție nu a plecat,
-- ca să se vadă direct în tabel (logurile Netlify nu se păstrează).

alter table public.agenda_rezervari
  add column eroare_email text;

create or replace function public.agenda_rezultat_email(p_cheie text, p_id uuid, p_eroare text)
returns void
language sql
security definer
set search_path = public
as $$
  update agenda_rezervari
  set email_trimis = p_eroare is null,
      eroare_email = left(p_eroare, 500)
  where id = p_id and clinica_id = agenda_clinica_dupa_cheie(p_cheie);
$$;

revoke execute on function public.agenda_rezultat_email(text, uuid, text) from public;
grant execute on function public.agenda_rezultat_email(text, uuid, text) to anon, authenticated;

drop function public.agenda_email_trimis(text, uuid);
