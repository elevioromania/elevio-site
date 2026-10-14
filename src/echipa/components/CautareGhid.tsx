"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { normal } from "../lib/format";
import { IconCautare } from "./icons";

export type IntrareCautare = { href: string; titlu: string; eticheta?: string; text: string };

// Căutare în browser, fără serviciu extern.
export default function CautareGhid({ intrari, placeholder = "Caută în ghid" }: { intrari: IntrareCautare[]; placeholder?: string }) {
  const [q, setQ] = useState("");
  const id = useId();

  const rezultate = useMemo(() => {
    const cuvinte = normal(q.trim()).split(/\s+/).filter((c) => c.length > 1);
    if (!cuvinte.length) return [];
    return intrari
      .map((i) => {
        const text = normal(i.text);
        const titlu = normal(i.titlu);
        if (!cuvinte.every((c) => text.includes(c) || titlu.includes(c))) return null;
        const poz = Math.max(0, text.indexOf(cuvinte[0]));
        const start = Math.max(0, poz - 60);
        const fragment = (start > 0 ? "..." : "") + i.text.slice(start, poz + 120).trim() + "...";
        const scor = cuvinte.filter((c) => titlu.includes(c)).length;
        return { ...i, fragment, scor };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.scor - a.scor)
      .slice(0, 12);
  }, [q, intrari]);

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <IconCautare className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-echipa-muted" />
      <input id={id} type="search" className="camp pl-10" placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
      {q.trim().length > 1 && (
        <div className="mt-2 rounded-2xl border border-echipa-line bg-echipa-card-2 p-2" aria-live="polite">
          {rezultate.length === 0 ? (
            <p className="px-3 py-2 text-sm text-echipa-muted">Niciun rezultat.</p>
          ) : (
            <ul>
              {rezultate.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} onClick={() => setQ("")} className="block rounded-xl px-3 py-2 hover:bg-white/5">
                    <span className="text-sm font-semibold text-echipa-text">{r.titlu}</span>
                    {r.eticheta && <span className="ml-2 text-xs text-echipa-muted">{r.eticheta}</span>}
                    <span className="mt-0.5 block text-xs leading-relaxed text-echipa-muted">{r.fragment}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
