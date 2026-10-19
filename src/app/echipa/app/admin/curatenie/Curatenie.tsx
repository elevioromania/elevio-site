"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { Status } from "@/echipa/config";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Gol, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { MOTIV_FARA_TELEFON, MOTIV_MERO, motivCuratenie } from "@/echipa/lib/curatenie";
import { dataScurta, linkExtern } from "@/echipa/lib/format";
import { toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type LeadVerificat = {
  id: string;
  afacere: string;
  oras: string | null;
  site: string | null;
  telefon_afacere: string | null;
  decident_telefon: string | null;
  status: Status;
  vanzator_id: string | null;
  creat_la: string;
};
type Gasit = LeadVerificat & { motiv: string; protejat: boolean; nou: boolean };

// Lead-urile la care s-a lucrat serios nu se șterg din oficiu: le bifezi tu dacă vrei.
const STATUSURI_PROTEJATE: Status[] = ["aproape", "intalnire"];
const ZILE_NOI = 7;

export default function Curatenie() {
  const [gasite, setGasite] = useState<Gasit[] | null>(null);
  const [verificate, setVerificate] = useState(0);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [alese, setAlese] = useState<Set<string>>(new Set());
  const [filtru, setFiltru] = useState<"" | typeof MOTIV_MERO | typeof MOTIV_FARA_TELEFON>("");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);
  const [seSterge, setSeSterge] = useState(false);

  const verifica = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, p, pr] = await Promise.all([
      toatePaginile<LeadVerificat>((de, pana) =>
        supabase.from("leads").select("id, afacere, oras, site, telefon_afacere, decident_telefon, status, vanzator_id, creat_la").order("creat_la", { ascending: false }).order("id").range(de, pana),
      ),
      supabase.from("profiles").select("id, nume"),
      supabase.from("predari").select("lead_id"),
    ]);
    const cuPredare = new Set(((pr.data as { lead_id: string }[]) ?? []).map((x) => x.lead_id));
    const prag = new Date(Date.now() - ZILE_NOI * 86400000).toISOString();
    const rezultat: Gasit[] = [];
    for (const lead of l.data) {
      const motiv = motivCuratenie(lead);
      if (motiv) rezultat.push({ ...lead, motiv, protejat: STATUSURI_PROTEJATE.includes(lead.status) || cuPredare.has(lead.id), nou: lead.creat_la >= prag });
    }
    setVerificate(l.data.length);
    setNume(Object.fromEntries(((p.data as { id: string; nume: string }[]) ?? []).map((x) => [x.id, x.nume])));
    setGasite(rezultat);
    setAlese(new Set(rezultat.filter((g) => !g.protejat).map((g) => g.id)));
  }, []);
  useIncarca(verifica);

  const vizibile = useMemo(() => (gasite ?? []).filter((g) => !filtru || g.motiv === filtru), [gasite, filtru]);
  const nrAlese = vizibile.filter((g) => alese.has(g.id)).length;
  function comuta(id: string) {
    const nou = new Set(alese);
    if (nou.has(id)) nou.delete(id);
    else nou.add(id);
    setAlese(nou);
  }

  async function sterge() {
    const ids = vizibile.filter((g) => alese.has(g.id)).map((g) => g.id);
    if (!ids.length || !confirm(`Ștergi definitiv ${ids.length} lead-uri? Nu se mai pot recupera.`)) return;
    setSeSterge(true);
    setMesaj(null);
    const supabase = supabaseBrowser();
    let sterse = 0;
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await supabase.from("leads").delete().in("id", ids.slice(i, i + 200));
      if (error) break;
      sterse += Math.min(200, ids.length - i);
    }
    setSeSterge(false);
    setMesaj(
      sterse === ids.length
        ? { tip: "succes", text: `Am șters ${sterse} lead-uri. Lista e curată.` }
        : { tip: "eroare", text: `Am șters ${sterse} din ${ids.length}. Restul nu au putut fi șterse, încearcă din nou.` },
    );
    verifica();
  }

  if (gasite === null) return <Incarcare />;

  const nrMero = gasite.filter((g) => g.motiv === MOTIV_MERO).length;
  const nrFaraTel = gasite.filter((g) => g.motiv === MOTIV_FARA_TELEFON).length;
  const nrProtejate = gasite.filter((g) => g.protejat).length;

  return (
    <div className="max-w-5xl">
      <TitluPagina
        titlu="Curățenie lead-uri"
        subtitlu="Găsește lead-urile care au Mero pe site sau nu au niciun număr de telefon, ca să le ștergi. Cele noi sunt oprite deja la import și la adăugare."
        actiuni={
          <Buton varianta="secundar" onClick={() => verifica()}>
            Verifică din nou
          </Buton>
        }
      />

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Cifra eticheta="Lead-uri verificate" valoare={verificate} />
        <Cifra eticheta="Au Mero" valoare={nrMero} activ={filtru === MOTIV_MERO} onClick={() => setFiltru(filtru === MOTIV_MERO ? "" : MOTIV_MERO)} />
        <Cifra eticheta="Fără telefon" valoare={nrFaraTel} activ={filtru === MOTIV_FARA_TELEFON} onClick={() => setFiltru(filtru === MOTIV_FARA_TELEFON ? "" : MOTIV_FARA_TELEFON)} />
        <Cifra eticheta="Lucrate, nebifate" valoare={nrProtejate} />
      </div>

      {gasite.length === 0 ? (
        <Gol titlu="Totul e curat">Niciun lead nu are Mero pe site și toate au telefon.</Gol>
      ) : (
        <>
          {nrProtejate > 0 && (
            <p className="mb-3 text-sm text-echipa-muted">
              {nrProtejate === 1 ? "Un lead e" : `${nrProtejate} lead-uri sunt`} „Aproape” sau cu întâlnire, așa că nu le-am bifat. Bifează-le doar dacă vrei să le ștergi și pe ele.
            </p>
          )}
          <div className="sticky top-0 z-10 -mx-4 mb-3 flex flex-wrap items-center gap-3 border-b border-echipa-line/60 bg-echipa-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={vizibile.length > 0 && vizibile.every((g) => alese.has(g.id))}
                onChange={(e) => {
                  const nou = new Set(alese);
                  for (const g of vizibile) {
                    if (e.target.checked) nou.add(g.id);
                    else nou.delete(g.id);
                  }
                  setAlese(nou);
                }}
                className="h-4 w-4 accent-sky-400"
              />
              Toate ({vizibile.length})
            </label>
            {filtru && (
              <button type="button" onClick={() => setFiltru("")} className="text-sm text-echipa-accent hover:underline">
                Arată tot
              </button>
            )}
            <Buton varianta="pericol" className="ml-auto" onClick={sterge} disabled={!nrAlese || seSterge}>
              {seSterge ? "Se șterge..." : `Șterge ${nrAlese} lead-uri`}
            </Buton>
          </div>

          <ul className="space-y-2">
            {vizibile.map((g) => (
              <li key={g.id} className={`flex items-start gap-3 rounded-2xl border bg-echipa-card p-3 ${alese.has(g.id) ? "border-red-400/40" : "border-echipa-line/70"}`}>
                <input type="checkbox" checked={alese.has(g.id)} onChange={() => comuta(g.id)} aria-label={`Alege ${g.afacere}`} className="mt-1 h-4 w-4 shrink-0 accent-sky-400" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/echipa/app/leaduri/${g.id}`} className="truncate font-semibold hover:text-echipa-accent">
                      {g.afacere}
                    </Link>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${g.motiv === MOTIV_MERO ? "bg-fuchsia-500/15 text-fuchsia-200" : "bg-amber-500/15 text-amber-200"}`}>{g.motiv}</span>
                    {g.nou && <span className="rounded-full bg-echipa-accent/15 px-2 py-0.5 text-[11px] font-medium text-echipa-accent">nou</span>}
                    {g.status !== "nou" && <StatusBadge status={g.status} />}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-echipa-muted">
                    {[g.oras, g.vanzator_id ? `la ${nume[g.vanzator_id] ?? "?"}` : "nealocat", `adăugat ${dataScurta(g.creat_la)}`].filter(Boolean).join(" · ")}
                  </p>
                  {g.site && g.motiv === MOTIV_MERO && (
                    <a href={linkExtern(g.site)} target="_blank" rel="noopener noreferrer" className="mt-0.5 block truncate text-xs text-echipa-accent hover:underline">
                      {g.site}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Cifra({ eticheta, valoare, activ = false, onClick }: { eticheta: string; valoare: number; activ?: boolean; onClick?: () => void }) {
  const continut = (
    <>
      <span className="block text-2xl font-bold tabular-nums">{valoare}</span>
      <span className="text-xs text-echipa-muted">{eticheta}</span>
    </>
  );
  const clase = `rounded-2xl border p-3 text-left ${activ ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card"}`;
  return onClick ? (
    <button type="button" onClick={onClick} aria-pressed={activ} className={`${clase} hover:border-echipa-accent/60`}>
      {continut}
    </button>
  ) : (
    <div className={clase}>{continut}</div>
  );
}
