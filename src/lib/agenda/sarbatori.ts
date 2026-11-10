import ICAL from "ical.js";
import type { Interval } from "./calendar";
import { dinOraLocala } from "./timp";

// Zilele de sărbătoare legală din România, din calendarul public Google,
// ca agentul să nu propună ore pe 1 Decembrie sau de Crăciun.
// Calendarul conține și zile doar de însemnat (Dragobete, Ziua Mamei): păstrăm doar
// evenimentele cu descrierea „Sărbătoare legală”.

const URL_SARBATORI =
  "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics";
const PASTRARE_MS = 12 * 3600_000;

let salvat: { la: number; zile: { an: number; luna: number; zi: number }[] } | null = null;

export function zileLegale(textIcs: string): { an: number; luna: number; zi: number }[] {
  const radacina = new ICAL.Component(ICAL.parse(textIcs));
  const zile: { an: number; luna: number; zi: number }[] = [];
  for (const comp of radacina.getAllSubcomponents("vevent")) {
    const descriere = String(comp.getFirstPropertyValue("description") ?? "");
    if (!descriere.toLowerCase().startsWith("sărbătoare legală")) continue;
    const inceput = comp.getFirstPropertyValue("dtstart") as ICAL.Time | null;
    if (inceput) zile.push({ an: inceput.year, luna: inceput.month, zi: inceput.day });
  }
  return zile;
}

// Intervalele (zi întreagă, în fusul clinicii) în care clinica e închisă.
// Dacă nu se poate citi calendarul, nu blocăm nimic: recepția confirmă oricum.
export async function intervaleSarbatori(fus: string): Promise<Interval[]> {
  if (!salvat || Date.now() - salvat.la > PASTRARE_MS) {
    try {
      const raspuns = await fetch(URL_SARBATORI, { cache: "no-store", signal: AbortSignal.timeout(5000) });
      if (!raspuns.ok) throw new Error(String(raspuns.status));
      salvat = { la: Date.now(), zile: zileLegale(await raspuns.text()) };
    } catch {
      if (!salvat) return [];
    }
  }
  return salvat.zile.map(({ an, luna, zi }) => {
    const inceput = dinOraLocala(an, luna, zi, 0, 0, fus).getTime();
    return { inceput, sfarsit: inceput + 24 * 3600_000 };
  });
}
