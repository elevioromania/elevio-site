import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/echipa/lib/supabase-server";
import { SUPABASE_CONFIGURAT } from "@/echipa/lib/supabase-env";

// Delogare pe server (folosită și când un cont dezactivat încearcă să intre).
export async function GET(request: NextRequest) {
  if (SUPABASE_CONFIGURAT) {
    const supabase = await supabaseServer();
    await supabase.auth.signOut();
  }
  const motiv = request.nextUrl.searchParams.get("motiv");
  const url = new URL("/echipa/login", request.url);
  if (motiv === "dezactivat") url.searchParams.set("motiv", "dezactivat");
  return NextResponse.redirect(url);
}
