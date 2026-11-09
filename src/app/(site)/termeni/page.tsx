import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { LegalDoc, LegalHeading, LEGAL_CONTACT_EMAIL } from "@/components/LegalDoc";

export const metadata: Metadata = pageMetadata({
  title: "Termeni și condiții",
  description:
    "Termenii și condițiile de utilizare ale site-ului elevio-agency.ro și ale serviciilor Elevio AI: informații, prețuri fără TVA, răspundere și contact.",
  path: "/termeni",
});

export default function TermeniPage() {
  return (
    <LegalDoc title="Termeni și condiții" path="/termeni" updated="26 octombrie 2026">
      <p>
        Acești termeni se aplică folosirii site-ului elevio-agency.ro.
        Folosind site-ul, ești de acord cu ei. Dacă nu ești de acord, te rugăm
        să nu folosești site-ul.
      </p>

      <LegalHeading>1. Despre Elevio</LegalHeading>
      <p>
        Elevio oferă servicii de recepționer vocal AI (un agent vocal care
        preia apelurile unei afaceri, răspunde clienților, face programări și
        transferă apelul către un om când e nevoie) și, prin divizia Elevio
        Marketing, servicii de marketing pentru afaceri locale. Contact:{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>

      <LegalHeading>2. Informațiile de pe site</LegalHeading>
      <p>
        Conținutul site-ului are scop informativ și de prezentare. Ne străduim
        ca informațiile să fie corecte și actualizate, dar ele nu constituie o
        ofertă fermă. Exemplele, rezultatele și studiile de caz prezentate
        descriu situații reale ale unor clienți și nu garantează aceleași
        rezultate pentru orice afacere.
      </p>

      <LegalHeading>3. Prețuri</LegalHeading>
      <p>
        Prețurile afișate pe site sunt exprimate în euro și nu includ TVA.
        La prețul abonamentului se pot adăuga o taxă de implementare și alte
        costuri, în funcție de industrie, volumul de apeluri și integrările
        necesare. Prețul final se stabilește în oferta personalizată și în
        contract.
      </p>

      <LegalHeading>4. Cererile de demo și de ofertă</LegalHeading>
      <p>
        Trimiterea unui formular de pe site nu creează nicio obligație de
        plată și nu încheie un contract. Serviciile se prestează doar pe baza
        unui contract separat, semnat de ambele părți, care prevalează asupra
        acestor termeni.
      </p>

      <LegalHeading>5. Folosirea corectă a site-ului</LegalHeading>
      <p>
        Te rugăm să nu trimiți prin formulare date false sau date ale altor
        persoane fără acordul lor și să nu încerci să perturbi funcționarea
        site-ului sau să accesezi zone la care nu ai drept de acces.
      </p>

      <LegalHeading>6. Proprietate intelectuală</LegalHeading>
      <p>
        Textele, designul, logo-ul, numele Elevio și materialele audio de pe
        site aparțin Elevio sau sunt folosite cu acordul titularilor. Nu le
        poți copia sau folosi în scop comercial fără acordul nostru scris.
      </p>

      <LegalHeading>7. Limitarea răspunderii</LegalHeading>
      <p>
        Facem tot posibilul ca site-ul să funcționeze fără întreruperi, dar
        nu putem garanta acest lucru. În limitele permise de lege, Elevio nu
        răspunde pentru pagube indirecte rezultate din folosirea site-ului sau
        din imposibilitatea de a-l folosi. Răspunderea pentru serviciile
        contractate este stabilită în contractul cu fiecare client.
      </p>

      <LegalHeading>8. Linkuri către alte site-uri</LegalHeading>
      <p>
        Site-ul poate conține linkuri către site-uri externe. Nu răspundem
        pentru conținutul sau politicile acestora.
      </p>

      <LegalHeading>9. Date personale</LegalHeading>
      <p>
        Modul în care prelucrăm datele personale este descris în{" "}
        <Link href="/confidentialitate">Politica de confidențialitate</Link>{" "}
        și în <Link href="/cookies">Politica de cookie-uri</Link>.
      </p>

      <LegalHeading>10. Legea aplicabilă și litigii</LegalHeading>
      <p>
        Acești termeni sunt guvernați de legea română. Orice neînțelegere o
        rezolvăm întâi pe cale amiabilă; dacă nu se poate, este de competența
        instanțelor din România. Consumatorii pot apela și la procedura de
        soluționare alternativă a litigiilor, pe site-ul{" "}
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
          ANPC — SAL
        </a>
        .
      </p>

      <LegalHeading>11. Modificări</LegalHeading>
      <p>
        Putem actualiza acești termeni. Versiunea în vigoare este mereu cea
        publicată pe această pagină, cu data ultimei actualizări de mai sus.
      </p>
    </LegalDoc>
  );
}
