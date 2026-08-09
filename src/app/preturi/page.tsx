import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PricingCards from "@/components/PricingCards";
import PriceAnchor from "@/components/PriceAnchor";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Prețuri — Elevio",
  description:
    "Trei etape simple: Gratuit pentru primul client de test, 120€/lună pentru volum constant, 200€+/lună pentru volum mare.",
};

export default function PreturiPage() {
  return (
    <>
      <PageIntro
        eyebrow="Prețuri"
        title="Etape simple, ușor de înțeles"
        text="Începi gratuit cu primul client de test, apoi treci la etapa potrivită volumului tău de apeluri. Noi ne ocupăm de configurare și implementare."
      />

      <section className="py-20">
        <div className="container-elevio">
          <PricingCards />
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-elevio-dark/50">
            Prețurile pot fi ajustate în funcție de industrie, volum de
            apeluri și integrările necesare. Discutăm exact ce ți se
            potrivește la demo.
          </p>
        </div>
      </section>

      <PriceAnchor />

      <section className="pb-24">
        <div className="container-elevio">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              Întrebări frecvente
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
              Întrebările pe care le-am primi oricum
            </h2>
          </div>
          <FAQ />
        </div>
      </section>
    </>
  );
}
