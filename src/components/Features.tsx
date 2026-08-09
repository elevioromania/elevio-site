const FEATURES = [
  {
    title: "Română naturală",
    text: "Vorbește fluent, cu intonație firească și ton cald, profesionist — nu ca un robot care citește un script.",
  },
  {
    title: "Non-stop, 24/7",
    text: "Răspunde în weekend, de sărbători și în orele de vârf, exact când echipa ta e ocupată cu clienții din locație.",
  },
  {
    title: "Preluare rezervări & comenzi",
    text: "Colectează toate detaliile necesare — nume, dată, oră, cerințe speciale — și le transmite gata structurate echipei tale.",
  },
  {
    title: "Confirmări automate",
    text: "Clientul primește confirmarea prin SMS imediat după apel. Mai puține neprezentări, mai puțină incertitudine.",
  },
  {
    title: "Vizibilitate completă",
    text: "Transcript și rezumat pentru fiecare apel, ca să știi exact ce s-a discutat, fără să asculți ore de înregistrări.",
  },
  {
    title: "Nu improvizează niciodată",
    text: "Când nu are un răspuns sigur, Elevio nu inventează — escaladează politicos apelul către un coleg din echipa ta.",
  },
];

export default function Features() {
  return (
    <section className="bg-white/50 py-20">
      <div className="container-elevio">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
            Funcții
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
            Tot ce face o recepție bună. Fără pauze.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-elevio-dark">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
