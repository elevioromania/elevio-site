// Calcule de dată și oră într-un fus orar anume (Europe/Bucharest), fără biblioteci:
// serverul rulează în UTC, clinicile au program în ora României.

export type PartiData = {
  an: number;
  luna: number; // 1-12
  zi: number;
  ora: number;
  minut: number;
  ziSaptamana: number; // 1 = luni ... 7 = duminică
};

const formatoare = new Map<string, Intl.DateTimeFormat>();

function formator(fus: string): Intl.DateTimeFormat {
  let f = formatoare.get(fus);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: fus,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "short",
    });
    formatoare.set(fus, f);
  }
  return f;
}

const ZILE_EN: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

export function partiIn(data: Date, fus: string): PartiData & { secunda: number } {
  const p: Record<string, string> = {};
  for (const { type, value } of formator(fus).formatToParts(data)) p[type] = value;
  return {
    an: Number(p.year),
    luna: Number(p.month),
    zi: Number(p.day),
    ora: Number(p.hour),
    minut: Number(p.minute),
    secunda: Number(p.second),
    ziSaptamana: ZILE_EN[p.weekday] ?? 0,
  };
}

// Diferența (ms) dintre ora locală din `fus` și UTC, la momentul `data`.
function decalaj(data: Date, fus: string): number {
  const p = partiIn(data, fus);
  const caUtc = Date.UTC(p.an, p.luna - 1, p.zi, p.ora, p.minut, p.secunda);
  return caUtc - Math.floor(data.getTime() / 1000) * 1000;
}

// Ora de pe ceas din `fus` -> momentul real (UTC). Merge corect și la schimbarea orei.
export function dinOraLocala(
  an: number,
  luna: number,
  zi: number,
  ora: number,
  minut: number,
  fus: string,
): Date {
  const ghicit = Date.UTC(an, luna - 1, zi, ora, minut);
  let rezultat = ghicit - decalaj(new Date(ghicit), fus);
  // a doua trecere corectează cazul în care ghicitul a căzut de partea cealaltă a schimbării orei
  rezultat = ghicit - decalaj(new Date(rezultat), fus);
  return new Date(rezultat);
}

// "2026-11-12" -> {an, luna, zi}; null dacă nu e o dată validă.
export function citesteData(text: string): { an: number; luna: number; zi: number } | null {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text.trim());
  if (!m) return null;
  const an = Number(m[1]);
  const luna = Number(m[2]);
  const zi = Number(m[3]);
  const d = new Date(Date.UTC(an, luna - 1, zi));
  if (d.getUTCFullYear() !== an || d.getUTCMonth() !== luna - 1 || d.getUTCDate() !== zi) return null;
  return { an, luna, zi };
}

// "14:30", "14.30", "14" -> minute de la miezul nopții; null dacă nu e o oră validă.
export function citesteOra(text: string): number | null {
  const m = /^(\d{1,2})(?:[:.h](\d{2}))?$/.exec(text.trim());
  if (!m) return null;
  const ora = Number(m[1]);
  const minut = Number(m[2] ?? 0);
  if (ora > 23 || minut > 59) return null;
  return ora * 60 + minut;
}

export function cheieZi(an: number, luna: number, zi: number): string {
  return `${an}-${String(luna).padStart(2, "0")}-${String(zi).padStart(2, "0")}`;
}

export function oraText(minute: number): string {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}

// Săptămâna ISO a unei zile calendaristice (pentru programul pe săptămâni pare / impare).
export function saptamanaIso(an: number, luna: number, zi: number): number {
  const d = new Date(Date.UTC(an, luna - 1, zi));
  const ziSapt = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - ziSapt);
  const inceputAn = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - inceputAn) / 86400000 + 1) / 7);
}

// Ziua calendaristică următoare (fără legătură cu fusul orar).
export function ziuaUrmatoare(an: number, luna: number, zi: number): { an: number; luna: number; zi: number } {
  const d = new Date(Date.UTC(an, luna - 1, zi + 1));
  return { an: d.getUTCFullYear(), luna: d.getUTCMonth() + 1, zi: d.getUTCDate() };
}

