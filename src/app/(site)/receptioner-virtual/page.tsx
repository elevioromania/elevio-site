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
import StepsGrid from "@/components/landing/StepsGrid";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/components/landing/schema";
import type { Crumb, FaqItem } from "@/components/landing/types";

const PATH = "/receptioner-virtual";
const TITLE = "Recepționer virtual AI în română, non-stop | Elevio AI";
const DESCRIPTION =
  "Recepționer virtual AI pentru afaceri locale: răspunde la telefon 24/7, în română, face programări, trimite SMS și rezumatul apelului. De la 150 €/lună + TVA.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const CRUMBS: Crumb[] = [
  { name: "Acasă", path: "/" },
  { name: "Recepționer virtual", path: PATH },
];

const ZI = [
  {
    title: "07:30, înainte să deschizi",
    text: "Un client sună să se programeze. Recepționerul virtual verifică orele libere din calendar, face programarea și îi trimite SMS de confirmare.",
  },
  {
    title: "13:00, ești ocupat cu un client",
    text: "Telefonul sună. Nu mai trebuie să lași clientul din fața ta: recepționerul AI răspunde și notează cererea.",
  },
  {
    title: "21:30, sâmbătă sau de sărbători",
    text: "Cineva vrea o rezervare pentru a doua zi. Primește răspuns pe loc, iar tu găsești rezervarea și rezumatul apelului când te uiți.",
  },
];

const RESPONSABILITATI = [
  {
    title: "Răspunde la fiecare apel",
    text: "24/7, inclusiv în weekend, de sărbători și în orele de vârf. Pe numărul tău existent.",
  },
  {
    title: "Face programări și rezervări",
    text: "Verifică disponibilitatea în timp real și programează direct în calendar (Cal.com, Calendly).",
  },
  {
    title: "Notează cererile complet",
    text: "Nume, dată, oră și cerințe speciale, transmise echipei gata structurate.",
  },
  {
    title: "Confirmă prin SMS",
    text: "Clientul primește confirmarea imediat după apel.",
  },
  {
    title: "Îți spune ce s-a discutat",
    text: "Transcript și rezumat pentru fiecare apel, fără să asculți înregistrări.",
  },
  {
    title: "Îți dă telefonul când trebuie",
    text: "Dacă nu e sigur de un răspuns, nu improvizează: transferă apelul pe telefonul tău în câteva secunde.",
  },
];

const COMPARATIE = [
  ["Program", "De obicei, programul firmei", "Mereu, dar clientul doar lasă mesaj", "Mereu, dar clientul apasă taste", "24/7, inclusiv weekend și sărbători"],
  ["Când e ocupat cu un client", "Apelul așteaptă sau se pierde", "Ajunge la mesagerie", "Apelul stă în coadă", "Răspunde la telefon în locul tău"],
  ["Programări", "Da", "Nu, doar mesaj", "Nu, doar direcționează apelul", "Da, în calendar, cu SMS de confirmare"],
  ["Mai multe apeluri deodată", "Unul singur", "Da, dar fără conversație", "Coadă de așteptare", "Da, de la 2 la 10, în funcție de plan"],
  ["Concedii, pauze, absențe", "Trebuie acoperite de altcineva", "Nu are", "Nu are", "Nu are"],
  ["Ce rămâne scris după apel", "Ce apucă să noteze", "Înregistrarea, dacă există", "Statistici de apeluri", "Transcript și rezumat pentru fiecare apel"],
  ["Întâmpinarea clienților la birou", "Da", "Nu", "Nu", "Nu, răspunde doar la telefon"],
  ["Situații neobișnuite", "Decide pe loc", "Nimic", "Opțiune din meniu", "Transferă apelul la tine în câteva secunde"],
];

