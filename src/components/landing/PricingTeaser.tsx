import Link from "next/link";
import { PRICING_TIERS } from "@/lib/pricing";

/** Rezumatul prețurilor, cu link spre /preturi. Citește din sursa unică (lib/pricing). */
export default function PricingTeaser() {
  return (
    <div className="rounded-3xl border border-elevio-border bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-2xl border p-5 ${
              tier.highlighted
                ? "border-elevio-accent bg-elevio-dark text-white"
                : "border-elevio-border bg-elevio-bg text-elevio-dark"
            }`}
          >
            <p
              className={`text-xs font-bold uppercase tracking-wide ${
                tier.highlighted ? "text-elevio-secondary" : "text-elevio-primary"
              }`}
            >
              {tier.name}
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              <span className={`text-sm font-medium ${tier.highlighted ? "text-white/60" : "text-elevio-dark/50"}`}>
                de la{" "}
              </span>
              {tier.price}
            </p>
            <p className={`text-xs ${tier.highlighted ? "text-white/60" : "text-elevio-dark/50"}`}>
              pe lună + TVA
            </p>
            <p className={`mt-3 text-sm ${tier.highlighted ? "text-white/80" : "text-elevio-dark/65"}`}>
              {tier.tagline}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-elevio-dark/50">
        Prețurile nu includ TVA. La abonament se adaugă taxa de implementare. Fără
        contract pe termen lung. Programarea automată în calendar și confirmarea prin
        SMS sunt incluse de la planul PRO.
      </p>
      <Link
        href="/preturi"
        className="mt-4 inline-block text-sm font-semibold text-elevio-primary hover:text-elevio-dark"
      >
        Vezi ce include fiecare plan →
      </Link>
    </div>
  );
}
