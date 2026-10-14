"use client";

import { etichetaObiectie, type Status } from "../config";
import { ziuaOra } from "./format";
import { supabaseBrowser } from "./supabase-browser";
import type { Lead, Predare } from "./tipuri";

export const COLOANE_LEAD =
  "id, vanzator_id, afacere, nisa, oras, adresa, telefon_afacere, site, google_maps, decident_nume, decident_functie, decident_telefon, decident_email, status, urmatorul_pas_data, urmatorul_pas_text, notite, obiectii, obiectii_text, a_sunat_demo, sursa, calitate, creat_la, actualizat_la, ultimul_contact";

export const MESAJ_DUPLICAT = "Lead-ul ăsta e deja alocat. Vorbește cu David.";

// Traduce erorile venite din baza de date în mesaje pentru vânzător.
export function mesajEroare(error: { message?: string; hint?: string } | null | undefined) {
  if (!error) return "";
  if (error.message?.includes("DUPLICAT")) return MESAJ_DUPLICAT;
  if (error.message?.includes("PREDARE_NECESARA")) return "Completează formularul de predare ca să treci lead-ul pe verde.";
  if (/row-level security|permission/i.test(error.message ?? "")) return "Nu ai acces la această acțiune.";
  return "A apărut o eroare. Încearcă din nou.";
}

export async function schimbaStatus(leadId: string, status: Status) {
  return supabaseBrowser().from("leads").update({ status }).eq("id", leadId);
}

export async function adaugaActivitate(leadId: string, autorId: string, tip: "notita" | "apel", text: string | null) {
  return supabaseBrowser().from("lead_activitate").insert({ lead_id: leadId, autor_id: autorId, tip, text });
}

// Mesajul de WhatsApp pentru David, în formatul stabilit.
export function mesajWhatsapp(lead: Pick<Lead, "afacere" | "oras" | "obiectii" | "obiectii_text">, p: Omit<Predare, "id" | "lead_id" | "vanzator_id" | "rezultat" | "pachet" | "pret_lunar" | "inchis_la" | "creat_la">) {
  const loc = p.format === "online" ? "online" : `la locație, ${p.adresa ?? ""}`;
  const obiectii = [...(lead.obiectii ?? []).map(etichetaObiectie), lead.obiectii_text ?? ""].filter(Boolean).join("; ");
  const notite = [
    p.notite?.trim(),
    obiectii ? `Obiecții: ${obiectii}` : "",
    p.participanti && p.participanti !== "Nu" ? `Participă și: ${p.participanti.replace(/^Da:\s*/, "")}` : "",
  ]
    .filter(Boolean)
    .join(". ");
  return [
    `Întâlnire nouă: ${lead.afacere}, ${lead.oras ?? ""}`.trim(),
    `Decident: ${p.decident_nume}, ${p.decident_functie}, ${p.decident_telefon}, ${p.decident_email}`,
    `Când: ${ziuaOra(p.data_intalnire)}, ${loc}`,
    `A sunat la demo: ${p.a_sunat_demo ? "da" : "nu"}. Reacția: ${p.reactie_demo}`,
    `Problema lui: ${p.problema}`,
    `Notițe și obiecții: ${notite || "-"}`,
  ].join("\n");
}

// Supabase întoarce maximum 1000 de rânduri pe cerere: citim pe pagini.
export async function toatePaginile<T>(
  cerere: (de: number, pana: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  pas = 1000,
): Promise<{ data: T[]; error: { message: string } | null }> {
  const toate: T[] = [];
  for (let de = 0; ; de += pas) {
    const { data, error } = await cerere(de, de + pas - 1);
    if (error) return { data: toate, error };
    toate.push(...(data ?? []));
    if (!data || data.length < pas) break;
  }
  return { data: toate, error: null };
}