const PASI_START = [
  {
    title: "Demo și discuție",
    text: "Asculți o mostră audio pe domeniul tău și ne spui serviciile, programul și regulile firmei.",
  },
  {
    title: "Configurare în câteva zile",
    text: "Recepționerul virtual e pregătit pe afacerea ta și conectat la calendar și la numărul tău existent.",
  },
  {
    title: "Pornește și răspunde",
    text: "Din acel moment, apelurile sunt preluate. Tu primești rezumatele și preiei doar ce are nevoie de tine.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "Ce este un recepționer virtual?",
    a: "Un recepționer virtual răspunde la telefon în numele firmei tale fără să stea fizic la recepție. Elevio AI este un recepționer virtual cu inteligență artificială: răspunde automat, 24/7, în română, și face programări în calendar.",
  },
  {
    q: "Care e diferența dintre un recepționer virtual și un receptionist AI?",
    a: "„Recepționer virtual” e termenul general. Poate fi o persoană care răspunde de la distanță sau un program cu inteligență artificială. Un receptionist AI (recepționer AI) e varianta automată: răspunde fără om la celălalt capăt și transferă apelul la tine doar când e nevoie.",
  },
  {
    q: "Recepționerul AI poate înlocui complet un angajat?",
    a: "La telefon, preia mare parte din apelurile de rutină: programări, rezervări, comenzi, întrebări. Nu întâmpină clienții la birou și nu ia decizii în locul tău. Când nu e sigur, îți transferă apelul. Pentru costuri, vezi [cât costă un recepționer AI față de un angajat](/ghid/cat-costa-receptioner-ai-2027).",
  },
  {
    q: "Funcționează cu numărul meu de telefon actual?",
    a: "Da. Recepția virtuală Elevio AI folosește numărul pe care îl ai deja. Clienții nu trebuie să afle un număr nou.",
  },
  {
    q: "Clienții află că vorbesc cu un AI?",
    a: "Recomandarea noastră e ca recepționerul să se prezinte de la început ca asistent virtual. E corect față de clienți și ține de obligațiile de transparență din AI Act. Detalii în ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
  },
  {
    q: "Cât costă recepționerul virtual Elevio AI?",
    a: "Planurile pornesc de la 150 €/lună (START), 300 €/lună (PRO) și 600 €/lună (BUSINESS), toate + TVA, plus taxa de implementare. Fără contract pe termen lung. Detalii pe pagina de [prețuri](/preturi).",
  },
  {
    q: "Câte apeluri poate prelua în același timp?",
    a: "Depinde de plan: 2 apeluri simultane la START, 5 la PRO și 10 la BUSINESS. Clienții nu mai primesc „ocupat” când sună mai mulți deodată.",
  },
  {
    q: "În ce limbi vorbește?",
    a: "În română, la toate planurile. De la planul PRO vorbește și engleză.",
  },
  {
    q: "Pot să-l folosesc doar pentru apelurile la care nu răspund?",
    a: "Da. Ai două moduri: preia toate apelurile sau doar pe cele la care nu răspunde nimeni de la firmă. Pe un telefon mobil, al doilea mod se face prin [redirecționarea condiționată](/ghid/redirectionare-apeluri).",
  },
  {
    q: "Ce se întâmplă când nu știe răspunsul?",
    a: "Nu improvizează. Îi spune clientului că îl pune în legătură cu echipa și transferă apelul pe telefonul firmei, sau notează cererea pentru o revenire.",
  },
];

const linkClass =
  "font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4";

