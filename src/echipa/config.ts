// Configurarea platformei de vânzări. Tot ce e specific Elevio stă aici:
// numere, linkuri, nișe, statusuri, obiecții, insigne, parametrii calculatorului.
// Secretele NU stau aici (vezi .env.example și PLATFORMA-README.md).

export const BRAND = "Elevio";
export const SITE = "elevio-agency.ro";
export const CONTACT_EMAIL = "elevioromania@gmail.com";

// Numărul de demo. Poate deveni pe nișe: adaugă o cheie în DEMO_NUMERE_PE_NISA
// (de exemplu hotel: "0373 000 000") și „Mod apel” îl folosește automat.
export const DEMO_NUMBER = "0373 807 222";
export const DEMO_NUMERE_PE_NISA: Partial<Record<Nisa, string>> = {};

export function numarDemo(nisa?: Nisa | null) {
  return (nisa && DEMO_NUMERE_PE_NISA[nisa]) || DEMO_NUMBER;
}

export const DAVID_NUME = "David";
export const DAVID_WHATSAPP = "0778 320 872";
export const DAVID_WHATSAPP_INTL = "40778320872";

// Calendarul lui David (Cal.com sau Google Calendar). Gol = se afișează un mesaj de configurare.
// Poate fi suprascris din Netlify cu variabila NEXT_PUBLIC_CALENDAR_URL.
export const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "";

// Grupul echipei. Gol = linkul nu apare.
export const WHATSAPP_GROUP_URL = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "";
export const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL || "";

export const TITLU_IMPLICIT = "Echipa de marketing Elevio";
export const TITLURI_SUGERATE = [
  "Echipa de marketing Elevio",
  "Specialist marketing",
  "Manager de marketing",
  "Director de vânzări",
];

export const COMISION_INSTALARE_VARIANTE = [80, 100];

// ---------------------------------------------------------------------------
// Nișe
// ---------------------------------------------------------------------------

export type Nisa =
  | "stomatologie"
  | "salon"
  | "spa"
  | "clinica"
  | "hotel"
  | "restaurant"
  | "service_auto"
  | "altele";

export type InfoNisa = {
  eticheta: string;
  // Exemplele folosite în replicile din „Mod apel”. Pentru stomatologie dau exact textul din ghid.
  client: string; // „un pacient”, „un client”
  serviciu: string; // „un detartraj sau o consultație”
  serviciuPret: string; // „o consultație sau un tratament”
  afacerea: string; // „clinica”, „salonul”
  laAfacere: string; // „la clinică”, „la salon”
  alAfacerii: string; // „clinicii”, „salonului”
  cerere: string; // ce cere clientul: „o programare pentru un detartraj sau o consultație”
  cerereScurta: string; // „o programare”, „o rezervare”
  altClient: string; // „alt pacient”
  caUnClient: string; // „ca un pacient”
  niciunClient: string; // „niciun pacient”
  altaAfacere: string; // „altă clinică”
  variantaHotel?: boolean;
};

