import type { Metadata } from "next";
import Link from "next/link";
import DemoCta from "@/components/landing/DemoCta";
import FaqBlock from "@/components/landing/FaqBlock";
import JsonLd from "@/components/landing/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/components/landing/schema";
import type { Crumb, FaqItem } from "@/components/landing/types";
import { GHIDURI, formatDataRo } from "@/lib/ghiduri";

const ULTIMA_ACTUALIZARE = GHIDURI.map((g) => g.dateModified).sort().at(-1) ?? "";

const PATH = "/ghid";
const TITLE = "Ghiduri despre agenți vocali AI pentru firme | Elevio AI";
const DESCRIPTION =
  "Ghiduri practice despre agenții vocali AI: ce sunt, cât costă în 2027, comparația furnizorilor din România, magazine online, AI Act și GDPR la telefon.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const CRUMBS: Crumb[] = [
  { name: "Acasă", path: "/" },
  { name: "Ghiduri", path: PATH },
];

const FAQ: FaqItem[] = [
  {
    q: "Cu ce ghid să încep?",
    a: "Dacă abia ai auzit de subiect, începe cu [ce este un agent vocal AI](/ghid/ce-este-un-agent-vocal-ai). Dacă vrei să compari furnizori, mergi direct la [comparația agenților vocali AI din România](/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027).",
  },
  {
    q: "Cine scrie ghidurile?",
    a: "Echipa Elevio AI. Elevio AI este un recepționer vocal AI în limba română, deci avem un interes. De aceea punem sursa la fiecare preț și spunem și unde alții sunt mai potriviți.",
  },
  {
    q: "Cât de des sunt actualizate?",
    a: "Le actualizăm lunar, mai ales prețurile. Data ultimei actualizări apare pe fiecare ghid.",
  },
];

const linkClass =
  "font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4";

export default function GhiduriPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ghiduri Elevio AI despre agenți vocali AI",
          itemListElement: GHIDURI.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/ghid/${g.slug}`),
            name: g.titlu,
          })),
        }}
      />

      <LandingHero
        crumbs={CRUMBS}
        eyebrow="Ghiduri"
        title="Ghiduri despre agenții vocali AI, pentru afaceri locale"
        lead={
          <p>
            Aici găsești răspunsuri clare la întrebările pe care și le pun patronii
            înainte să pună un AI la telefon: ce este, cât costă, ce furnizori există
            și ce spune legea. Fiecare ghid are data actualizării, iar prețurile au
            sursă.
          </p>
        }
        meta={<>Actualizat: {formatDataRo(ULTIMA_ACTUALIZARE)}</>}
        secondary={{ href: "/agent-vocal-ai", label: "Ce face agentul vocal AI Elevio" }}
      />

      <Section
        id="toate-ghidurile"
        title="Toate ghidurile"
        intro={
          <p>
            Vrei să vezi direct produsul? Citește despre{" "}
            <Link href="/receptioner-virtual" className={linkClass}>
              recepționerul virtual
            </Link>
            , despre{" "}
            <Link href="/robot-telefonic-ai" className={linkClass}>
              robotul telefonic AI
            </Link>{" "}
            sau mergi la{" "}
            <Link href="/preturi" className={linkClass}>
              prețuri
            </Link>
            . Exemple pe domenii găsești în pagina{" "}
            <Link href="/industrii" className={linkClass}>
              agent vocal AI pe industrii
            </Link>
            .
          </p>
        }
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {GHIDURI.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/ghid/${g.slug}`}
                className="flex h-full flex-col rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-elevio-accent/10"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
                  {g.eyebrow}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-elevio-dark">{g.titlu}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-elevio-dark/70">
                  {g.descriereCard}
                </p>
                <span className="mt-4 text-xs text-elevio-dark/45">
                  Actualizat: {formatDataRo(g.dateModified)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FaqBlock items={FAQ} />

      <DemoCta />
    </>
  );
}
