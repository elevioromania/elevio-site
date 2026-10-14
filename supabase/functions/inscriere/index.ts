// Edge Function „inscriere”: creează contul unui vânzător doar dacă are codul de invitație.
// Secrete necesare (Supabase → Edge Functions → Secrets): INVITE_CODE.
// SUPABASE_URL și SUPABASE_SERVICE_ROLE_KEY sunt puse automat de Supabase.
// Se publică cu „Verify JWT” dezactivat (cine se înscrie nu are încă un cont).

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

// Comparație în timp constant, ca să nu se poată ghici codul după timpul de răspuns.
function egal(a: string, b: string) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diferente = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diferente |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diferente === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return raspuns({ eroare: "Metodă nepermisă." }, 405);

  const codCorect = Deno.env.get("INVITE_CODE");
  if (!codCorect) {
    return raspuns({ eroare: "Înscrierea nu e configurată încă." }, 500);
  }

  let date: Record<string, unknown>;
  try {
    date = await req.json();
  } catch {
    return raspuns({ eroare: "Date invalide." }, 400);
  }

  const nume = String(date.nume ?? "").trim();
  const prenume = String(date.prenume ?? "").trim() || null;
  const email = String(date.email ?? "").trim().toLowerCase();
  const telefon = String(date.telefon ?? "").trim();
  const parola = String(date.parola ?? "");
  const cod = String(date.cod ?? "").trim();

  if (!egal(cod, codCorect)) {
    return raspuns({ eroare: "Codul de invitație nu e corect." }, 403);
  }
  if (nume.length < 3) return raspuns({ eroare: "Scrie numele și prenumele." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return raspuns({ eroare: "Adresa de e-mail nu e validă." }, 400);
  if (telefon.replace(/\D/g, "").length < 9) return raspuns({ eroare: "Numărul de telefon nu e valid." }, 400);
  if (parola.length < 8) return raspuns({ eroare: "Parola trebuie să aibă minimum 8 caractere." }, 400);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data: creat, error: eroareCreare } = await admin.auth.admin.createUser({
    email,
    password: parola,
    email_confirm: true,
    user_metadata: { nume, telefon },
  });

  if (eroareCreare || !creat.user) {
    const mesaj = eroareCreare?.message ?? "";
    if (/already|registered|exists/i.test(mesaj)) {
      return raspuns({ eroare: "Există deja un cont cu acest e-mail. Intră din pagina de login." }, 409);
    }
    if (/password/i.test(mesaj)) {
      return raspuns({ eroare: "Parola e prea slabă. Alege una mai lungă." }, 400);
    }
    return raspuns({ eroare: "Contul nu a putut fi creat. Încearcă din nou." }, 500);
  }

  const { error: eroareProfil } = await admin.from("profiles").insert({
    id: creat.user.id,
    nume,
    prenume,
    email,
    telefon,
    rol: "vanzator",
  });

  if (eroareProfil) {
    await admin.auth.admin.deleteUser(creat.user.id);
    return raspuns({ eroare: "Contul nu a putut fi creat. Încearcă din nou." }, 500);
  }

  return raspuns({ ok: true });
});
