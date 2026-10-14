import { connection } from "next/server";
import AppShell from "@/echipa/components/AppShell";
import AuthCadru from "@/echipa/components/AuthCadru";
import { profilCurent } from "@/echipa/lib/sesiune";
import { SUPABASE_CONFIGURAT } from "@/echipa/lib/supabase-env";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Toate paginile din /echipa/app se randează la cerere, după verificarea sesiunii (nimic static, nimic în cache).
  await connection();
  if (!SUPABASE_CONFIGURAT) return <AuthCadru titlu="Platforma echipei">{null}</AuthCadru>;
  const profil = await profilCurent();
  return <AppShell profil={profil}>{children}</AppShell>;
}
