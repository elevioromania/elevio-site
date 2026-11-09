import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import PageIntro from "@/components/PageIntro";
import PricingCards from "@/components/PricingCards";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { PRICING_TIERS } from "@/lib/pricing";
import { breadcrumbJsonLd, receptionistServiceJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  title: "Prețuri recepționer AI și agent vocal AI",
  description:
    "Prețuri Elevio AI: START de la 150 €/lună, PRO de la 300 €/lună, BUSINESS de la 600 €/lună (+ TVA). Recepționer vocal AI în română, 24/7, pentru firme.",
  path: "/preturi",
});

export default function PreturiPage() {
  return (
    <>
      <JsonLd
        data={[
          // Ofertele vin din aceleași planuri pe care le afișează PricingCards.
          receptionistServiceJsonLd(PRICING_TIERS),
          breadcrumbJsonLd([{ name: "Prețuri", path: "/preturi" }]),
        ]}
      />
      <PageIntro
        eyebrow="Prețuri"
        title="Planuri simple, ușor de înțeles"
        text="Alege planul potrivit volumului tău de apeluri. Noi ne ocupăm de configurare și implementare."
      />

      <section className="py-20">
        <div className="container-elevio">
          <PricingCards />
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-elevio-dark/50">
            Toate prețurile sunt exprimate fără TVA. Prețurile pot fi ajustate în funcție de industrie, volum de
            apeluri și integrările necesare. Discutăm exact ce ți se
            potrivește la demo.
          </p>
        </div>
      </section>

      <PriceAnchor />

      <FAQSection />
    </>
  );
}
