import type { ReactNode } from "react";

/** Secțiune standard cu H2, în stilul secțiunilor de pe homepage. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  tinted = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tinted?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${tinted ? "bg-white/50" : ""}`}>
      <div className="container-elevio">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-elevio-dark sm:text-4xl">
            {title}
          </h2>
          {intro && (
            <div className="mt-4 space-y-3 leading-relaxed text-elevio-dark/70">{intro}</div>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
