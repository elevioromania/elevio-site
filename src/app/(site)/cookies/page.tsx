import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { LegalDoc, LegalHeading, LEGAL_CONTACT_EMAIL } from "@/components/LegalDoc";

export const metadata: Metadata = pageMetadata({
  title: "Politica de cookie-uri",
  description:
    "Politica de cookie-uri Elevio AI: site-ul elevio-agency.ro nu folosește cookie-uri de statistică, marketing sau urmărire, doar elemente strict necesare.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalDoc title="Politica de cookie-uri" path="/cookies" updated="26 octombrie 2026">
      <LegalHeading>1. Ce sunt cookie-urile</LegalHeading>
      <p>
        Cookie-urile sunt fișiere text mici pe care un site le salvează în
        browserul tău. Unele sunt necesare ca site-ul să funcționeze, altele
        sunt folosite pentru statistici sau reclame.
      </p>

      <LegalHeading>2. Ce cookie-uri folosim</LegalHeading>
      <p>
        <strong>
          Site-ul elevio-agency.ro nu folosește cookie-uri de statistică, de
          marketing sau de urmărire.
        </strong>{" "}
        Nu folosim Google Analytics, Meta Pixel sau alte instrumente de
        urmărire a vizitatorilor.
      </p>
      <p>
        Folosim doar elemente strict necesare pentru funcționare, care nu au
        nevoie de acordul tău:
      </p>
      <ul>
        <li>
          <strong>Cookie-uri de autentificare</strong> pentru platforma internă
          a echipei Elevio. Se setează doar pentru membrii echipei care se
          loghează și sunt necesare ca sesiunea să rămână activă.
        </li>
        <li>
          <strong>Preferințe de afișare</strong> salvate local în browser (de
          exemplu modul de vizualizare a listelor), tot doar în platforma
          internă a echipei.
        </li>
      </ul>
      <p>
        Furnizorul de găzduire poate folosi elemente tehnice strict necesare
        pentru livrarea paginilor în siguranță.
      </p>

      <LegalHeading>3. Dacă se schimbă ceva</LegalHeading>
      <p>
        Dacă vom adăuga vreodată cookie-uri de statistică sau de marketing, le
        vom activa doar după ce îți cerem acordul, printr-un mesaj afișat pe
        site, și vom actualiza această pagină.
      </p>

      <LegalHeading>4. Cum poți controla cookie-urile</LegalHeading>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului. Dacă
        blochezi cookie-urile strict necesare, unele funcții (de exemplu
        autentificarea în platforma echipei) nu vor mai merge.
      </p>

      <LegalHeading>5. Contact</LegalHeading>
      <p>
        Pentru întrebări, scrie-ne la{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        Detalii despre prelucrarea datelor personale găsești în{" "}
        <Link href="/confidentialitate">Politica de confidențialitate</Link>.
      </p>
    </LegalDoc>
  );
}
