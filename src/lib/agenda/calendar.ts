import ICAL from "ical.js";
import { dinOraLocala } from "./timp";

// Intervalele ocupate dintr-un calendar Google (adresa secretă iCal),
// în care iStoma pune programările medicului.

export type Interval = { inceput: number; sfarsit: number }; // ms UTC

// Momentul real al unei ore din iCal. Orele cu TZID se socotesc în fusul lor,
// cele „plutitoare” și zilele întregi în fusul clinicii.
function moment(t: ICAL.Time, fusClinica: string): number {
  if (t.isDate) return dinOraLocala(t.year, t.month, t.day, 0, 0, fusClinica).getTime();
  const fus = (t as unknown as { timezone?: string }).timezone || t.zone?.tzid;
  if (fus === "UTC" || fus === "Z") {
    return Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
  }
  const fusFolosit = fus && fus !== "floating" ? fus : fusClinica;
  try {
    return dinOraLocala(t.year, t.month, t.day, t.hour, t.minute, fusFolosit).getTime() + t.second * 1000;
  } catch {
    // TZID necunoscut (ex. nume Windows): îl tratăm ca oră a clinicii
    return dinOraLocala(t.year, t.month, t.day, t.hour, t.minute, fusClinica).getTime() + t.second * 1000;
  }
}

function eLiber(ev: ICAL.Component): boolean {
  const transp = String(ev.getFirstPropertyValue("transp") ?? "").toUpperCase();
  const status = String(ev.getFirstPropertyValue("status") ?? "").toUpperCase();
  return transp === "TRANSPARENT" || status === "CANCELLED";
}

export function intervaleOcupate(textIcs: string, de: number, pana: number, fusClinica: string): Interval[] {
  const radacina = new ICAL.Component(ICAL.parse(textIcs));
  const evenimente = radacina.getAllSubcomponents("vevent");

  // Excepțiile (RECURRENCE-ID) se leagă de evenimentul repetat de bază.
  const baze = new Map<string, ICAL.Event>();
  const exceptii: ICAL.Event[] = [];
  for (const comp of evenimente) {
    const ev = new ICAL.Event(comp);
    if (ev.isRecurrenceException()) exceptii.push(ev);
    else baze.set(ev.uid, ev);
  }
  for (const ex of exceptii) {
    const baza = baze.get(ex.uid);
    if (baza) baza.relateException(ex);
    else baze.set(`${ex.uid}#${ex.recurrenceId}`, ex);
  }

  const rezultat: Interval[] = [];
  const adauga = (inceput: number, sfarsit: number) => {
    if (sfarsit > inceput && sfarsit > de && inceput < pana) rezultat.push({ inceput, sfarsit });
  };

  for (const ev of baze.values()) {
    if (!ev.startDate) continue;

    if (!ev.isRecurring()) {
      if (eLiber(ev.component)) continue;
      const inceput = moment(ev.startDate, fusClinica);
      const sfarsit = ev.endDate ? moment(ev.endDate, fusClinica) : inceput + (ev.startDate.isDate ? 86400000 : 0);
      adauga(inceput, sfarsit);
      continue;
    }

    const it = ev.iterator();
    for (let i = 0, t = it.next(); t && i < 5000; i++, t = it.next()) {
      const detalii = ev.getOccurrenceDetails(t);
      const inceput = moment(detalii.startDate, fusClinica);
      if (inceput >= pana) break;
      if (eLiber(detalii.item.component)) continue;
      adauga(inceput, moment(detalii.endDate, fusClinica));
    }
  }

  return rezultat.sort((a, b) => a.inceput - b.inceput);
}

// Calendarele citite recent, ca să nu le cerem de la Google la fiecare întrebare din același apel.
const PASTRARE_MS = 60_000;
const cache = new Map<string, { la: number; text: string }>();

export async function citesteCalendar(url: string): Promise<string> {
  const salvat = cache.get(url);
  if (salvat && Date.now() - salvat.la < PASTRARE_MS) return salvat.text;

  const raspuns = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { "user-agent": "Elevio-Agenda/1.0" },
  });
  if (!raspuns.ok) throw new Error(`calendarul a răspuns ${raspuns.status}`);
  const text = await raspuns.text();
  if (!text.includes("BEGIN:VCALENDAR")) throw new Error("răspunsul nu e un calendar iCal");

  cache.set(url, { la: Date.now(), text });
  return text;
}

export function golesteCache(url?: string) {
  if (url) cache.delete(url);
  else cache.clear();
}
