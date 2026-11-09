import type { Metadata } from "next";
import Link from "next/link";
import CardGrid from "@/components/landing/CardGrid";
import CompareTable from "@/components/landing/CompareTable";
import DemoCta from "@/components/landing/DemoCta";
import FaqBlock from "@/components/landing/FaqBlock";
import JsonLd from "@/components/landing/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import PricingTeaser from "@/components/landing/PricingTeaser";
import RelatedLinks from "@/components/landing/RelatedLinks";
import Section from "@/components/landing/Section";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/components/landing/schema";
import type { Crumb, FaqItem } from "@/components/landing/types";

const PATH = "/robot-telefonic-ai";
const TITLE = "Robot telefonic AI pentru programări, fără taste | Elevio AI";
const DESCRIPTION =
  "Robot telefonic AI care vorbește liber cu clienții în română, fără taste: face programări în calendar, trimite SMS și transferă apelul la tine când e nevoie.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const CRUMBS: Crumb[] = [
  { name: "Acasă", path: "/" },
  { name: "Robot telefonic AI", path: PATH },
];

const DIFERENTE = [
  ["Cum începe apelul", "„Pentru programări, apăsați tasta 1…”", "„Bună ziua, cu ce vă pot ajuta?”"],
  ["Cum răspunde clientul", "Apasă taste sau spune cuvinte fixe", "Vorbește normal, în română"],
  ["Programarea", "Te pune să aștepți un om sau să lași mesaj", "Verifică disponibilitatea și face programarea în calendar"],
  ["Confirmarea pentru client", "De obicei, niciuna", "SMS de confirmare imediat după apel"],
  ["Ce afli tu", "Cel mult un mesaj vocal", "Transcript și rezumat pentru fiecare apel"],
  ["Întrebări neprevăzute", "Nu le înțelege", "Dacă nu știe sigur, transferă apelul la tine în câteva secunde"],
];

const DIALOG = [
  { cine: "Client", text: "Bună ziua, aș vrea o programare pentru revizie săptămâna asta." },
  { cine: "Robot AI", text: "Bună ziua! Sigur. Ce zi v-ar conveni?" },
  { cine: "Client", text: "Joi, dacă se poate dimineața." },
  { cine: "Robot AI", text: "Joi am liber la 9:00 sau la 11:30. Care vă convine?" },
  { cine: "Client", text: "La 9:00. Și mai am o întrebare despre garanție…" },
  {
    cine: "Robot AI",
    text: "V-am programat joi la 9:00 și primiți acum un SMS de confirmare. Pentru garanție, vă fac imediat legătura cu un coleg.",
  },
];

const CAND_MERITA = [
  {
    title: "Pierzi apeluri când lucrezi",
    text: "Mecanicul e sub mașină, medicul e cu pacientul, coaforul are clientă pe scaun. Robotul telefonic AI răspunde în locul lor.",
  },
  {
    title: "Primești multe cereri de programare",
    text: "Cele mai multe apeluri sunt „când aveți liber?”. Exact asta face bine un robot telefonic pentru programări.",
  },
  {
    title: "Clienții sună și după program",
    text: "Seara, în weekend sau de sărbători, robotul răspunde și programează. Tu găsești totul notat a doua zi.",
  },
  {
    title: "Ai deja un IVR care enervează",
    text: "Dacă oamenii închid în meniu, un robot cu care pot vorbi normal e un pas înainte față de robotul centralei telefonice.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "Ce este un robot telefonic AI?",
    a: "Un robot telefonic AI este un asistent vocal care răspunde la apeluri și discută liber cu clientul, în limbaj natural. Nu redă un meniu cu taste: înțelege ce i se spune și rezolvă cererea, de exemplu o programare.",
  },
  {
    q: "Care e diferența dintre un robot telefonic AI și un IVR?",
    a: "IVR-ul (robotul clasic de centrală) redă un meniu fix și te pune să apeși taste. Robotul telefonic AI ascultă ce spui, înțelege cererea, verifică disponibilitatea în calendar, face programarea și trimite SMS de confirmare.",
  },
  {
    q: "Poate face programări direct în calendarul meu?",
    a: "Da. Elevio AI verifică disponibilitatea în timp real și face programarea în calendar (Cal.com, Calendly). Clientul primește SMS de confirmare.",
  },
  {
    q: "Trebuie să schimb centrala sau numărul de telefon?",
    a: "Nu trebuie să schimbi numărul. Elevio AI răspunde pe numărul pe care îl ai deja. Cum se leagă tehnic de numărul tău stabilim la configurare, care durează câteva zile.",
  },
  {
    q: "Ce face robotul telefonic dacă nu înțelege ceva?",
    a: "Nu improvizează. Dacă nu are un răspuns sigur, transferă apelul pe telefonul tău în câteva secunde.",
  },
  {
    q: "Cât costă un robot telefonic AI pentru programări?",
    a: "La Elevio AI, de la 150 €/lună (START), 300 €/lună (PRO) sau 600 €/lună (BUSINESS), toate + TVA, plus taxa de implementare. Programarea automată în calendar și confirmarea prin SMS sunt incluse de la planul PRO. Detalii pe pagina de [prețuri](/preturi).",
  },
];

