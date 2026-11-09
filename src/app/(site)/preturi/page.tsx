import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import PageIntro from "@/components/PageIntro";
import PricingCards from "@/components/PricingCards";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/landing/Section";
import CompareTable from "@/components/landing/CompareTable";
import RelatedLinks from "@/components/landing/RelatedLinks";
import { PRICING_TIERS } from "@/lib/pricing";
import { breadcrumbJsonLd, receptionistServiceJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  title: "Prețuri recepționer AI și agent vocal AI",
  description:
    "Prețuri Elevio AI: START de la 150 €/lună, PRO de la 300 €/lună, BUSINESS de la 600 €/lună (+ TVA). Recepționer vocal AI în română, 24/7, pentru firme.",
  path: "/preturi",
});

// Rândurile tabelului vin din aceleași planuri ca PricingCards, ca să nu existe
// două surse pentru cifre.
const [START, PRO, BUSINESS] = PRICING_TIERS;
const simultane = (t: (typeof PRICING_TIERS)[number]) =>
  t.features.find((f) => f.includes("apeluri simultane")) ?? "";

const COMPARATIE_PLANURI: string[][] = [
  ["Preț", ...PRICING_TIERS.map((t) => `${t.price}${t.period}`)],
  ["Apeluri pe lună", ...PRICING_TIERS.map((t) => t.calls)],
  ["Apeluri simultane", ...PRICING_TIERS.map(simultane)],
  ["Limbi", "Română", "Română + engleză", "Română + engleză"],
  ["Programări", "Preia cererea cu toate detaliile", "Direct în calendar, cu disponibilitate în timp real", "Ca PRO, pe calendare și departamente multiple"],
  ["Confirmări", "Notificare către echipă", "SMS / WhatsApp", "SMS / WhatsApp"],
  ["Rapoarte", "Rezumat după fiecare apel", "Dashboard cu apeluri și programări", "Dashboard extins + rapoarte lunare și ore de vârf"],
];

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
        title="Prețuri recepționer AI: de la 150 € pe lună + TVA"
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

      <Section
        id="comparatie-planuri"
        eyebrow="Planurile, unul lângă altul"
        title="Ce primești la fiecare plan"
        intro={
          <p>
            Diferența dintre planuri ține de volumul de apeluri, de câte apeluri pot fi preluate în același timp și
            de cât de departe merge programarea: de la preluarea cererii până la programarea direct în calendar.
          </p>
        }
      >
        <CompareTable
          head={["", START.name, PRO.name, BUSINESS.name]}
          rows={COMPARATIE_PLANURI}
          highlight={2}
          minWidth={720}
        />
      </Section>

      <Section
        id="cum-alegi"
        eyebrow="Cum alegi"
        title="Cum alegi planul potrivit"
        tinted
        intro={
          <>
            <p>
              <strong>START</strong> e pentru o afacere locală sau un cabinet individual care vrea să nu mai piardă
              apelurile de seară, din weekend sau din momentele în care nu poate răspunde nimeni. Asistentul preia
              cererea de programare cu toate detaliile, iar echipa o confirmă.
            </p>
            <p>
              <strong>PRO</strong> e pentru cine primește multe cereri de programare și vrea ca asistentul să le
              termine singur: verifică disponibilitatea, face programarea în calendar, se ocupă de reprogramări și
              anulări și trimite confirmarea prin SMS sau WhatsApp. Vorbește și engleză.
            </p>
            <p>
              <strong>BUSINESS</strong> e pentru clinici și firme cu mai multe locații, calendare sau departamente,
              unde apelul trebuie trimis în locul potrivit și unde managementul vrea rapoarte despre orele de vârf.
            </p>
            <p>
              Nu știi câte apeluri primești? Numără apelurile ratate dintr-o săptămână, cum explicăm în ghidul despre{" "}
              <Link className="font-semibold text-elevio-primary underline-offset-4 hover:underline" href="/ghid/apeluri-pierdute-firma">
                apeluri pierdute
              </Link>
              , și pornește de acolo.
            </p>
          </>
        }
      />

      <Section
        id="ce-platesti"
        eyebrow="Fără surprize"
        title="Ce plătești, concret"
        intro={
          <>
            <p>
              Abonamentul lunar, la care se adaugă TVA, plus o taxă de implementare, pentru configurarea asistentului
              pe afacerea ta: programul, serviciile, întrebările frecvente, regulile de transfer și calendarul.
            </p>
            <p>
              Asistentul lucrează pe numărul de telefon pe care îl ai deja. Clienții tăi nu trebuie să învețe un număr
              nou, iar tu alegi dacă preia toate apelurile sau doar pe cele la care nu răspunde nimeni.
            </p>
            <p>
              Prețul final îl stabilim la demo, după volumul de apeluri și integrările de care ai nevoie.
            </p>
          </>
        }
      />

      <PriceAnchor />

      <FAQSection />

      <RelatedLinks
        links={[
          {
            href: "/ghid/cat-costa-receptioner-ai-2027",
            title: "Cât costă un recepționer AI în 2027",
            text: "Recepționer AI față de un angajat la recepție, cu un exemplu de calcul.",
          },
          {
            href: "/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027",
            title: "Agenți vocali AI din România: prețuri publice",
            text: "Comparație între furnizori, cu sursă și dată pentru fiecare preț.",
          },
          {
            href: "/ghid/centrala-telefonica-virtuala-vs-receptioner-ai",
            title: "Centrală telefonică virtuală sau recepționer AI",
            text: "Ce face fiecare și când merită să le folosești împreună.",
          },
        ]}
      />
    </>
  );
}
