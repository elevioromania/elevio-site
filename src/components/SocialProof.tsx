export default function SocialProof() {
  return (
    <section className="py-16">
      <div className="container-elevio">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-elevio-border bg-white p-8 text-center shadow-sm sm:p-10">
          <span className="inline-flex items-center rounded-full bg-elevio-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-elevio-primary">
            Client real
          </span>
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-elevio-dark sm:text-3xl">
            Primul nostru client: DonCafe, București
          </h2>
          <p className="max-w-xl text-elevio-dark/70">
            Client activ din august 2026. Elevio răspunde la telefon în
            locul recepției, preia rezervările, verifică disponibilitatea
            direct în calendar și trimite confirmarea — fără să implice
            echipa DonCafe.
          </p>
        </div>
      </div>
    </section>
  );
}
