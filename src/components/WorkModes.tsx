const MODES = [
  {
    title: "Recepție completă",
    text: "Elevio preia toate apelurile, tot timpul — recepție 100% automatizată, non-stop, fără nicio pauză.",
  },
  {
    title: "Recepție de rezervă",
    text: "Elevio intervine doar când echipa ta nu poate răspunde — ocupată, în pauză, sau în afara programului. Linia rămâne mereu acoperită, fără să înlocuiești pe nimeni.",
  },
];

export default function WorkModes() {
  return (
    <section className="bg-elevio-secondary py-16">
      <div className="container-elevio">
        <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
          Alegi cum lucrează Elevio pentru tine
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {MODES.map((mode) => (
            <div
              key={mode.title}
              className="rounded-2xl border border-elevio-border bg-white p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-elevio-dark">
                {mode.title}
              </h3>
              <p className="mt-3 leading-relaxed text-elevio-dark/70">
                {mode.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
