import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/echipa/components/ui";
import { BRAND, CONTACT_EMAIL, SITE } from "@/echipa/config";

export const metadata: Metadata = { title: "Termeni și condiții" };

const ACTUALIZAT = "17 octombrie 2026";

// Termenii pe care îi acceptă cine își face cont în platforma echipei.
const SECTIUNI: { titlu: string; paragrafe: string[] }[] = [
  {
    titlu: "1. Ce este platforma",
    paragrafe: [
      `Platforma echipei ${BRAND} (denumită în continuare „platforma”) este spațiul de lucru intern al celor care colaborează cu ${BRAND} pentru a prezenta recepționerul AI afacerilor locale. Aici găsești ghidul, scripturile, lead-urile alocate, calendarul de întâlniri și evidența comisioanelor.`,
      "Prin crearea contului și bifarea căsuței „Accept termenii și condițiile” confirmi că ai citit acești termeni și ești de acord cu ei.",
    ],
  },
  {
    titlu: "2. Contul tău",
    paragrafe: [
      "Contul se creează doar cu un cod de invitație. Datele pe care le dai la înscriere trebuie să fie reale și să-ți aparțină.",
      "Contul este personal. Nu îți împarți parola și nu lași pe altcineva să lucreze din contul tău. Dacă bănuiești că cineva ți-a aflat parola, o schimbi imediat și anunți echipa.",
      `${BRAND} poate dezactiva oricând un cont, de exemplu la încetarea colaborării sau dacă acești termeni nu sunt respectați. Lead-urile alocate rămân în platformă și pot fi realocate.`,
    ],
  },
  {
    titlu: "3. Colaborarea",
    paragrafe: [
      `Folosirea platformei nu creează un contract de muncă între tine și ${BRAND}. Colaborarea, comisioanele și bonusurile se stabilesc după regulile comunicate în platformă la momentul respectiv, iar evidența lor se ține în secțiunea de câștiguri.`,
      "Un comision se datorează doar pentru rezultatele confirmate de echipa de closing, în condițiile afișate în platformă. Cifrele din platformă sunt orientative până la confirmarea plății.",
    ],
  },
  {
    titlu: "4. Cum vorbești cu afacerile",
    paragrafe: [
      `Când suni în numele ${BRAND}, urmezi ghidul și scripturile din platformă, ești politicos și nu faci promisiuni pe care nu le poți ține: fără prețuri exacte, reduceri sau garanții în afara celor din ghid.`,
      "Dacă o persoană îți cere să nu mai fie sunată, respecți cererea și marchezi lead-ul corespunzător în platformă.",
    ],
  },
  {
    titlu: "5. Confidențialitate",
    paragrafe: [
      `Lead-urile, datele de contact ale afacerilor, scripturile, ghidul, prețurile și orice alt material din platformă sunt confidențiale și aparțin ${BRAND}.`,
      `Le folosești doar pentru activitatea făcută pentru ${BRAND}. Nu le copiezi, nu le exporți, nu le dai mai departe și nu le folosești în alt scop, nici în timpul colaborării, nici după încheierea ei.`,
    ],
  },
  {
    titlu: "6. Datele tale personale",
    paragrafe: [
      "La înscriere și în timp ce folosești platforma păstrăm: prenumele și numele, adresa de e-mail, numărul de telefon, parola (doar în formă criptată, nimeni nu o poate citi) și activitatea ta în platformă (apeluri înregistrate, statusurile lead-urilor, întâlnirile predate, comisioanele și insignele).",
      `Prin acceptarea acestor termeni ești de acord ca ${BRAND} să păstreze și să folosească datele de la înscriere și cele din activitatea ta pentru: administrarea contului, comunicarea cu tine (inclusiv pe WhatsApp și e-mail), calculul și plata comisioanelor, statistici interne și clasamentul echipei.`,
      "Datele sunt păstrate pe toată durata colaborării și, după aceea, cât timp sunt necesare pentru evidențele contabile și obligațiile legale. Restul datelor le ștergem la cererea ta.",
      "Datele sunt găzduite la furnizori din Uniunea Europeană sau cu garanții echivalente (baza de date Supabase, în Irlanda, și găzduirea site-ului prin Netlify). Nu vindem și nu închiriem datele tale nimănui.",
      `Ai dreptul să ceri acces la datele tale, corectarea, ștergerea sau o copie a lor și să te opui unei prelucrări. Scrie-ne la ${CONTACT_EMAIL}. Ai și dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).`,
    ],
  },
  {
    titlu: "7. Datele afacerilor pe care le suni",
    paragrafe: [
      "Lead-urile conțin date de contact ale unor afaceri și, uneori, ale persoanelor de contact din ele. Le folosești doar pentru a prezenta serviciile Elevio, nu le salvezi în afara platformei și nu adaugi informații care nu au legătură cu activitatea.",
    ],
  },
  {
    titlu: "8. Folosirea platformei",
    paragrafe: [
      "Platforma este oferită așa cum este. Facem tot ce putem să funcționeze bine, dar pot exista întreruperi, erori sau modificări. Nu încerci să accesezi date care nu îți sunt destinate și nu folosești platforma pentru altceva decât activitatea pentru Elevio.",
    ],
  },
  {
    titlu: "9. Modificări",
    paragrafe: [
      "Acești termeni se pot actualiza. Versiunea în vigoare este mereu cea de pe această pagină, iar schimbările importante le anunțăm în platformă. Dacă folosești în continuare platforma după o modificare, înseamnă că ești de acord cu noua versiune.",
    ],
  },
  {
    titlu: "10. Legea aplicabilă și contact",
    paragrafe: [
      "Acești termeni sunt guvernați de legea română. Orice neînțelegere încercăm să o rezolvăm mai întâi pe cale amiabilă.",
      `Pentru orice întrebare despre acești termeni sau despre datele tale: ${CONTACT_EMAIL} · ${SITE}.`,
    ],
  },
];

export default function TermeniPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-14">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Logo />
        <Link href="/echipa/inscriere" className="text-sm text-echipa-accent hover:underline">
          Înapoi la înscriere
        </Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Termeni și condiții</h1>
      <p className="mt-2 text-sm text-echipa-muted">Platforma echipei {BRAND} · actualizat la {ACTUALIZAT}</p>
      <div className="mt-8 space-y-8">
        {SECTIUNI.map((s) => (
          <section key={s.titlu}>
            <h2 className="mb-3 text-lg font-semibold">{s.titlu}</h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-echipa-text/85">
              {s.paragrafe.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
