"use client";

import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";
import { useProfil } from "./ProfilContext";
import { Buton, Camp, Mesaj } from "./ui";

// Cine nu are prenumele completat îl scrie o singură dată, înainte să intre în platformă.
export default function CerePrenume() {
  const { profil, reincarca } = useProfil();
  const [prenume, setPrenume] = useState("");
  const [familie, setFamilie] = useState("");
  const [eroare, setEroare] = useState("");
  const [seSalveaza, setSeSalveaza] = useState(false);

  if (profil.prenume?.trim()) return null;

  async function salveaza(e: React.FormEvent) {
    e.preventDefault();
    if (prenume.trim().length < 2) return setEroare("Scrie prenumele.");
    if (familie.trim().length < 2) return setEroare("Scrie numele de familie.");
    setSeSalveaza(true);
    const { error } = await supabaseBrowser()
      .from("profiles")
      .update({ prenume: prenume.trim(), nume: `${prenume.trim()} ${familie.trim()}` })
      .eq("id", profil.id);
    setSeSalveaza(false);
    if (error) return setEroare("Nu am putut salva. Încearcă din nou.");
    await reincarca();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 sm:items-center" role="dialog" aria-modal="true" aria-label="Prenumele tău">
      <form onSubmit={salveaza} className="w-full rounded-t-3xl border border-echipa-line bg-echipa-card-2 p-6 sm:max-w-md sm:rounded-3xl" noValidate>
        <h2 className="text-xl font-bold">Cum te numești?</h2>
        <p className="mt-1 text-sm text-echipa-muted">Ca să te salutăm cu prenumele. Durează 5 secunde.</p>
        <div className="mt-5 space-y-4">
          {eroare && <Mesaj>{eroare}</Mesaj>}
          <Camp eticheta="Prenume" htmlFor="cp-prenume" obligatoriu>
            <input id="cp-prenume" autoFocus autoComplete="given-name" className="camp" value={prenume} onChange={(e) => setPrenume(e.target.value)} />
          </Camp>
          <Camp eticheta="Nume de familie" htmlFor="cp-familie" obligatoriu>
            <input id="cp-familie" autoComplete="family-name" className="camp" value={familie} onChange={(e) => setFamilie(e.target.value)} />
          </Camp>
          <Buton type="submit" mare className="w-full" disabled={seSalveaza}>
            {seSalveaza ? "Se salvează..." : "Salvează"}
          </Buton>
        </div>
      </form>
    </div>
  );
}
