import FAQ from "./FAQ";

export default function FAQSection() {
  return (
    <section className="pb-24">
      <div className="container-elevio">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
            Întrebări frecvente
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
            Întrebările pe care le-am primi oricum
          </h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}
