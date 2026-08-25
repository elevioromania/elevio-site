import MarketingLeadForm from "@/components/marketing/MarketingLeadForm";

const SERVICES = [
  {
    title: "Recenzii Google Maps",
    text: "Metodă dovedită prin care generăm un volum mare de recenzii reale, într-un timp scurt — profilul tău urcă vizibil în încrederea clienților și în clasamentul local.",
  },
  {
    title: "Optimizare profil Google Maps",
    text: "Poze profesionale, descrieri corecte, meniu sau listă de servicii actualizată, categorii potrivite — profilul care apare când cineva te caută pe hartă, făcut ca lumea.",
  },
  {
    title: "Construire site web",
    text: "Un site simplu, rapid și clar, care prezintă afacerea ta și convertește vizitatori în clienți — nu doar o carte de vizită online.",
  },
  {
    title: "Profile social media",
    text: "Instagram, Facebook, TikTok — creăm și structurăm profilele afacerii tale, gata de conținut, cu identitate vizuală consistentă.",
  },
  {
    title: "Reclame organice și plătite",
    text: "Campanii gândite pentru afaceri locale — de la conținut organic care aduce vizibilitate constantă, până la reclame plătite, targetate exact pe clienții tăi.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Ne spui ce te interesează",
    text: "Completezi formularul mai jos cu serviciile care te interesează și câteva detalii despre afacerea ta.",
  },
  {
    n: "2",
    title: "Primești o ofertă clară",
    text: "Un coleg din echipa Elevio Marketing te sună și îți pregătește o ofertă potrivită, fără angajamente.",
  },
  {
    n: "3",
    title: "Începem treaba",
    text: "Odată de acord, ne apucăm de treabă — de la primele recenzii noi, la profilul optimizat sau site-ul live.",
  },
];

export default function MarketingPage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="container-elevio">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wide text-marketing-accent">
              Elevio Marketing
            </span>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Afacerea ta,{" "}
              <span className="text-marketing-accent">văzută de mai mulți clienți.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Recenzii Google Maps, profil optimizat, site web și social
              media — tot ce are nevoie o afacere locală ca să fie găsită și
              aleasă, gestionat de o singură echipă.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#oferta"
                className="rounded-full bg-marketing-accent px-7 py-3.5 text-sm font-semibold text-marketing-bg shadow-lg shadow-marketing-accent/25 transition-colors hover:bg-white"
              >
                Cere ofertă
              </a>
              <a
                href="#servicii"
                className="rounded-full border border-marketing-border px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Vezi serviciile
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="servicii" className="border-t border-marketing-border py-20">
        <div className="container-elevio">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ce facem
            </h2>
            <p className="mt-4 text-white/70">
              Fiecare serviciu poate fi luat separat sau combinat, în funcție
              de ce are nevoie afacerea ta acum.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl border border-marketing-border bg-marketing-surface p-6 transition-colors hover:border-marketing-accent/50"
              >
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cum-lucram" className="border-t border-marketing-border py-20">
        <div className="container-elevio">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Cum lucrăm
            </h2>
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="flex flex-col gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marketing-accent text-sm font-bold text-marketing-bg">
                  {step.n}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="oferta" className="border-t border-marketing-border py-20">
        <div className="container-elevio grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-marketing-accent">
              Cere ofertă
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hai să vedem ce are nevoie afacerea ta.
            </h2>
            <p className="mt-4 text-white/70">
              Completezi formularul, alegi ce te interesează, iar un coleg
              din echipa Elevio Marketing te contactează cu o ofertă clară.
              Fără obligații.
            </p>
          </div>

          <div className="rounded-3xl border border-marketing-border bg-marketing-surface p-6 sm:p-8">
            <MarketingLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
