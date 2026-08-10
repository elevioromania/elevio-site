import Link from "next/link";
import { LAUNCH_OFFER_TEXT } from "@/lib/launchOffer";
import { CHEAPEST_TIER } from "@/lib/pricing";

const ROWS = [
  {
    label: "Cost lunar",
    human: "800€+ · salariu, taxe, training",
    elevio: `De la ${CHEAPEST_TIER.price}, totul inclus`,
  },
  {
    label: "Program",
    human: "8 ore pe zi, 5 zile pe săptămână",
    elevio: "24/7, inclusiv sărbători",
  },
  {
    label: "Apeluri simultane",
    human: "Un singur apel odată",
    elevio: "Mai multe apeluri în același timp",
  },
  {
    label: "Concedii și pauze",
    human: "Inevitabile",
    elevio: "Niciodată",
  },
  {
    label: "Istoricul apelurilor",
    human: "Notițe ocazionale",
    elevio: "Transcript + rezumat, la fiecare apel",
  },
];

export default function PriceAnchor({
  showPricingLink = false,
}: {
  showPricingLink?: boolean;
}) {
  return (
    <section className="py-20">
      <div className="container-elevio">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
            Ancoră de preț
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
            Un angajat la recepție costă 800€+ pe lună.
            <br />
            Elevio pornește de la {CHEAPEST_TIER.price}.
          </h2>
          <p className="mx-auto mt-4 inline-block rounded-full bg-elevio-accent/15 px-4 py-1.5 text-xs font-semibold text-elevio-accent">
            {LAUNCH_OFFER_TEXT}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-elevio-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-elevio-border text-xs font-semibold uppercase tracking-wide text-elevio-dark/50">
                  <th className="px-5 py-4">Criteriu</th>
                  <th className="px-5 py-4">Angajat la recepție</th>
                  <th className="px-5 py-4 text-elevio-primary">Elevio</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-elevio-border/60 last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-elevio-dark">
                      {row.label}
                    </td>
                    <td className="px-5 py-4 text-elevio-dark/60">
                      {row.human}
                    </td>
                    <td className="px-5 py-4 font-medium text-elevio-dark">
                      {row.elevio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/demo"
            className="inline-block rounded-full bg-elevio-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-elevio-primary/25 transition-colors hover:bg-elevio-dark"
          >
            Programează un demo gratuit
          </Link>
          <p className="mt-3 text-xs text-elevio-dark/50">
            Fără obligații. Îl asculți, apoi decizi.
          </p>
          {showPricingLink && (
            <Link
              href="/preturi"
              className="mt-4 inline-block text-sm font-semibold text-elevio-primary hover:text-elevio-dark"
            >
              Vezi toate planurile de preț →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