export default function ReceptionerVirtualPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={serviceSchema({
          path: PATH,
          name: "Elevio AI, recepționer virtual cu AI",
          description: DESCRIPTION,
        })}
      />

      <LandingHero
        crumbs={CRUMBS}
        eyebrow="Recepție virtuală cu AI"
        title="Recepționer virtual care răspunde la orice oră"
        lead={
          <p>
            Un recepționer virtual răspunde la telefon în numele firmei tale, fără să
            stea fizic la recepție. Elevio AI este un recepționer virtual cu
            inteligență artificială: preia apelurile 24/7, în română, face programări
            în calendar și îți trimite rezumatul fiecărui apel.
          </p>
        }
        secondary={{ href: "/preturi", label: "Vezi prețurile" }}
      />

      <Section
        id="o-zi"
        eyebrow="O zi cu recepționer AI"
        title="Cum arată o zi în care nu mai pierzi apeluri"
        intro={
          <p>
            Exemplu ilustrativ pentru un salon sau un cabinet. Orele și situațiile
            sunt inventate ca să arate cum funcționează, nu sunt date reale.
          </p>
        }
        tinted
      >
        <CardGrid items={ZI} />
      </Section>

      <Section
        id="ce-face"
        eyebrow="Ce face"
        title="Ce face recepționerul virtual Elevio AI"
        intro={
          <p>
            Un receptionist AI bun face partea repetitivă a recepției la telefon și îți
            lasă ție doar ce are nevoie de tine.
          </p>
        }
      >
        <CardGrid items={RESPONSABILITATI} />
      </Section>

      <Section
        id="comparatie"
        eyebrow="Comparație"
        title="Recepționer virtual AI față de alternative"
        intro={
          <p>
            Nu e o întrecere: multe firme îi folosesc împreună. Recepționerul AI
            preia apelurile când angajatul e ocupat, în pauză sau acasă. Despre centrala
            cu meniu, vezi{" "}
            <Link href="/ghid/centrala-telefonica-virtuala-vs-receptioner-ai" className={linkClass}>
              centrală telefonică virtuală sau recepționer AI
            </Link>
            . Despre bani,
            citește{" "}
            <Link href="/ghid/cat-costa-receptioner-ai-2027" className={linkClass}>
              cât costă un recepționer AI în 2027
            </Link>
            .
          </p>
        }
        tinted
      >
        <CompareTable
          head={["", "Angajat la recepție", "Mesagerie vocală", "Centrală cu meniu", "Recepționer virtual AI"]}
          rows={COMPARATIE}
          highlight={4}
          minWidth={820}
        />
      </Section>

      <Section
        id="cum-pornesti"
        eyebrow="Cum pornești"
        title="De la demo la primul apel preluat"
      >
        <StepsGrid steps={PASI_START} />
      </Section>

      <Section
        id="domenii"
        eyebrow="Domenii"
        title="Pentru ce firme e potrivit"
        intro={
          <p>
            Pentru orice firmă la care clienții sună ca să se programeze, să rezerve sau
            să comande: cabinete, clinici, saloane, service-uri auto, restaurante,
            magazine, meserii. Vezi scenariile pe fiecare domeniu în pagina{" "}
            <Link href="/industrii" className={linkClass}>
              recepționer AI pe industrii
            </Link>
            , sau află mai multe despre{" "}
            <Link href="/agent-vocal-ai" className={linkClass}>
              agentul vocal AI
            </Link>{" "}
            din spatele lui.
          </p>
        }
        tinted
      />

      <Section
        id="preturi"
        eyebrow="Prețuri"
        title="Cât costă recepționerul virtual"
      >
        <PricingTeaser />
      </Section>

      <FaqBlock items={FAQ} />

      <Section
        id="cine-suntem"
        eyebrow="Cine suntem"
        title="Cine construiește Elevio AI"
        intro={
          <>
            <p>
              Elevio AI e construit în București de{" "}
              <a href="https://www.linkedin.com/in/david-morega/" className={linkClass} rel="noopener" target="_blank">
                David Morega
              </a>
              , fondator. Configurăm fiecare asistent pe afacerea clientului: programul, serviciile, întrebările
              frecvente, regulile de transfer și calendarul.
            </p>
            <p>
              Lucrăm deja cu clinici stomatologice, un centru de kinetoterapie și restaurante. Clinicile cu care
              lucrăm au recuperat multe programări cu asistentul, deși aveau deja pe cineva la recepție. Mai multe
              despre noi, pe pagina{" "}
              <Link href="/despre" className={linkClass}>
                Despre
              </Link>
              .
            </p>
          </>
        }
      />

      <RelatedLinks
        links={[
          {
            href: "/robot-telefonic-ai",
            title: "Robot telefonic AI pentru programări",
            text: "Prin ce diferă un robot telefonic AI de centrala clasică cu „apăsați tasta 1”.",
          },
          {
            href: "/ghid/ce-este-un-agent-vocal-ai",
            title: "Ce este un agent vocal AI",
            text: "Cum funcționează, ce limite are și când merită pentru o afacere locală.",
          },
          {
            href: "/ghid/ai-act-gdpr-receptioner-ai",
            title: "AI Act și GDPR pentru recepționerul AI",
            text: "Ce trebuie să le spui clienților și cum tratezi înregistrările și transcrierile.",
          },
          {
            href: "/ghid/apeluri-pierdute-firma",
            title: "Apeluri pierdute la firmă",
            text: "Când se pierd apelurile, cum le numeri și ce soluții există, de la cele gratuite la cele automate.",
          },
          {
            href: "/ghid/centrala-telefonica-virtuala-vs-receptioner-ai",
            title: "Centrală telefonică virtuală sau recepționer AI",
            text: "Ce face fiecare și când are sens să le folosești împreună.",
          },
        ]}
      />

      <DemoCta />
    </>
  );
}
