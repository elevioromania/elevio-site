import Link from "next/link";

/** CTA final spre /demo, pe fundal închis (ca Header/Footer). */
export default function DemoCta({
  title = "Ascultă-l tu însuți. Apoi decide.",
  text = "Cere un demo gratuit și primești pe email o mostră audio: auzi cum ar răspunde Elevio AI clienților firmei tale. Fără obligații.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="pb-24 pt-8">
      <div className="container-elevio">
        <div className="relative overflow-hidden rounded-3xl bg-elevio-dark px-6 py-14 text-center text-white shadow-2xl shadow-elevio-accent/20 sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-elevio-accent/30 blur-3xl"
          />
          <h2 className="relative text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">{text}</p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="rounded-full bg-elevio-accent px-7 py-3.5 text-sm font-semibold text-elevio-dark shadow-sm transition-colors hover:bg-white"
            >
              Programează un demo gratuit
            </Link>
            <Link
              href="/preturi"
              className="text-sm font-semibold text-white/80 hover:text-elevio-accent"
            >
              Vezi prețurile →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