const linkClass =
  "font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4";

export default function RobotTelefonicAiPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={serviceSchema({
          path: PATH,
          name: "Elevio AI, robot telefonic AI pentru programări",
          description: DESCRIPTION,
        })}
      />

      <LandingHero
        crumbs={CRUMBS}
        eyebrow="Robot telefonic programări"
        title="Robot telefonic AI pentru programări, fără „apăsați tasta 1”"
        lead={
          <p>
            Un robot telefonic AI este un asistent vocal care răspunde la apeluri și
            vorbește liber cu clientul, în română, în loc să-l pună să apese taste.
            Spre deosebire de robotul clasic de centrală (IVR), Elevio AI înțelege ce
            vrea omul, face programarea în calendar și îi trimite confirmarea prin SMS.
          </p>
        }
        secondary={{ href: "/preturi", label: "Vezi prețurile" }}
      />

      <Section
        id="robot-ai-vs-ivr"
        eyebrow="Robot telefonic AI vs IVR"
        title="Robotul clasic de centrală vs robotul telefonic AI"
        intro={
          <p>
            Robotul de centrală telefonică (IVR) a fost gândit ca să împartă apelurile
            pe departamente. Nu poate face o programare. Un robot telefonic AI poate,
            pentru că înțelege conversația.
          </p>
        }
        tinted
      >
        <CompareTable
          head={["", "Robot clasic (IVR)", "Robot telefonic AI Elevio"]}
          rows={DIFERENTE}
          highlight={2}
        />
      </Section>

      <Section
        id="exemplu-apel"
        eyebrow="Exemplu de apel"
        title="Cum sună o programare prin robotul telefonic AI"
        intro={
          <p>
            Exemplu ilustrativ pentru un service auto, scris de noi ca să arate
            fluxul. Nu e transcriptul unui apel real. Vrei să auzi vocea? Cere un{" "}
            <Link href="/demo" className={linkClass}>
              demo gratuit
            </Link>{" "}
            și primești o mostră audio.
          </p>
        }
      >
        <div className="mx-auto max-w-2xl space-y-3 rounded-3xl border border-elevio-border bg-white p-6 shadow-sm">
          {DIALOG.map((r, i) => (
            <div
              key={i}
              className={`flex ${r.cine === "Robot AI" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  r.cine === "Robot AI"
                    ? "bg-[linear-gradient(135deg,var(--color-elevio-accent),#0ea5e9)] text-white"
                    : "bg-elevio-secondary/40 text-elevio-dark"
                }`}
              >
                <span className="block text-[11px] font-semibold uppercase tracking-wide opacity-70">
                  {r.cine}
                </span>
                {r.text}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="cand-merita"
        eyebrow="Când merită"
        title="Când are sens un robot telefonic AI"
        intro={
          <p>
            Dacă primești două apeluri pe săptămână, probabil nu ai nevoie de el. Dacă
            telefonul sună des și nu poți răspunde mereu, da. Vezi scenariile pe
            domenii în pagina{" "}
            <Link href="/industrii" className={linkClass}>
              robot telefonic pe industrii
            </Link>
            .
          </p>
        }
        tinted
      >
        <CardGrid items={CAND_MERITA} columns={2} />
      </Section>

      <Section
        id="preturi"
        eyebrow="Prețuri"
        title="Cât costă robotul telefonic AI"
        intro={
          <p>
            Același produs ca{" "}
            <Link href="/agent-vocal-ai" className={linkClass}>
              agentul vocal AI
            </Link>{" "}
            Elevio, în trei planuri. Programarea automată în calendar și confirmarea prin SMS sunt incluse de la
            planul PRO.
          </p>
        }
      >
        <PricingTeaser />
      </Section>

      <FaqBlock items={FAQ} />

      <RelatedLinks
        links={[
          {
            href: "/agent-vocal-ai",
            title: "Agent vocal AI în română",
            text: "Ce face agentul vocal AI Elevio, pas cu pas, și pentru cine e potrivit.",
          },
          {
            href: "/receptioner-virtual",
            title: "Recepționer virtual AI",
            text: "Cum arată o zi în care telefonul firmei e preluat 24/7.",
          },
          {
            href: "/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027",
            title: "Agenți vocali AI din România în 2027",
            text: "Comparație onestă între furnizori, cu prețuri publice și sursă.",
          },
        ]}
      />

      <DemoCta />
    </>
  );
}
