import { redirect } from "next/navigation";
import { supabaseServer } from "./supabase-server";
import { COLOANE_PROFIL, type Profil } from "./tipuri";

// Profilul utilizatorului logat, verificat pe server. Fără sesiune sau cont activ: afară.
export async function profilCurent(): Promise<Profil> {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getClaims();
  const id = data?.claims?.sub;
  if (!id) redirect("/echipa/login");
  const { data: profil } = await supabase.from("profiles").select(COLOANE_PROFIL).eq("id", id).maybeSingle();
  if (!profil || !profil.activ) redirect("/echipa/iesire?motiv=dezactivat");
  return profil as Profil;
}
