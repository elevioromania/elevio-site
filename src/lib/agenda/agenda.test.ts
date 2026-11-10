// Teste pentru calculul orelor libere. Rulare: npx tsx --test src/lib/agenda/agenda.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { intervaleOcupate } from "./calendar";
import { alegeVariante, gasesteMedici, oreLibere, type Medic, type Setari } from "./ore-libere";
import { zileLegale } from "./sarbatori";
import { dinOraLocala, interpreteazaZi, saptamanaIso, textOra } from "./timp";

const FUS = "Europe/Bucharest";
const iso = (ms: number) => new Date(ms).toISOString();
const ora = (an: number, luna: number, zi: number, h: number, m = 0) => dinOraLocala(an, luna, zi, h, m, FUS).getTime();

test("ora României devine UTC corect, iarna și vara", () => {
  assert.equal(iso(ora(2026, 11, 12, 9)), "2026-11-12T07:00:00.000Z");
  assert.equal(iso(ora(2026, 7, 1, 9)), "2026-07-01T06:00:00.000Z");
  // ziua schimbării orei (25 octombrie 2026): 09:00 e deja ora de iarnă
  assert.equal(iso(ora(2026, 10, 25, 9)), "2026-10-25T07:00:00.000Z");
  assert.equal(iso(ora(2026, 3, 29, 9)), "2026-03-29T06:00:00.000Z");
});

test("textul spus la telefon", () => {
  assert.equal(textOra(new Date(ora(2026, 11, 12, 14, 30)), FUS), "joi, 12 noiembrie, ora 14:30");
});

const ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
X-WR-TIMEZONE:Europe/Bucharest
BEGIN:VEVENT
UID:utc@test
DTSTART:20261112T080000Z
DTEND:20261112T090000Z
SUMMARY:Programare
END:VEVENT
BEGIN:VEVENT
UID:tzid@test
DTSTART;TZID=Europe/Bucharest:20261112T140000
DTEND;TZID=Europe/Bucharest:20261112T143000
SUMMARY:Programare
END:VEVENT
BEGIN:VEVENT
UID:anulat@test
DTSTART:20261112T120000Z
DTEND:20261112T130000Z
STATUS:CANCELLED
END:VEVENT
BEGIN:VEVENT
UID:liber@test
DTSTART:20261112T130000Z
DTEND:20261112T140000Z
TRANSP:TRANSPARENT
END:VEVENT
BEGIN:VEVENT
UID:concediu@test
DTSTART;VALUE=DATE:20261113
DTEND;VALUE=DATE:20261114
SUMMARY:Concediu
END:VEVENT
BEGIN:VEVENT
UID:saptamanal@test
DTSTART;TZID=Europe/Bucharest:20261116T090000
DTEND;TZID=Europe/Bucharest:20261116T100000
RRULE:FREQ=WEEKLY;COUNT=4
EXDATE;TZID=Europe/Bucharest:20261123T090000
END:VEVENT
BEGIN:VEVENT
UID:saptamanal@test
RECURRENCE-ID;TZID=Europe/Bucharest:20261130T090000
DTSTART;TZID=Europe/Bucharest:20261130T110000
DTEND;TZID=Europe/Bucharest:20261130T120000
END:VEVENT
END:VCALENDAR`;

test("calendarul iCal: evenimente simple, anulate, libere, zile întregi, repetate", () => {
  const de = ora(2026, 11, 10, 0);
  const pana = ora(2026, 12, 31, 0);
  const rezultat = intervaleOcupate(ICS, de, pana, FUS).map((i) => [iso(i.inceput), iso(i.sfarsit)]);
  assert.deepEqual(rezultat, [
    ["2026-11-12T08:00:00.000Z", "2026-11-12T09:00:00.000Z"], // 10:00-11:00 ora României
    ["2026-11-12T12:00:00.000Z", "2026-11-12T12:30:00.000Z"], // 14:00-14:30
    ["2026-11-12T22:00:00.000Z", "2026-11-13T22:00:00.000Z"], // concediu toată ziua de 13
    ["2026-11-16T07:00:00.000Z", "2026-11-16T08:00:00.000Z"], // luni 16, 09:00
    // 23 e scoasă (EXDATE), 30 e mutată la 11:00
    ["2026-11-30T09:00:00.000Z", "2026-11-30T10:00:00.000Z"],
    ["2026-12-07T07:00:00.000Z", "2026-12-07T08:00:00.000Z"],
  ]);
});

const setari: Setari = { fus_orar: FUS, durata_minute: 30, pas_minute: 30, preaviz_minute: 120, zile_inainte: 7 };

const ionescu: Medic = {
  id: "m1",
  nume: "Dr. Ionescu Andreea",
  specialitate: "Ortodonție",
  program: { "4": [["09:00", "12:00"]] }, // joi
};

test("orele libere țin cont de program, programări și preaviz", () => {
  const acum = ora(2026, 11, 12, 7, 0); // joi 07:00 -> cel mai devreme 09:00
  const ocupate = new Map([["m1", [{ inceput: ora(2026, 11, 12, 10), sfarsit: ora(2026, 11, 12, 11) }]]]);
  const libere = oreLibere(setari, [ionescu], ocupate, acum).map((o) => iso(o.inceput));
  assert.deepEqual(libere, [
    iso(ora(2026, 11, 12, 9)),
    iso(ora(2026, 11, 12, 9, 30)),
    iso(ora(2026, 11, 12, 11)),
    iso(ora(2026, 11, 12, 11, 30)),
    // joia următoare, toată dimineața
    ...[0, 30, 60, 90, 120, 150].map((m) => iso(ora(2026, 11, 19, 9, m))),
  ]);

  const maiTarziu = ora(2026, 11, 12, 8, 0); // preaviz 2h -> de la 10:00
  const libere2 = oreLibere(setari, [ionescu], ocupate, maiTarziu).filter((o) => o.inceput < ora(2026, 11, 13, 0));
  assert.deepEqual(libere2.map((o) => iso(o.inceput)), [iso(ora(2026, 11, 12, 11)), iso(ora(2026, 11, 12, 11, 30))]);
});

test("programul pe săptămâni pare și impare", () => {
  assert.equal(saptamanaIso(2026, 11, 12), 46);
  const medic: Medic = {
    id: "m2",
    nume: "Dr. Popescu Marian",
    specialitate: null,
    program: { para: { "4": [["09:00", "10:00"]] }, impara: { "4": [["14:00", "15:00"]] } },
  };
  const acum = ora(2026, 11, 11, 7, 0);
  const libere = oreLibere({ ...setari, zile_inainte: 9 }, [medic], new Map([["m2", []]]), acum).map((o) => iso(o.inceput));
  assert.deepEqual(libere, [
    iso(ora(2026, 11, 12, 9)), // săptămâna 46, pară
    iso(ora(2026, 11, 12, 9, 30)),
    iso(ora(2026, 11, 19, 14)), // săptămâna 47, impară
    iso(ora(2026, 11, 19, 14, 30)),
  ]);
});

test("variantele sunt răsfirate și încep cu ziua cerută", () => {
  const program = { "1": [["09:00", "17:00"]], "2": [["09:00", "17:00"]], "3": [["09:00", "17:00"]] } as Medic["program"];
  const medic: Medic = { ...ionescu, program };
  const acum = ora(2026, 11, 15, 20, 0); // duminică seara
  const libere = oreLibere(setari, [medic], new Map([["m1", []]]), acum);

  const oricand = alegeVariante(libere, FUS, {}).map((o) => textOra(new Date(o.inceput), FUS));
  assert.deepEqual(oricand, ["luni, 16 noiembrie, ora 09:00", "luni, 16 noiembrie, ora 10:30", "marți, 17 noiembrie, ora 09:00"]);

  const miercuriDupaAmiaza = alegeVariante(libere, FUS, { ziPreferata: "2026-11-18", parte: "dupa-amiaza" }).map((o) =>
    textOra(new Date(o.inceput), FUS),
  );
  assert.deepEqual(miercuriDupaAmiaza, [
    "miercuri, 18 noiembrie, ora 12:00",
    "miercuri, 18 noiembrie, ora 13:30",
    "miercuri, 18 noiembrie, ora 15:00",
  ]);

  // joi nu lucrează (și caută doar 7 zile): primește zilele cele mai apropiate de joi
  const joi = alegeVariante(libere, FUS, { ziPreferata: "2026-11-19", parte: "dimineata" }).map((o) =>
    textOra(new Date(o.inceput), FUS),
  );
  assert.deepEqual(joi, ["miercuri, 18 noiembrie, ora 09:00", "miercuri, 18 noiembrie, ora 10:30", "marți, 17 noiembrie, ora 09:00"]);

  // sâmbătă 21: luni 23 e cea mai aproape; marți 24 și miercuri 18 sunt la câte 3 zile, câștigă cea de după
  const cuLuni = oreLibere({ ...setari, zile_inainte: 14 }, [medic], new Map([["m1", []]]), acum);
  const sambata = alegeVariante(cuLuni, FUS, { ziPreferata: "2026-11-21" }).map((o) => textOra(new Date(o.inceput), FUS));
  assert.deepEqual(sambata, ["luni, 23 noiembrie, ora 09:00", "luni, 23 noiembrie, ora 10:30", "marți, 24 noiembrie, ora 09:00"]);
});

test("medicul se găsește după cum îl spune pacientul", () => {
  const medici: Medic[] = [
    ionescu,
    { id: "m2", nume: "Dr. Popescu Marian", specialitate: "Chirurgie orală", program: {} },
    { id: "m3", nume: "Dr. Ionescu Mihai", specialitate: null, program: {} },
  ];
  assert.deepEqual(gasesteMedici(medici, "doamna doctor Ionescu Andreea").map((m) => m.id), ["m1"]);
  assert.deepEqual(gasesteMedici(medici, "Andreea").map((m) => m.id), ["m1"]);
  assert.deepEqual(gasesteMedici(medici, "Ionescu").map((m) => m.id), ["m1", "m3"]);
  assert.deepEqual(gasesteMedici(medici, "dr. popescu").map((m) => m.id), ["m2"]);
  assert.deepEqual(gasesteMedici(medici, "ortodont").map((m) => m.id), ["m1"]);
  assert.deepEqual(gasesteMedici(medici, "chirurg").map((m) => m.id), ["m2"]);
  assert.deepEqual(gasesteMedici(medici, "Vasilescu"), []);
});

test("doar sărbătorile legale închid clinica", () => {
  const ics = String.raw`BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;VALUE=DATE:20261201
