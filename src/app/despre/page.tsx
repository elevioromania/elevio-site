import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Despre Elevio",
  description:
    "Elevio este recepționerul vocal AI construit pentru afaceri românești care trăiesc din telefon.",
};

export default function DesprePage() {
  return (
    <>
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

            <div className="rounded-2xl border border-elevio-border bg-elevio-secondary/30 p-6">
              <h2 className="text-lg font-semibold text-elevio-dark">
                Regula noastră de încredere
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/75">
                Elevio nu improvizează niciodată. Când nu are un răspuns
                sigur la o întrebare, transferă apelul direct pe telefonul
                tău, în câteva secunde — nu inventează informații despre
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
                Niciun apel ratat, niciun client pierdut — recepționer vocal
                AI în română, 24/7.
              </li>
              <li>
                <strong className="block text-elevio-dark">Pentru cine</strong>
                Restaurante & cafenele, magazine, service-uri auto.
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
      </section>
    </>
  );
}
