"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IconFolder, IconInapoi, IconLista } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { nrFisiere } from "@/echipa/lib/format";
import { toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type LeadScurt = { id: string; status: string; lista_id: string | null };
type Fisier = { id: string; nume: string; folder_id: string | null; creat_la: string };
type Folder = { id: string; nume: string };
type Cifre = { total: number; sunate: number; intalniri: number };

const FARA = "fara";

// Folderele vânzătorului: folderele în care are lead-uri, fișierele din ele și cât a lucrat din fiecare.
export default function FoldereleMele() {
  const { profil } = useProfil();
  const router = useRouter();
  const ales = useSearchParams().get("folder");
  const [leaduri, setLeaduri] = useState<LeadScurt[] | null>(null);
  const [fisiere, setFisiere] = useState<Fisier[]>([]);
  const [foldere, setFoldere] = useState<Folder[]>([]);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, f, d] = await Promise.all([
      toatePaginile<LeadScurt>((de, pana) =>
        supabase.from("leads").select("id, status, lista_id").eq("vanzator_id", profil.id).not("lista_id", "is", null).order("id").range(de, pana),
      ),
      supabase.from("liste").select("id, nume, folder_id, creat_la").order("creat_la", { ascending: false }),
      supabase.from("foldere").select("id, nume").order("nume"),
    ]);
    setLeaduri(l.data ?? []);
    setFisiere((f.data as Fisier[]) ?? []);
    setFoldere((d.data as Folder[]) ?? []);
  }, [profil.id]);
  useIncarca(incarca);

  // Cifrele fiecărui fișier, doar din lead-urile vânzătorului.
  const cifre = useMemo(() => {
    const c: Record<string, Cifre> = {};
    for (const l of leaduri ?? []) {
      if (!l.lista_id) continue;
      const x = (c[l.lista_id] ??= { total: 0, sunate: 0, intalniri: 0 });
      x.total++;
      if (l.status !== "nou") x.sunate++;
      if (l.status === "intalnire") x.intalniri++;
    }
    return c;
  }, [leaduri]);

  const fisiereMele = fisiere.filter((f) => cifre[f.id]?.total);
  const grupuri = useMemo(() => {
    const g = foldere
      .map((f) => ({ id: f.id, nume: f.nume, fisiere: fisiereMele.filter((x) => x.folder_id === f.id) }))
      .filter((g) => g.fisiere.length);
    const fara = fisiereMele.filter((x) => !x.folder_id || !foldere.some((f) => f.id === x.folder_id));
    if (fara.length) g.push({ id: FARA, nume: "Alte fișiere", fisiere: fara });
    return g;
  }, [foldere, fisiereMele]);

  if (leaduri === null) return <Incarcare />;

  const grupAles = grupuri.find((g) => g.id === ales);

  if (grupAles) {
    return (
      <div className="max-w-4xl">
        <button type="button" onClick={() => router.push("/echipa/app/foldere")} className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
          <IconInapoi className="h-4 w-4" /> Folderele mele
        </button>
        <TitluPagina titlu={grupAles.nume} subtitlu={`${nrFisiere(grupAles.fisiere.length)}. Deschide un fișier ca să-i vezi lead-urile.`} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {grupAles.fisiere.map((f) => {
            const c = cifre[f.id];
            return (
              <li key={f.id}>
                <Link href={`/echipa/app/foldere/fisier/${f.id}`} className="group block rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-echipa-accent/15 text-echipa-accent">
                      <IconLista className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold group-hover:text-echipa-accent">{f.nume}</span>
                      <span className="block text-xs text-echipa-muted">
                        {c.total} lead-uri · {c.total - c.sunate} neatinse
                        {c.intalniri > 0 && <span className="text-emerald-300"> · {c.intalniri} întâlniri</span>}
                      </span>
                    </span>
                  </span>
                  <Progres c={c} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <TitluPagina titlu="Folderele mele" subtitlu="Lead-urile primite, pe foldere și fișiere. Deschide un folder, apoi un fișier, și sună în ordine." />
      {grupuri.length === 0 ? (
        <Gol titlu="Încă nu ai foldere">Când primești lead-uri pe foldere, apar aici. Lead-urile adăugate de tine sunt în „Lead-urile mele”.</Gol>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {grupuri.map((g) => {
            const c = g.fisiere.reduce((s, f) => ({ total: s.total + cifre[f.id].total, sunate: s.sunate + cifre[f.id].sunate, intalniri: s.intalniri + cifre[f.id].intalniri }), {
              total: 0,
              sunate: 0,
              intalniri: 0,
            });
            return (
              <li key={g.id}>
                <Link
                  href={`/echipa/app/foldere?folder=${g.id}`}
                  className="group block rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-echipa-accent/15 text-echipa-accent">
                      <IconFolder className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-semibold group-hover:text-echipa-accent">{g.nume}</span>
                      <span className="block text-xs text-echipa-muted">
                        {nrFisiere(g.fisiere.length)} · {c.total} lead-uri · {c.total - c.sunate} neatinse
                      </span>
                    </span>
                  </span>
                  <Progres c={c} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Progres({ c }: { c: Cifre }) {
  const procent = c.total ? Math.round((c.sunate / c.total) * 100) : 0;
  return (
    <span className="mt-3 block">
      <span className="mb-1 flex justify-between text-[11px] text-echipa-muted">
        <span>
          {c.sunate} din {c.total} sunate
        </span>
        <span>{procent}%</span>
      </span>
      <span className="block h-1.5 overflow-hidden rounded-full bg-white/5">
        <span className="block h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
      </span>
    </span>
  );
}
