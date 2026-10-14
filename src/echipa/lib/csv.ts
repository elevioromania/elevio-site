"use client";

import Papa from "papaparse";

// Descarcă un CSV (cu BOM, ca Excel să afișeze corect diacriticele).
export function descarcaCsv(nume: string, randuri: Record<string, unknown>[]) {
  const csv = Papa.unparse(randuri);
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nume;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function citesteCsv(fisier: File): Promise<{ coloane: string[]; randuri: Record<string, string>[] }> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(fisier, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (h) => h.replace(/^﻿/, "").trim(),
      complete: (r) => resolve({ coloane: r.meta.fields ?? [], randuri: r.data }),
      error: reject,
    });
  });
}

// Citește un CSV sau un Excel (.xlsx): prima linie e capul de tabel.
export async function citesteFisier(fisier: File): Promise<{ coloane: string[]; randuri: Record<string, string>[] }> {
  if (/\.xlsx$/i.test(fisier.name)) {
    const { readSheet } = await import("read-excel-file/browser");
    const date = await readSheet(fisier);
    const [cap = [], ...rest] = date;
    const coloane = cap.map((c, i) => String(c ?? "").trim() || `Coloana ${i + 1}`);
    const randuri = rest
      .filter((r) => r.some((c) => c !== null && String(c).trim() !== ""))
      .map((r) => Object.fromEntries(coloane.map((c, i) => [c, r[i] == null ? "" : String(r[i])])));
    return { coloane, randuri };
  }
  return citesteCsv(fisier);
}
