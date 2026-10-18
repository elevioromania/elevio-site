"use client";

import { useEffect, useRef, useState } from "react";
import { IconPuncte } from "./icons";

export type ActiuneMeniu = { eticheta: string; laClick: () => void; pericol?: boolean };

// Butonul cu trei puncte care deschide un meniu mic (redenumește, șterge etc.).
export default function MeniuPuncte({ eticheta, actiuni, className = "" }: { eticheta: string; actiuni: ActiuneMeniu[]; className?: string }) {
  const [deschis, setDeschis] = useState(false);
  const [poz, setPoz] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deschis) return;
    const inchide = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setDeschis(false);
    };
    document.addEventListener("mousedown", inchide);
    document.addEventListener("keydown", inchide);
    const laDerulare = () => setDeschis(false);
    window.addEventListener("scroll", laDerulare, true);
    return () => {
      window.removeEventListener("scroll", laDerulare, true);
      document.removeEventListener("mousedown", inchide);
      document.removeEventListener("keydown", inchide);
    };
  }, [deschis]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={eticheta}
        aria-haspopup="menu"
        aria-expanded={deschis}
        onClick={(e) => {
          e.stopPropagation();
          // Poziție fixă, ca meniul să nu fie tăiat de containerele care se derulează.
          const r = e.currentTarget.getBoundingClientRect();
          setPoz({ top: r.bottom + 4, right: Math.max(8, window.innerWidth - r.right) });
          setDeschis((x) => !x);
        }}
        className="rounded-lg p-1.5 text-echipa-muted hover:bg-white/10 hover:text-echipa-text"
      >
        <IconPuncte className="h-4 w-4" />
      </button>
      {deschis && (
        <div role="menu" style={{ top: poz.top, right: poz.right }} className="fixed z-50 min-w-44 overflow-hidden rounded-xl border border-echipa-line bg-echipa-card-2 py-1 shadow-xl">
          {actiuni.map((a) => (
            <button
              key={a.eticheta}
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                setDeschis(false);
                a.laClick();
              }}
              className={`block w-full px-3 py-2 text-left text-sm hover:bg-white/5 ${a.pericol ? "text-red-300" : "text-echipa-text"}`}
            >
              {a.eticheta}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
