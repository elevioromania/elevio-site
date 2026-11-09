import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRII, industriiPeCategorii } from "@/lib/industrii";
import Breadcrumbs from "@/components/industrii/Breadcrumbs";
import CtaIndustrie from "@/components/industrii/CtaIndustrie";
import JsonLd, { SITE_URL, breadcrumbLd } from "@/components/industrii/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";

const TITLU = "Agent vocal AI pe industrii: magazine, meserii, clinici";
const DESCRIERE =
  "Elevio AI, recepționer vocal AI în română, 24/7, configurat pe domeniul tău: magazine online, meserii, clinici, saloane, service-uri auto și altele.";

export const metadata: Metadata = pageMetadata({
  title: TITLU,
  description: DESCRIERE,
  path: "/industrii",
  absoluteTitle: true,
});

const LA_FEL_PESTE_TOT = [
  "Răspunde 24/7, în română, cu o voce naturală, pe numărul pe care îl ai deja.",
  "Preia programări, comenzi și cereri cu nume, dată, oră și cerințe speciale și ți le transmite structurat.",
  "Verifică disponibilitatea în timp real și programează în calendar (Cal.com, Calendly).",
  "Trimite clientului SMS de confirmare.",
  "Îți lasă transcriptul și rezumatul fiecărui apel.",
  "Nu improvizează: când nu e sigur sau e o urgență, transferă apelul pe telefonul tău în câteva secunde.",
];

export default function IndustriiPage() {
  const grupuri = industriiPeCategorii();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { nume: "Acasă", cale: "/" },
            { nume: "Industrii", cale: "/industrii" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Elevio AI pe industrii",
            itemListElement: INDUSTRII.map((ind, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: ind.nume,
              url: `${SITE_URL}/industrii/${ind.slug}`,
            })),
          },
        ]}
      />

      <section className="border-b border-elevio-border/70 bg-white/50">
        <div className="container-elevio py-14 md:py-16">
          <Breadcrumbs
            items={[{ nume: "Acasă", cale: "/" }, { nume: "Industrii" }]}
          />
          <div className="mt-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              Elevio AI · Recepționer vocal AI
            </span>
            <h1 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-elevio-dark sm:text-5xl">
              Agent vocal AI pe industrii
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-elevio-dark/70">
              Elevio AI răspunde la telefon în locul tău, 24/7, în română, pe
              numărul pe care îl ai deja. Ce întreabă, ce programează și când
              îți transferă apelul depinde de domeniu: o țeavă spartă la 23:00
              nu se tratează ca o programare la tuns.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-elevio-dark/60">
              Alege-ți domeniul și vezi ce întreabă clienții, cum sună un apel
              și ce face Elevio AI cu el.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-elevio space-y-14">
          {grupuri.map(({ categorie, industrii }) => (
            <div key={categorie.nume}>
              <div className="flex flex-col gap-1 border-b border-elevio-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">
                  {categorie.nume}
                </h2>
                <p className="text-sm text-elevio-dark/60">
                  {categorie.descriere}
                </p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {industrii.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/industrii/${ind.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-elevio-dark">
                        {ind.nume}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-elevio-dark/70">
                        {ind.scurt}
                      </p>
                      <span className="mt-4 text-sm font-semibold text-elevio-primary group-hover:text-elevio-dark">
                        Vezi cum funcționează →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-elevio grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">
              Ce e la fel în toate domeniile
            </h2>
            <ul className="mt-6 space-y-3">
              {LA_FEL_PESTE_TOT.map((text) => (
                <li
                  key={text}
                  className="flex gap-3 text-sm leading-relaxed text-elevio-dark/80"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-elevio-secondary text-xs font-bold text-elevio-primary"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-elevio-border bg-elevio-secondary/30 p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">
              Nu-ți găsești domeniul?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-elevio-dark/70">
              Lista e deschisă. Dacă afacerea ta primește apeluri de la
              clienți, Elevio AI se configurează pe serviciile, programul și
              regulile tale în câteva zile, fără contract pe termen lung.
              Planurile pornesc de la 150€ pe lună + TVA.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href="/demo"
                className="text-elevio-primary hover:text-elevio-dark"
              >
                Cere un demo gratuit →
              </Link>
              <Link
                href="/preturi"
                className="text-elevio-primary hover:text-elevio-dark"
              >
                Vezi prețurile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaIndustrie
        titlu="Ascultă cum ar răspunde Elevio AI pentru afacerea ta"
        text="Cere un demo gratuit și primești pe email o mostră audio pe domeniul tău. Fără obligații."
      />
    </>
  );
}
