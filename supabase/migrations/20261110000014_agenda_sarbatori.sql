-- Agenda: clinica poate fi închisă în zilele de sărbătoare legală (implicit da).
-- Site-ul ia zilele din calendarul public Google al sărbătorilor din România.

alter table public.agenda_clinici
  add column inchis_de_sarbatori boolean not null default true;

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
        'zile_inainte', c.zile_inainte,
        'inchis_de_sarbatori', c.inchis_de_sarbatori)
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
