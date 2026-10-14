"use client";

import { useCallback, useState } from "react";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Card, Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { CULORI_STARE, stareTransa1, stareTransa2, type ClientComision, type StareTransa } from "@/echipa/lib/comision";
import { dataScurta, euro } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type ClientCuDetalii = ClientComision & {
  predari: { inchis_la: string | null; pachet: string | null; pret_lunar: number | null; leads: { afacere: string; oras: string | null } | null } | null;
};
type Bonus = { id: string; prag: number; suma: number; platit: boolean; platit_la: string | null };
type Prag = { prag: number; suma: number; descriere: string | null };

export default function Castiguri() {
  const { profil } = useProfil();
  const [clienti, setClienti] = useState<ClientCuDetalii[] | null>(null);
  const [bonusuri, setBonusuri] = useState<Bonus[]>([]);
  const [praguri, setPraguri] = useState<Prag[]>([]);
  const [nrClienti, setNrClienti] = useState(0);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [c, b, p, n] = await Promise.all([
      supabase
        .from("clienti_comision")
        .select("*, predari(inchis_la, pachet, pret_lunar, leads(afacere, oras))")
        .eq("vanzator_id", profil.id)
        .order("creat_la", { ascending: false }),
      supabase.from("bonusuri_acordate").select("id, prag, suma, platit, platit_la").eq("vanzator_id", profil.id).order("prag"),
      supabase.from("bonusuri_config").select("prag, suma, descriere").order("prag"),
      supabase.from("predari").select("id", { count: "exact", head: true }).eq("vanzator_id", profil.id).eq("rezultat", "inchis"),
    ]);
    setClienti((c.data as ClientCuDetalii[]) ?? []);
    setBonusuri((b.data as Bonus[]) ?? []);
    setPraguri((p.data as Prag[]) ?? []);
    setNrClienti(n.count ?? 0);
  }, [profil.id]);
  useIncarca(incarca);

  if (clienti === null) return <Incarcare />;

  const sume: Record<StareTransa, number> = { "În așteptare": 0, "De plată": 0, Plătit: 0, Anulată: 0 };
  for (const c of clienti) {
    sume[stareTransa1(c)] += Number(c.transa1_suma);
    sume[stareTransa2(c)] += Number(c.transa2_suma);
  }
  for (const b of bonusuri) sume[b.platit ? "Plătit" : "De plată"] += Number(b.suma);

  const urmatorul = praguri.find((p) => p.prag > nrClienti);
  const anterior = [...praguri].reverse().find((p) => p.prag <= nrClienti)?.prag ?? 0;
  const progres = urmatorul ? Math.min(100, Math.round(((nrClienti - anterior) / (urmatorul.prag - anterior)) * 100)) : 100;

  return (
    <div className="max-w-3xl space-y-5">
      <TitluPagina titlu="Câștigurile mele" subtitlu="Doar tu și David vedeți pagina asta." />

      <div className="grid gap-3 sm:grid-cols-3">
        <Suma eticheta="Total câștigat" valoare={sume["Plătit"] + sume["De plată"]} detaliu={`din care plătit: ${euro(sume["Plătit"])}`} accent />
        <Suma eticheta="De încasat" valoare={sume["De plată"]} detaliu="câștigat, urmează plata" />
        <Suma eticheta="În așteptare" valoare={sume["În așteptare"]} detaliu="după ce clientul plătește sau trece de prima lună" />
      </div>

      <Card>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-echipa-muted">Progresul spre următorul bonus</p>
            <p className="mt-1 text-lg font-bold">
              {urmatorul ? (
                <>
                  {nrClienti} din {urmatorul.prag} clienți <span className="text-echipa-accent">({euro(urmatorul.suma)})</span>
                </>
              ) : praguri.length ? (
                "Ai atins toate pragurile de bonus"
              ) : (
                "Bonusurile nu sunt setate încă"
              )}
            </p>
          </div>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-echipa-bg" role="progressbar" aria-valuenow={progres} aria-valuemin={0} aria-valuemax={100} aria-label="Progres spre bonus">
          <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-echipa-accent transition-all" style={{ width: `${progres}%` }} />
        </div>
        {bonusuri.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bonusuri.map((b) => (
              <li key={b.id} className="flex items-center justify-between rounded-xl bg-echipa-bg/60 px-3 py-2 text-sm">
                <span>Bonus pentru {b.prag === 1 ? "primul client" : `${b.prag} clienți`}</span>
                <span className="flex items-center gap-2">
                  <strong>{euro(b.suma)}</strong>
                  <Stare s={b.platit ? "Plătit" : "De plată"} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <section>
        <h2 className="mb-3 text-lg font-bold">Clienții închiși prin întâlnirile mele</h2>
        {clienti.length === 0 ? (
          <Gol titlu="Încă niciun client închis">Fiecare întâlnire programată te apropie de primul. Prima tranșă vine după ce clientul plătește instalarea.</Gol>
        ) : (
          <ul className="space-y-3">
            {clienti.map((c) => (
              <li key={c.id} className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {c.predari?.leads?.afacere ?? "Client"}
                    {c.predari?.leads?.oras ? `, ${c.predari.leads.oras}` : ""}
                  </p>
                  <p className="text-xs text-echipa-muted">
                    închis {dataScurta(c.predari?.inchis_la ?? c.creat_la)}
                    {c.anulat ? ", anulat ulterior" : ""}
                  </p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Transa titlu="Tranșa 1: din taxa de instalare" suma={c.transa1_suma} stare={stareTransa1(c)} />
                  <Transa titlu="Tranșa 2: 50% din prima lună" suma={c.transa2_suma} stare={stareTransa2(c)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs leading-relaxed text-echipa-muted">
        Cum se plătește: tranșa 1 după ce clientul plătește instalarea; tranșa 2 după ce clientul trece de prima lună (există o garanție pe prima lună). Dacă
        clientul anulează după prima lună, tranșa 1 rămâne a ta.
      </p>
    </div>
  );
}

function Suma({ eticheta, valoare, detaliu, accent }: { eticheta: string; valoare: number; detaliu: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-echipa-accent/60 bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card"}`}>
      <p className="text-sm text-echipa-muted">{eticheta}</p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${accent ? "text-echipa-accent" : ""}`}>{euro(valoare)}</p>
      <p className="mt-1 text-xs text-echipa-muted">{detaliu}</p>
    </div>
  );
}

function Transa({ titlu, suma, stare }: { titlu: string; suma: number; stare: StareTransa }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-echipa-bg/60 px-3 py-2.5">
      <div>
        <p className="text-xs text-echipa-muted">{titlu}</p>
        <p className="font-bold">{euro(suma)}</p>
      </div>
      <Stare s={stare} />
    </div>
  );
}

export function Stare({ s }: { s: StareTransa }) {
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${CULORI_STARE[s]}`}>{s}</span>;
}
