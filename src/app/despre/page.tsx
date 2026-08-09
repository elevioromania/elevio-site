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
              Elevio a pornit de la o observație simplă: în restaurante,
              magazine și service-uri auto, telefonul sună constant — și
              fiecare apel nepreluat e, de cele mai multe ori, un client
              pierdut. O recepție umană costă mult și nu poate fi disponibilă
              24/7, în weekend sau la ore de vârf.
            </p>
            <p>
              De aceea am construit un recepționer vocal AI care vorbește
              română naturală, preia rezervări și comenzi, răspunde la
              întrebări frecvente și nu se oprește niciodată din lucru.
            </p>
            <p>
              Primul nostru exemplu real este{" "}
              <strong className="text-elevio-dark">DonCafe</strong>, o
              cafenea din București, unde Elevio răspunde deja la telefon și
              preia rezervări direct în calendar.
            </p>

            <div className="rounded-2xl border border-elevio-border bg-elevio-secondary/30 p-6">
              <h2 className="text-lg font-semibold text-elevio-dark">
                Regula noastră de încredere
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/75">
                Elevio nu improvizează niciodată. Când nu are un răspuns
                sigur la o întrebare, spune politicos că redirecționează
                apelul către un om — nu inventează informații despre afacerea
                ta.
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
                Niciun apel pierdut — recepționer vocal AI în română, 24/7.
              </li>
              <li>
                <strong className="block text-elevio-dark">Pentru cine</strong>
                Restaurante & cafenele, magazine, service-uri auto.
              </li>
              <li>
                <strong className="block text-elevio-dark">Exemplu real</strong>
                DonCafe, cafenea din București.
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
