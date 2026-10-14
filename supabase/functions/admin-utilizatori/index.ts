// Edge Function „admin-utilizatori”: dezactivează sau reactivează un cont.
// Dezactivarea pune profilul pe inactiv (RLS nu mai arată nimic) și blochează logarea.
// Doar un admin activ o poate folosi. Se publică cu „Verify JWT” dezactivat:
// funcția verifică singură sesiunea celui care o apelează.

import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function raspuns(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return raspuns({ eroare: "Metodă nepermisă." }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return raspuns({ eroare: "Nu ești logat." }, 401);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data: apelant, error: eroareApelant } = await admin.auth.getUser(token);
  if (eroareApelant || !apelant.user) return raspuns({ eroare: "Sesiune invalidă." }, 401);

  const { data: profilApelant } = await admin
    .from("profiles")
    .select("rol, activ")
    .eq("id", apelant.user.id)
    .single();
  if (!profilApelant || profilApelant.rol !== "admin" || !profilApelant.activ) {
    return raspuns({ eroare: "Doar adminul poate face asta." }, 403);
  }

  let date: Record<string, unknown>;
  try {
    date = await req.json();
  } catch {
    return raspuns({ eroare: "Date invalide." }, 400);
  }

  const actiune = String(date.actiune ?? "");
  const userId = String(date.user_id ?? "");
  if (!userId) return raspuns({ eroare: "Lipsește utilizatorul." }, 400);
  if (userId === apelant.user.id) return raspuns({ eroare: "Nu îți poți dezactiva propriul cont." }, 400);

  if (actiune !== "dezactiveaza" && actiune !== "activeaza") {
    return raspuns({ eroare: "Acțiune necunoscută." }, 400);
  }
  const activ = actiune === "activeaza";

  const { error: eroareAuth } = await admin.auth.admin.updateUserById(userId, {
    // Aproximativ 100 de ani: practic, permanent până la reactivare.
    ban_duration: activ ? "none" : "876000h",
  });
  if (eroareAuth) return raspuns({ eroare: "Contul nu a putut fi actualizat." }, 500);

  const { error: eroareProfil } = await admin.from("profiles").update({ activ }).eq("id", userId);
  if (eroareProfil) return raspuns({ eroare: "Profilul nu a putut fi actualizat." }, 500);

  return raspuns({ ok: true, activ });
});
