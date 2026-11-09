import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import type { Crumb } from "./types";

/**
 * Hero-ul paginilor noi: breadcrumbs, singurul H1 al paginii și răspunsul
 * în primele două propoziții (lead). Stilul urmează PageIntro.
 */
export default function LandingHero({
  crumbs,
  eyebrow,
  title,
  lead,
  meta,
  secondary,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: ReactNode;
  /** Linie mică sub lead, de ex. „Actualizat: 9 noiembrie 2026”. */
  meta?: ReactNode;
  secondary?: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-elevio-border/70 bg-white/50">
      <div
        className={`container-elevio py-14 sm:py-16 ${
          aside ? "grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center" : ""
        }`}
      >
        <div className={aside ? "" : "mx-auto max-w-3xl text-center"}>
          <div className={aside ? "[&_ol]:justify-start" : ""}>
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <span className="mt-6 inline-block text-xs font-bold uppercase tracking-wide text-elevio-primary">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-elevio-dark sm:text-5xl">
            {title}
          </h1>
          <div
            className={`mt-5 space-y-3 text-lg leading-relaxed text-elevio-dark/75 ${
              aside ? "max-w-2xl" : "mx-auto max-w-2xl"
            }`}
          >
            {lead}
          </div>
          {meta && (
            <p className="mt-4 text-xs font-medium text-elevio-dark/50">{meta}</p>
          )}
          <div
            className={`mt-8 flex flex-wrap items-center gap-4 ${
              aside ? "" : "justify-center"
            }`}
          >
            <Link
              href="/demo"
              className="rounded-full bg-elevio-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-elevio-primary/25 transition-colors hover:bg-elevio-dark"
            >
              Programează un demo gratuit
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="text-sm font-semibold text-elevio-primary hover:text-elevio-dark"
              >
                {secondary.label} →
              </Link>
            )}
          </div>
        </div>
        {aside && <div className="flex justify-center lg:justify-end">{aside}</div>}
      </div>
    </section>
  );
}
