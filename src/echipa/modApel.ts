// Scriptul din „Mod apel”, pas cu pas. Replicile sunt cele din ghid (secțiunile 10-14);
// doar exemplele se schimbă după nișă. Pentru stomatologie textul e identic cu ghidul.

import { NISE, type Nisa } from "./config";

export type Linie =
  | { tip: "tu"; text: string }
  | { tip: "regie"; text: string }
  | { tip: "nota"; text: string }
  | { tip: "titlu"; text: string };

export type Pas = {
  id: string;
  titlu: string;
  linii: Linie[];
  // Blocuri secundare, afișate pliate (variante, alternative).
  extra?: { titlu: string; linii: Linie[] }[];
};

const tu = (text: string): Linie => ({ tip: "tu", text });
const regie = (text: string): Linie => ({ tip: "regie", text });
const nota = (text: string): Linie => ({ tip: "nota", text });

const NUMERE = ["zero", "un", "două", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă", "zece"];
function numar(n: number) {
  return Number.isInteger(n) && n >= 0 && n <= 10 ? NUMERE[n] : String(n);
}

export type ParametriScript = {
  nisa: Nisa;
  numeVanzator: string;
  demo: string;
  apeluriPeZi: number;
  rata: number; // procente
  rezultat: string | null; // „6.200”, din calculator
};

export function pasiScript(p: ParametriScript): Pas[] {
  const n = NISE[p.nisa];
  const hotel = Boolean(n.variantaHotel);
  const nume = p.numeVanzator || "[Numele tău]";
  const dinZece = (p.rata / 10) % 1 === 0 ? `din zece apeluri, ${numar(p.rata / 10)} devin programări` : `${p.rata}% dintre apeluri devin programări`;
  const apeluri = p.apeluriPeZi === 1 ? "un apel" : `${numar(p.apeluriPeZi)} apeluri`;

  const receptia: Pas = {
    id: "receptia",
    titlu: "Recepția",
    linii: [
      nota("Scopul nu e să prezinți Elevio, ci să obții numărul sau numele proprietarului ori al managerului. Fii scurt și sigur pe tine. Dacă răspunde chiar proprietarul, treci direct la Deschidere."),
      { tip: "titlu", text: "Varianta politicoasă" },
      tu(`„Bună ziua, sper că nu vă deranjez. Aș vrea să discut foarte pe scurt cu managerul sau proprietarul ${n.alAfacerii}. Mă puteți ajuta, vă rog frumos, cu un număr de telefon sau altă variantă de contact?”`),
      { tip: "titlu", text: "Varianta directă" },
      tu(`„Bună ziua, am nevoie urgent de numărul managerului ${n.alAfacerii}. E ceva important, mi-l puteți da, vă rog? Nu vreau să vă răpesc timpul.”`),
      regie("[Tonul sigur funcționează des. Fii ferm, dar niciodată nepoliticos.]"),
    ],
    extra: [
      {
        titlu: "Dacă întreabă: „Despre ce e vorba?”",
        linii: [
          tu(`„E legat de apelurile și programările ${n.alAfacerii}.”`),
          regie("[Dacă insistă:]"),
          tu(
            "„Este un serviciu de recepție parțială, care preia apelurile atunci când nu poate răspunde nimeni sau după program. Nu înlocuiește pe nimeni de la recepție, din contră, vă ajută și pe dumneavoastră. Doar că decizia o ia managerul, de aceea aș vrea să vorbesc cu el.”",
          ),
          nota("Fii clar că nu înlocuiești pe nimeni. Dacă recepționera simte că e amenințat locul ei de muncă, nu-ți va da numărul."),
        ],
      },
      {
        titlu: "Dacă nu vrea să-ți dea numărul",
        linii: [
          tu("„Înțeleg perfect. Cum îl cheamă pe manager, ca să-l pot căuta direct?”"),
          tu(`„Când îl pot prinde ${n.laAfacere}?”`),
          tu("„Îmi puteți da o adresă de e-mail la care să-i scriu?”"),
        ],
      },
    ],
  };

  const deschiderea: Pas = hotel
    ? {
        id: "deschiderea",
        titlu: "Deschiderea",
        linii: [
          nota("Hotelurile au de obicei recepție non-stop, deci nu întrebi de program, ci direct de apelurile pierdute."),
          tu("„Bună ziua, voiam să vă întreb: aveți un program la recepție sau sunteți non-stop?”"),
          regie("[De obicei: non-stop.]"),
        ],
      }
    : {
        id: "deschiderea",
        titlu: "Deschiderea",
        linii: [
          tu(`„Bună ziua, sunt ${nume}, din echipa de marketing Elevio. Vă rețin foarte puțin, promit. De la ce oră până la ce oră aveți programul?”`),
          regie("[Așteaptă răspunsul.]"),
          nota("Întrebi programul chiar dacă îl știi de pe Google: îl faci să vorbească. O întrebare simplă e mai bună decât o prezentare."),
        ],
        extra: [
          {
            titlu: "Deschideri alternative, pentru decidenții grăbiți",
            linii: [
              nota("Dacă răspunde „da”, treci la Soluție și apoi la demo."),
              { tip: "titlu", text: "Varianta A" },
              tu(
                "„Bună ziua, vă rețin un singur minut. Dacă ați putea avea pe cineva care să răspundă la telefon oricând, chiar și la 12 noaptea, la o fracțiune din costul unui angajat, ați lua în calcul?”",
              ),
              regie("[Aproape toți spun „da”.]"),
              tu("„Exact asta am construit: un recepționer AI care răspunde la apeluri și face programările direct în calendar. Cel mai simplu e să-l auziți...”"),
              { tip: "titlu", text: "Varianta B" },
              tu(
                "„Bună ziua, vă rețin un minut. Dacă v-aș spune o modalitate prin care să nu mai pierdeți niciun apel, la nicio oră, nici seara, nici în weekend, v-ar interesa?”",
              ),
            ],
          },
        ],
      };

  const aha: Pas = hotel
    ? {
        id: "aha",
        titlu: "Primul „aha”",
        linii: [
          tu("„Super. Și se întâmplă vreodată să aveți apeluri pierdute? De exemplu, când recepția face un check-in sau e la telefon cu alt client?”"),
          regie("[Spune „da” sau „nu”.]"),
        ],
      }
    : {
        id: "aha",
        titlu: "Primul „aha”",
        linii: [
          tu(`„Perfect. Și dacă ${n.client} ar suna, să zicem, diseară la 21:00, ca să-și facă ${n.cerere}, ar răspunde cineva?”`),
          regie("[De obicei răspunsul e „nu”.]"),
          nota("Alege o oră imediat după închidere."),
        ],
      };

  const confirmarea: Pas = {
    id: "confirmarea",
    titlu: "Confirmarea problemei",
    linii: hotel
      ? [nota("La hoteluri, întrebarea de la pasul anterior confirmă deja problema. Treci la calcul sau direct la soluție.")]
      : [
          tu(
            `„Înțeleg. Și în timpul zilei, se întâmplă ca recepția să fie ocupată, la telefon cu ${n.altClient} sau cu cineva în față, și un apel să rămână nepreluat?”`,
          ),
          regie("[Aproape mereu răspunsul e „da”.]"),
        ],
  };

  const calculul: Pas = {
    id: "calculul",
    titlu: "Calculul",
    linii: [
      tu(`„Și cam cât costă, în medie, ${n.serviciuPret} la dumneavoastră?”`),
      regie("[Îți dă o sumă. Scrie-o în calculator.]"),
      tu(
        `„Hai să facem un calcul rapid. Să zicem că pierdeți doar ${apeluri} pe zi și că ${dinZece}. Asta înseamnă cam ${p.rezultat ?? "[rezultatul]"} lei pe lună care ajung la ${n.altaAfacere}. Nu e chiar puțin, nu?”`,
      ),
      nota("Dacă omul spune că nu pierde apeluri sau îți dă o cifră mică, nu-l contrazice: vezi obiecția „Nu pierdem apeluri”."),
    ],
  };

  const solutia: Pas = {
    id: "solutia",
    titlu: "Soluția",
    linii: hotel
      ? [tu("„Înțeleg. Împreună cu echipa mea am dezvoltat un recepționer AI care preia exact apelurile astea și face rezervări. Cel mai simplu e să-l auziți singur...”")]
      : [
          tu(
            `„Exact pentru asta v-am sunat. Avem un recepționer AI care preia exact apelurile astea: răspunde, dă informații și face programarea direct în calendar, la orice oră. Nu înlocuiește recepția. Dacă nu răspunde nimeni după câteva tonuri, sau după program, preia el apelul. Practic, nu mai pierdeți ${n.niciunClient} pentru că n-a răspuns nimeni.”`,
          ),
        ],
  };

  const demo: Pas = {
    id: "demo",
    titlu: "Demo-ul",
    linii: [
      tu(`„Cel mai simplu e să-l auziți singur. Vă las un număr de test: ${p.demo}. Sunați ${n.caUnClient} și cereți ${n.cerereScurta}. Durează un minut.”`),
      tu("„Aveți un minut acum? Vă sun înapoi în cinci minute, după ce îl încercați, și-mi spuneți cum vi s-a părut.”"),
      regie("[Dacă nu are timp acum:]"),
      tu("„Nicio problemă. Vă trimit numărul și pe WhatsApp. Când vă pot suna mâine, după ce îl încercați?”"),
      ...(p.nisa !== "stomatologie"
        ? [nota("Numărul de demo e configurat pentru o clinică stomatologică. Spune-i asta clar: pentru afacerea lui se personalizează complet.")]
        : []),
    ],
  };

  const programarea: Pas = {
    id: "programarea",
    titlu: "Programarea întâlnirii",
    linii: [
      { tip: "titlu", text: "După ce a sunat la demo" },
      tu("„Cum vi s-a părut?”"),
      regie("[Taci și lasă-l să vorbească. Reacția lui e cel mai bun argument.]"),
      tu(
        "„Ce ați auzit e varianta standard, configurată pentru o clinică stomatologică. Pentru dumneavoastră se personalizează complet: programul, tipurile de programări, vocea, informațiile pe care le dă. Asta o face un coleg specializat, într-o discuție de 15-20 de minute, online sau la dumneavoastră. Ce zi vă convine săptămâna asta, după-amiaza?”",
      ),
      { tip: "titlu", text: "Confirmarea" },
      tu(`„Perfect, am notat [ziua], la ora [ora], [online / ${n.laAfacere}]. Pe ce număr și pe ce adresă de e-mail vă trimit confirmarea?”`),
      tu("„Ar mai trebui să participe cineva la discuție, un asociat sau colegul care se ocupă de programări?”"),
      nota("Rezervi ora direct în calendarul de closing, cât ești la telefon. Întâlnirile sunt după-amiaza."),
    ],
    extra: [
      {
        titlu: "Dacă n-a sunat încă la demo",
        linii: [
          tu(`„Bună ziua, sunt ${nume} de la Elevio, am vorbit [ieri]. Ați apucat să sunați la numărul de test?”`),
          nota("Dacă nu, îl rogi să-l încerce acum, cât ești la telefon, de pe alt număr."),
        ],
      },
    ],
  };

  return [receptia, deschiderea, aha, confirmarea, calculul, solutia, demo, programarea];
}

// Pierderea estimată: apeluri × zile × rată × preț, rotunjită la sute.
export function pierdereLunara(pret: number, apeluriPeZi: number, zile: number, rataProcente: number) {
  const brut = apeluriPeZi * zile * (rataProcente / 100) * pret;
  return Math.round(brut / 100) * 100;
}
