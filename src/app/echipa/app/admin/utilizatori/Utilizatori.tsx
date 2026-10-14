"use client";

import { useCallback, useState } from "react";
import { COMISION_INSTALARE_VARIANTE, TITLURI_SUGERATE } from "@/echipa/config";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Buton, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { dataScurta } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import { COLOANE_PROFIL, type Profil, type Rol } from "@/echipa/lib/tipuri";

const ROLURI: Record<Rol, string> = { vanzator: "Vânzător", trainer: "Trainer", admin: "Admin" };

export default function Utilizatori() {
  const { profil: eu } = useProfil();
  const [lista, setLista] = useState<Profil[] | null>(null);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("profiles").select(COLOANE_PROFIL).order("activ", { ascending: false }).order("nume");
    setLista((data as Profil[]) ?? []);
  }, []);

  useIncarca(incarca);

  return (
    <div>
      <TitluPagina titlu="Utilizatori" subtitlu="Titlul, rolul și comisionul se schimbă doar de aici." />
      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}
      {lista === null ? (
        <Incarcare />
      ) : (
        <ul className="space-y-3">
          {lista.map((u) => (
            <RandUtilizator key={u.id} u={u} esteEu={u.id === eu.id} laSchimbare={incarca} setMesaj={setMesaj} />
          ))}
        </ul>
      )}
      <datalist id="titluri-sugerate">
        {TITLURI_SUGERATE.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
    </div>
  );
}

function RandUtilizator({
  u,
  esteEu,
  laSchimbare,
  setMesaj,
}: {
  u: Profil;
  esteEu: boolean;
  laSchimbare: () => void;
  setMesaj: (m: { tip: "eroare" | "succes"; text: string } | null) => void;
}) {
  const [prenume, setPrenume] = useState(u.prenume ?? "");
  const [nume, setNume] = useState(u.nume);
  const [titlu, setTitlu] = useState(u.titlu);
  const [rol, setRol] = useState<Rol>(u.rol);
  const [comision, setComision] = useState(String(u.comision_instalare));
  const [seLucreaza, setSeLucreaza] = useState(false);
  const modificat = prenume !== (u.prenume ?? "") || nume !== u.nume || titlu !== u.titlu || rol !== u.rol || Number(comision) !== Number(u.comision_instalare);

  async function salveaza() {
    setSeLucreaza(true);
    const { error } = await supabaseBrowser()
      .from("profiles")
      .update({ prenume: prenume.trim() || null, nume: nume.trim() || u.nume, titlu: titlu.trim() || "Echipa de marketing Elevio", rol, comision_instalare: Number(comision) || 0 })
      .eq("id", u.id);
    setSeLucreaza(false);
    setMesaj(error ? { tip: "eroare", text: "Nu am putut salva." } : { tip: "succes", text: `Salvat: ${u.nume}.` });
    laSchimbare();
  }

  async function comutaActiv() {
    const actiune = u.activ ? "dezactiveaza" : "activeaza";
    if (u.activ && !confirm(`Dezactivezi contul lui ${u.nume}? Nu va mai putea intra, iar lead-urile lui rămân și pot fi realocate.`)) return;
    setSeLucreaza(true);
    const { data, error } = await supabaseBrowser().functions.invoke("admin-utilizatori", { body: { actiune, user_id: u.id } });
    setSeLucreaza(false);
    if (error || !data?.ok) {
      let text = "Nu am putut schimba starea contului.";
      try {
        const corp = await (error as { context?: Response })?.context?.json();
        if (corp?.eroare) text = corp.eroare;
      } catch {
        // fără detalii
      }
      setMesaj({ tip: "eroare", text });
    } else {
      setMesaj({ tip: "succes", text: u.activ ? `${u.nume} a fost dezactivat.` : `${u.nume} a fost reactivat.` });
    }
    laSchimbare();
  }

  return (
    <li className={`rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 ${u.activ ? "" : "opacity-60"}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold">
            {u.nume} {esteEu && <span className="text-xs text-echipa-accent">(tu)</span>}
            {!u.activ && <span className="ml-2 rounded-full bg-red-500/15 px-2 py-0.5 text-xs text-red-300">Dezactivat</span>}
          </p>
          <p className="break-all text-sm text-echipa-muted">
            {u.email}
            {u.telefon ? ` · ${u.telefon}` : ""} · din {dataScurta(u.creat_la)}
          </p>
        </div>
        {!esteEu && (
          <Buton varianta={u.activ ? "pericol" : "secundar"} onClick={comutaActiv} disabled={seLucreaza}>
            {u.activ ? "Dezactivează" : "Reactivează"}
          </Buton>
        )}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[8rem_1fr_1fr_9rem_9rem_auto] sm:items-end">
        <div>
          <label htmlFor={`prenume-${u.id}`} className="mb-1 block text-xs text-echipa-muted">
            Prenume
          </label>
          <input id={`prenume-${u.id}`} className="camp" value={prenume} onChange={(e) => setPrenume(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`nume-${u.id}`} className="mb-1 block text-xs text-echipa-muted">
            Nume complet
          </label>
          <input id={`nume-${u.id}`} className="camp" value={nume} onChange={(e) => setNume(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`titlu-${u.id}`} className="mb-1 block text-xs text-echipa-muted">
            Titlu afișat
          </label>
          <input id={`titlu-${u.id}`} list="titluri-sugerate" className="camp" value={titlu} onChange={(e) => setTitlu(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`rol-${u.id}`} className="mb-1 block text-xs text-echipa-muted">
            Rol
          </label>
          <select id={`rol-${u.id}`} className="camp" value={rol} onChange={(e) => setRol(e.target.value as Rol)} disabled={esteEu}>
            {(Object.keys(ROLURI) as Rol[]).map((r) => (
              <option key={r} value={r}>
                {ROLURI[r]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`comision-${u.id}`} className="mb-1 block text-xs text-echipa-muted">
            Comision instalare (€)
          </label>
          <input
            id={`comision-${u.id}`}
            type="number"
            min={0}
            list="comisioane"
            className="camp"
            value={comision}
            onChange={(e) => setComision(e.target.value)}
          />
          <datalist id="comisioane">
            {COMISION_INSTALARE_VARIANTE.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <Buton onClick={salveaza} disabled={!modificat || seLucreaza}>
          Salvează
        </Buton>
      </div>
    </li>
  );
}
