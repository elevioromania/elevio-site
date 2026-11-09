import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRII, getIndustrie } from "@/lib/industrii";
import Breadcrumbs from "@/components/industrii/Breadcrumbs";
import CtaIndustrie from "@/components/industrii/CtaIndustrie";
import FaqIndustrie from "@/components/industrii/FaqIndustrie";
import ScenariuApel from "@/components/industrii/ScenariuApel";
import JsonLd, { SITE_URL, breadcrumbLd } from "@/components/industrii/JsonLd";

type Props = { params: Promise<{ slug: string }> };

// Doar cele 24 de pagini generate la build; orice alt slug dă 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRII.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustrie(slug);
  if (!ind) return {};
  const cale = `/industrii/${ind.slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: ind.titluSEO,
    description: ind.descriere,
    alternates: { canonical: cale },
    openGraph: {
      title: ind.titluSEO,
      description: ind.descriere,
      url: cale,
      siteName: "Elevio AI",
      locale: "ro_RO",
      type: "website",
    },
  };
}

const DE_BAZA = [
  "Pe numărul tău existent",
  "Voce naturală, în română",
  "Transcript + rezumat la fiecare apel",
  "Configurare în câteva zile, fără contract pe termen lung",
];

export default async function IndustriePage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustrie(slug);
  if (!ind) notFound();

  const cale = `/industrii/${ind.slug}`;
  const inrudite = ind.industriiInrudite
    .map((s) => getIndustrie(s))
    .filter((i) => i !== undefined);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ind.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbLd([
      { nume: "Acasă", cale: "/" },
      { nume: "Industrii", cale: "/industrii" },
      { nume: ind.nume, cale },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: ind.h1,
      serviceType: `Recepționer vocal AI pentru ${ind.pentru}`,
      description: ind.descriere,
      url: `${SITE_URL}${cale}`,
      areaServed: "RO",
      availableLanguage: "ro",
      provider: {
        "@type": "Organization",
        name: "Elevio AI",
        alternateName: ["Elevio", "Elevio Agency"],
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/preturi`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 150,
          priceCurrency: "EUR",
          unitText: "lună",
          valueAddedTaxIncluded: false,
        },
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* H1 + intro */}
      <section className="border-b border-elevio-border/70 bg-white/50">
        <div className="container-elevio py-12 md:py-16">
          <Breadcrumbs
            items={[
              { nume: "Acasă", cale: "/" },
              { nume: "Industrii", cale: "/industrii" },
              { nume: ind.nume },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              {ind.categorie} · Elevio AI
            </span>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-elevio-dark sm:text-5xl">
              {ind.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-elevio-dark/75">
              {ind.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/demo?tip=${ind.tipDemo}`}
                className="rounded-full bg-elevio-primary px-7 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-elevio-primary/25 transition-colors hover:bg-elevio-dark"
              >
                Cere un demo gratuit
              </Link>
              <Link
                href="/preturi"
                className="rounded-full border border-elevio-border bg-white px-7 py-3.5 text-center text-sm font-semibold text-elevio-dark transition-colors hover:bg-elevio-secondary/50"
              >
                De la 150€/lună + TVA
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-wide text-elevio-dark/45">
              <li>24/7</li>
              <li>În română</li>
              <li>Pe numărul tău</li>
              <li>Transfer în câteva secunde</li>
            </ul>
          </div>
        </div>
      </section>

      {/* De ce sună clienții */}
      <section className="py-16 md:py-20">
        <div className="container-elevio">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              {ind.nume}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
              De ce sună clienții
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ind.deCeSunaClientii.map((m) => (
              <div
                key={m.titlu}
                className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-elevio-dark">
                  {m.titlu}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenariul de conversație */}
      <section className="border-y border-elevio-border/70 bg-white/50 py-16 md:py-20">
        <div className="container-elevio grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              Exemplu de apel
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
              Cum arată un apel preluat de Elevio AI
            </h2>
            <p className="mt-4 leading-relaxed text-elevio-dark/70">
              {ind.scenariu.context}
            </p>
            <div className="mt-6 rounded-2xl border border-elevio-border bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-elevio-dark">
                După apel
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
                {ind.scenariu.dupaApel}
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-elevio-dark/50">
              Conversația e un exemplu. Numele, adresele și prețurile sunt
              ilustrative: Elevio AI răspunde doar din informațiile și regulile
              pe care le stabilești tu la configurare.
            </p>
          </div>
          <ScenariuApel eticheta={ind.nume} replici={ind.scenariu.replici} />
        </div>
      </section>

      {/* Ce face Elevio AI */}
      <section className="py-16 md:py-20">
        <div className="container-elevio grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
              Ce face Elevio AI pentru {ind.pentru}
            </h2>
            <ul className="mt-8 space-y-4">
              {ind.ceFaceElevio.map((text) => (
                <li
                  key={text}
                  className="flex gap-3 leading-relaxed text-elevio-dark/80"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevio-secondary text-xs font-bold text-elevio-primary"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-elevio-border bg-elevio-secondary/30 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-elevio-dark/60">
              Valabil în orice domeniu
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-elevio-dark/80">
              {DE_BAZA.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-elevio-dark/70">
              Ce intră în fiecare plan (calendar, SMS, număr de apeluri) vezi pe{" "}
              <Link
                href="/preturi"
                className="font-semibold text-elevio-primary underline-offset-2 hover:underline"
              >
                pagina de prețuri
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      {/* Exemplul de calcul */}
      <section className="pb-16 md:pb-20">
        <div className="container-elevio">
          <div className="mx-auto max-w-3xl rounded-3xl border border-elevio-border bg-white p-6 shadow-sm sm:p-10">
            <span className="inline-block rounded-full bg-elevio-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-elevio-dark/70">
              Exemplu ilustrativ
            </span>
            <h2 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-elevio-dark sm:text-3xl">
              Cât te pot costa apelurile ratate
            </h2>
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-elevio-dark/75">
              {ind.exempluCalcul.ipoteze.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-elevio-secondary/40 p-4 font-semibold leading-relaxed text-elevio-dark">
              {ind.exempluCalcul.rezultat}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-elevio-dark/50">
              Cifrele de mai sus sunt un exemplu, nu o medie a pieței și nici o
              promisiune. Pune în calcul numerele tale. Planurile Elevio AI
              pornesc de la 150€/lună + TVA:{" "}
              <Link
                href="/preturi"
                className="font-semibold text-elevio-primary hover:underline"
              >
                vezi prețurile
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 md:pb-20">
        <div className="container-elevio">
          <h2 className="mx-auto mb-10 max-w-2xl text-balance text-center text-3xl font-extrabold tracking-tight text-elevio-dark">
            Întrebări frecvente despre Elevio AI pentru {ind.pentru}
          </h2>
          <FaqIndustrie items={ind.faq} />
        </div>
      </section>

      {/* Industrii înrudite */}
      <section className="pb-20">
        <div className="container-elevio">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">
              Domenii înrudite
            </h2>
            <Link
              href="/industrii"
              className="text-sm font-semibold text-elevio-primary hover:text-elevio-dark"
            >
              Toate industriile →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inrudite.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/industrii/${r.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-elevio-border bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <span className="text-base font-semibold text-elevio-dark">
                    {r.nume}
                  </span>
                  <span className="mt-1 flex-1 text-sm text-elevio-dark/65">
                    {r.scurt}
                  </span>
                  <span className="mt-3 text-sm font-semibold text-elevio-primary group-hover:text-elevio-dark">
                    Vezi pagina →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaIndustrie
        titlu={`Ascultă cum ar răspunde Elevio AI pentru ${ind.pentru}`}
        text="Cere un demo gratuit și primești pe email o mostră audio pe domeniul tău. Fără obligații."
        tipDemo={ind.tipDemo}
      />
    </>
  );
}
