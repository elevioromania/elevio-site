import { citesteCalendar, intervaleOcupate, type Interval } from "./calendar";
import { poateTrimiteAlerta, tineOrePropuse, type DateAgenda, type MedicCuCalendar } from "./baza";
import { trimiteAlerta } from "./email";
import { intervaleSarbatori } from "./sarbatori";
import { alegeVariante, oreLibere, type Ora, type PartiZi } from "./ore-libere";
import { cheieZi, oraText, partiIn, textOra } from "./timp";

export type Varianta = { varianta: number; medic: string; data: string; ora: string; text: string };

export type Ocupare = {
  ocupate: Map<string, Interval[]>;
  // medicii al căror calendar nu s-a putut citi (agentul nu le oferă ore)
  faraCalendar: { medic: MedicCuCalendar; eroare: string }[];
  // zilele de sărbătoare legală, dacă clinica e închisă atunci (deja incluse în `ocupate`)
  sarbatori: Interval[];
};

// Citește calendarele medicilor și adaugă orele ținute de agent în alte apeluri.
// Propunerile din apelul curent nu blochează (pacientul își poate alege una dintre ele).
export async function ocupare(date: DateAgenda, acum: number, callId: string): Promise<Ocupare> {
  const pana = acum + (date.clinica.zile_inainte + 2) * 86_400_000;
  const de = acum - 86_400_000;

  const ocupate = new Map<string, Interval[]>();
  const faraCalendar: Ocupare["faraCalendar"] = [];
  const sarbatori = date.clinica.inchis_de_sarbatori ? intervaleSarbatori(date.clinica.fus_orar) : Promise.resolve([]);

  await Promise.all(
    date.medici.map(async (medic) => {
      try {
        const text = await citesteCalendar(medic.calendar_ics);
        ocupate.set(medic.id, [...intervaleOcupate(text, de, pana, date.clinica.fus_orar), ...(await sarbatori)]);
      } catch (e) {
        faraCalendar.push({ medic, eroare: e instanceof Error ? e.message : String(e) });
      }
    }),
  );

  for (const r of date.rezervari) {
    if (r.tip === "propunere" && callId && r.call_id === callId) continue;
    const lista = ocupate.get(r.medic_id);
    if (!lista) continue;
    lista.push({ inceput: Date.parse(r.inceput), sfarsit: Date.parse(r.sfarsit) });
  }

  return { ocupate, faraCalendar, sarbatori: await sarbatori };
}

// Anunță Elevio (cel mult o dată pe oră pe clinică) că unele calendare nu se pot citi.
export async function semnaleazaCalendare(cheie: string, date: DateAgenda, ocup: Ocupare): Promise<void> {
  if (ocup.faraCalendar.length === 0) return;
  if (!(await poateTrimiteAlerta(cheie))) return;
  await trimiteAlerta(
    date.clinica.nume,
    ocup.faraCalendar.map((f) => `- ${f.medic.nume}: ${f.eroare}`),
  );
}

// Alege orele de spus pacientului și le ține câteva minute pe numele apelului.
export async function propuneOre(
  cheie: string,
  date: DateAgenda,
  medici: MedicCuCalendar[],
  ocup: Ocupare,
  acum: number,
  callId: string,
  optiuni: { ziPreferata: string | null; parte: PartiZi },
): Promise<{ variante: Varianta[]; nota: string }> {
  const fus = date.clinica.fus_orar;
  const cuCalendar = medici.filter((m) => ocup.ocupate.has(m.id));
  const toate = oreLibere(date.clinica, cuCalendar, ocup.ocupate, acum);

  let alese: Ora[] = alegeVariante(toate, fus, optiuni);
  const note: string[] = [];
  if (alese.length === 0 && optiuni.parte !== "oricand") {
    alese = alegeVariante(toate, fus, { ziPreferata: optiuni.ziPreferata });
    if (alese.length > 0) note.push("Nu mai sunt ore libere în partea de zi cerută; acestea sunt cele mai apropiate.");
  }
  if (optiuni.ziPreferata && alese.length > 0) {
    const p = partiIn(new Date(alese[0].inceput), fus);
    if (cheieZi(p.an, p.luna, p.zi) !== optiuni.ziPreferata) {
      note.push("În ziua cerută nu mai sunt ore libere; acestea sunt cele mai apropiate.");
    }
  }

  if (callId && alese.length > 0) {
    try {
      await tineOrePropuse(
        cheie,
        callId,
        alese.map((o) => ({
          medic_id: o.medicId,
          inceput: new Date(o.inceput).toISOString(),
          sfarsit: new Date(o.sfarsit).toISOString(),
        })),
      );
    } catch {
      // dacă nu le putem ține, agentul le propune oricum; recepția confirmă
    }
  }

  const numeMedic = new Map(medici.map((m) => [m.id, m.nume]));
  const variante = alese.map((o, i) => {
    const p = partiIn(new Date(o.inceput), fus);
    const medic = numeMedic.get(o.medicId) ?? "";
    return {
      varianta: i + 1,
      medic,
      data: cheieZi(p.an, p.luna, p.zi),
      ora: oraText(p.ora * 60 + p.minut),
      text: `${textOra(new Date(o.inceput), fus)}, la ${medic}`,
    };
  });
  return { variante, nota: note.join(" ") };
}
