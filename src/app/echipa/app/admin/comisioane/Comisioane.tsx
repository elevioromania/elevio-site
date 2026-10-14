"use client";

import { useCallback, useState } from "react";
import { Buton, Card, Gol, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { CULORI_STARE, stareTransa1, stareTransa2, type ClientComision, type StareTransa } from "@/echipa/lib/comision";
import { dataScurta, euro } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type Client = ClientComision & {
  predari: { pachet: string | null; pret_lunar: number | null; inchis_la: string | null; leads: { afacere: string; oras: string | null } | null } | null;
};
type Prag = { id: string; prag: number; suma: number; descriere: string | null };
type Acordat = { id: string; vanzator_id: string; prag: number; suma: number; platit: boolean; platit_la: string | null; creat_la: string };

type Bifa = "taxa_instalare_platita" | "prima_luna_incheiata" | "anulat" | "transa1_platita" | "transa2_platita";

const BIFE: { camp: Bifa; eticheta: string }[] = [
  { camp: "taxa_instalare_platita", eticheta: "Instalarea plătită de client" },
  { camp: "prima_luna_incheiata", eticheta: "Prima lună încheiată" },
  { camp: "anulat", eticheta: "Client anulat" },
  { camp: "transa1_platita", eticheta: "Tranșa 1 plătită vânzătorului" },
  { camp: "transa2_platita", eticheta: "Tranșa 2 plătită vânzătorului" },
];

export default function Comisioane() {
  const [clienti, setClienti] = useState<Client[] | null>(null);
  const [praguri, setPraguri] = useState<Prag[]>([]);
  const [acordate, setAcordate] = useState<Acordat[]>([]);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);
  const [pragNou, setPragNou] = useState({ prag: "", suma: "", descriere: "" });

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [c, p, a, o] = await Promise.all([
      supabase.from("clienti_comision").select("*, predari(pachet, pret_lunar, inchis_la, leads(afacere, oras))").order("creat_la", { ascending: false }),
      supabase.from("bonusuri_config").select("id, prag, suma, descriere").order("prag"),
      supabase.from("bonusuri_acordate").select("*").order("creat_la", { ascending: false }),
      supabase.from("profiles").select("id, nume"),
    ]);
    setClienti((c.data as Client[]) ?? []);
    setPraguri((p.data as Prag[]) ?? []);
    setAcordate((a.data as Acordat[]) ?? []);
    setNume(Object.fromEntries((o.data ?? []).map((x) => [x.id, x.nume])));
  }, []);
  useIncarca(incarca);

  async function bifeaza(c: Client, camp: Bifa, valoare: boolean) {
    const { error } = await supabaseBrowser().from("clienti_comision").update({ [camp]: valoare }).eq("id", c.id);
    if (error) setMesaj({ tip: "eroare", text: "Nu am putut salva." });
    incarca();
  }

  async function sumaTransa(c: Client, camp: "transa1_suma" | "transa2_suma", v: string) {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0 || n === Number(c[camp])) return;
    const { error } = await supabaseBrowser().from("clienti_comision").update({ [camp]: n }).eq("id", c.id);
    setMesaj(error ? { tip: "eroare", text: "Nu am putut salva suma." } : { tip: "succes", text: "Suma a fost actualizată." });
    incarca();
  }

  async function salveazaPrag(p: Prag, suma: string, descriere: string) {
    const { error } = await supabaseBrowser().from("bonusuri_config").update({ suma: Number(suma) || 0, descriere: descriere.trim() || null }).eq("id", p.id);
    setMesaj(error ? { tip: "eroare", text: "Nu am putut salva bonusul." } : { tip: "succes", text: "Bonusul a fost salvat." });
    incarca();
  }

  async function adaugaPrag(e: React.FormEvent) {
    e.preventDefault();
    const prag = Number(pragNou.prag);
    if (!prag || prag < 1) return setMesaj({ tip: "eroare", text: "Pragul trebuie să fie un număr de clienți (minimum 1)." });
    const { error } = await supabaseBrowser()
      .from("bonusuri_config")
      .insert({ prag, suma: Number(pragNou.suma) || 0, descriere: pragNou.descriere.trim() || null });
    setMesaj(error ? { tip: "eroare", text: "Există deja un bonus pentru acest prag." } : { tip: "succes", text: "Prag adăugat." });
    setPragNou({ prag: "", suma: "", descriere: "" });
    incarca();
  }

  async function stergePrag(p: Prag) {
    if (!confirm(`Ștergi bonusul pentru ${p.prag} clienți? Bonusurile deja acordate rămân.`)) return;
    await supabaseBrowser().from("bonusuri_config").delete().eq("id", p.id);
    incarca();
  }

  async function bonusPlatit(a: Acordat, platit: boolean) {
    await supabaseBrowser().from("bonusuri_acordate").update({ platit }).eq("id", a.id);
    incarca();
  }

  if (clienti === null) return <Incarcare />;

  return (
    <div className="max-w-4xl space-y-6">
      <TitluPagina titlu="Clienți și comisioane" subtitlu="Bifezi ce s-a întâmplat; stările tranșelor se actualizează singure la vânzători." />
      {mesaj && <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>}

      <section>
        <h2 className="mb-3 text-lg font-bold">Clienți închiși</h2>
        {clienti.length === 0 ? (
          <Gol titlu="Niciun client închis încă">Când marchezi o întâlnire „Client închis”, apare aici.</Gol>
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
                    {c.vanzator_id ? nume[c.vanzator_id] : "-"} · {c.predari?.pachet} · {euro(c.predari?.pret_lunar)} / lună · închis {dataScurta(c.predari?.inchis_la)}
                  </p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <RandTransa titlu="Tranșa 1 (instalare)" valoare={c.transa1_suma} stare={stareTransa1(c)} salveaza={(v) => sumaTransa(c, "transa1_suma", v)} />
                  <RandTransa titlu="Tranșa 2 (50% din prima lună)" valoare={c.transa2_suma} stare={stareTransa2(c)} salveaza={(v) => sumaTransa(c, "transa2_suma", v)} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {BIFE.map((b) => (
                    <label key={b.camp} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={c[b.camp]} onChange={(e) => bifeaza(c, b.camp, e.target.checked)} />
                      {b.eticheta}
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Bonusuri</h2>
        <Card>
          <p className="mb-3 text-sm text-echipa-muted">Un bonus se acordă automat când vânzătorul atinge pragul de clienți închiși.</p>
          <ul className="space-y-2">
            {praguri.map((p) => (
              <RandPrag key={p.id} p={p} salveaza={salveazaPrag} sterge={stergePrag} />
            ))}
          </ul>
          <form onSubmit={adaugaPrag} className="mt-4 grid gap-2 border-t border-echipa-line/60 pt-4 sm:grid-cols-[7rem_7rem_1fr_auto]">
            <input aria-label="Prag (clienți)" type="number" min={1} className="camp" placeholder="Clienți" value={pragNou.prag} onChange={(e) => setPragNou({ ...pragNou, prag: e.target.value })} />
            <input aria-label="Suma (€)" type="number" min={0} className="camp" placeholder="Suma €" value={pragNou.suma} onChange={(e) => setPragNou({ ...pragNou, suma: e.target.value })} />
            <input aria-label="Descriere" className="camp" placeholder="Descriere" value={pragNou.descriere} onChange={(e) => setPragNou({ ...pragNou, descriere: e.target.value })} />
            <Buton type="submit">Adaugă prag</Buton>
          </form>
        </Card>

        {acordate.length > 0 && (
          <Card className="mt-3">
            <p className="mb-3 font-semibold">Bonusuri câștigate</p>
            <ul className="divide-y divide-echipa-line/60">
              {acordate.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                  <span>
                    <strong>{nume[a.vanzator_id] ?? "-"}</strong>: {a.prag === 1 ? "primul client" : `${a.prag} clienți`}, {euro(a.suma)}
                  </span>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={a.platit} onChange={(e) => bonusPlatit(a, e.target.checked)} />
                    Plătit
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>
    </div>
  );
}

function RandTransa({ titlu, valoare, stare, salveaza }: { titlu: string; valoare: number; stare: StareTransa; salveaza: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-echipa-bg/60 px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs text-echipa-muted">{titlu}</p>
        <div className="flex items-center gap-1">
          <input
            aria-label={`${titlu}: suma`}
            type="number"
            min={0}
            defaultValue={valoare}
            key={valoare}
            onBlur={(e) => salveaza(e.target.value)}
            className="w-20 rounded-md border border-transparent bg-transparent px-1 py-0.5 font-bold hover:border-echipa-line focus:border-echipa-accent focus:outline-none"
          />
          <span className="font-bold">€</span>
        </div>
      </div>
      <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${CULORI_STARE[stare]}`}>{stare}</span>
    </div>
  );
}

function RandPrag({ p, salveaza, sterge }: { p: Prag; salveaza: (p: Prag, suma: string, descriere: string) => void; sterge: (p: Prag) => void }) {
  const [suma, setSuma] = useState(String(p.suma));
  const [descriere, setDescriere] = useState(p.descriere ?? "");
  const modificat = Number(suma) !== Number(p.suma) || descriere !== (p.descriere ?? "");
  return (
    <li className="grid items-center gap-2 sm:grid-cols-[7rem_7rem_1fr_auto_auto]">
      <span className="text-sm font-semibold">{p.prag === 1 ? "Primul client" : `${p.prag} clienți`}</span>
      <input aria-label={`Suma pentru ${p.prag} clienți`} type="number" min={0} className="camp" value={suma} onChange={(e) => setSuma(e.target.value)} />
      <input aria-label={`Descriere pentru ${p.prag} clienți`} className="camp" value={descriere} onChange={(e) => setDescriere(e.target.value)} />
      <Buton onClick={() => salveaza(p, suma, descriere)} disabled={!modificat}>
        Salvează
      </Buton>
      <Buton varianta="fantoma" onClick={() => sterge(p)}>
        Șterge
      </Buton>
    </li>
  );
}
