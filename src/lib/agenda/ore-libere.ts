import type { Interval } from "./calendar";
import { cheieZi, citesteOra, dinOraLocala, partiIn, saptamanaIso, ziuaUrmatoare } from "./timp";

export type ProgramZile = Record<string, [string, string][]>;
// Fie același program în fiecare săptămână, fie separat pe săptămâni pare / impare (ca în iStoma).
export type Program = ProgramZile | { para?: ProgramZile; impara?: ProgramZile };

export type Medic = {
  id: string;
  nume: string;
  specialitate: string | null;
  program: Program;
};

export type Setari = {
  fus_orar: string;
  durata_minute: number;
  pas_minute: number;
  preaviz_minute: number;
  zile_inainte: number;
};

export type Ora = { medicId: string; inceput: number; sfarsit: number };

export type PartiZi = "dimineata" | "dupa-amiaza" | "oricand";

function programZi(program: Program, an: number, luna: number, zi: number, ziSaptamana: number): [number, number][] {
  let zile: ProgramZile | undefined;
  if ("para" in program || "impara" in program) {
    const p = program as { para?: ProgramZile; impara?: ProgramZile };
    zile = saptamanaIso(an, luna, zi) % 2 === 0 ? p.para : p.impara;
  } else {
    zile = program as ProgramZile;
  }
  const intervale = zile?.[String(ziSaptamana)] ?? [];
  const rezultat: [number, number][] = [];
  for (const [de, pana] of intervale) {
    const a = citesteOra(de);
    const b = citesteOra(pana);
    if (a !== null && b !== null && b > a) rezultat.push([a, b]);
  }
  return rezultat;
}

function seSuprapune(inceput: number, sfarsit: number, ocupate: Interval[]): boolean {
  for (const o of ocupate) if (o.inceput < sfarsit && o.sfarsit > inceput) return true;
  return false;
}

// Toate orele la care un medic poate primi o programare nouă, de la `acum` + preaviz
// până la `zile_inainte` zile, în ordine cronologică.
export function oreLibere(setari: Setari, medici: Medic[], ocupate: Map<string, Interval[]>, acum: number): Ora[] {
  const fus = setari.fus_orar;
  const durata = setari.durata_minute * 60_000;
  const celMaiDevreme = acum + setari.preaviz_minute * 60_000;
  const azi = partiIn(new Date(acum), fus);

  const rezultat: Ora[] = [];
  let zi = { an: azi.an, luna: azi.luna, zi: azi.zi };
  for (let n = 0; n <= setari.zile_inainte; n++, zi = ziuaUrmatoare(zi.an, zi.luna, zi.zi)) {
    const ziSaptamana = partiIn(dinOraLocala(zi.an, zi.luna, zi.zi, 12, 0, fus), fus).ziSaptamana;
    for (const medic of medici) {
      const ocupateMedic = ocupate.get(medic.id) ?? [];
      for (const [de, pana] of programZi(medic.program, zi.an, zi.luna, zi.zi, ziSaptamana)) {
        for (let m = de; m + setari.durata_minute <= pana; m += setari.pas_minute) {
          const inceput = dinOraLocala(zi.an, zi.luna, zi.zi, Math.floor(m / 60), m % 60, fus).getTime();
          const sfarsit = inceput + durata;
          if (inceput < celMaiDevreme) continue;
          if (seSuprapune(inceput, sfarsit, ocupateMedic)) continue;
          rezultat.push({ medicId: medic.id, inceput, sfarsit });
        }
      }
    }
  }
  return rezultat.sort((a, b) => a.inceput - b.inceput);
}

export function ePartea(ora: Ora, parte: PartiZi, fus: string): boolean {
  if (parte === "oricand") return true;
  const p = partiIn(new Date(ora.inceput), fus);
  return parte === "dimineata" ? p.ora < 12 : p.ora >= 12;
}

// Alege cel mult `cate` ore de spus pacientului: întâi ziua cerută, apoi zilele cele mai
// apropiate de ea (la egalitate, cea de după). Le răsfiră, ca pacientul să aibă de unde
// alege (nu 10:00, 10:30, 11:00).
export function alegeVariante(
  ore: Ora[],
  fus: string,
  optiuni: { ziPreferata?: string | null; parte?: PartiZi; cate?: number },
): Ora[] {
  const parte = optiuni.parte ?? "oricand";
  const cate = optiuni.cate ?? 3;
  const ziOra = (o: Ora) => {
    const p = partiIn(new Date(o.inceput), fus);
    return cheieZi(p.an, p.luna, p.zi);
  };

  let candidate = ore.filter((o) => ePartea(o, parte, fus));
  const preferata = optiuni.ziPreferata ?? null;
  if (preferata) {
    const zileDistanta = (zi: string) => {
      const d = (Date.parse(zi) - Date.parse(preferata)) / 86_400_000;
      return d >= 0 ? d * 2 : -d * 2 + 1;
    };
    candidate = [...candidate].sort((a, b) => zileDistanta(ziOra(a)) - zileDistanta(ziOra(b)) || a.inceput - b.inceput);
  }

  const alese: Ora[] = [];
  const pePeZi = new Map<string, number>();
  for (const o of candidate) {
    if (alese.length >= cate) break;
    const zi = ziOra(o);
    const maxPeZi = zi === preferata ? cate : 2;
    if ((pePeZi.get(zi) ?? 0) >= maxPeZi) continue;
    const preaAproape = alese.some((a) => ziOra(a) === zi && Math.abs(a.inceput - o.inceput) < 90 * 60_000);
    if (preaAproape) continue;
    alese.push(o);
    pePeZi.set(zi, (pePeZi.get(zi) ?? 0) + 1);
  }

  // dacă răsfirarea a lăsat prea puține variante, completăm cu ce a rămas
  if (alese.length < cate) {
    for (const o of candidate) {
      if (alese.length >= cate) break;
      if (!alese.includes(o)) alese.push(o);
    }
    alese.sort((a, b) => candidate.indexOf(a) - candidate.indexOf(b));
  }
  return alese;
}

export function normalizeaza(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const CUVINTE_IGNORATE = new Set(["dr", "doctor", "doctorul", "doctora", "doamna", "domnul", "dna", "dl", "d"]);

// Medicii care se potrivesc cu ce a spus pacientul: după nume („doamna doctor Ionescu”, „Andreea”)
// sau, dacă nu se potrivește niciun nume, după specialitate („ortodont”).
export function gasesteMedici<M extends Medic>(medici: M[], text: string): M[] {
  const cuvinte = normalizeaza(text)
    .split(" ")
    .filter((c) => c && !CUVINTE_IGNORATE.has(c));
  if (cuvinte.length === 0) return [];
  const sePotriveste = (camp: string) => {
    const parti = normalizeaza(camp).split(" ");
    return cuvinte.every((c) => parti.some((p) => p.startsWith(c) || (c.length >= 6 && p.startsWith(c.slice(0, 5)))));
  };
  const dupaNume = medici.filter((m) => sePotriveste(m.nume));
  if (dupaNume.length > 0) return dupaNume;
  return medici.filter((m) => m.specialitate && sePotriveste(m.specialitate));
}
