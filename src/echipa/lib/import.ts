// Logica comună pentru importul de lead-uri din CSV/Excel: potrivirea coloanelor,
// recunoașterea nișei și verificarea duplicatelor.

import type { SupabaseClient } from "@supabase/supabase-js";
import { LISTA_NISE, type Nisa } from "../config";
import { normal } from "./format";
import { motivCuratenie } from "./curatenie";

// Câmpurile din baza de date și numele de coloană recomandat în CSV.
export const CAMPURI: { camp: string; eticheta: string; coloana: string; obligatoriu?: boolean; alias?: RegExp }[] = [
  { camp: "afacere", eticheta: "Numele afacerii", coloana: "afacere", obligatoriu: true, alias: /^(nume|denumire|business|firma|companie|clinica|afacerea|nume afacere|nume business)$/ },
  { camp: "nisa", eticheta: "Nișa", coloana: "nisa", alias: /^(tip|categorie|domeniu)$/ },
  { camp: "oras", eticheta: "Oraș", coloana: "oras", alias: /^(localitate|city|judet)$/ },
  { camp: "adresa", eticheta: "Adresa", coloana: "adresa", alias: /^(address)$/ },
  { camp: "telefon_afacere", eticheta: "Telefonul afacerii", coloana: "telefon_afacere", alias: /^(telefon|phone|tel|numar|numar de telefon)$/ },
  { camp: "site", eticheta: "Site", coloana: "site", alias: /^(website|web)$/ },
  { camp: "google_maps", eticheta: "Google Maps", coloana: "google_maps", alias: /^(maps|link google maps|link maps)$/ },
  { camp: "decident_nume", eticheta: "Contact: nume", coloana: "decident_nume", alias: /^(persoana de contact|contact|manager|proprietar)$/ },
  { camp: "decident_functie", eticheta: "Contact: funcție", coloana: "decident_functie", alias: /^(functie)$/ },
  { camp: "decident_telefon", eticheta: "Contact: telefon", coloana: "decident_telefon", alias: /^(telefon contact|telefon manager)$/ },
  { camp: "decident_email", eticheta: "Contact: e-mail", coloana: "decident_email", alias: /^(email|e-mail|mail)$/ },
  { camp: "notite", eticheta: "Notițe", coloana: "note", alias: /^(notite|observatii)$/ },
];

// Recunoaște nișa din textul din CSV.
export function nisaDinText(t: string): Nisa {
  const x = normal(t);
  if (!x) return "altele";
  if (LISTA_NISE.includes(x as Nisa)) return x as Nisa;
  if (/stomat|dent/.test(x)) return "stomatologie";
  if (/salon|coafur|frizer|manichiur|beauty|barber|unghii/.test(x)) return "salon";
  if (/spa|masaj|wellness/.test(x)) return "spa";
  if (/hotel|pensiun|cazare/.test(x)) return "hotel";
  if (/restaurant|bistro|pizz|cafe/.test(x)) return "restaurant";
  if (/service|auto|vulcaniz/.test(x)) return "service_auto";
  if (/clinic|medical|cabinet|policlinic/.test(x)) return "clinica";
  return "altele";
}

export function cheieLocala(r: Record<string, string | null>) {
  const tel = (r.telefon_afacere ?? "").replace(/\D/g, "").replace(/^(0040|40(?=\d{9}$)|0)/, "");
  return { tel: tel || null, nume: normal(r.afacere ?? "").replace(/[^a-z0-9]+/g, " ").trim() + "|" + normal(r.oras ?? "").replace(/[^a-z0-9]+/g, " ").trim() };
}

// Potrivirea automată a coloanelor după nume (și câteva denumiri uzuale).
export function potrivireAutomata(coloane: string[]) {
  const auto: Record<string, string> = {};
  for (const c of CAMPURI) {
    const gasit =
      coloane.find((col) => normal(col) === normal(c.coloana) || normal(col) === normal(c.camp)) ??
      (c.alias ? coloane.find((col) => c.alias!.test(normal(col).trim())) : undefined);
    if (gasit && !Object.values(auto).includes(gasit)) auto[c.camp] = gasit;
  }
  return auto;
}

export function transforma(randuri: Record<string, string>[], mapare: Record<string, string>) {
  return randuri.map((r) => {
    const d: Record<string, string | null> = {};
    for (const c of CAMPURI) {
      const v = mapare[c.camp] ? (r[mapare[c.camp]] ?? "").trim() : "";
      d[c.camp] = v || null;
    }
    d.nisa = nisaDinText(d.nisa ?? "");
    return d;
  });
}

export type RandPregatit = { date: Record<string, string | null>; motiv: string | null };

// Marchează rândurile fără nume, fără telefon sau cu Mero, cele care există deja în baza de date
// și dublurile din fișier.
// `vazute` se poate da mai departe între fișiere, ca să prindă dublurile dintre ele.
export async function verificaRanduri(
  supabase: SupabaseClient,
  transformate: Record<string, string | null>[],
  vazute = new Set<string>(),
): Promise<RandPregatit[] | null> {
  const existente: boolean[] = [];
  for (let i = 0; i < transformate.length; i += 500) {
    const bucata = transformate.slice(i, i + 500);
    const { data, error } = await supabase.rpc("duplicate_import", {
      p_telefoane: bucata.map((r) => r.telefon_afacere ?? ""),
      p_afaceri: bucata.map((r) => r.afacere ?? ""),
      p_orase: bucata.map((r) => r.oras ?? ""),
    });
    if (error) return null;
    existente.push(...((data as boolean[]) ?? []));
  }
  return transformate.map((r, i) => {
    let motiv: string | null = null;
    if (!r.afacere) motiv = "Lipsește numele afacerii";
    else if (motivCuratenie(r)) motiv = motivCuratenie(r);
    else if (existente[i]) motiv = "Există deja în baza de date";
    else {
      const k = cheieLocala(r);
      if ((k.tel && vazute.has("t:" + k.tel)) || vazute.has("n:" + k.nume)) motiv = "Apare de două ori";
      if (k.tel) vazute.add("t:" + k.tel);
      vazute.add("n:" + k.nume);
    }
    return { date: r, motiv };
  });
}
