"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Profil, Rol } from "../lib/tipuri";
import {
  IconAcasa,
  IconBani,
  IconCalendar,
  IconCarte,
  IconFulger,
  IconGrafic,
  IconIesire,
  IconLeaduri,
  IconMeniu,
  IconScut,
  IconTrofeu,
  IconUtilizatori,
  IconX,
} from "./icons";
import CerePrenume from "./CerePrenume";
import { ProfilProvider, useProfil } from "./ProfilContext";
import { Logo } from "./ui";

type Item = {
  href: string;
  eticheta: string;
  icon: (p: { className?: string }) => React.ReactElement;
  roluri?: Rol[]; // fără roluri: vizibil pentru toți
};

const NAV: Item[] = [
  { href: "/echipa/app", eticheta: "Acasă", icon: IconAcasa },
  { href: "/echipa/app/mod-apel", eticheta: "Mod apel", icon: IconFulger },
  { href: "/echipa/app/leaduri", eticheta: "Lead-urile mele", icon: IconLeaduri },
  { href: "/echipa/app/calendar", eticheta: "Programează întâlnirea", icon: IconCalendar },
  { href: "/echipa/app/ghid", eticheta: "Ghid", icon: IconCarte },
  { href: "/echipa/app/obiectii", eticheta: "Obiecții", icon: IconScut },
  { href: "/echipa/app/clasament", eticheta: "Clasament", icon: IconTrofeu },
  { href: "/echipa/app/castiguri", eticheta: "Câștigurile mele", icon: IconBani, roluri: ["vanzator"] },
  { href: "/echipa/app/comunitate", eticheta: "Echipa", icon: IconUtilizatori },
  { href: "/echipa/app/statistici", eticheta: "Statistici", icon: IconGrafic, roluri: ["trainer"] },
  { href: "/echipa/app/admin", eticheta: "Admin", icon: IconGrafic, roluri: ["admin"] },
];

const BARA_JOS: Item[] = [
  { href: "/echipa/app", eticheta: "Acasă", icon: IconAcasa },
  { href: "/echipa/app/leaduri", eticheta: "Lead-uri", icon: IconLeaduri },
  { href: "/echipa/app/mod-apel", eticheta: "Mod apel", icon: IconFulger },
  { href: "/echipa/app/ghid", eticheta: "Ghid", icon: IconCarte },
];

function activ(path: string, href: string) {
  return href === "/echipa/app" ? path === href : path === href || path.startsWith(href + "/");
}

export default function AppShell({ profil, children }: { profil: Profil; children: React.ReactNode }) {
  return (
    <ProfilProvider initial={profil}>
      <Cadru>{children}</Cadru>
      <CerePrenume />
    </ProfilProvider>
  );
}

function Cadru({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { profil } = useProfil();
  // Meniul e deschis pentru pagina curentă; la navigare se închide singur.
  const [meniuPe, setMeniuPe] = useState<string | null>(null);
  const meniu = meniuPe === path;
  const setMeniu = (deschis: boolean) => setMeniuPe(deschis ? path : null);
  const iteme = NAV.filter((i) => !i.roluri || i.roluri.includes(profil.rol));

  const utilizator = (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-echipa-accent/15 font-bold text-echipa-accent">
        {profil.nume.trim().charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-echipa-text">{profil.nume}</p>
        <p className="truncate text-xs text-echipa-muted">{profil.titlu}</p>
      </div>
    </div>
  );

  const listaNav = (
    <nav className="space-y-1" aria-label="Meniul platformei">
      {iteme.map((i) => {
        const a = activ(path, i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={a ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              a ? "bg-echipa-accent/15 text-echipa-accent" : "text-echipa-muted hover:bg-white/5 hover:text-echipa-text"
            }`}
          >
            <i.icon className="h-5 w-5 shrink-0" />
            {i.eticheta}
          </Link>
        );
      })}
    </nav>
  );

  const iesire = (
    <a
      href="/echipa/iesire"
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-echipa-muted hover:bg-white/5 hover:text-echipa-text"
    >
      <IconIesire className="h-5 w-5" />
      Delogare
    </a>
  );

  return (
    <div className="flex min-h-full flex-1">
      {/* Bara laterală, pe desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-echipa-line/60 bg-echipa-bg px-4 py-6 lg:flex">
        <Link href="/echipa/app" className="mb-8 px-3">
          <Logo mic />
        </Link>
        <div className="flex-1 overflow-y-auto">{listaNav}</div>
        <div className="mt-4 space-y-3 border-t border-echipa-line/60 pt-4">
          <div className="px-3">{utilizator}</div>
          {iesire}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Antetul, pe mobil */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-echipa-line/60 bg-echipa-bg/90 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/echipa/app">
            <Logo mic />
          </Link>
          <button
            type="button"
            onClick={() => setMeniu(true)}
            className="rounded-xl p-2 text-echipa-text hover:bg-white/5"
            aria-label="Deschide meniul"
            aria-expanded={meniu}
          >
            <IconMeniu className="h-6 w-6" />
          </button>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">{children}</main>

        {/* Bara de jos, pe mobil */}
        <nav
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-echipa-line/60 bg-echipa-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
          aria-label="Navigare rapidă"
        >
          {BARA_JOS.map((i) => {
            const a = activ(path, i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={a ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${a ? "text-echipa-accent" : "text-echipa-muted"}`}
              >
                <i.icon className="h-5 w-5" />
                {i.eticheta}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMeniu(true)}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-echipa-muted"
          >
            <IconMeniu className="h-5 w-5" />
            Mai mult
          </button>
        </nav>
      </div>

      {/* Meniul complet, pe mobil */}
      {meniu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Meniu">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Închide meniul" onClick={() => setMeniu(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-echipa-card-2 p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              {utilizator}
              <button type="button" onClick={() => setMeniu(false)} className="rounded-xl p-2 text-echipa-muted hover:bg-white/5" aria-label="Închide meniul">
                <IconX />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{listaNav}</div>
            <div className="border-t border-echipa-line/60 pt-3">{iesire}</div>
          </div>
        </div>
      )}
    </div>
  );
}
