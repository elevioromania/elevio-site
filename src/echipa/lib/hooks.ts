"use client";

import { useEffect, useSyncExternalStore } from "react";

// Încarcă datele de la Supabase când se montează componenta (și când se schimbă funcția).
// Starea se actualizează după răspunsul serverului, nu sincron în efect.
export function useIncarca(incarca: () => Promise<unknown>) {
  useEffect(() => {
    void incarca();
  }, [incarca]);
}

// O preferință ținută în localStorage (de exemplu vizualizarea listă/kanban).
const EVENIMENT = "echipa-preferinte";

export function usePreferinta<T extends string>(cheie: string, implicit: T, permise: readonly T[]): [T, (v: T) => void] {
  const valoare = useSyncExternalStore(
    (anunta) => {
      window.addEventListener("storage", anunta);
      window.addEventListener(EVENIMENT, anunta);
      return () => {
        window.removeEventListener("storage", anunta);
        window.removeEventListener(EVENIMENT, anunta);
      };
    },
    () => {
      try {
        const v = localStorage.getItem(cheie) as T | null;
        return v && permise.includes(v) ? v : implicit;
      } catch {
        return implicit;
      }
    },
    () => implicit,
  );
  const seteaza = (v: T) => {
    try {
      localStorage.setItem(cheie, v);
    } catch {
      // fără localStorage: preferința nu se ține minte
    }
    window.dispatchEvent(new Event(EVENIMENT));
  };
  return [valoare, seteaza];
}
