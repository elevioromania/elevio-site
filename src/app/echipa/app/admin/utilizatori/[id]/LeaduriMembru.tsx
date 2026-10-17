"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { LISTA_STATUSURI, NISE, STATUSURI, type Status } from "@/echipa/config";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Incarcare, Mesaj } from "@/echipa/components/ui";
import { normal, relativ } from "@/echipa/lib/format";
import { COLOANE_LEAD, toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";

type Persoana = { id: string; nume: string };
type Lista = { id: string; nume: string; leads: { count: number }[] };

// Lead-urile unui singur om, pe profilul lui: le vezi pe status, le muți la altcineva, le ștergi
// sau îi dai o listă întreagă.
export default function LeaduriMembru({ id, nume, laSchimbare }: { id: string; nume: string; laSchimbare: () => void }) {
  const [leaduri, setLeaduri] = useState<Lead[] | null>(null);
  const [oameni, setOameni] = useState<Persoana[]>([]);
  const [liste, setListe] = useState<Lista[]>([]);
  const [status, setStatus] = useState<Status | "">("");
  const [cautare, setCautare] = useState("");
  const [alese, setAlese] = useState<Set<string>>(new Set());
  const [tinta, setTinta] = useState("");
  const [listaAleasa, setListaAleasa] = useState("");
  const [seLucreaza, setSeLucreaza] = useState(false);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, p, li] = await Promise.all([
      toatePaginile<Lead>((de, pana) =>
        supabase.from("leads").select(COLOANE_LEAD).eq("vanzator_id", id).order("ultimul_contact", { ascending: false, nullsFirst: false }).order("id").range(de, pana),
      ),
      supabase.from("profiles").select("id, nume").eq("activ", true).neq("id", id).order("nume"),
      supabase.from("liste").select("id, nume, leads(count)").order("creat_la", { ascending: false }),
    ]);
    setLeaduri(l.data);
    setOameni((p.data as Persoana[]) ?? []);
    setListe((li.data as Lista[]) ?? []);
  }, [id]);
  useIncarca(incarca);

  const numarate = useMemo(() => {
    const n: Partial<Record<Status, number>> = {};
    for (const l of leaduri ?? []) n[l.status as Status] = (n[l.status as Status] ?? 0) + 1;
    return n;
  }, [leaduri]);

  const filtrate = useMemo(() => {
    const q = normal(cautare.trim());
    return (leaduri ?? []).filter(
      (l) => (!status || l.status === status) && (!q || normal(l.afacere).includes(q) || normal(l.telefon_afacere).includes(q) || normal(l.oras).includes(q)),
    );
  }, [leaduri, status, cautare]);

  const toateAlese = filtrate.length > 0 && filtrate.every((l) => alese.has(l.id));

  function comuta(idLead: string) {
    const nou = new Set(alese);
    if (nou.has(idLead)) nou.delete(idLead);
    else nou.add(idLead);
    setAlese(nou);
  }

  function gata(text: string, eroare?: boolean) {
    setSeLucreaza(false);
    setMesaj({ tip: eroare ? "eroare" : "succes", text });
    if (!eroare) {
      setAlese(new Set());
      setTinta("");
      setListaAleasa("");
      incarca();
      laSchimbare();
    }
  }

  async function muta() {
    if (!alese.size || !tinta) return;
    setSeLucreaza(true);
    const ids = [...alese];
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await supabaseBrowser()
        .from("leads")
        .update({ vanzator_id: tinta === "nealocat" ? null : tinta })
        .in("id", ids.slice(i, i + 200));
      if (error) return gata("Mutarea a eșuat. Încearcă din nou.", true);
    }
    const cui = oameni.find((o) => o.id === tinta)?.nume;
    gata(cui ? `Am mutat ${ids.length} lead-uri la ${cui}.` : `${ids.length} lead-uri sunt acum nealocate.`);
  }

  async function sterge() {
    if (!alese.size) return;
    if (!confirm(`Ștergi definitiv ${alese.size} lead-uri? Se șterg și istoricul și întâlnirile predate pentru ele.`)) return;
    setSeLucreaza(true);
    const ids = [...alese];
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await supabaseBrowser().from("leads").delete().in("id", ids.slice(i, i + 200));
      if (error) return gata("Ștergerea a eșuat. Încearcă din nou.", true);
    }
    gata(`Am șters ${ids.length} lead-uri.`);
  }

  async function daLista() {
    if (!listaAleasa) return;
    const lista = liste.find((l) => l.id === listaAleasa);
    if (!confirm(`Îi dai lui ${nume} tot folderul „${lista?.nume}”? Lead-urile din el care sunt la altcineva trec la ${nume}.`)) return;
    setSeLucreaza(true);
    const { error, count } = await supabaseBrowser().from("leads").update({ vanzator_id: id }, { count: "exact" }).eq("lista_id", listaAleasa);
    if (error) return gata("Nu am putut da folderul.", true);
    gata(`Folderul „${lista?.nume}” (${count ?? 0} lead-uri) e acum la ${nume}.`);
  }

  if (leaduri === null) return <Incarcare />;

  return (
    <div className="space-y-4">
      {liste.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
          <span className="w-full text-sm font-medium sm:w-auto">Dă-i lead-uri:</span>
          <select aria-label="Alege un folder" className="camp min-w-0 flex-1 sm:max-w-xs" value={listaAleasa} onChange={(e) => setListaAleasa(e.target.value)}>
            <option value="">Alege un folder...</option>
            {liste.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nume} ({l.leads[0]?.count ?? 0})
              </option>
            ))}
          </select>
          <Buton onClick={daLista} disabled={!listaAleasa || seLucreaza}>
            Dă-i folderul
          </Buton>
        </div>
      )}

      {mesaj && <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>}

      {leaduri.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-echipa-line p-6 text-center text-sm text-echipa-muted">
          {nume} nu are încă niciun lead. Dă-i un folder de mai sus.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5">
            <Filtru activ={status === ""} onClick={() => setStatus("")} eticheta="Toate" numar={leaduri.length} />
            {LISTA_STATUSURI.filter((s) => numarate[s]).map((s) => (
              <Filtru key={s} activ={status === s} onClick={() => setStatus(s)} eticheta={STATUSURI[s].eticheta} numar={numarate[s] ?? 0} culoare={STATUSURI[s].hex} />
            ))}
          </div>

          <input type="search" aria-label="Caută" className="camp" placeholder="Caută după nume, telefon sau oraș" value={cautare} onChange={(e) => setCautare(e.target.value)} />

          {alese.size > 0 && (
            <div className="sticky top-16 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-echipa-accent/50 bg-echipa-card-2 p-3 lg:top-4">
              <span className="text-sm font-semibold">{alese.size} alese</span>
              <select aria-label="Mută la" className="camp min-w-0 flex-1 sm:max-w-xs" value={tinta} onChange={(e) => setTinta(e.target.value)}>
                <option value="">Mută la...</option>
                {oameni.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.nume}
                  </option>
                ))}
                <option value="nealocat">Nimeni (nealocate)</option>
              </select>
              <Buton onClick={muta} disabled={!tinta || seLucreaza}>
                {seLucreaza ? "Se salvează..." : "Mută"}
              </Buton>
              <Buton varianta="pericol" onClick={sterge} disabled={seLucreaza}>
                Șterge
              </Buton>
              <Buton varianta="fantoma" onClick={() => setAlese(new Set())}>
                Anulează
              </Buton>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-echipa-line/70 bg-echipa-card">
            <label className="flex cursor-pointer items-center gap-3 border-b border-echipa-line/60 px-4 py-2.5 text-xs text-echipa-muted">
              <input type="checkbox" checked={toateAlese} onChange={() => setAlese(toateAlese ? new Set() : new Set(filtrate.map((l) => l.id)))} />
              {filtrate.length} lead-uri{status || cautare ? " găsite" : ""}. Bifează-le ca să le muți sau să le ștergi.
            </label>
            <ul>
              {filtrate.slice(0, 300).map((l) => (
                <li key={l.id} className="flex items-center gap-3 border-b border-echipa-line/40 px-4 py-3 last:border-0">
                  <input type="checkbox" aria-label={`Alege ${l.afacere}`} checked={alese.has(l.id)} onChange={() => comuta(l.id)} />
                  <Link href={`/echipa/app/leaduri/${l.id}`} className="group min-w-0 flex-1">
                    <span className="block truncate font-medium group-hover:text-echipa-accent">{l.afacere}</span>
                    <span className="block truncate text-xs text-echipa-muted">
                      {[NISE[l.nisa]?.eticheta, l.oras, l.ultimul_contact ? `sunat ${relativ(l.ultimul_contact)}` : "nesunat"].filter(Boolean).join(" · ")}
                    </span>
                  </Link>
                  <StatusBadge status={l.status as Status} mic />
                </li>
              ))}
            </ul>
            {filtrate.length > 300 && (
              <p className="border-t border-echipa-line/50 px-4 py-2 text-xs text-echipa-muted">
                Se văd primele 300. Bifa de sus le alege pe toate cele {filtrate.length}.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Filtru({ activ, onClick, eticheta, numar, culoare }: { activ: boolean; onClick: () => void; eticheta: string; numar: number; culoare?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
        activ ? "border-echipa-accent bg-echipa-accent/15 text-echipa-text" : "border-echipa-line/70 text-echipa-muted hover:text-echipa-text"
      }`}
    >
      {culoare && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: culoare }} />}
      {eticheta}
      <span className="tabular-nums text-xs opacity-80">{numar}</span>
    </button>
  );
}
