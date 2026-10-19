"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABURI = [
  { href: "/echipa/app/admin", eticheta: "Pe scurt" },
  { href: "/echipa/app/admin/predari", eticheta: "Întâlniri predate" },
  { href: "/echipa/app/admin/leaduri", eticheta: "Lead-uri și atribuire" },
  { href: "/echipa/app/admin/liste", eticheta: "Foldere de lead-uri" },
  { href: "/echipa/app/admin/import", eticheta: "Importă lead-uri" },
  { href: "/echipa/app/admin/curatenie", eticheta: "Curățenie lead-uri" },
  { href: "/echipa/app/admin/comisioane", eticheta: "Lead-uri închise și comisioane" },
  { href: "/echipa/app/admin/sesiuni", eticheta: "Sesiuni și anunțuri" },
  { href: "/echipa/app/admin/utilizatori", eticheta: "Utilizatori" },
  { href: "/echipa/app/statistici", eticheta: "Statistici" },
];

export default function NavAdmin() {
  const path = usePathname();
  return (
    <nav aria-label="Panoul de admin" className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex w-max gap-1 rounded-2xl border border-echipa-line/70 bg-echipa-card-2 p-1">
        {TABURI.map((t) => {
          const activ = path === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={activ ? "page" : undefined}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium ${activ ? "bg-echipa-accent text-echipa-bg" : "text-echipa-muted hover:text-echipa-text"}`}
            >
              {t.eticheta}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
