"use client";

import { useCallback, useState } from "react";
import { IconMedalie } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type Rand = { user_id: string; nume: string; titlu: string; clienti: number; intalniri: number; apeluri: number; pozitie: number };
type Perioada = "saptamana" | "luna" | "total";

const PERIOADE: { cod: Perioada; eticheta: string }[] = [
  { cod: "saptamana", eticheta: "Săptămâna" },
  { cod: "luna", eticheta: "Luna" },
  { cod: "total", eticheta: "Tot timpul" },
];

export const MEDALII = ["#F5C451", "#C9D3DE", "#D08A57"];
const NUME_MEDALII = ["Aur", "Argint", "Bronz"];

export default function Clasament() {
  const { profil } = useProfil();
  const [perioada, setPerioada] = useState<Perioada>("saptamana");
  const [randuri, setRanduri] = useState<Rand[] | null>(null);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().rpc("clasament", { p_perioada: perioada });
    setRanduri((data as Rand[]) ?? []);
  }, [perioada]);
  useIncarca(incarca);

  return (
    <div className="max-w-3xl">
      <TitluPagina titlu="Clasament" subtitlu="Contează întâi lead-urile închise, apoi întâlnirile programate, apoi apelurile marcate." />
      <div className="mb-5 flex gap-1 rounded-2xl border border-echipa-line/70 bg-echipa-card-2 p-1" role="tablist" aria-label="Perioada">
        {PERIOADE.map((p) => (
          <button
            key={p.cod}
            type="button"
            role="tab"
            aria-selected={perioada === p.cod}
            onClick={() => {
              setRanduri(null);
              setPerioada(p.cod);
            }}
            className={`flex-1 rounded-xl px-2 py-2 text-sm font-medium ${perioada === p.cod ? "bg-echipa-accent text-echipa-bg" : "text-echipa-muted"}`}
          >
            {p.eticheta}
          </button>
        ))}
      </div>

      {randuri === null ? (
        <Incarcare />
      ) : randuri.length === 0 ? (
        <Gol titlu="Încă nu e nimeni în clasament" />
      ) : (
        <ol className="space-y-2">
          {randuri.map((r) => {
            const podium = r.pozitie <= 3 && (r.clienti > 0 || r.intalniri > 0 || r.apeluri > 0);
            const eu = r.user_id === profil.id;
            return (
              <li
                key={r.user_id}
                className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border p-3 sm:flex-nowrap sm:p-4 ${eu ? "border-echipa-accent/70 bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card"}`}
                style={podium ? { boxShadow: `inset 3px 0 0 ${MEDALII[r.pozitie - 1]}` } : undefined}
              >
                <div className="flex w-10 shrink-0 flex-col items-center">
                  {podium ? (
                    <span style={{ color: MEDALII[r.pozitie - 1] }} title={NUME_MEDALII[r.pozitie - 1]}>
                      <IconMedalie className="h-7 w-7" />
                      <span className="sr-only">{NUME_MEDALII[r.pozitie - 1]}</span>
                    </span>
                  ) : (
                    <span className="text-lg font-bold tabular-nums text-echipa-muted">{r.pozitie}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {r.nume} {eu && <span className="text-xs text-echipa-accent">(tu)</span>}
                  </p>
                  <p className="truncate text-xs text-echipa-muted">{r.titlu}</p>
                </div>
                <div className="grid w-full grid-cols-3 gap-3 pl-[3.25rem] text-center sm:w-auto sm:gap-6 sm:pl-0">
                  <Cifra e="Închise" v={r.clienti} principal />
                  <Cifra e="Întâlniri" v={r.intalniri} />
                  <Cifra e="Apeluri" v={r.apeluri} />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function Cifra({ e, v, principal }: { e: string; v: number; principal?: boolean }) {
  return (
    <div>
      <p className={`text-lg font-bold tabular-nums ${principal ? "text-echipa-accent" : ""}`}>{v}</p>
      <p className="text-[10px] uppercase tracking-wide text-echipa-muted">{e}</p>
    </div>
  );
}