export const NISE: Record<Nisa, InfoNisa> = {
  stomatologie: {
    eticheta: "Stomatologie",
    client: "un pacient",
    serviciu: "un detartraj sau o consultație",
    serviciuPret: "o consultație sau un tratament",
    afacerea: "clinica",
    laAfacere: "la clinică",
    alAfacerii: "clinicii",
    cerere: "o programare pentru un detartraj sau o consultație",
    cerereScurta: "o programare",
    altClient: "alt pacient",
    caUnClient: "ca un pacient",
    niciunClient: "niciun pacient",
    altaAfacere: "altă clinică",
  },
  salon: {
    eticheta: "Salon",
    client: "o clientă",
    serviciu: "o manichiură sau un tuns",
    serviciuPret: "o manichiură sau un tuns",
    afacerea: "salonul",
    laAfacere: "la salon",
    alAfacerii: "salonului",
    cerere: "o programare la manichiură",
    cerereScurta: "o programare",
    altClient: "altă clientă",
    caUnClient: "ca o clientă",
    niciunClient: "nicio clientă",
    altaAfacere: "alt salon",
  },
  spa: {
    eticheta: "Spa",
    client: "un client",
    serviciu: "un masaj sau un tratament",
    serviciuPret: "un masaj sau un tratament",
    afacerea: "spa-ul",
    laAfacere: "la spa",
    alAfacerii: "spa-ului",
    cerere: "o programare pentru un masaj",
    cerereScurta: "o programare",
    altClient: "alt client",
    caUnClient: "ca un client",
    niciunClient: "niciun client",
    altaAfacere: "alt spa",
  },
  clinica: {
    eticheta: "Clinică medicală",
    client: "un pacient",
    serviciu: "o consultație",
    serviciuPret: "o consultație",
    afacerea: "clinica",
    laAfacere: "la clinică",
    alAfacerii: "clinicii",
    cerere: "o programare pentru o consultație",
    cerereScurta: "o programare",
    altClient: "alt pacient",
    caUnClient: "ca un pacient",
    niciunClient: "niciun pacient",
    altaAfacere: "altă clinică",
  },
  hotel: {
    eticheta: "Hotel",
    client: "un client",
    serviciu: "o rezervare de cameră",
    serviciuPret: "o noapte de cazare",
    afacerea: "hotelul",
    laAfacere: "la hotel",
    alAfacerii: "hotelului",
    cerere: "o rezervare",
    cerereScurta: "o rezervare",
    altClient: "alt client",
    caUnClient: "ca un client",
    niciunClient: "niciun client",
    altaAfacere: "alt hotel",
    variantaHotel: true,
  },
  restaurant: {
    eticheta: "Restaurant",
    client: "un client",
    serviciu: "o rezervare de masă",
    serviciuPret: "o masă pentru doi",
    afacerea: "restaurantul",
    laAfacere: "la restaurant",
    alAfacerii: "restaurantului",
    cerere: "o rezervare de masă",
    cerereScurta: "o rezervare",
    altClient: "alt client",
    caUnClient: "ca un client",
    niciunClient: "niciun client",
    altaAfacere: "alt restaurant",
  },
  service_auto: {
    eticheta: "Service auto",
    client: "un client",
    serviciu: "o revizie",
    serviciuPret: "o revizie",
    afacerea: "service-ul",
    laAfacere: "la service",
    alAfacerii: "service-ului",
    cerere: "o programare pentru o revizie",
    cerereScurta: "o programare",
    altClient: "alt client",
    caUnClient: "ca un client",
    niciunClient: "niciun client",
    altaAfacere: "alt service",
  },
  altele: {
    eticheta: "Altele",
    client: "un client",
    serviciu: "o programare",
    serviciuPret: "un serviciu",
    afacerea: "afacerea",
    laAfacere: "la dumneavoastră",
    alAfacerii: "afacerii",
    cerere: "o programare",
    cerereScurta: "o programare",
    altClient: "alt client",
    caUnClient: "ca un client",
    niciunClient: "niciun client",
    altaAfacere: "concurență",
  },
};

export const LISTA_NISE = Object.keys(NISE) as Nisa[];

// ---------------------------------------------------------------------------
// Statusuri (ordinea contează)
// ---------------------------------------------------------------------------

export type Status =
  | "nou"
  | "nu_a_raspuns"
  | "de_resunat"
  | "aproape"
  | "intalnire"
  | "neinteresat"
  | "invalid";

export type InfoStatus = {
  eticheta: string;
  culoare: string; // numele culorii, afișat lângă status
  hex: string; // culoarea pe fundal închis
  descriere: string;
};

