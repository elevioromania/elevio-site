export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  calls: string;
  highlighted: boolean;
  badge?: string;
  launchOffer?: boolean;
  features: string[];
  cta: string;
};

// Single source of truth for pricing — change numbers/copy here only,
// every page (homepage anchor, /preturi cards) reads from this file.
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "start",
    name: "START",
    tagline: "Pentru afaceri mici și cabinete individuale",
    price: "150€",
    period: "/lună + TVA",
    calls: "Până la 150 apeluri",
    highlighted: false,
    features: [
      "Recepționer vocal AI în română, 24/7",
      "Preluarea cererilor de programare cu toate detaliile",
      "Întrebări frecvente și informații esențiale",
      "Notificare către echipă pentru confirmare",
      "Rezumat automat după fiecare apel",
      "2 apeluri simultane",
      "Suport din partea echipei, 24/7",
    ],
    cta: "Programează un demo",
  },
  {
    id: "pro",
    name: "PRO",
    tagline: "Pentru businessuri cu un volum ridicat de programări",
    price: "300€",
    period: "/lună + TVA",
    calls: "Până la 650 apeluri",
    highlighted: true,
    badge: "CEL MAI ALES",
    launchOffer: true,
    features: [
      "Tot ce include Start",
      "Programare automată direct în calendar",
      "Verifică disponibilitatea în timp real",
      "Reprogramări și anulări",
      "Confirmări prin SMS / WhatsApp",
      "Română + engleză",
      "5 apeluri simultane",
      "Dashboard cu apeluri și programări",
      "Suport din partea echipei, 24/7",
    ],
    cta: "Programează un demo",
  },
  {
    id: "business",
    name: "BUSINESS",
    tagline: "Pentru clinici, businessuri cu program plin și locații multiple",
    price: "600€",
    period: "/lună + TVA",
    calls: "Până la 1.200 apeluri",
    highlighted: false,
    features: [
      "Tot ce include Pro",
      "Calendare multiple și departamente multiple",
      "Rutare inteligentă în funcție de locație sau solicitare",
      "Rapoarte lunare și ore de vârf",
      "Dashboard extins pentru management",
      "10 apeluri simultane",
      "Ajustări și optimizări incluse",
      "Suport din partea echipei, 24/7",
    ],
    cta: "Programează un demo",
  },
];

export const CHEAPEST_TIER = PRICING_TIERS[0];
