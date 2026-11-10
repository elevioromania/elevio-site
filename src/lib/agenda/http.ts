import { NextResponse } from "next/server";

// Ce au în comun cele două rute folosite de agentul vocal.

// Cheia clinicii vine în antetul x-agenda-cheie (sau Authorization: Bearer ...).
export function cheieDin(request: Request): string | null {
  const directa = request.headers.get("x-agenda-cheie");
  if (directa) return directa.trim();
  const auth = request.headers.get("authorization");
  const m = auth ? /^Bearer\s+(.+)$/i.exec(auth) : null;
  return m ? m[1].trim() : null;
}

// Agentul poate trimite JSON sau formular; orice valoare devine text.
export async function citesteCorp(request: Request): Promise<Record<string, string>> {
  const tip = request.headers.get("content-type") ?? "";
  let brut: Record<string, unknown> = {};
  try {
    if (tip.includes("application/x-www-form-urlencoded") || tip.includes("multipart/form-data")) {
      brut = Object.fromEntries((await request.formData()).entries());
    } else {
      const text = await request.text();
      brut = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    }
  } catch {
    brut = {};
  }
  const rezultat: Record<string, string> = {};
  for (const [k, v] of Object.entries(brut ?? {})) {
    if (v === null || v === undefined) continue;
    rezultat[k] = typeof v === "string" ? v.trim() : typeof v === "object" ? JSON.stringify(v) : String(v);
  }
  return rezultat;
}

// Agentul pune uneori textul variabilei necompletate („{{call_id}}”) sau „null”.
export function valoare(text: string | undefined): string {
  if (!text) return "";
  const t = text.trim();
  if (/^\{\{.*\}\}$/.test(t) || /^(null|undefined|none|-)$/i.test(t)) return "";
  return t;
}

export function raspuns(corp: Record<string, unknown>, status = 200) {
  return NextResponse.json(corp, { status, headers: { "cache-control": "no-store" } });
}

export const NEAUTORIZAT = () => raspuns({ ok: false, mesaj: "Cheie lipsă sau greșită." }, 401);