const ZILE_RO = ["", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă", "duminică"];
const LUNI_RO = [
  "",
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

// "joi, 12 noiembrie, ora 14:30", cum o spune agentul la telefon.
export function textOra(data: Date, fus: string): string {
  const p = partiIn(data, fus);
  return `${ZILE_RO[p.ziSaptamana]}, ${p.zi} ${LUNI_RO[p.luna]}, ora ${oraText(p.ora * 60 + p.minut)}`;
}

// Zilele săptămânii, nearticulate și articulate („luni” / „lunea”), fără diacritice.
const ZILE_DUPA_NUME: [RegExp, number][] = [
  [/^lun(i|ea)\b/, 1],
  [/^mar(ti|tea)\b/, 2],
  [/^miercur(i|ea)\b/, 3],
  [/^joi(a)?\b/, 4],
  [/^viner(i|ea)\b/, 5],
  [/^sambata\b/, 6],
  [/^duminica\b/, 7],
];

const faraDiacritice = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "");

const LUNI_DUPA_NUME: Record<string, number> = Object.fromEntries(
  LUNI_RO.slice(1).map((l, i) => [faraDiacritice(l), i + 1]),
);

function adunaZile(an: number, luna: number, zi: number, n: number) {
  const d = new Date(Date.UTC(an, luna - 1, zi + n));
  return { an: d.getUTCFullYear(), luna: d.getUTCMonth() + 1, zi: d.getUTCDate() };
}

// Ziua spusă de pacient, cum o transmite agentul: „2026-11-12”, „azi”, „mâine”, „poimâine”,
// „joi”, „joia viitoare”, „săptămâna viitoare”, „12 noiembrie”, „12.11”.
// Zilele săptămânii înseamnă următoarea zi cu numele acela (azi, dacă azi e joi);
// „joia viitoare” e joia din săptămâna următoare.
export function interpreteazaZi(text: string, acum: number, fus: string): { an: number; luna: number; zi: number } | null {
  const exacta = citesteData(text);
  if (exacta) return exacta;

  const t = faraDiacritice(text.toLowerCase())
    .replace(/[^a-z0-9. ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!t) return null;

  const azi = partiIn(new Date(acum), fus);
  const deLaAzi = (n: number) => adunaZile(azi.an, azi.luna, azi.zi, n);

  if (/^(azi|astazi)\b/.test(t)) return deLaAzi(0);
  if (/^poimaine\b/.test(t)) return deLaAzi(2);
  if (/^maine\b/.test(t)) return deLaAzi(1);

  const viitoare = /\b(viitoare|viitor|urmatoare|urmator)\b/.test(t);
  for (const [nume, ziSapt] of ZILE_DUPA_NUME) {
    if (nume.test(t)) {
      if (viitoare) return deLaAzi(8 - azi.ziSaptamana + ziSapt - 1);
      return deLaAzi((ziSapt - azi.ziSaptamana + 7) % 7);
    }
  }
  if (/^saptamana (viitoare|urmatoare)/.test(t)) return deLaAzi(8 - azi.ziSaptamana);

  // „12 noiembrie”, „12 nov”, „12.11”, „12.11.2026”
  const cuLuna = /^(\d{1,2}) ([a-z]+)(?: (\d{4}))?/.exec(t);
  const cuPuncte = /^(\d{1,2})\.(\d{1,2})(?:\.(\d{4}))?$/.exec(t);
  let zi: number | null = null;
  let luna: number | null = null;
  let an: number | null = null;
  if (cuLuna) {
    const gasita = Object.entries(LUNI_DUPA_NUME).find(([nume]) => nume.startsWith(cuLuna[2].slice(0, 3)));
    if (gasita) {
      zi = Number(cuLuna[1]);
      luna = gasita[1];
      an = cuLuna[3] ? Number(cuLuna[3]) : null;
    }
  } else if (cuPuncte) {
    zi = Number(cuPuncte[1]);
    luna = Number(cuPuncte[2]);
    an = cuPuncte[3] ? Number(cuPuncte[3]) : null;
  }
  if (zi === null || luna === null) return null;
  // fără an: cea mai apropiată dată care nu a trecut
  const anFolosit = an ?? (luna < azi.luna || (luna === azi.luna && zi < azi.zi) ? azi.an + 1 : azi.an);
  return citesteData(cheieZi(anFolosit, luna, zi));
}
