"use client";

import { useMemo, useState } from "react";
import type { ElementGhid } from "../lib/ghid";
import { normal } from "../lib/format";
import { IconCautare } from "./icons";

// Listă de obiecții sau întrebări, cu căutare și filtre (categorii sau elemente).
export default function ListaFiltrabila({
  elemente,
  filtre,
  tipFiltru,
  placeholder,
  deschiseImplicit = false,
}: {
  elemente: ElementGhid[];
  filtre: string[];
  tipFiltru: "categorie" | "element";
  placeholder: string;
  deschiseImplicit?: boolean;
}) {
  const [q, setQ] = useState("");
  const [filtru, setFiltru] = useState<string | null>(null);

  const vizibile = useMemo(() => {
    const cuvinte = normal(q.trim()).split(/\s+/).filter(Boolean);
    return elemente.filter((e) => {
      if (filtru && (tipFiltru === "categorie" ? e.categorie !== filtru : e.titlu !== filtru)) return false;
      const t = normal(e.text);
      return cuvinte.every((c) => t.includes(c));
    });
  }, [elemente, q, filtru, tipFiltru]);

  return (
    <div>
      <div className="relative">
        <label htmlFor="cautare-lista" className="sr-only">
          {placeholder}
        </label>
        <IconCautare className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-echipa-muted" />
        <input id="cautare-lista" type="search" className="camp pl-10" placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtre">
        <Chip activ={filtru === null} onClick={() => setFiltru(null)}>
          Toate
        </Chip>
        {filtre.map((f) => (
          <Chip key={f} activ={filtru === f} onClick={() => setFiltru(filtru === f ? null : f)}>
            {f.replace(/^„|”$/g, "")}
          </Chip>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {vizibile.length === 0 && <p className="text-sm text-echipa-muted">Nimic nu se potrivește căutării.</p>}
        {vizibile.map((e) => (
          <details key={e.id} id={e.id} open={deschiseImplicit || Boolean(q) || Boolean(filtru)} className="group rounded-2xl border border-echipa-line/70 bg-echipa-card">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-3.5 font-semibold">
              <span>{e.titlu}</span>
              <span className="mt-0.5 text-echipa-accent transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="ghid-prose border-t border-echipa-line/60 px-4 py-4" dangerouslySetInnerHTML={{ __html: e.html }} />
          </details>
        ))}
      </div>
    </div>
  );
}

function Chip({ activ, onClick, children }: { activ: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={activ}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
        activ ? "border-echipa-accent bg-echipa-accent/15 text-echipa-accent" : "border-echipa-line text-echipa-muted hover:text-echipa-text"
      }`}
    >
      {children}
    </button>
  );
}
