import type { Metadata } from "next";
import Link from "next/link";
import { parti, sectiuni } from "@/echipa/lib/ghid";

export const metadata: Metadata = { title: "Ghidul de vânzări" };

export default function GhidPage() {
  const toate = sectiuni();
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Ghidul de vânzări</h1>
      <p className="mt-2 max-w-2xl text-sm text-echipa-muted">
        Citește Partea 1 o dată, ca să înțelegi ce facem și de ce. Partea 2 e „cutia cu unelte”: o ții deschisă când suni.
      </p>
      <div className="mt-6 space-y-8">
        {parti().map((p) => (
          <section key={p.numar}>
            <h2 className="text-lg font-bold">
              Partea {p.numar}
              {p.titlu ? `. ${p.titlu}` : ""}
            </h2>
            {p.html && <div className="ghid-prose mt-3" dangerouslySetInnerHTML={{ __html: p.html }} />}
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {toate
                .filter((s) => s.parte === p.numar)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/echipa/app/ghid/${s.slug}`}
                      className="flex items-center gap-3 rounded-2xl border border-echipa-line/70 bg-echipa-card px-4 py-3 hover:border-echipa-accent/60"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-echipa-accent/15 text-sm font-bold text-echipa-accent">
                        {s.numar}
                      </span>
                      <span className="font-medium">{s.titlu}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
