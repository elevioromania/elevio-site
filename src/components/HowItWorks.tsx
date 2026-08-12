const STEPS = [
  {
    number: "1",
    title: "Clientul sună pe numărul tău existent",
    text: "Nu schimbi nimic: păstrezi numărul de telefon, iar Elevio răspunde instant, la orice oră — inclusiv când echipa e ocupată sau afacerea e închisă.",
  },
  {
    number: "2",
    title: "Elevio înțelege cererea și se adaptează",
    text: "Preia comanda sau rezervarea, verifică disponibilitatea reală când e cazul, și propune alternative dacă varianta cerută nu e posibilă.",
  },
  {
    number: "3",
    title: "Comanda ajunge notată, gata de procesat",
    text: "Clientul primește confirmare imediat, iar rezervarea sau comanda apare completă, pregătită pentru tine.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white/50 py-20">
      <div className="container-elevio">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
            Cum funcționează
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
            Trei pași. Zero bătăi de cap.
          </h2>
          <p className="mt-4 text-elevio-dark/70">
            Configurarea o facem noi, de la început până la sfârșit. Pentru
            tine și pentru clienții tăi, totul rămâne la fel — doar că
            telefonul nu mai sună în gol.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-elevio-accent/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevio-primary text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-elevio-accent group-hover:text-elevio-dark">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-elevio-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
