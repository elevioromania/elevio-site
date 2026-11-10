import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/echipa/lib/supabase-env";
import type { Medic, Setari } from "./ore-libere";

// Apelurile către funcțiile agenda_* din Supabase. Cheia clinicii ține loc de parolă:
// tabelele nu se văd din afară, funcțiile verifică cheia la fiecare apel.

export type MedicCuCalendar = Medic & { calendar_ics: string };

export type Clinica = Setari & { id: string; nume: string; email_receptie: string; inchis_de_sarbatori: boolean };

export type Rezervare = {
  medic_id: string;
  tip: "propunere" | "cerere";
  inceput: string;
  sfarsit: string;
  call_id: string | null;
};

export type DateAgenda = { clinica: Clinica; medici: MedicCuCalendar[]; rezervari: Rezervare[] };

function client() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Supabase neconfigurat");
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// null dacă cheia nu aparține niciunei clinici active.
export async function dateAgenda(cheie: string): Promise<DateAgenda | null> {
  const { data, error } = await client().rpc("agenda_date", { p_cheie: cheie });
  if (error) throw new Error(error.message);
  return (data as DateAgenda | null) ?? null;
}

export async function tineOrePropuse(
  cheie: string,
  callId: string,
  ore: { medic_id: string; inceput: string; sfarsit: string }[],
): Promise<void> {
  const { error } = await client().rpc("agenda_propune", { p_cheie: cheie, p_call_id: callId, p_ore: ore });
  if (error) throw new Error(error.message);
}

export async function salveazaCerere(
  cheie: string,
  cerere: {
    callId: string;
    medicId: string | null;
    inceput: string | null;
    sfarsit: string | null;
    nume: string;
    telefon: string;
    motiv: string;
    observatii: string;
  },
): Promise<{ ok: true; id: string } | { ok: false; motiv: "ocupat" }> {
  const { data, error } = await client().rpc("agenda_cere", {
    p_cheie: cheie,
    p_call_id: cerere.callId,
    p_medic_id: cerere.medicId,
    p_inceput: cerere.inceput,
    p_sfarsit: cerere.sfarsit,
    p_nume: cerere.nume,
    p_telefon: cerere.telefon,
    p_motiv: cerere.motiv,
    p_observatii: cerere.observatii,
  });
  if (error) throw new Error(error.message);
  return data as { ok: true; id: string } | { ok: false; motiv: "ocupat" };
}

// Notează lângă cerere dacă mailul către recepție a plecat (și de ce nu, dacă n-a plecat).
export async function noteazaEmail(cheie: string, id: string, eroare: string | null): Promise<void> {
  await client().rpc("agenda_rezultat_email", { p_cheie: cheie, p_id: id, p_eroare: eroare });
}

// true dacă trebuie trimisă acum alerta (cel mult una pe oră pentru o clinică).
export async function poateTrimiteAlerta(cheie: string): Promise<boolean> {
  const { data, error } = await client().rpc("agenda_alerta", { p_cheie: cheie });
  return !error && data === true;
}
