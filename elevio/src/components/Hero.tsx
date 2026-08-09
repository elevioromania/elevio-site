import Link from "next/link";
import CallDemoCard from "./CallDemoCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-elevio-dark">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-96 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-elevio-accent), transparent)",
        }}
      />
      <div className="container-elevio grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-elevio-accent">
            Recepționer vocal AI · România
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Niciun apel pierdut.
            <br />
            Nicio programare ratată.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Elevio este recepționerul vocal AI care răspunde clienților tăi în
            română, 24/7 — preia rezervări, răspunde la întrebări și
            escaladează la un om ori de câte ori e nevoie. Cald și natural,
            nu ca un robot.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="rounded-full bg-elevio-accent px-7 py-3.5 text-center text-sm font-semibold text-elevio-dark shadow-lg shadow-elevio-accent/20 transition-colors hover:bg-white"
            >
              Programează un demo gratuit
            </Link>
            <Link
              href="/preturi"
              className="rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Vezi prețurile
            </Link>
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-white/40">
            Răspunde în ~1 secundă · 24/7 · În română
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CallDemoCard />
        </div>
      </div>
    </section>
  );
}
