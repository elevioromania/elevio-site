import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PricingCards from "@/components/PricingCards";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";

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
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-elevio-dark/50">
            Fără cost de instalare. Prețurile pot fi ajustate în funcție de
            industrie, volum de apeluri și integrările necesare. Discutăm
            exact ce ți se potrivește la demo.
          </p>
        </div>
      </section>

      <PriceAnchor />

      <FAQSection />
    </>
  );
}
