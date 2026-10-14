// Starea tranșelor de comision, calculată din bifele adminului.

export type ClientComision = {
  id: string;
  predare_id: string;
  vanzator_id: string | null;
  taxa_instalare_platita: boolean;
  taxa_instalare_platita_la: string | null;
  prima_luna_incheiata: boolean;
  prima_luna_incheiata_la: string | null;
  anulat: boolean;
  anulat_la: string | null;
  transa1_suma: number;
  transa1_platita: boolean;
  transa1_platita_la: string | null;
  transa2_suma: number;
  transa2_platita: boolean;
  transa2_platita_la: string | null;
  creat_la: string;
};

export type StareTransa = "În așteptare" | "De plată" | "Plătit" | "Anulată";

// Tranșa 1 (partea din taxa de instalare): se plătește după ce clientul plătește instalarea.
export function stareTransa1(c: ClientComision): StareTransa {
  if (c.transa1_platita) return "Plătit";
  if (c.taxa_instalare_platita) return "De plată";
  return "În așteptare";
}

// Tranșa 2 (50% din prima lună): după ce clientul trece de prima lună (garanția).
// Dacă clientul anulează în prima lună, tranșa 2 se anulează; tranșa 1 rămâne a vânzătorului.
export function stareTransa2(c: ClientComision): StareTransa {
  if (c.transa2_platita) return "Plătit";
  if (c.anulat && !c.prima_luna_incheiata) return "Anulată";
  if (c.prima_luna_incheiata) return "De plată";
  return "În așteptare";
}

export const CULORI_STARE: Record<StareTransa, string> = {
  "În așteptare": "bg-zinc-500/20 text-zinc-300",
  "De plată": "bg-amber-400/15 text-amber-200",
  Plătit: "bg-emerald-500/15 text-emerald-300",
  Anulată: "bg-red-500/15 text-red-300",
};
