import Link from "next/link";
import type { LinkCard } from "./types";

/** Linkuri interne cu ancore descriptive. */
export default function RelatedLinks({
  title = "Citește și",
  links,
}: {
  title?: string;
  links: LinkCard[];
}) {
  return (
    <section className="py-16">
      <div className="container-elevio">
        <h2 className="text-2xl font-extrabold tracking-tight text-elevio-dark">{title}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex h-full flex-col rounded-2xl border border-elevio-border bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="font-semibold text-elevio-dark">{l.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-elevio-dark/65">
                  {l.text}
                </span>
                <span className="mt-3 text-sm font-semibold text-elevio-primary">Citește →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