export const STATUSURI: Record<Status, InfoStatus> = {
  nou: { eticheta: "Nou", culoare: "Alb", hex: "#E5E7EB", descriere: "Încă nu a fost sunat" },
  nu_a_raspuns: {
    eticheta: "Nu a răspuns",
    culoare: "Mov",
    hex: "#B794F6",
    descriere: "De încercat din nou, la altă oră sau în altă zi",
  },
  de_resunat: {
    eticheta: "De resunat",
    culoare: "Galben",
    hex: "#FACC15",
    descriere: "Nesigur, revii la data stabilită",
  },
  aproape: {
    eticheta: "Aproape",
    culoare: "Albastru",
    hex: "#3B82F6",
    descriere: "Interesat, a primit sau a sunat la demo, dar n-a fixat întâlnirea",
  },
  intalnire: {
    eticheta: "Întâlnire programată",
    culoare: "Verde",
    hex: "#22C55E",
    descriere: "Se predă lui David",
  },
  neinteresat: { eticheta: "Nu e interesat", culoare: "Roșu", hex: "#EF4444", descriere: "Închis politicos" },
  invalid: {
    eticheta: "Număr greșit sau afacere închisă",
    culoare: "Gri închis",
    hex: "#71717A",
    descriere: "Scos din listă",
  },
};

export const LISTA_STATUSURI = Object.keys(STATUSURI) as Status[];

// ---------------------------------------------------------------------------
// Obiecții (etichetele din CRM; răspunsurile sunt în ghid, secțiunea 16)
// ---------------------------------------------------------------------------

export const OBIECTII: { cod: string; eticheta: string }[] = [
  { cod: "receptionera", eticheta: "Avem deja recepționeră" },
  { cod: "nu_pierdem", eticheta: "Nu pierdem apeluri / Nu avem nevoie" },
  { cod: "suna_inapoi", eticheta: "Recepția sună înapoi" },
  { cod: "nu_cred_ai", eticheta: "Nu cred în AI / Vor să vorbească cu un om" },
  { cod: "pret", eticheta: "Cât costă?" },
  { cod: "email_timp", eticheta: "Trimiteți-mi un e-mail / N-am timp" },
  { cod: "asociat", eticheta: "Trebuie să vorbesc cu asociatul" },
  { cod: "alt_sistem", eticheta: "Avem deja un sistem / Am mai fost sunat" },
  { cod: "ai_greseste", eticheta: "Și dacă AI-ul greșește?" },
  { cod: "robotic", eticheta: "Sună robotic" },
];

export function etichetaObiectie(cod: string) {
  return OBIECTII.find((o) => o.cod === cod)?.eticheta ?? cod;
}

// ---------------------------------------------------------------------------
// Predări, comisioane, insigne
// ---------------------------------------------------------------------------

export const REZULTATE_PREDARE: Record<string, string> = {
  noua: "Nouă",
  confirmata: "Confirmată",
  neprezentat: "Neprezentat (no-show)",
  reprogramata: "Reprogramată",
  inchis: "Client închis",
  neinchis: "Nu a închis",
};

export const INSIGNE: Record<string, { titlu: string; descriere: string }> = {
  primul_apel: { titlu: "Primul apel", descriere: "Ai marcat primul apel." },
  o_suta_apeluri: { titlu: "100 de apeluri", descriere: "Ai marcat 100 de apeluri." },
  prima_intalnire: { titlu: "Prima întâlnire", descriere: "Ai programat prima întâlnire cu David." },
  zece_intalniri: { titlu: "10 întâlniri", descriere: "Ai programat 10 întâlniri." },
  primul_client: { titlu: "Primul client", descriere: "Primul client închis din întâlnirile tale." },
  cinci_clienti: { titlu: "5 clienți", descriere: "Cinci clienți închiși." },
  serie_7_zile: { titlu: "7 zile la rând", descriere: "Activitate în fiecare zi, o săptămână întreagă." },
};

// ---------------------------------------------------------------------------
// Calculatorul pierderii („Mod apel”)
// ---------------------------------------------------------------------------

export const CALCULATOR = {
  apeluriPierdutePeZi: 2,
  zileLucratoare: 22,
  rataConversie: 70, // procente
};

export const PRET_DE_PORNIRE = "aproximativ 130€ pe lună";

// ---------------------------------------------------------------------------
// Mesajul de bun venit și onboarding-ul
// ---------------------------------------------------------------------------

export const MESAJ_BUN_VENIT =
  "Ai o singură misiune: să-l faci pe decident să audă agentul. Când aude cum preia apelul și face programarea, se convinge singur. Restul îl face David.";
