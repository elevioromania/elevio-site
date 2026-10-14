"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { STATUSURI, type Status } from "@/echipa/config";
import AtribuieLista from "@/echipa/components/AtribuieLista";
import { IconIncarca, IconLeaduri } from "@/echipa/components/icons";
import { Gol, Incarcare, LinkButon, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { dataScurta } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export type ListaCuLeaduri = {
  id: string;
  nume: string;
  creat_la: string;
  leads: { vanzator_id: string | null; status: Status }[];
};

// Cui aparține lista: un singur om, mai mulți sau nimeni.
export function proprietar(l: ListaCuLeaduri, nume: Record<string, string>) {
  const ids = [...new Set(l.leads.map((x) => x.vanzator_id))];
  if (ids.length === 0) return "Goală";
  if (ids.length > 1) return "Împărțită între mai mulți";
  return ids[0] ? (nume[ids[0]] ?? "Necunoscut") : "Nealocată";
}

export default function Liste() {
  const [liste, setListe] = useState<ListaCuLeaduri[] | null>(null);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, p] = await Promise.all([
      supabase.from("liste").select("id, nume, creat_la, leads(vanzator_id, status)").order("creat_la", { ascending: false }),
      supabase.from("profiles").select("id, nume"),
    ]);
    setListe((l.data as ListaCuLeaduri[]) ?? []);
    setNume(Object.fromEntries((p.data ?? []).map((x) => [x.id, x.nume])));
  }, []);
  useIncarca(incarca);

  return (
    <div className="max-w-4xl">
      <TitluPagina
        titlu="Liste de lead-uri"
        subtitlu="Fiecare fișier importat devine o listă. O dai cuiva dintr-un singur click."
        actiuni={
          <LinkButon href="/echipa/app/admin/import">
            <IconIncarca className="h-4 w-4" /> Importă o listă
          </LinkButon>
        }
      />
      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}
      {liste === null ? (
        <Incarcare />
      ) : liste.length === 0 ? (
        <Gol titlu="Nicio listă încă">
          <Link href="/echipa/app/admin/import" className="text-echipa-accent hover:underline">
            Importă primul fișier
          </Link>{" "}
          și devine prima ta listă.
        </Gol>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {liste.map((l) => {
            const total = l.leads.length;
            const noi = l.leads.filter((x) => x.status === "nou").length;
            const intalniri = l.leads.filter((x) => x.status === "intalnire").length;
            return (
              <li key={l.id} className="flex flex-col rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
                <Link href={`/echipa/app/admin/liste/${l.id}`} className="group flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-echipa-accent/15 text-echipa-accent">
                    <IconLeaduri className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold group-hover:text-echipa-accent">{l.nume}</span>
                    <span className="block text-sm text-echipa-muted">
                      {total} lead-uri · {proprietar(l, nume)}
                    </span>
                  </span>
                </Link>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-echipa-muted">{noi} nesunate</span>
                  <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: `${STATUSURI.intalnire.hex}1f`, color: STATUSURI.intalnire.hex }}>
                    {intalniri} întâlniri
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-echipa-muted">din {dataScurta(l.creat_la)}</span>
                </div>
                <div className="mt-4 border-t border-echipa-line/60 pt-3">
                  <AtribuieLista
                    listaId={l.id}
                    compact
                    laGata={(text, eroare) => {
                      setMesaj({ tip: eroare ? "eroare" : "succes", text });
                      incarca();
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
