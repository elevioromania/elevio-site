"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { IconInapoi } from "@/echipa/components/icons";
import Insigna from "@/echipa/components/Insigna";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Gol, Incarcare, Mesaj } from "@/echipa/components/ui";
import { stareTransa1, stareTransa2, type ClientComision, type StareTransa } from "@/echipa/lib/comision";
import { euro } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import { COLOANE_PROFIL, type Profil } from "@/echipa/lib/tipuri";
import { RandUtilizator, ROLURI } from "../Utilizatori";
import LeaduriMembru from "./LeaduriMembru";

type Statistici = { leaduri: number; apeluri_saptamana: number; apeluri: number; intalniri: number; clienti: number };
type Bonus = { suma: number; platit: boolean };
type Tab = "leaduri" | "cont";

// Profilul unui membru, doar pentru admin: sus cifrele pe scurt, dedesubt lead-urile lui sau setările contului.
export default function ProfilMembru({ id }: { id: string }) {
  const { profil: eu } = useProfil();
  const [u, setU] = useState<Profil | null | undefined>(undefined);
  const [cifre, setCifre] = useState<Statistici | null>(null);
  const [comisioane, setComisioane] = useState<ClientComision[]>([]);
  const [bonusuri, setBonusuri] = useState<Bonus[]>([]);
  const [insigne, setInsigne] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("leaduri");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [p, s, c, b, i] = await Promise.all([
      supabase.from("profiles").select(COLOANE_PROFIL).eq("id", id).maybeSingle(),
      supabase.rpc("statistici_echipa"),
      supabase.from("clienti_comision").select("*").eq("vanzator_id", id),
      supabase.from("bonusuri_acordate").select("suma, platit").eq("vanzator_id", id),
      supabase.from("insigne").select("cod_insigna").eq("user_id", id).order("obtinuta_la"),
    ]);
    setU((p.data as Profil) ?? null);
    setCifre(((s.data as (Statistici & { user_id: string })[]) ?? []).find((r) => r.user_id === id) ?? null);
    setComisioane((c.data as ClientComision[]) ?? []);
    setBonusuri((b.data as Bonus[]) ?? []);
    setInsigne((i.data ?? []).map((x) => x.cod_insigna));
  }, [id]);
  useIncarca(incarca);

  if (u === undefined) return <Incarcare />;
  if (u === null) return <Gol titlu="Membrul nu există" />;

  const sume: Record<StareTransa, number> = { "În așteptare": 0, "De plată": 0, Plătit: 0, Anulată: 0 };
  for (const c of comisioane) {
    sume[stareTransa1(c)] += Number(c.transa1_suma);
    sume[stareTransa2(c)] += Number(c.transa2_suma);
  }
  for (const b of bonusuri) sume[b.platit ? "Plătit" : "De plată"] += Number(b.suma);

  return (
    <div className="max-w-4xl space-y-5">
      <Link href="/echipa/app/comunitate" className="inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
        <IconInapoi className="h-4 w-4" /> Echipa
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-echipa-accent/15 text-xl font-bold text-echipa-accent">
          {u.nume.trim().charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
            {u.nume}
            {!u.activ && <span className="ml-2 align-middle rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-300">Dezactivat</span>}
          </h1>
          <p className="text-sm text-echipa-muted">
            {ROLURI[u.rol]} · comision instalare <strong className="text-echipa-text">{euro(u.comision_instalare)}</strong>
            {u.telefon ? ` · ${u.telefon}` : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-echipa-line/70 bg-echipa-line/50 sm:grid-cols-5">
        <Cifra e="Lead-uri" v={cifre?.leaduri ?? 0} />
        <Cifra e="Apeluri săpt." v={cifre?.apeluri_saptamana ?? 0} />
        <Cifra e="Întâlniri" v={cifre?.intalniri ?? 0} />
        <Cifra e="Închise" v={cifre?.clienti ?? 0} />
        <Cifra e="De plată" v={euro(sume["De plată"])} accent={sume["De plată"] > 0} className="col-span-2 sm:col-span-1" />
      </div>

      <div role="tablist" className="flex gap-1 border-b border-echipa-line/70">
        <ButonTab activ={tab === "leaduri"} onClick={() => setTab("leaduri")}>
          Lead-uri
        </ButonTab>
        <ButonTab activ={tab === "cont"} onClick={() => setTab("cont")}>
          Cont și bani
        </ButonTab>
      </div>

      {tab === "leaduri" ? (
        <LeaduriMembru id={u.id} nume={u.prenume || u.nume} laSchimbare={incarca} />
      ) : (
        <div className="space-y-5">
          {mesaj && <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>}
          <ul>
            <RandUtilizator u={u} esteEu={u.id === eu.id} laSchimbare={incarca} setMesaj={setMesaj} />
          </ul>
          <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 text-sm">
            <p>
              Plătit până acum <strong>{euro(sume["Plătit"])}</strong> · De plată <strong className="text-echipa-accent">{euro(sume["De plată"])}</strong> · În
              așteptare <strong>{euro(sume["În așteptare"])}</strong>
            </p>
            <p className="mt-1 text-xs text-echipa-muted">
              Bifele de plată sunt în{" "}
              <Link href="/echipa/app/admin/comisioane" className="text-echipa-accent hover:underline">
                Lead-uri închise și comisioane
              </Link>
              .
            </p>
          </div>
          {insigne.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {insigne.map((i) => (
                <Insigna key={i} cod={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ButonTab({ activ, onClick, children }: { activ: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={activ}
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
        activ ? "border-echipa-accent text-echipa-text" : "border-transparent text-echipa-muted hover:text-echipa-text"
      }`}
    >
      {children}
    </button>
  );
}

function Cifra({ e, v, accent, className = "" }: { e: string; v: number | string; accent?: boolean; className?: string }) {
  return (
    <div className={`bg-echipa-card px-3 py-3 text-center ${className}`}>
      <p className={`text-xl font-bold tabular-nums ${accent ? "text-echipa-accent" : ""}`}>{v}</p>
      <p className="mt-0.5 text-xs text-echipa-muted">{e}</p>
    </div>
  );
}
