-- Curățenie de securitate semnalată de Supabase (Security Advisor).

alter function public.normalizeaza_telefon(text) set search_path = public;
alter function public.normalizeaza_text(text) set search_path = public;
alter function public.cheie_lead(text, text) set search_path = public;

-- Funcțiile de trigger nu se apelează din aplicație.
revoke execute on function
  public.predari_dupa_actualizare(),
  public.predari_dupa_inserare(),
  public.predari_inainte_de_actualizare(),
  public.predari_inainte_de_inserare(),
  public.activitate_dupa_inserare(),
  public.activitate_inainte_de_inserare(),
  public.leads_inainte_de_actualizare(),
  public.leads_inainte_de_inserare(),
  public.leads_jurnal(),
  public.profiles_protejeaza(),
  public.comision_date(),
  public.bonus_date()
from public, anon, authenticated;
