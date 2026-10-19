// Reguli de curățenie: un lead fără telefon nu poate fi sunat, iar unul care are deja
// Mero (site-ul de programări) nu e un client potrivit. Folosite la import, la adăugare
// și în pagina „Curățenie lead-uri”.

type DateContact = { site?: string | null; telefon_afacere?: string | null; decident_telefon?: string | null };

export const MOTIV_MERO = "Are Mero";
export const MOTIV_FARA_TELEFON = "Fără telefon";

export function areMero(site: string | null | undefined) {
  return /(^|[^a-z0-9-])mero\.ro\b/i.test(site ?? "");
}

export function areTelefon(l: DateContact) {
  return [l.telefon_afacere, l.decident_telefon].some((t) => (t ?? "").replace(/\D/g, "").length >= 6);
}

export function motivCuratenie(l: DateContact): string | null {
  if (areMero(l.site)) return MOTIV_MERO;
  if (!areTelefon(l)) return MOTIV_FARA_TELEFON;
  return null;
}
