"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { LISTA_NISE, LISTA_STATUSURI, NISE, STATUSURI, type Status } from "@/echipa/config";
import { IconDescarca } from "@/echipa/components/icons";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { descarcaCsv } from "@/echipa/lib/csv";
import { dataScurta, normal } from "@/echipa/lib/format";
import { COLOANE_LEAD, toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";

type Persoana = { id: string; nume: string; activ: boolean };

export default function ToateLeadurile() {
  const [leaduri, setLeaduri] = useState<Lead[] | null>(null);
  const [oameni, setOameni] = useState<Persoana[]>([]);
  const [alese, setAlese] = useState<Set<string>>(new Set());
  const [cautare, setCautare] = useState("");
  const [fVanzator, setFVanzator] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fNisa, setFNisa] = useState("");
  const [fOras, setFOras] = useState("");
  const [fSursa, setFSursa] = useState("");
  const [tinta, setTinta] = useState("");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);
  const [seLucreaza, setSeLucreaza] = useState(false);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, p] = await Promise.all([
      toatePaginile<Lead>((de, pana) => supabase.from("leads").select(COLOANE_LEAD).order("creat_la", { ascending: false }).order("id").range(de, pana)),
      supabase.from("profiles").select("id, nume, activ").order("nume"),
    ]);
    setLeaduri(l.data);
    setOameni((p.data as Persoana[]) ?? []);
  }, []);

  useIncarca(incarca);

  const numeVanzator = useMemo(() => Object.fromEntries(oameni.map((o) => [o.id, o.nume])), [oameni]);
  const orase = useMemo(
    () => [...new Set((leaduri ?? []).map((l) => l.oras?.trim()).filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "ro")),
    [leaduri],
  );

  const filtrate = useMemo(() => {
    const q = normal(cautare.trim());
    return (leaduri ?? []).filter(
      (l) =>
        (!q || normal(l.afacere).includes(q) || normal(l.telefon_afacere).includes(q)) &&
        (!fVanzator || (fVanzator === "nealocat" ? !l.vanzator_id : l.vanzator_id === fVanzator)) &&
        (!fStatus || l.status === fStatus) &&
        (!fNisa || l.nisa === fNisa) &&
        (!fOras || l.oras?.trim() === fOras) &&
        (!fSursa || l.sursa === fSursa),
    );
  }, [leaduri, cautare, fVanzator, fStatus, fNisa, fOras, fSursa]);

  const toateAlese = filtrate.length > 0 && filtrate.every((l) => alese.has(l.id));

  function comuta(id: string) {
    const nou = new Set(alese);
    if (nou.has(id)) nou.delete(id);
    else nou.add(id);
    setAlese(nou);
  }

  async function realoca() {
    if (!alese.size) return;
    const cui = tinta === "nealocat" ? null : tinta;
    if (tinta === "") return setMesaj({ tip: "eroare", text: "Alege cui atribui lead-urile." });
    setSeLucreaza(true);
    const ids = [...alese];
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await supabaseBrowser().from("leads").update({ vanzator_id: cui }).in("id", ids.slice(i, i + 200));
      if (error) {
        setSeLucreaza(false);
        return setMesaj({ tip: "eroare", text: "Atribuirea a eșuat. Încearcă din nou." });
      }
    }
    setSeLucreaza(false);
    setAlese(new Set());
    setMesaj({ tip: "succes", text: `Am atribuit ${ids.length} lead-uri lui ${cui ? numeVanzator[cui] : "nimeni (nealocate)"}.` });
    incarca();
  }

  async function stergeAlese() {
    if (!alese.size) return;
    if (!confirm(`Ștergi definitiv ${alese.size} lead-uri? Se șterg și istoricul și întâlnirile predate pentru ele.`)) return;
    setSeLucreaza(true);
    const ids = [...alese];
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await supabaseBrowser().from("leads").delete().in("id", ids.slice(i, i + 200));
      if (error) {
        setSeLucreaza(false);
        return setMesaj({ tip: "eroare", text: "Ștergerea a eșuat. Încearcă din nou." });
      }
    }
    setSeLucreaza(false);
    setAlese(new Set());
    setMesaj({ tip: "succes", text: `Am șters ${ids.length} lead-uri.` });
    incarca();
  }

  function exporta() {
    descarcaCsv(
      `leaduri-${new Date().toISOString().slice(0, 10)}.csv`,
      filtrate.map((l) => ({
        afacere: l.afacere,
        nisa: NISE[l.nisa]?.eticheta,
        oras: l.oras,
        adresa: l.adresa,
        telefon_afacere: l.telefon_afacere,
        site: l.site,
        google_maps: l.google_maps,
        decident_nume: l.decident_nume,
        decident_functie: l.decident_functie,
        decident_telefon: l.decident_telefon,
        decident_email: l.decident_email,
        status: STATUSURI[l.status].eticheta,
        vanzator: l.vanzator_id ? numeVanzator[l.vanzator_id] : "",
        sursa: l.sursa === "alocat" ? "alocat" : "adăugat de vânzător",
        urmatorul_pas: l.urmatorul_pas_data ?? "",
        urmatorul_pas_text: l.urmatorul_pas_text,
        a_sunat_demo: l.a_sunat_demo ? "da" : "nu",
        notite: l.notite,
        creat_la: l.creat_la,
        ultimul_contact: l.ultimul_contact,
      })),
    );
  }

  return (
    <div>
      <TitluPagina
        titlu="Toate lead-urile"
        subtitlu={leaduri ? `${filtrate.length} din ${leaduri.length}. Bifează lead-urile ca să le atribui cuiva sau să le ștergi.` : undefined}
        actiuni={
          <Buton varianta="secundar" onClick={exporta} disabled={!filtrate.length}>
            <IconDescarca className="h-4 w-4" /> Export CSV
          </Buton>
        }
      />

      <div className="mb-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <input type="search" aria-label="Caută" className="camp sm:col-span-3 lg:col-span-1" placeholder="Caută" value={cautare} onChange={(e) => setCautare(e.target.value)} />
        <select aria-label="Vânzător" className="camp" value={fVanzator} onChange={(e) => setFVanzator(e.target.value)}>
          <option value="">Toți vânzătorii</option>
          <option value="nealocat">Nealocate</option>
          {oameni.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nume}
              {o.activ ? "" : " (dezactivat)"}
            </option>
          ))}
        </select>
        <select aria-label="Status" className="camp" value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
          <option value="">Toate statusurile</option>
          {LISTA_STATUSURI.map((s) => (
            <option key={s} value={s}>
              {STATUSURI[s].eticheta}
            </option>
          ))}
        </select>
        <select aria-label="Nișă" className="camp" value={fNisa} onChange={(e) => setFNisa(e.target.value)}>
          <option value="">Toate nișele</option>
          {LISTA_NISE.map((n) => (
            <option key={n} value={n}>
              {NISE[n].eticheta}
            </option>
          ))}
        </select>
        <select aria-label="Oraș" className="camp" value={fOras} onChange={(e) => setFOras(e.target.value)}>
          <option value="">Toate orașele</option>
          {orase.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <select aria-label="Sursa" className="camp" value={fSursa} onChange={(e) => setFSursa(e.target.value)}>
          <option value="">Toate sursele</option>
          <option value="alocat">Alocate de tine</option>
          <option value="adaugat_de_vanzator">Adăugate de vânzători</option>
        </select>
      </div>

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      {alese.size > 0 && (
        <div className="sticky top-16 z-20 mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-echipa-accent/50 bg-echipa-card-2 p-3 lg:top-4">
          <span className="text-sm font-semibold">{alese.size} alese</span>
          <select aria-label="Atribuie lui" className="camp max-w-xs flex-1" value={tinta} onChange={(e) => setTinta(e.target.value)}>
            <option value="">Atribuie lui...</option>
            <option value="nealocat">Nealocat</option>
            {oameni
              .filter((o) => o.activ)
              .map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nume}
                </option>
              ))}
          </select>
          <Buton onClick={realoca} disabled={seLucreaza}>
            {seLucreaza ? "Se salvează..." : "Atribuie"}
          </Buton>
          <Buton varianta="pericol" onClick={stergeAlese} disabled={seLucreaza}>
            Șterge
          </Buton>
          <Buton varianta="fantoma" onClick={() => setAlese(new Set())}>
            Anulează
          </Buton>
        </div>
      )}

      {leaduri === null ? (
        <Incarcare />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-echipa-line/70 bg-echipa-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-echipa-muted">
              <tr>
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    aria-label="Alege toate"
                    checked={toateAlese}
                    onChange={() => setAlese(toateAlese ? new Set() : new Set(filtrate.map((l) => l.id)))}
                  />
                </th>
                <th className="px-3 py-3">Afacere</th>
                <th className="px-3 py-3">Oraș</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Vânzător</th>
                <th className="px-3 py-3">Sursa</th>
                <th className="px-3 py-3">Creat</th>
              </tr>
            </thead>
            <tbody>
              {filtrate.slice(0, 500).map((l) => (
                <tr key={l.id} className="border-t border-echipa-line/50 hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <input type="checkbox" aria-label={`Alege ${l.afacere}`} checked={alese.has(l.id)} onChange={() => comuta(l.id)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Link href={`/echipa/app/leaduri/${l.id}`} className="font-medium hover:text-echipa-accent">
                      {l.afacere}
                    </Link>
                    <span className="block text-xs text-echipa-muted">{NISE[l.nisa]?.eticheta}</span>
                  </td>
                  <td className="px-3 py-2.5">{l.oras}</td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={l.status as Status} mic />
                  </td>
                  <td className="px-3 py-2.5">{l.vanzator_id ? numeVanzator[l.vanzator_id] : <span className="text-echipa-muted">Nealocat</span>}</td>
                  <td className="px-3 py-2.5 text-xs">{l.sursa === "alocat" ? "Alocat" : <span className="text-echipa-accent">Adăugat de vânzător</span>}</td>
                  <td className="px-3 py-2.5 text-xs text-echipa-muted">{dataScurta(l.creat_la)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtrate.length > 500 && (
            <p className="border-t border-echipa-line/50 px-3 py-2 text-xs text-echipa-muted">
              Se afișează primele 500. Folosește filtrele ca să restrângi lista (selectarea tuturor include toate cele {filtrate.length}).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
