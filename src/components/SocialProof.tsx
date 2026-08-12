import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="py-16">
      <div className="container-elevio">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-elevio-border bg-white p-8 text-center shadow-sm sm:p-10">
          <Image
            src="/images/clypt-logo.png"
            alt="Clypt România"
            width={64}
            height={64}
            className="rounded-2xl shadow-sm"
          />
          <span className="inline-flex items-center rounded-full bg-elevio-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-elevio-primary">
            Client real
          </span>
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-elevio-dark sm:text-3xl">
            Clypt România a salvat peste 2.000€ prin implementarea unui
            singur agent AI.
          </h2>
          <p className="max-w-xl text-elevio-dark/70">
            Fără personal suplimentar la recepție, fără ore pierdute la
            telefon — rezultatul unei singure implementări Elevio.
          </p>
        </div>
      </div>
    </section>
  );
}
