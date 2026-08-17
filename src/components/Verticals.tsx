import Link from "next/link";

const VERTICALS = [
  {
    tag: "restaurant",
    title: "Restaurante & cafenele",
    text: "Rezervări preluate non-stop — inclusiv vineri seara, când tot personalul e în tură. Numărul de persoane, ora și numele, notate exact.",
    tags: "Restaurante · cafenele · grupuri HoReCa",
  },
  {
    tag: "magazin",
    title: "Magazine",
    text: "Program, stoc, comenzi și întrebări frecvente — preluate imediat, fără să suni degeaba clientul înapoi peste o oră.",
    tags: "Magazine locale · lanțuri de retail · showroom-uri",
  },
  {
    tag: "service_auto",
    title: "Service-uri auto",
    text: "Programări la revizie sau intervenții, cu marca, modelul și problema mașinii preluate din telefon — mecanicii știu exact ce îi așteaptă.",
    tags: "Service-uri auto · ateliere · vulcanizări",
  },
  {
    tag: "medical",
    title: "Cabinete medicale & clinici",
    text: "Programări preluate corect din prima — dată, oră, tip de consultație — fără să aglomerezi recepția între doi pacienți.",
    tags: "Cabinete stomatologice · clinici · cabinete individuale",
  },
  {
    tag: "beauty",
    title: "Saloane & studiouri beauty",
    text: "Programări pe stilist sau specialist, confirmate automat prin SMS — clienta știe exact când și la cine vine.",
    tags: "Saloane de coafură · manichiură · cosmetică",
  },
  {
    tag: "altul",
    title: "Orice afacere care răspunde la telefon",
    text: "Nu te încadrezi în categoriile de mai sus? Elevio se adaptează pe serviciile și regulile oricărei afaceri — dacă ai clienți care sună, funcționează.",
    tags: "Servicii, birouri, cabinete — orice domeniu",
  },
];

export default function Verticals() {
  return (
    <section className="py-20">
      <div className="container-elevio">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
            Pentru cine
          </h2>
          <p className="mt-4 text-elevio-dark/70">
            Elevio se configurează pe serviciile, programul și regulile tale
            — nu e un robot generic care citește un meniu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VERTICALS.map((v) => (
            <div
              key={v.tag}
              className="flex flex-col rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-elevio-dark">
                {v.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-elevio-dark/70">
                {v.text}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-elevio-dark/40">
                {v.tags}
              </p>
              <Link
                href={`/demo?tip=${v.tag}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-elevio-primary hover:text-elevio-dark"
              >
                Vreau demo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
