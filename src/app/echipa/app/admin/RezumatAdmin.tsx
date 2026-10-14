"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NISE } from "@/echipa/config";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Card, TitluPagina } from "@/echipa/components/ui";
import { relativ } from "@/echipa/lib/format";
import { COLOANE_LEAD } from "@/echipa/lib/leaduri";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";

export default function RezumatAdmin() {
  const [cifre, setCifre] = useState({ noi: 0, nealocate: 0, vanzatori: 0, leaduri: 0 });
  const [adaugate, setAdaugate] = useState<(Lead & { vanzator?: string })[]>([]);

  useEffect(() => {
    const supabase = supabaseBrowser();
    (async () => {
      const [noi, nealocate, vanzatori, leaduri, adaugateRez, oameni] = await Promise.all([
        supabase.from("predari").select("id", { count: "exact", head: true }).eq("rezultat", "noua"),
        supabase.from("leads").select("id", { count: "exact", head: true }).is("vanzator_id", null),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("activ", true).eq("rol", "vanzator"),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select(COLOANE_LEAD).eq("sursa", "adaugat_de_vanzator").order("creat_la", { ascending: false }).limit(10),
        supabase.from("profiles").select("id, nume"),
      ]);
      setCifre({ noi: noi.count ?? 0, nealocate: nealocate.count ?? 0, vanzatori: vanzatori.count ?? 0, leaduri: leaduri.count ?? 0 });
      const nume = Object.fromEntries((oameni.data ?? []).map((o) => [o.id, o.nume]));
      setAdaugate(((adaugateRez.data as Lead[]) ?? []).map((l) => ({ ...l, vanzator: l.vanzator_id ? nume[l.vanzator_id] : "" })));
    })();
  }, []);

  return (
    <div className="space-y-6">
      <TitluPagina titlu="Panoul de admin" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra href="/echipa/app/admin/predari" eticheta="Întâlniri noi de confirmat" valoare={cifre.noi} accent />
        <Cifra href="/echipa/app/admin/leaduri" eticheta="Lead-uri nealocate" valoare={cifre.nealocate} />
        <Cifra href="/echipa/app/admin/leaduri" eticheta="Lead-uri în total" valoare={cifre.leaduri} />
        <Cifra href="/echipa/app/admin/utilizatori" eticheta="Vânzători activi" valoare={cifre.vanzatori} />
      </div>

      <Card>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-semibold">Lead-uri adăugate de vânzători</h2>
          <Link href="/echipa/app/admin/leaduri" className="text-sm text-echipa-accent hover:underline">
            Toate
          </Link>
        </div>
        {adaugate.length === 0 ? (
          <p className="text-sm text-echipa-muted">Niciun vânzător nu și-a adăugat încă lead-uri.</p>
        ) : (
          <ul className="divide-y divide-echipa-line/60">
            {adaugate.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <Link href={`/echipa/app/leaduri/${l.id}`} className="min-w-0 hover:text-echipa-accent">
                  <span className="font-medium">{l.afacere}</span>
                  <span className="block text-xs text-echipa-muted">
                    {[NISE[l.nisa]?.eticheta, l.oras, l.vanzator, relativ(l.creat_la)].filter(Boolean).join(" · ")}
                  </span>
                </Link>
                <StatusBadge status={l.status} mic />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Cifra({ href, eticheta, valoare, accent }: { href: string; eticheta: string; valoare: number; accent?: boolean }) {
  return (
    <Link href={href} className={`rounded-2xl border p-4 hover:border-echipa-accent/60 ${accent && valoare ? "border-echipa-accent/60 bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card"}`}>
      <p className="text-3xl font-bold tabular-nums">{valoare}</p>
      <p className="mt-1 text-sm text-echipa-muted">{eticheta}</p>
    </Link>
  );
}
