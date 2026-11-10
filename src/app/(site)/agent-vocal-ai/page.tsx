import type { Metadata } from "next";
import Link from "next/link";
import AudioProof from "@/components/AudioProof";
import CallDemoCard from "@/components/CallDemoCard";
import CardGrid from "@/components/landing/CardGrid";
import AboutFounder from "@/components/landing/AboutFounder";
import CompareTable from "@/components/landing/CompareTable";
import DemoCta from "@/components/landing/DemoCta";
import FaqBlock from "@/components/landing/FaqBlock";
import JsonLd from "@/components/landing/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import PricingTeaser from "@/components/landing/PricingTeaser";
import RelatedLinks from "@/components/landing/RelatedLinks";
import Section from "@/components/landing/Section";
import StepsGrid from "@/components/landing/StepsGrid";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/components/landing/schema";
import type { Crumb, FaqItem } from "@/components/landing/types";

const PATH = "/agent-vocal-ai";
const TITLE = "Agent vocal AI în română pentru firme, 24/7 | Elevio AI";
const DESCRIPTION =
  "Agent vocal AI care răspunde la telefon în română, 24/7, pe numărul tău: face programări, trimite SMS de confirmare și rezumatul apelului. De la 150 €/lună + TVA.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const CRUMBS: Crumb[] = [
  { name: "Acasă", path: "/" },
  { name: "Agent vocal AI", path: PATH },
];

const STEPS = [
  {
    title: "Clientul sună pe numărul tău",
    text: "Păstrezi numărul de telefon pe care îl ai deja. Agentul vocal AI răspunde imediat, ziua sau noaptea, în weekend și de sărbători.",
  },
  {
    title: "Agentul înțelege și rezolvă cererea",
    text: "Vorbește natural în română, află ce vrea clientul, verifică disponibilitatea în calendar în timp real și notează numele, data, ora și cerințele speciale.",
  },
  {
    title: "Primești totul gata de lucru",
    text: "Clientul primește confirmarea prin SMS. Tu primești transcriptul și rezumatul apelului. Dacă agentul nu e sigur de un răspuns, îți transferă apelul în câteva secunde.",
  },
];

const FEATURES = [
  {
    title: "Răspunde 24/7",
    text: "Preia apelurile în weekend, de sărbători și în orele de vârf, când echipa ta e ocupată cu clienții din locație.",
  },
  {
    title: "Vorbește natural în română",
    text: "Ton cald și intonație firească. Clientul vorbește normal, nu apasă taste și nu ascultă un meniu.",
  },
  {
    title: "Ia programări, rezervări și comenzi",
    text: "Colectează numele, data, ora și cerințele speciale, apoi le trimite echipei tale gata structurate.",
  },
  {
    title: "Programează direct în calendar",
    text: "Verifică disponibilitatea în timp real și face programarea în calendarul tău (Cal.com, Calendly).",
  },
  {
    title: "Confirmă prin SMS",
    text: "Clientul primește un SMS de confirmare imediat după apel, deci știe exact când și unde vine.",
  },
  {
    title: "Nu improvizează",
    text: "Când nu are un răspuns sigur, nu inventează: transferă apelul pe telefonul tău în câteva secunde. După fiecare apel ai transcript și rezumat.",
  },
];

const IVR_ROWS = [
  ["Cum vorbește clientul", "Apasă tasta 1, 2 sau 3", "Spune liber ce vrea, în română"],
  ["Ce rezolvă singur", "Redirecționează sau redă un mesaj înregistrat", "Ia programarea, rezervarea sau comanda, cu toate detaliile"],
  ["Calendarul", "Nu știe de calendar", "Verifică disponibilitatea și programează în timp real"],
  ["Confirmarea", "De obicei, niciuna", "SMS de confirmare către client"],
  ["Ce afli tu după apel", "Cel mult că a sunat cineva", "Transcript și rezumat pentru fiecare apel"],
  ["Când nu știe", "Clientul rămâne în meniu sau închide", "Transferă apelul pe telefonul tău în câteva secunde"],
];

const FAQ: FaqItem[] = [
  {
    q: "Ce este un agent vocal AI?",
    a: "Un agent vocal AI este un asistent bazat pe inteligență artificială care răspunde la telefon, înțelege ce spune clientul și îi răspunde cu voce, în limbaj natural. Elevio AI este un agent vocal AI în română care preia apelurile firmei tale 24/7. Detalii în ghidul [Ce este un agent vocal AI](/ghid/ce-este-un-agent-vocal-ai).",
  },
  {
    q: "Trebuie să îmi schimb numărul de telefon?",
    a: "Nu. Agentul vocal AI Elevio răspunde pe numărul pe care îl ai deja. Clienții tăi sună exact ca până acum.",
  },
  {
    q: "Agentul vocal AI vorbește bine românește?",
    a: "Da. Elevio AI vorbește română naturală, cu intonație firească. Cel mai simplu e să-l auzi: cere un [demo gratuit](/demo) și primești o mostră audio pe email.",
  },
  {
    q: "Ce se întâmplă dacă agentul nu știe răspunsul?",
    a: "Nu improvizează. Dacă nu are un răspuns sigur, transferă apelul pe telefonul tău în câteva secunde. Ce s-a discutat găsești în transcriptul și rezumatul apelului.",
  },
  {
    q: "Cât costă un agent vocal AI?",
    a: "La Elevio AI, planurile pornesc de la 150 €/lună (START), 300 €/lună (PRO) și 600 €/lună (BUSINESS), toate + TVA, plus taxa de implementare. Vezi detaliile pe pagina de [prețuri](/preturi) și comparația cu alți furnizori din [ghidul agenților vocali AI din România](/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027).",
  },
  {
    q: "Cât durează până pornește și există contract pe termen lung?",
    a: "Configurarea durează câteva zile. Nu există contract pe termen lung.",
  },
  {
    q: "Câte apeluri preia în același timp?",
    a: "2 apeluri simultane la START, 5 la PRO și 10 la BUSINESS. Clienții nu mai primesc „ocupat” când sună mai mulți deodată.",
  },
  {
    q: "Pot să-l pun doar pe apelurile la care nu răspund?",
    a: "Da. Agentul poate prelua toate apelurile sau doar pe cele la care nu răspunde nimeni. Pe mobil se face cu [redirecționarea condiționată](/ghid/redirectionare-apeluri).",
  },
  {
    q: "Clienții află că vorbesc cu un AI?",
    a: "Da. Agentul se prezintă ca asistent virtual din prima frază. E corect față de clienți și e cerut de AI Act. Detalii în ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
  },
];