DTEND;VALUE=DATE:20261202
DESCRIPTION:Sărbătoare legală
SUMMARY:Ziua naţională
TRANSP:TRANSPARENT
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20261208
DTEND;VALUE=DATE:20261209
DESCRIPTION:Sărbătoare\nPentru a ascunde sărbătorile\, accesează Setări
SUMMARY:Ziua Constituţiei
TRANSP:TRANSPARENT
END:VEVENT
END:VCALENDAR`;
  assert.deepEqual(zileLegale(ics), [{ an: 2026, luna: 12, zi: 1 }]);
});

test("ziua spusă de pacient", () => {
  const acum = ora(2026, 11, 10, 22, 30); // marți seara
  const zi = (text: string) => {
    const z = interpreteazaZi(text, acum, FUS);
    return z && `${z.an}-${String(z.luna).padStart(2, "0")}-${String(z.zi).padStart(2, "0")}`;
  };
  assert.equal(zi("2026-11-20"), "2026-11-20");
  assert.equal(zi("azi"), "2026-11-10");
  assert.equal(zi("mâine"), "2026-11-11");
  assert.equal(zi("Poimâine dimineață"), "2026-11-12");
  assert.equal(zi("joi"), "2026-11-12");
  assert.equal(zi("marți"), "2026-11-10");
  assert.equal(zi("luni"), "2026-11-16");
  assert.equal(zi("joia viitoare"), "2026-11-19");
  assert.equal(zi("lunea viitoare"), "2026-11-16");
  assert.equal(zi("săptămâna viitoare"), "2026-11-16");
  assert.equal(zi("12 noiembrie"), "2026-11-12");
  assert.equal(zi("3 ianuarie"), "2027-01-03");
  assert.equal(zi("1 dec"), "2026-12-01");
  assert.equal(zi("25.11"), "2026-11-25");
  assert.equal(zi("oricând"), null);
  assert.equal(zi("31 februarie"), null);
});
