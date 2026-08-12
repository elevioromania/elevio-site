import FAQ from "./FAQ";

export default function FAQSection() {
  return (
    <section className="pb-24">
      <div className="container-elevio">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-elevio-dark">
            Întrebări frecvente
          </h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}
