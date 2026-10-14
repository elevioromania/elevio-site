-- Prenumele separat, folosit în salut și în feed-ul echipei.
-- Cine nu îl are completat e rugat să-l scrie la prima intrare în platformă.

alter table public.profiles add column if not exists prenume text;

create or replace function public.feed_echipa(p_limita int default 20)
returns table (nume text, tip text, detaliu text, la timestamptz)
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.is_activ() then
    raise exception 'Acces interzis' using errcode = '42501';
  end if;
  return query
  select * from (
    select coalesce(nullif(p.prenume, ''), split_part(p.nume, ' ', 1)), 'intalnire'::text, null::text, d.creat_la
    from public.predari d join public.profiles p on p.id = d.vanzator_id
    union all
    select coalesce(nullif(p.prenume, ''), split_part(p.nume, ' ', 1)), 'client'::text, null::text, d.inchis_la
    from public.predari d join public.profiles p on p.id = d.vanzator_id
    where d.rezultat = 'inchis' and d.inchis_la is not null
    union all
    select coalesce(nullif(p.prenume, ''), split_part(p.nume, ' ', 1)), 'insigna'::text, i.cod_insigna, i.obtinuta_la
    from public.insigne i join public.profiles p on p.id = i.user_id
  ) f
  order by 4 desc
  limit least(greatest(p_limita, 1), 100);
end;
$$;
