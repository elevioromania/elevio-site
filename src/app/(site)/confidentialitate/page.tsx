import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { LegalDoc, LegalHeading, LEGAL_CONTACT_EMAIL } from "@/components/LegalDoc";

export const metadata: Metadata = pageMetadata({
  title: "Politica de confidențialitate",
  description:
    "Politica de confidențialitate Elevio AI: ce date personale colectăm prin site și formulare, de ce le folosim, cât le păstrăm și ce drepturi ai conform GDPR.",
  path: "/confidentialitate",
});

export default function ConfidentialitatePage() {
  return (
    <LegalDoc title="Politica de confidențialitate" path="/confidentialitate" updated="26 octombrie 2026">
      <p>
        Această politică explică ce date personale colectează Elevio prin
        site-ul elevio-agency.ro și în activitatea comercială, de ce le
        folosim, cât timp le păstrăm și ce drepturi ai, conform Regulamentului
        (UE) 2016/679 (GDPR) și legislației române aplicabile.
      </p>

      <LegalHeading>1. Cine suntem</LegalHeading>
      <p>
        Operatorul datelor este Elevio, care oferă servicii de recepționer
        vocal AI (agent vocal pentru apeluri) și servicii de marketing (Elevio
        Marketing). Pentru orice întrebare legată de datele tale ne poți scrie
        la <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>

      <LegalHeading>2. Ce date colectăm</LegalHeading>
      <ul>
        <li>
          <strong>Date din formularele de pe site</strong> (cerere de demo,
          cerere de ofertă Elevio Marketing): nume, număr de telefon, adresă de
          email, tipul afacerii, serviciile care te interesează și, opțional,
          descrierea afacerii tale.
        </li>
        <li>
          <strong>Date din corespondență</strong>: conținutul emailurilor și al
          mesajelor pe care ni le trimiți.
        </li>
        <li>
          <strong>Date de contact profesionale ale potențialilor clienți</strong>{" "}
          (persoane de contact din firme): nume, funcție, firmă, telefon și
          email de serviciu, obținute din surse publice (site-uri ale firmelor,
          registre publice, profile profesionale), pentru a le prezenta
          serviciile Elevio.
        </li>
        <li>
          <strong>Date tehnice</strong>: jurnale tehnice ale serverului (de
          exemplu adresa IP și tipul de browser), păstrate de furnizorul de
          găzduire pentru funcționarea și securitatea site-ului.
        </li>
      </ul>

      <LegalHeading>3. De ce folosim datele și pe ce temei legal</LegalHeading>
      <ul>
        <li>
          <strong>Ca să răspundem cererii tale</strong> (demo, ofertă, mostră
          audio trimisă pe email, telefonul de follow-up). Temei: demersuri
          făcute la cererea ta înaintea încheierii unui contract (art. 6 alin.
          (1) lit. b GDPR).
        </li>
        <li>
          <strong>Ca să prestăm serviciile contractate</strong>. Temei:
          executarea contractului (art. 6 alin. (1) lit. b GDPR).
        </li>
        <li>
          <strong>Prospectare comercială către firme</strong>. Temei: interesul
          nostru legitim de a prezenta serviciile Elevio altor afaceri (art. 6
          alin. (1) lit. f GDPR). Te poți opune oricând, iar atunci nu te mai
          contactăm.
        </li>
        <li>
          <strong>Obligații legale</strong> (facturare, contabilitate). Temei:
          obligație legală (art. 6 alin. (1) lit. c GDPR).
        </li>
        <li>
          <strong>Securitatea site-ului</strong>. Temei: interes legitim (art.
          6 alin. (1) lit. f GDPR).
        </li>
      </ul>
      <p>
        Nu vindem datele tale și nu le folosim pentru decizii automate care să
        aibă efecte juridice asupra ta.
      </p>

      <LegalHeading>4. Apelurile preluate de agentul vocal Elevio</LegalHeading>
      <p>
        Când agentul vocal Elevio răspunde la telefon în numele unui client al
        nostru (de exemplu o clinică sau un restaurant), operatorul datelor
        celor care sună este clientul respectiv, iar Elevio acționează ca
        persoană împuternicită, pe baza contractului încheiat cu acesta. Pentru
        astfel de apeluri, drepturile se exercită în primul rând față de
        afacerea pe care ai sunat-o.
      </p>

      <LegalHeading>5. Cui transmitem datele</LegalHeading>
      <p>
        Folosim furnizori de încredere, care prelucrează datele doar în
        numele nostru și conform instrucțiunilor noastre:
      </p>
      <ul>
        <li>Netlify: găzduirea site-ului;</li>
        <li>Google (Gmail / Google Workspace): email;</li>
        <li>Supabase: baza de date a platformei interne de lucru;</li>
        <li>
          furnizorii tehnologiei de voce și inteligență artificială folosite
          pentru agenții vocali, în cazul clienților care folosesc serviciul.
        </li>
      </ul>
      <p>
        Unii dintre acești furnizori pot prelucra date în afara Spațiului
        Economic European (de exemplu în SUA). În aceste cazuri, transferul se
        face pe baza garanțiilor prevăzute de GDPR, cum ar fi clauzele
        contractuale standard aprobate de Comisia Europeană sau Cadrul UE–SUA
        privind protecția datelor. Putem transmite date și autorităților, doar
        când legea ne obligă.
      </p>

      <LegalHeading>6. Cât timp păstrăm datele</LegalHeading>
      <ul>
        <li>
          Datele din formulare și din corespondență: cel mult 2 ani de la
          ultimul contact, dacă nu devii client.
        </li>
        <li>
          Datele clienților: pe durata contractului și apoi cât cere legea
          (documentele financiar-contabile se păstrează conform legislației
          contabile).
        </li>
        <li>
          Datele de prospectare: cel mult 2 ani, sau până când te opui
          prelucrării.
        </li>
      </ul>

      <LegalHeading>7. Drepturile tale</LegalHeading>
      <p>Conform GDPR, ai dreptul:</p>
      <ul>
        <li>să afli ce date avem despre tine și să primești o copie;</li>
        <li>să ceri corectarea datelor greșite;</li>
        <li>să ceri ștergerea datelor;</li>
        <li>să ceri restricționarea prelucrării;</li>
        <li>să primești datele într-un format structurat (portabilitate);</li>
        <li>
          să te opui prelucrării bazate pe interes legitim, inclusiv
          prospectării comerciale;
        </li>
        <li>să-ți retragi oricând consimțământul, acolo unde l-ai dat.</li>
      </ul>
      <p>
        Pentru oricare dintre aceste drepturi, scrie-ne la{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        Îți răspundem în cel mult o lună. Ai și dreptul să depui o plângere la
        Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter
        Personal (ANSPDCP), la{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">
          www.dataprotection.ro
        </a>
        .
      </p>

      <LegalHeading>8. Securitatea datelor</LegalHeading>
      <p>
        Site-ul folosește conexiune criptată (HTTPS), iar accesul la date este
        limitat la persoanele din echipă care au nevoie de ele pentru a-și face
        treaba.
      </p>

      <LegalHeading>9. Cookie-uri</LegalHeading>
      <p>
        Detalii despre cookie-uri găsești în{" "}
        <Link href="/cookies">Politica de cookie-uri</Link>.
      </p>

      <LegalHeading>10. Modificări</LegalHeading>
      <p>
        Putem actualiza această politică atunci când se schimbă serviciile sau
        legislația. Versiunea în vigoare este mereu cea publicată pe această
        pagină, cu data ultimei actualizări de mai sus.
      </p>
    </LegalDoc>
  );
}
