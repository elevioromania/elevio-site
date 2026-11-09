import FAQ from "./FAQ";
import JsonLd from "./JsonLd";
import { FAQ_ITEMS } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/seo/schema";

export default function FAQSection() {
  return (
    <section className="pb-24">
      {/* Schema FAQPage din același array pe care îl afișează <FAQ />. */}
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />
      <div className="container-elevio">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
            Întrebări frecvente
          </h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}
