import Link from "next/link";
import type { TipDemo } from "@/lib/industrii";

export default function CtaIndustrie({
  titlu,
  text,
  tipDemo,
}: {
  titlu: string;
  text: string;
  tipDemo?: TipDemo;
}) {
  const demoHref = tipDemo ? `/demo?tip=${tipDemo}` : "/demo";
  return (
    <section className="relative overflow-hidden bg-elevio-dark">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-96 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-elevio-accent), transparent)",
        }}
      />
      <div className="container-elevio relative py-16 text-center md:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {titlu}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={demoHref}
            className="rounded-full bg-elevio-accent px-7 py-3.5 text-center text-sm font-semibold text-elevio-dark shadow-lg shadow-elevio-accent/20 transition-colors hover:bg-white"
          >
            Cere un demo gratuit
          </Link>
          <Link
            href="/preturi"
            className="rounded-full border border-white/20 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Vezi prețurile
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/50">
          Vrei să afli întâi cum funcționează?{" "}
          <Link
            href="/agent-vocal-ai"
            className="font-semibold text-elevio-accent hover:text-white"
          >
            Ce este un agent vocal AI
          </Link>
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/40">
          De la 150€/lună + TVA · Configurare în câteva zile · Fără contract pe
          termen lung
        </p>
      </div>
    </section>
  );
}
