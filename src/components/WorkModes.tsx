const MODES = [
  {
    title: "Recepție completă",
    text: "Elevio preia toate apelurile, tot timpul — recepție 100% automatizată, non-stop, fără nicio pauză.",
    live: true,
  },
  {
    title: "Recepție de rezervă",
    text: "Elevio intervine doar când echipa ta nu poate răspunde — ocupată, în pauză, sau în afara programului. Linia rămâne mereu acoperită, fără să înlocuiești pe nimeni.",
    live: false,
  },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

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
              className="group relative overflow-hidden rounded-2xl border border-elevio-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-elevio-accent hover:shadow-xl hover:shadow-elevio-accent/20"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-elevio-accent/10 transition-transform duration-500 group-hover:scale-150"
              />

              <div className="relative flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-elevio-primary text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-elevio-accent group-hover:text-elevio-dark">
                  {mode.live ? (
                    <PhoneIcon className="h-6 w-6" />
                  ) : (
                    <ShieldIcon className="h-6 w-6" />
                  )}
                </div>
                {mode.live && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Non-stop
                  </span>
                )}
              </div>

              <h3 className="relative mt-5 text-xl font-bold text-elevio-dark">
                {mode.title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-elevio-dark/70">
                {mode.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
