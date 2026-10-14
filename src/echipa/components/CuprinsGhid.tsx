"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgresGhid } from "../lib/progres";
import { useProfil } from "./ProfilContext";

export type ParteCuprins = { numar: number; titlu: string; sectiuni: { slug: string; numar: number; titlu: string }[] };

export default function CuprinsGhid({ parti }: { parti: ParteCuprins[] }) {
  const path = usePathname();
  const { profil } = useProfil();
  const citite = useProgresGhid(profil.id).citite ?? [];
  return (
    <nav aria-label="Cuprinsul ghidului" className="space-y-5">
      {parti.map((p) => (
        <div key={p.numar}>
          <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-echipa-muted">
            Partea {p.numar}
            {p.titlu ? `. ${p.titlu}` : ""}
          </p>
          <ul className="space-y-0.5">
            {p.sectiuni.map((s) => {
              const href = `/echipa/app/ghid/${s.slug}`;
              const activ = path === href;
              const citit = citite.includes(s.slug);
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    aria-current={activ ? "page" : undefined}
                    className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm ${
                      activ ? "bg-echipa-accent/15 text-echipa-accent" : "text-echipa-muted hover:bg-white/5 hover:text-echipa-text"
                    }`}
                  >
                    <span className="w-5 shrink-0 text-right tabular-nums opacity-70">{s.numar}.</span>
                    <span className="flex-1">{s.titlu}</span>
                    {citit && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" title="Citit" aria-label="Citit" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
