"use client";

import { useState } from "react";
import { useProgresGhid } from "../lib/progres";
import { IconBifa } from "./icons";
import { useProfil } from "./ProfilContext";

export default function ButonCitit({ sectiune }: { sectiune: string }) {
  const { profil } = useProfil();
  const { citite, marcheaza } = useProgresGhid(profil.id);
  const [seSalveaza, setSeSalveaza] = useState(false);
  const citit = citite?.includes(sectiune) ?? false;

  return (
    <button
      type="button"
      disabled={citite === null || seSalveaza}
      aria-pressed={citit}
      onClick={async () => {
        setSeSalveaza(true);
        await marcheaza(sectiune, !citit);
        setSeSalveaza(false);
      }}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border px-5 font-semibold transition-colors sm:w-auto ${
        citit ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300" : "border-echipa-accent bg-echipa-accent text-echipa-bg hover:bg-sky-300"
      }`}
    >
      <IconBifa className="h-5 w-5" />
      {citit ? "Citit" : "Am citit"}
    </button>
  );
}
