"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";
import { COLOANE_PROFIL, type Profil } from "../lib/tipuri";

type Ctx = { profil: Profil; reincarca: () => Promise<void>; esteAdmin: boolean };

const ProfilCtx = createContext<Ctx | null>(null);

export function ProfilProvider({ initial, children }: { initial: Profil; children: React.ReactNode }) {
  const [profil, setProfil] = useState(initial);
  const reincarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("profiles").select(COLOANE_PROFIL).eq("id", initial.id).maybeSingle();
    if (data) setProfil(data as Profil);
  }, [initial.id]);
  return <ProfilCtx.Provider value={{ profil, reincarca, esteAdmin: profil.rol === "admin" }}>{children}</ProfilCtx.Provider>;
}

export function useProfil() {
  const ctx = useContext(ProfilCtx);
  if (!ctx) throw new Error("useProfil în afara ProfilProvider");
  return ctx;
}
