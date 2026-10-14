"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBifa, IconCopiaza, IconX } from "./icons";

type Varianta = "principal" | "secundar" | "fantoma" | "pericol" | "succes";

const stiluri: Record<Varianta, string> = {
  principal: "bg-echipa-accent text-echipa-bg hover:bg-sky-300 font-semibold",
  secundar: "border border-echipa-line bg-echipa-card text-echipa-text hover:border-echipa-accent/60",
  fantoma: "text-echipa-muted hover:text-echipa-text hover:bg-white/5",
  pericol: "border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20",
  succes: "bg-emerald-500 text-echipa-bg hover:bg-emerald-400 font-semibold",
};

export function clsButon(varianta: Varianta = "principal", mare = false) {
  return `inline-flex items-center justify-center gap-2 rounded-xl transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
    mare ? "min-h-12 px-5 text-base" : "min-h-10 px-4 text-sm"
  } ${stiluri[varianta]}`;
}

export function Buton({
  varianta = "principal",
  mare,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { varianta?: Varianta; mare?: boolean }) {
  return <button {...rest} className={`${clsButon(varianta, mare)} ${className}`} />;
}

export function LinkButon({
  href,
  varianta = "principal",
  mare,
  className = "",
  children,
  ...rest
}: { href: string; varianta?: Varianta; mare?: boolean; className?: string; children: React.ReactNode } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  const extern = /^(https?:|tel:|mailto:)/.test(href);
  if (extern) {
    return (
      <a href={href} className={`${clsButon(varianta, mare)} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${clsButon(varianta, mare)} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 sm:p-5 ${className}`}>{children}</div>;
}

export function Camp({
  eticheta,
  htmlFor,
  ajutor,
  obligatoriu,
  children,
  className = "",
}: {
  eticheta: string;
  htmlFor: string;
  ajutor?: string;
  obligatoriu?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-echipa-text">
        {eticheta}
        {obligatoriu && <span className="text-echipa-accent"> *</span>}
      </label>
      {children}
      {ajutor && <p className="mt-1 text-xs text-echipa-muted">{ajutor}</p>}
    </div>
  );
}

export function Mesaj({ tip = "eroare", children }: { tip?: "eroare" | "succes" | "info"; children: React.ReactNode }) {
  const c =
    tip === "eroare"
      ? "border-red-500/40 bg-red-500/10 text-red-200"
      : tip === "succes"
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
        : "border-echipa-accent/40 bg-echipa-accent/10 text-sky-100";
  return (
    <div role={tip === "eroare" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${c}`}>
      {children}
    </div>
  );
}

export function Logo({ mic }: { mic?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-2 font-bold tracking-tight ${mic ? "text-lg" : "text-2xl"}`}>
      <span className="text-logo-gradient">Elevio</span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-echipa-muted">Echipa</span>
    </span>
  );
}

export function Incarcare({ text = "Se încarcă..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 py-10 text-sm text-echipa-muted" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-echipa-accent border-t-transparent" />
      {text}
    </div>
  );
}

export function Gol({ titlu, children }: { titlu: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-echipa-line px-5 py-10 text-center">
      <p className="font-semibold text-echipa-text">{titlu}</p>
      {children && <div className="mt-2 text-sm text-echipa-muted">{children}</div>}
    </div>
  );
}

export function TitluPagina({
  titlu,
  subtitlu,
  actiuni,
}: {
  titlu: string;
  subtitlu?: React.ReactNode;
  actiuni?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-echipa-text sm:text-3xl">{titlu}</h1>
        {subtitlu && <p className="mt-1 text-sm text-echipa-muted">{subtitlu}</p>}
      </div>
      {actiuni && <div className="flex flex-wrap gap-2">{actiuni}</div>}
    </div>
  );
}

export function ButonCopiere({
  text,
  eticheta = "Copiază",
  className = "",
  varianta = "secundar",
  compact,
}: {
  text: string;
  eticheta?: string;
  className?: string;
  varianta?: Varianta;
  compact?: boolean; // doar iconița pe ecrane mici
}) {
  const [copiat, setCopiat] = useState(false);
  return (
    <Buton
      type="button"
      varianta={varianta}
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        setCopiat(true);
        setTimeout(() => setCopiat(false), 1800);
      }}
    >
      {copiat ? <IconBifa className="h-4 w-4" /> : <IconCopiaza className="h-4 w-4" />}
      <span className={compact ? "sr-only sm:not-sr-only" : undefined}>{copiat ? "Copiat" : eticheta}</span>
    </Buton>
  );
}

// Fereastră modală: pe mobil urcă de jos, pe desktop e centrată.
export function Modal({
  deschis,
  inchide,
  titlu,
  children,
  lat,
}: {
  deschis: boolean;
  inchide: () => void;
  titlu: string;
  children: React.ReactNode;
  lat?: boolean;
}) {
  useEffect(() => {
    if (!deschis) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && inchide();
    document.addEventListener("keydown", esc);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = overflow;
    };
  }, [deschis, inchide]);

  if (!deschis) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={titlu}>
      <button type="button" aria-label="Închide" className="absolute inset-0 bg-black/70" onClick={inchide} />
      <div
        className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-echipa-line bg-echipa-card-2 p-5 shadow-2xl sm:rounded-3xl ${
          lat ? "sm:max-w-2xl" : "sm:max-w-lg"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-echipa-text">{titlu}</h2>
          <button type="button" onClick={inchide} className="rounded-lg p-1.5 text-echipa-muted hover:bg-white/5 hover:text-echipa-text" aria-label="Închide">
            <IconX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
