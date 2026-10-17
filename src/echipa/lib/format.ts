// Formatări pentru afișare, în română, pe ora României.

const TZ = "Europe/Bucharest";

export function dataOra(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("ro-RO", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function dataScurta(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ro-RO", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" });
}

export function ziuaOra(iso: string) {
  const d = new Date(iso);
  const zi = d.toLocaleDateString("ro-RO", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" });
  const ora = d.toLocaleTimeString("ro-RO", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  return `${zi}, ora ${ora}`;
}

// Cheia zilei (AAAA-LL-ZZ) în ora României.
export function cheieZi(d: Date | string) {
  return new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });
}

// Valoare pentru <input type="datetime-local"> din ISO și invers (ora locală a browserului).
export function laInputLocal(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function dinInputLocal(v: string) {
  return v ? new Date(v).toISOString() : null;
}

export function relativ(iso: string) {
  const sec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return "acum";
  const min = Math.round(sec / 60);
  if (min < 60) return `acum ${min} min`;
  const ore = Math.round(min / 60);
  if (ore < 24) return ore === 1 ? "acum o oră" : `acum ${ore} ore`;
  const zile = Math.round(ore / 24);
  if (zile < 7) return zile === 1 ? "ieri" : `acum ${zile} zile`;
  return dataScurta(iso);
}

export function nrFisiere(n: number) {
  return n === 1 ? "1 fișier" : `${n} fișiere`;
}

export function linkTel(t: string | null | undefined) {
  if (!t) return "";
  return `tel:${t.replace(/[^\d+]/g, "")}`;
}

export function linkExtern(u: string | null | undefined) {
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export function lei(n: number) {
  return n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
}

export function euro(n: number | null | undefined) {
  return `${(n ?? 0).toLocaleString("ro-RO", { maximumFractionDigits: 2 })}€`;
}

// Pentru căutări fără diacritice și fără majuscule.
export function normal(s: string | null | undefined) {
  return (s ?? "")
    .replace(/[șş]/gi, "s")
    .replace(/[țţ]/gi, "t")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
