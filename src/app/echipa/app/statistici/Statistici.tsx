"use client";

import { useCallback, useState } from "react";
import { Incarcare, TitluPagina } from "@/echipa/components/ui";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type Rand = {
  user_id: string;
  nume: string;
  titlu: string;
  rol: string;
  activ: boolean;
  leaduri: number;
  apeluri_saptamana: number;
  apeluri: number;
  intalniri: number;
  clienti: number;
};

function rata(clienti: number, intalniri: number) {
  return intalniri ? `${Math.round((clienti / intalniri) * 100)}%` : "-";
}

export default function Statistici() {
  const [randuri, setRanduri] = useState<Rand[] | null>(null);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().rpc("statistici_echipa");
    setRanduri(((data as Rand[]) ?? []).filter((r) => r.rol === "vanzator"));
  }, []);
  useIncarca(incarca);

  if (randuri === null) return <Incarcare />;

  const total = randuri.reduce(
    (t, r) => ({
      leaduri: t.leaduri + r.leaduri,
      apeluri_saptamana: t.apeluri_saptamana + r.apeluri_saptamana,
      apeluri: t.apeluri + r.apeluri,
      intalniri: t.intalniri + r.intalniri,
      clienti: t.clienti + r.clienti,
    }),
    { leaduri: 0, apeluri_saptamana: 0, apeluri: 0, intalniri: 0, clienti: 0 },
  );

  return (
    <div>
      <TitluPagina titlu="Statistici" subtitlu="Pe vânzător și pe toată echipa. Rata = clienți închiși din întâlnirile programate." />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Total e="Lead-uri alocate" v={total.leaduri} />
        <Total e="Apeluri săptămâna asta" v={total.apeluri_saptamana} />
        <Total e="Apeluri în total" v={total.apeluri} />
        <Total e="Întâlniri" v={total.intalniri} />
        <Total e="Clienți (rata)" v={`${total.clienti} (${rata(total.clienti, total.intalniri)})`} />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-echipa-line/70 bg-echipa-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-echipa-muted">
            <tr>
              <th className="px-4 py-3">Vânzător</th>
              <th className="px-3 py-3 text-right">Lead-uri</th>
              <th className="px-3 py-3 text-right">Apeluri (săpt.)</th>
              <th className="px-3 py-3 text-right">Apeluri</th>
              <th className="px-3 py-3 text-right">Întâlniri</th>
              <th className="px-3 py-3 text-right">Clienți</th>
              <th className="px-4 py-3 text-right">Rata</th>
            </tr>
          </thead>
          <tbody>
            {randuri.map((r) => (
              <tr key={r.user_id} className={`border-t border-echipa-line/50 ${r.activ ? "" : "opacity-50"}`}>
                <td className="px-4 py-3">
                  <span className="font-medium">{r.nume}</span>
                  <span className="block text-xs text-echipa-muted">
                    {r.titlu}
                    {r.activ ? "" : ", dezactivat"}
                  </span>
                </td>
                <td className="px-3 py-3 text-right tabular-nums">{r.leaduri}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.apeluri_saptamana}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.apeluri}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.intalniri}</td>
                <td className="px-3 py-3 text-right font-semibold tabular-nums text-echipa-accent">{r.clienti}</td>
                <td className="px-4 py-3 text-right tabular-nums">{rata(r.clienti, r.intalniri)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Total({ e, v }: { e: string; v: number | string }) {
  return (
    <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
      <p className="text-2xl font-bold tabular-nums">{v}</p>
      <p className="mt-1 text-xs text-echipa-muted">{e}</p>
    </div>
  );
}
