import Link from "next/link";
import { PRICING_TIERS } from "@/lib/pricing";
import { LAUNCH_OFFER_TEXT } from "@/lib/launchOffer";

export default function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
      {PRICING_TIERS.map((tier) => (
        <div key={tier.id} className="relative">
          {tier.highlighted && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-elevio-accent/30 opacity-70 blur-2xl"
            />
          )}

          <div
            className={`relative flex h-full flex-col rounded-3xl border transition-shadow duration-300 ${
              tier.highlighted
                ? "z-10 border-elevio-accent bg-elevio-dark p-8 text-white shadow-2xl shadow-elevio-accent/50 ring-4 ring-elevio-accent/70 lg:-translate-y-3 lg:scale-[1.08] lg:p-10"
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
              <span className="mt-4 inline-flex w-fit items-center rounded-full bg-elevio-accent px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-elevio-dark shadow-[0_0_20px_rgba(56,189,248,0.7)]">
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
        </div>
      ))}
    </div>
  );
}
