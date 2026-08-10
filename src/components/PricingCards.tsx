import Link from "next/link";
import { LAUNCH_OFFER_TEXT } from "@/lib/launchOffer";

const TIERS = [
  {
    name: "Etapa Inițială",
    tagline: "Primul tău client de test",
    price: "Gratuit",
    period: "",
    highlighted: false,
    features: [
      "Recepționer vocal AI în română, configurat pentru afacerea ta",
      "Preluarea apelurilor cu toate detaliile importante",
      "Transfer direct pe telefonul tău când Elevio nu e sigur de răspuns",
      "Rezumat după fiecare apel",
      "Suport direct din partea echipei Elevio",
    ],
    cta: "Programează un demo",
  },
  {
    name: "Etapa Intermediară",
    tagline: "Pentru afaceri cu apeluri constante",
    price: "120€",
    period: "/lună + TVA",
    highlighted: true,
    badge: "CEL MAI ALES",
    calls: "Până la ~300 apeluri incluse",
    launchOffer: true,
    features: [
      "Tot ce include Etapa Inițială",
      "Confirmări automate prin SMS",
      "Rezervări sau comenzi preluate complet, gata de procesat",
      "Transcript și rezumat pentru fiecare apel",
      "Ajustări de configurare incluse",
    ],
    cta: "Programează un demo",
  },
  {
    name: "Etapa Finală",
    tagline: "Pentru volum mare de apeluri",
    price: "200€+",
    period: "/lună + TVA",
    highlighted: false,
    calls: "Volum extins, personalizat pe afacerea ta",
    features: [
      "Tot ce include Etapa Intermediară",
      "Volum de apeluri extins, la nevoie",
      "Fluxuri și integrări personalizate",
      "Rapoarte periodice și optimizare continuă",
      "Suport prioritar din partea echipei Elevio",
    ],
    cta: "Programează un demo",
  },
];

export default function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-3xl border transition-shadow duration-300 ${
            tier.highlighted
              ? "z-10 border-elevio-accent bg-elevio-dark p-8 text-white shadow-2xl shadow-elevio-accent/40 ring-2 ring-elevio-accent/60 lg:-translate-y-2 lg:scale-105 lg:p-10"
              : "border-elevio-border bg-white p-8 text-elevio-dark shadow-sm hover:shadow-md"
          }`}
        >
          {tier.badge && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-elevio-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-elevio-dark">
              {tier.badge}
            </span>
          )}

          <h3
            className={`text-sm font-bold uppercase tracking-wide ${
              tier.highlighted ? "text-elevio-secondary" : "text-elevio-primary"
            }`}
          >
            {tier.name}
          </h3>
          <p
            className={`mt-1 text-sm ${
              tier.highlighted ? "text-white/70" : "text-elevio-dark/60"
            }`}
          >
            {tier.tagline}
          </p>

          {tier.launchOffer && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-elevio-accent px-3 py-1 text-xs font-bold text-elevio-dark">
              {LAUNCH_OFFER_TEXT}
            </span>
          )}

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">{tier.price}</span>
            <span
              className={`text-sm ${
                tier.highlighted ? "text-white/60" : "text-elevio-dark/50"
              }`}
            >
              {tier.period}
            </span>
          </div>
          {tier.calls && (
            <p
              className={`mt-2 text-sm font-medium ${
                tier.highlighted ? "text-white/80" : "text-elevio-dark/60"
              }`}
            >
              {tier.calls}
            </p>
          )}

          <ul className="mt-6 flex-1 space-y-3 text-sm">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span
                  className={
                    tier.highlighted ? "text-elevio-accent" : "text-elevio-primary"
                  }
                >
                  ✓
                </span>
                <span
                  className={tier.highlighted ? "text-white/85" : "text-elevio-dark/75"}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/demo"
            className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
              tier.highlighted
                ? "bg-white text-elevio-dark hover:bg-elevio-secondary"
                : "bg-elevio-primary text-white hover:bg-elevio-dark"
            }`}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
