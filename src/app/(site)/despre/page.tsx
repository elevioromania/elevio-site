import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  title: "Despre Elevio AI: recepționer vocal AI construit în România",
  description:
    "Elevio AI construiește în România un recepționer vocal AI pentru firmele care trăiesc din telefon: răspunde 24/7 în română și nu improvizează niciodată.",
  path: "/despre",
  absoluteTitle: true,
});

export default function DesprePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Despre noi", path: "/despre" }])} />
      <PageIntro
        eyebrow="Despre noi"
        title="Construim Elevio pentru afaceri care nu-și pot permite să piardă un apel"
      />

      <section className="py-16">
        <div className="container-elevio grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-elevio-dark/75 leading-relaxed">
            <p>
              Suntem o agenție formată pe baza unei viziuni: să ajutăm
              companiile să lucreze mai inteligent, mai eficient și fără
              limite.
            </p>
            <p>
              Am pornit de la o idee simplă: AI-ul nu ar trebui doar să
              răspundă, ci să lucreze.
            </p>
            <p>
              De aici a luat naștere misiunea noastră de a transforma
              inteligența artificială într-un adevărat angajat digital,
              disponibil 24/7. Un AI creat și configurat special pentru
              fiecare companie, capabil să poarte conversații naturale cu
              clienții, să răspundă la întrebări, să facă programări, să
              gestioneze solicitări și să execute acțiuni, iar atunci când o
              situație necesită experiența unui om, să transfere conversația
              către un angajat real.
            </p>
            <p>
              Nu credem că tehnologia trebuie să înlocuiască oamenii. Credem
              că trebuie să îi ajute să fie mai buni.
            </p>
            <p>
              De aceea, construim soluții care preiau munca repetitivă, reduc
              timpul pierdut și permit echipelor să se concentreze pe ceea ce
              contează cu adevărat: clienții, dezvoltarea și creșterea
              companiei.
            </p>
            <p>
              Suntem la începutul drumului, dar avem o ambiție mare: să facem
              AI-ul accesibil, util și indispensabil pentru cât mai multe
              companii.
            </p>
            <p>Iar ceea ce construim astăzi este doar începutul.</p>

            <p className="text-sm text-elevio-dark/50">
              Avem și o divizie de marketing pentru afaceri locale:{" "}
              <Link
                href="/marketing"
                className="font-medium text-elevio-primary underline underline-offset-2 hover:text-elevio-accent"
              >
                Elevio Marketing
              </Link>
              .
            </p>

            <div className="rounded-2xl border border-elevio-border bg-elevio-secondary/30 p-6">
              <h2 className="text-lg font-semibold text-elevio-dark">
                Regula noastră de încredere
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/75">
                Elevio nu improvizează niciodată. Când nu are un răspuns
                sigur la o întrebare, transferă apelul direct pe telefonul
                tău, în câteva secunde. Nu inventează informații despre
                afacerea ta.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-elevio-primary">
              Pe scurt
            </h2>
            <ul className="mt-4 space-y-4 text-sm text-elevio-dark/75">
              <li>
                <strong className="block text-elevio-dark">Poziționare</strong>
                Niciun apel ratat, niciun client pierdut: recepționer vocal
                AI în română, 24/7.
              </li>
              <li>
                <strong className="block text-elevio-dark">Pentru cine</strong>
                Afaceri locale care trăiesc din telefon: clinici stomatologice și medicale, kinetoterapie,
                restaurante, magazine online, meserii, service-uri auto.
              </li>
              <li>
                <strong className="block text-elevio-dark">Exemplu real</strong>
                Clypt România.
              </li>
            </ul>
            <Link
              href="/demo"
              className="mt-6 block rounded-full bg-elevio-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-elevio-dark"
            >
              Programează un demo
            </Link>
          </div>
        </div>

        <div className="container-elevio mt-16 grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-elevio-dark/75 leading-relaxed">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">Cine e în spatele Elevio AI</h2>
            <p>
              Elevio AI e construit în București de{" "}
              <a
                href="https://www.linkedin.com/in/david-morega/"
                className="font-medium text-elevio-primary underline underline-offset-2 hover:text-elevio-accent"
                rel="noopener"
                target="_blank"
              >
                David Morega
              </a>
              , fondator. Fiecare asistent e configurat de echipa noastră pe afacerea clientului, nu lăsat să se
              descurce singur.
            </p>
            <p>
              Lucrăm deja cu clinici stomatologice, un centru de kinetoterapie și restaurante, plus magazine online și
              echipe de vânzări. Clinicile cu care lucrăm au recuperat multe programări cu asistentul, deși aveau deja
              pe cineva la recepție.
            </p>
          </div>

          <div className="space-y-4 text-elevio-dark/75 leading-relaxed">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">Cum lucrăm</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Discutăm la un demo cum sună telefonul la tine: cine sună, când și ce vrea.</li>
              <li>
                Configurăm asistentul pe afacerea ta: programul, serviciile, întrebările frecvente, regulile de
                transfer și calendarul.
              </li>
              <li>Îl conectăm la numărul pe care îl ai deja. Alegi dacă preia toate apelurile sau doar pe cele pierdute.</li>
              <li>Urmărim apelurile și ajustăm răspunsurile, ca asistentul să sune tot mai bine pe domeniul tău.</li>
            </ol>
          </div>

          <div className="space-y-4 text-elevio-dark/75 leading-relaxed">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">Ce nu face asistentul</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Nu se dă drept om: se prezintă de la început ca asistent virtual.</li>
              <li>Nu inventează prețuri, termene sau informații despre afacerea ta.</li>
              <li>Nu ia decizii în locul tău: situațiile neobișnuite ajung la tine.</li>
              <li>Nu te ține captiv: numărul de telefon rămâne al tău.</li>
            </ul>
          </div>

          <div className="space-y-4 text-elevio-dark/75 leading-relaxed">
            <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">Unde ne găsești</h2>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:elevioromania@gmail.com" className="font-medium text-elevio-primary underline underline-offset-2">
                  elevioromania@gmail.com
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/company/144838334"
                  className="font-medium text-elevio-primary underline underline-offset-2"
                  rel="noopener"
                  target="_blank"
                >
                  Elevio AI
                </a>
              </li>
              <li>
                Prețuri și planuri:{" "}
                <Link href="/preturi" className="font-medium text-elevio-primary underline underline-offset-2">
                  pagina de prețuri
                </Link>
              </li>
              <li>
                Ghiduri despre recepția telefonică:{" "}
                <Link href="/ghid" className="font-medium text-elevio-primary underline underline-offset-2">
                  toate ghidurile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-elevio mt-14">
          <Link
            href="/echipa"
            prefetch={false}
            rel="nofollow"
            className="text-xs tracking-wide text-elevio-dark/30 transition-colors hover:text-elevio-dark/60"
          >
            Echipa
          </Link>
        </div>
      </section>
    </>
  );
}
