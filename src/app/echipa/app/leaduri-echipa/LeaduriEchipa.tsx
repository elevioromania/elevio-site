"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IconInapoi } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import LeaduriMembru from "../admin/utilizatori/[id]/LeaduriMembru";

type Om = { user_id: string; nume: string; activ: boolean; rol: string; leaduri: number; apeluri_saptamana: number; intalniri: number; clienti: number };
type LeadScurt = { vanzator_id: string | null; status: string; lista_id: string | null };

// Lead-urile echipei, pentru admin: întâi oamenii, apoi folderele fiecăruia, apoi lead-urile.
export default function LeaduriEchipa() {
  const { profil } = useProfil();
  const router = useRouter();
  const ales = useSearchParams().get("om");
  const [oameni, setOameni] = useState<Om[] | null>(null);
  const [leaduri, setLeaduri] = useState<LeadScurt[]>([]);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [s, l] = await Promise.all([
      supabase.rpc("statistici_echipa"),
      toatePaginile<LeadScurt>((de, pana) => supabase.from("leads").select("vanzator_id, status, lista_id").order("id").range(de, pana)),
    ]);
    setOameni(((s.data as Om[]) ?? []).filter((o) => o.activ));
    setLeaduri(l.data);
  }, []);
  useIncarca(incarca);

  const cifre = useMemo(() => {
    const c = new Map<string, { sunate: number; fisiere: Set<string> }>();
    for (const l of leaduri) {
      if (!l.vanzator_id) continue;
      const x = c.get(l.vanzator_id) ?? { sunate: 0, fisiere: new Set<string>() };
      if (l.status !== "nou") x.sunate++;
      if (l.lista_id) x.fisiere.add(l.lista_id);
      c.set(l.vanzator_id, x);
    }
    return c;
  }, [leaduri]);
  const nealocate = leaduri.filter((l) => !l.vanzator_id).length;

  if (profil.rol !== "admin") return <Gol titlu="Pagina e doar pentru admin" />;
  if (oameni === null) return <Incarcare />;

  const om = oameni.find((o) => o.user_id === ales);
  if (om) {
    return (
      <div className="max-w-4xl">
        <button type="button" onClick={() => router.push("/echipa/app/leaduri-echipa")} className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
          <IconInapoi className="h-4 w-4" /> Lead-urile echipei
        </button>
        <TitluPagina
          titlu={om.nume}
          subtitlu={`${om.leaduri} lead-uri · ${cifre.get(om.user_id)?.sunate ?? 0} sunate · ${om.intalniri} întâlniri · ${om.clienti} închise`}
          actiuni={
            <Link href={`/echipa/app/admin/utilizatori/${om.user_id}`} className="text-sm text-echipa-accent hover:underline">
              Profil și bani
            </Link>
          }
        />
        <LeaduriMembru key={om.user_id} id={om.user_id} nume={om.nume.split(" ")[0]} laSchimbare={incarca} />
      </div>
    );
  }

  const ordonati = [...oameni].sort((a, b) => b.leaduri - a.leaduri || a.nume.localeCompare(b.nume, "ro"));

  return (
    <div className="max-w-4xl">
      <TitluPagina
        titlu="Lead-urile echipei"
        subtitlu={`Apasă pe un om ca să-i vezi folderele și lead-urile.${nealocate ? ` ${nealocate} lead-uri sunt încă nealocate.` : ""}`}
        actiuni={
          <Link href="/echipa/app/admin/liste" className="text-sm text-echipa-accent hover:underline">
            Foldere de lead-uri
          </Link>
        }
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {ordonati.map((o) => {
          const c = cifre.get(o.user_id);
          const sunate = c?.sunate ?? 0;
          const procent = o.leaduri ? Math.round((sunate / o.leaduri) * 100) : 0;
          return (
            <li key={o.user_id}>
              <Link
                href={`/echipa/app/leaduri-echipa?om=${o.user_id}`}
                className="group block rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-echipa-accent/15 text-lg font-bold text-echipa-accent">
                    {o.nume.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold group-hover:text-echipa-accent">{o.nume}</span>
                    <span className="block text-xs text-echipa-muted">
                      {o.leaduri} lead-uri · {c?.fisiere.size ?? 0} foldere · {o.apeluri_saptamana} apeluri săpt.
                    </span>
                  </span>
                  <span className="text-right text-xs text-echipa-muted">
                    <span className="block text-base font-bold text-emerald-300">{o.intalniri}</span>
                    întâlniri
                  </span>
                </span>
                <span className="mt-3 block">
                  <span className="mb-1 flex justify-between text-[11px] text-echipa-muted">
                    <span>
                      {sunate} din {o.leaduri} sunate
                    </span>
                    <span>{procent}%</span>
                  </span>
                  <span className="block h-1.5 overflow-hidden rounded-full bg-white/5">
                    <span className="block h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
