import JsonLd from "./JsonLd";
import RichText from "./RichText";
import { faqPageSchema } from "./schema";
import type { FaqItem } from "./types";

/**
 * FAQ vizibil + FAQPage JSON-LD, construite din ACELAȘI array.
 * Server component: răspunsurile sunt în HTML-ul randat (<details>), fără JS.
 */
export default function FaqBlock({
  items,
  title = "Întrebări frecvente",
  id = "intrebari-frecvente",
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20">
      <JsonLd data={faqPageSchema(items)} />
      <div className="container-elevio">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
            {title}
          </h2>
        </div>
        <div className="mx-auto max-w-2xl divide-y divide-elevio-border rounded-2xl border border-elevio-border bg-white shadow-sm">
          {items.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-semibold text-elevio-dark">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-elevio-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-elevio-dark/70">
                <RichText text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