export default function AgentVocalAiPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={serviceSchema({
          path: PATH,
          name: "Elevio AI, agent vocal AI în limba română",
          description: DESCRIPTION,
        })}
      />

      <LandingHero
        crumbs={CRUMBS}
        eyebrow="Agent vocal AI România"
        title="Agent vocal AI care răspunde la telefon pentru firma ta"
        lead={
          <>
            <p>
              Un agent vocal AI este un asistent cu inteligență artificială care
              răspunde la telefon în locul tău, vorbește natural cu clientul și
              rezolvă cererea: programare, rezervare, comandă sau întrebare. Elevio AI
              este un agent vocal AI în română care preia apelurile firmei tale 24/7,
              pe numărul pe care îl ai deja.
            </p>
          </>
        }
        secondary={{ href: "/preturi", label: "Vezi prețurile" }}
        aside={<CallDemoCard />}
      />

      <Section
        id="cum-functioneaza"
        eyebrow="Cum funcționează"
        title="Trei pași, de la apel la programare"
        intro={
          <p>
            Pentru clienții tăi nu se schimbă nimic: sună la același număr. Diferența
            e că acum cineva răspunde de fiecare dată.
          </p>
        }
        tinted
      >
        <StepsGrid steps={STEPS} />
      </Section>

      <Section
        id="ce-face"
        eyebrow="Ce face"
        title="Ce face agentul vocal AI Elevio"
        intro={
          <p>
            Un agent AI vocal bun face ce face o recepție bună, fără pauze. Și știe
            când să-ți dea ție telefonul.
          </p>
        }
      >
        <CardGrid items={FEATURES} />
      </Section>

      <AudioProof />

      <Section
        id="pentru-cine"
        eyebrow="Pentru cine"
        title="Pentru firmele care pierd apeluri"
        intro={
          <>
            <p>
              Agentul vocal AI e util oriunde clienții sună ca să facă o programare, o
              rezervare sau o comandă: cabinete medicale și stomatologice, saloane,
              service-uri auto, restaurante, magazine, meserii și servicii la domiciliu.
            </p>
            <p>
              Contează mai ales când telefonul sună în timp ce lucrezi cu un client,
              după program sau în weekend. Vezi exemple pe domenii în pagina{" "}
              <Link
                href="/industrii"
                className="font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4"
              >
                agent vocal AI pe industrii
              </Link>
              .
            </p>
          </>
        }
        tinted
      />

      <Section
        id="diferenta-ivr"
        eyebrow="Agent vocal AI vs IVR"
        title="Prin ce diferă de robotul cu „apăsați tasta 1”"
        intro={
          <p>
            Un IVR (robotul clasic de centrală) redă un meniu și așteaptă să apeși o
            tastă. Un agent vocal AI ascultă ce spune omul și rezolvă cererea. Mai
            multe în pagina despre{" "}
            <Link
              href="/robot-telefonic-ai"
              className="font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4"
            >
              robotul telefonic AI
            </Link>
            .
          </p>
        }
      >
        <CompareTable
          head={["", "IVR clasic", "Agent vocal AI Elevio"]}
          rows={IVR_ROWS}
          highlight={2}
        />
      </Section>

      <Section
        id="preturi"
        eyebrow="Prețuri"
        title="Cât costă agentul vocal AI"
        intro={
          <p>
            Trei planuri, în funcție de câte apeluri primești. Prețuri publice, fără
            contract pe termen lung.
          </p>
        }
        tinted
      >
        <PricingTeaser />
      </Section>

      <FaqBlock items={FAQ} />

      <AboutFounder />

      <RelatedLinks
        links={[
          {
            href: "/receptioner-virtual",
            title: "Recepționer virtual AI",
            text: "Ce face un recepționer virtual și cum arată o zi în care nu mai pierzi apeluri.",
          },
          {
            href: "/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027",
            title: "Agenți vocali AI din România în 2027",
            text: "Comparație cu prețuri publice, criterii clare și unde sunt alții mai buni.",
          },
          {
            href: "/ghid/cat-costa-receptioner-ai-2027",
            title: "Cât costă un recepționer AI în 2027",
            text: "Costul unui agent vocal AI față de un angajat la recepție, cu un exemplu de calcul.",
          },
          {
            href: "/ghid/apeluri-pierdute-firma",
            title: "Apeluri pierdute la firmă",
            text: "De ce se pierd apelurile și cum le recuperezi.",
          },
        ]}
      />

      <DemoCta />
    </>
  );
}
