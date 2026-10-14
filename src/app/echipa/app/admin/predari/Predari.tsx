"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { REZULTATE_PREDARE } from "@/echipa/config";
import { IconDescarca } from "@/echipa/components/icons";
import { Buton, Gol, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { descarcaCsv } from "@/echipa/lib/csv";
import { dataOra, linkTel, relativ } from "@/echipa/lib/format";
import { toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Predare } from "@/echipa/lib/tipuri";

type PredareCuLead = Predare & { leads: { afacere: string; oras: string | null } | null };

const CULORI: Record<string, string> = {
  noua: "bg-echipa-accent/15 text-echipa-accent",
  confirmata: "bg-sky-500/15 text-sky-200",
  neprezentat: "bg-red-500/15 text-red-300",
  reprogramata: "bg-amber-500/15 text-amber-200",
  inchis: "bg-emerald-500/15 text-emerald-300",
  neinchis: "bg-zinc-500/20 text-zinc-300",
};

export default function Predari() {
  const [lista, setLista] = useState<PredareCuLead[] | null>(null);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [filtru, setFiltru] = useState("");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [p, o] = await Promise.all([
      toatePaginile<PredareCuLead>((de, pana) =>
        supabase.from("predari").select("*, leads(afacere, oras)").order("creat_la", { ascending: false }).order("id").range(de, pana),
      ),
      supabase.from("profiles").select("id, nume"),
    ]);
    setLista(p.data);
    setNume(Object.fromEntries((o.data ?? []).map((x) => [x.id, x.nume])));
  }, []);

  useIncarca(incarca);

  const vizibile = useMemo(() => (lista ?? []).filter((p) => !filtru || p.rezultat === filtru), [lista, filtru]);

  function exporta() {
    descarcaCsv(
      `intalniri-${new Date().toISOString().slice(0, 10)}.csv`,
      vizibile.map((p) => ({
        afacere: p.leads?.afacere,
        oras: p.leads?.oras,
        vanzator: p.vanzator_id ? nume[p.vanzator_id] : "",
        data_intalnire: p.data_intalnire,
        format: p.format === "online" ? "online" : "la locație",
        adresa: p.adresa,
        decident_nume: p.decident_nume,
        decident_functie: p.decident_functie,
        decident_telefon: p.decident_telefon,
        decident_email: p.decident_email,
        a_sunat_demo: p.a_sunat_demo ? "da" : "nu",
        reactie_demo: p.reactie_demo,
        problema: p.problema,
        participanti: p.participanti,
        notite: p.notite,
        rezultat: REZULTATE_PREDARE[p.rezultat],
        pachet: p.pachet,
        pret_lunar: p.pret_lunar,
        predata_la: p.creat_la,
      })),
    );
  }

  return (
    <div>
      <TitluPagina
        titlu="Întâlniri predate"
        subtitlu="Marchează rezultatul fiecărei întâlniri. „Lead închis” calculează automat comisionul."
        actiuni={
          <Buton varianta="secundar" onClick={exporta} disabled={!vizibile.length}>
            <IconDescarca className="h-4 w-4" /> Export CSV
          </Buton>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtru rezultat">
        {[["", "Toate"], ...Object.entries(REZULTATE_PREDARE)].map(([k, v]) => (
          <button
            key={k}
            type="button"
            aria-pressed={filtru === k}
            onClick={() => setFiltru(k)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${filtru === k ? "border-echipa-accent bg-echipa-accent/15 text-echipa-accent" : "border-echipa-line text-echipa-muted"}`}
          >
            {v}
            {lista && <span className="ml-1 opacity-70">{k ? lista.filter((p) => p.rezultat === k).length : lista.length}</span>}
          </button>
        ))}
      </div>
      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}
      {lista === null ? (
        <Incarcare />
      ) : vizibile.length === 0 ? (
        <Gol titlu="Nicio întâlnire aici încă" />
      ) : (
        <ul className="space-y-3">
          {vizibile.map((p) => (
            <CardPredare key={p.id} p={p} vanzator={p.vanzator_id ? nume[p.vanzator_id] : ""} laSalvare={incarca} setMesaj={setMesaj} />
          ))}
        </ul>
      )}
    </div>
  );
}

function CardPredare({
  p,
  vanzator,
  laSalvare,
  setMesaj,
}: {
  p: PredareCuLead;
  vanzator: string;
  laSalvare: () => void;
  setMesaj: (m: { tip: "eroare" | "succes"; text: string }) => void;
}) {
  const [rezultat, setRezultat] = useState(p.rezultat);
  const [pachet, setPachet] = useState(p.pachet ?? "");
  const [pret, setPret] = useState(p.pret_lunar != null ? String(p.pret_lunar) : "");
  const [seSalveaza, setSeSalveaza] = useState(false);
  const modificat = rezultat !== p.rezultat || pachet !== (p.pachet ?? "") || pret !== (p.pret_lunar != null ? String(p.pret_lunar) : "");

  async function salveaza() {
    if (rezultat === "inchis" && (!pachet.trim() || !pret)) {
      return setMesaj({ tip: "eroare", text: "Pentru „Lead închis” completează pachetul și prețul lunar." });
    }
    setSeSalveaza(true);
    const { error } = await supabaseBrowser()
      .from("predari")
      .update({
        rezultat,
        pachet: rezultat === "inchis" ? pachet.trim() : p.pachet,
        pret_lunar: rezultat === "inchis" ? Number(pret) : p.pret_lunar,
      })
      .eq("id", p.id);
    setSeSalveaza(false);
    if (error) return setMesaj({ tip: "eroare", text: "Nu am putut salva rezultatul." });
    setMesaj({ tip: "succes", text: `Salvat: ${p.leads?.afacere ?? "întâlnirea"}, ${REZULTATE_PREDARE[rezultat]}.` });
    laSalvare();
  }

  return (
    <li className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/echipa/app/leaduri/${p.lead_id}`} className="text-base font-semibold hover:text-echipa-accent">
            {p.leads?.afacere ?? "Lead"}
            {p.leads?.oras ? `, ${p.leads.oras}` : ""}
          </Link>
          <p className="text-sm text-echipa-muted">
            De la {vanzator || "-"}, {relativ(p.creat_la)}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CULORI[p.rezultat]}`}>{REZULTATE_PREDARE[p.rezultat]}</span>
      </div>

      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <Info e="Când" v={`${dataOra(p.data_intalnire)}, ${p.format === "online" ? "online" : `la locație: ${p.adresa}`}`} />
        <Info
          e="Persoana de contact"
          v={
            <>
              {p.decident_nume}, {p.decident_functie},{" "}
              <a href={linkTel(p.decident_telefon)} className="text-echipa-accent hover:underline">
                {p.decident_telefon}
              </a>
              , {p.decident_email}
            </>
          }
        />
        <Info e="A sunat la demo" v={`${p.a_sunat_demo ? "Da" : "Nu"}. Reacția: ${p.reactie_demo}`} />
        <Info e="Problema lui" v={p.problema} />
        <Info e="Participă și" v={p.participanti} />
        {p.notite && <Info e="Notițe" v={p.notite} />}
      </dl>

      <div className="mt-4 grid gap-2 border-t border-echipa-line/60 pt-4 sm:grid-cols-[1fr_1fr_8rem_auto] sm:items-end">
        <div>
          <label htmlFor={`rez-${p.id}`} className="mb-1 block text-xs text-echipa-muted">
            Rezultat
          </label>
          <select id={`rez-${p.id}`} className="camp" value={rezultat} onChange={(e) => setRezultat(e.target.value as Predare["rezultat"])}>
            {Object.entries(REZULTATE_PREDARE).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        {rezultat === "inchis" ? (
          <>
            <div>
              <label htmlFor={`pachet-${p.id}`} className="mb-1 block text-xs text-echipa-muted">
                Pachet
              </label>
              <input id={`pachet-${p.id}`} className="camp" value={pachet} onChange={(e) => setPachet(e.target.value)} />
            </div>
            <div>
              <label htmlFor={`pret-${p.id}`} className="mb-1 block text-xs text-echipa-muted">
                Preț lunar (€)
              </label>
              <input id={`pret-${p.id}`} type="number" min={0} className="camp" value={pret} onChange={(e) => setPret(e.target.value)} />
            </div>
          </>
        ) : (
          <div className="hidden sm:col-span-2 sm:block" />
        )}
        <Buton onClick={salveaza} disabled={!modificat || seSalveaza}>
          Salvează
        </Buton>
      </div>
    </li>
  );
}

function Info({ e, v }: { e: string; v: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-echipa-muted">{e}</dt>
      <dd className="break-words">{v}</dd>
    </div>
  );
}
