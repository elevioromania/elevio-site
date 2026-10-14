"use client";

import { useEffect, useMemo, useState } from "react";
import { LISTA_NISE, NISE, type Nisa } from "@/echipa/config";
import { IconIncarca } from "@/echipa/components/icons";
import { Buton, Card, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { citesteCsv } from "@/echipa/lib/csv";
import { normal } from "@/echipa/lib/format";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

// Câmpurile din baza de date și numele de coloană recomandat în CSV.
const CAMPURI: { camp: string; eticheta: string; coloana: string; obligatoriu?: boolean }[] = [
  { camp: "afacere", eticheta: "Numele afacerii", coloana: "afacere", obligatoriu: true },
  { camp: "nisa", eticheta: "Nișa", coloana: "nisa" },
  { camp: "oras", eticheta: "Oraș", coloana: "oras" },
  { camp: "adresa", eticheta: "Adresa", coloana: "adresa" },
  { camp: "telefon_afacere", eticheta: "Telefonul afacerii", coloana: "telefon_afacere" },
  { camp: "site", eticheta: "Site", coloana: "site" },
  { camp: "google_maps", eticheta: "Google Maps", coloana: "google_maps" },
  { camp: "decident_nume", eticheta: "Decident: nume", coloana: "decident_nume" },
  { camp: "decident_functie", eticheta: "Decident: funcție", coloana: "decident_functie" },
  { camp: "decident_telefon", eticheta: "Decident: telefon", coloana: "decident_telefon" },
  { camp: "decident_email", eticheta: "Decident: e-mail", coloana: "decident_email" },
  { camp: "notite", eticheta: "Notițe", coloana: "note" },
];

type Vanzator = { id: string; nume: string };
type RandPregatit = { date: Record<string, string | null>; motiv: string | null };

// Recunoaște nișa din textul din CSV.
function nisaDinText(t: string): Nisa {
  const x = normal(t);
  if (!x) return "altele";
  if (LISTA_NISE.includes(x as Nisa)) return x as Nisa;
  if (/stomat|dent/.test(x)) return "stomatologie";
  if (/salon|coafur|frizer|manichiur|beauty|barber|unghii/.test(x)) return "salon";
  if (/spa|masaj|wellness/.test(x)) return "spa";
  if (/hotel|pensiun|cazare/.test(x)) return "hotel";
  if (/restaurant|bistro|pizz|cafe/.test(x)) return "restaurant";
  if (/service|auto|vulcaniz/.test(x)) return "service_auto";
  if (/clinic|medical|cabinet|policlinic/.test(x)) return "clinica";
  return "altele";
}

function cheieLocala(r: Record<string, string | null>) {
  const tel = (r.telefon_afacere ?? "").replace(/\D/g, "").replace(/^(0040|40(?=\d{9}$)|0)/, "");
  return { tel: tel || null, nume: normal(r.afacere ?? "").replace(/[^a-z0-9]+/g, " ").trim() + "|" + normal(r.oras ?? "").replace(/[^a-z0-9]+/g, " ").trim() };
}

export default function ImportCsv() {
  const [vanzatori, setVanzatori] = useState<Vanzator[]>([]);
  const [fisier, setFisier] = useState<string>("");
  const [coloane, setColoane] = useState<string[]>([]);
  const [randuri, setRanduri] = useState<Record<string, string>[]>([]);
  const [mapare, setMapare] = useState<Record<string, string>>({});
  const [vanzator, setVanzator] = useState("");
  const [pregatite, setPregatite] = useState<RandPregatit[] | null>(null);
  const [stare, setStare] = useState<"" | "verific" | "import">("");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes" | "info"; text: string } | null>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("profiles")
      .select("id, nume")
      .eq("activ", true)
      .order("nume")
      .then(({ data }) => setVanzatori(data ?? []));
  }, []);

  async function alegeFisier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    // Golim câmpul, ca același fișier să poată fi ales din nou.
    e.target.value = "";
    if (!f) return;
    setMesaj(null);
    setPregatite(null);
    try {
      const r = await citesteCsv(f);
      setFisier(f.name);
      setColoane(r.coloane);
      setRanduri(r.randuri);
      // Potrivire automată după numele coloanei.
      const auto: Record<string, string> = {};
      for (const c of CAMPURI) {
        const gasit = r.coloane.find((col) => normal(col) === normal(c.coloana) || normal(col) === normal(c.camp));
        if (gasit) auto[c.camp] = gasit;
      }
      setMapare(auto);
    } catch {
      setMesaj({ tip: "eroare", text: "Fișierul nu a putut fi citit. Verifică să fie CSV." });
    }
  }

  const transformate = useMemo(
    () =>
      randuri.map((r) => {
        const d: Record<string, string | null> = {};
        for (const c of CAMPURI) {
          const v = mapare[c.camp] ? (r[mapare[c.camp]] ?? "").trim() : "";
          d[c.camp] = v || null;
        }
        d.nisa = nisaDinText(d.nisa ?? "");
        return d;
      }),
    [randuri, mapare],
  );

  async function verifica() {
    if (!mapare.afacere) return setMesaj({ tip: "eroare", text: "Alege coloana pentru numele afacerii." });
    setMesaj(null);
    setStare("verific");
    const supabase = supabaseBrowser();
    const rezultat: RandPregatit[] = [];
    const vazute = new Set<string>();

    // Verificarea față de baza de date, în bucăți.
    const existente: boolean[] = [];
    for (let i = 0; i < transformate.length; i += 500) {
      const bucata = transformate.slice(i, i + 500);
      const { data, error } = await supabase.rpc("duplicate_import", {
        p_telefoane: bucata.map((r) => r.telefon_afacere ?? ""),
        p_afaceri: bucata.map((r) => r.afacere ?? ""),
        p_orase: bucata.map((r) => r.oras ?? ""),
      });
      if (error) {
        setStare("");
        return setMesaj({ tip: "eroare", text: "Verificarea duplicatelor a eșuat. Încearcă din nou." });
      }
      existente.push(...((data as boolean[]) ?? []));
    }

    transformate.forEach((r, i) => {
      let motiv: string | null = null;
      if (!r.afacere) motiv = "Lipsește numele afacerii";
      else if (existente[i]) motiv = "Există deja în baza de date";
      else {
        const k = cheieLocala(r);
        if ((k.tel && vazute.has("t:" + k.tel)) || vazute.has("n:" + k.nume)) motiv = "Apare de două ori în fișier";
        if (k.tel) vazute.add("t:" + k.tel);
        vazute.add("n:" + k.nume);
      }
      rezultat.push({ date: r, motiv });
    });
    setPregatite(rezultat);
    setStare("");
  }

  async function importa() {
    if (!pregatite) return;
    const bune = pregatite.filter((p) => !p.motiv).map((p) => ({ ...p.date, vanzator_id: vanzator || null, sursa: "alocat" }));
    if (!bune.length) return;
    setStare("import");
    const supabase = supabaseBrowser();
    let importate = 0;
    for (let i = 0; i < bune.length; i += 500) {
      const { error } = await supabase.from("leads").insert(bune.slice(i, i + 500));
      if (error) {
        setStare("");
        return setMesaj({ tip: "eroare", text: `Importul s-a oprit după ${importate} lead-uri. Verifică fișierul și încearcă din nou.` });
      }
      importate += Math.min(500, bune.length - i);
    }
    setStare("");
    setPregatite(null);
    setRanduri([]);
    setColoane([]);
    setFisier("");
    const cui = vanzatori.find((v) => v.id === vanzator)?.nume;
    setMesaj({ tip: "succes", text: `Am importat ${importate} lead-uri${cui ? ` pentru ${cui}` : " (nealocate)"}.` });
  }

  const nrDuplicate = pregatite?.filter((p) => p.motiv).length ?? 0;
  const nrBune = (pregatite?.length ?? 0) - nrDuplicate;

  return (
    <div className="max-w-4xl">
      <TitluPagina titlu="Import de lead-uri din CSV" subtitlu="Încarcă fișierul, potrivește coloanele, alege vânzătorul, verifică și importă." />

      <Card className="mb-4">
        <p className="text-sm text-echipa-muted">Formatul recomandat (prima linie):</p>
        <code className="mt-2 block overflow-x-auto whitespace-nowrap rounded-lg bg-echipa-bg px-3 py-2 text-xs text-echipa-accent">
          afacere,nisa,oras,adresa,telefon_afacere,site,google_maps,decident_nume,decident_functie,decident_telefon,decident_email,note
        </code>
        <p className="mt-2 text-xs text-echipa-muted">
          Nișa poate fi: {LISTA_NISE.map((n) => NISE[n].eticheta.toLowerCase()).join(", ")}. Un exemplu e în fișierul exemplu-import-leaduri.csv din repo.
        </p>
        <label className="mt-4 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-echipa-line p-4 text-center hover:border-echipa-accent/60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent">
          <IconIncarca className="h-6 w-6 text-echipa-accent" />
          <span className="text-sm font-medium">{fisier || "Alege fișierul CSV"}</span>
          {randuri.length > 0 && <span className="text-xs text-echipa-muted">{randuri.length} rânduri</span>}
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={alegeFisier} />
        </label>
      </Card>

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      {coloane.length > 0 && (
        <Card className="mb-4">
          <h2 className="mb-3 font-semibold">Potrivirea coloanelor</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CAMPURI.map((c) => (
              <div key={c.camp} className="flex items-center gap-3">
                <label htmlFor={`map-${c.camp}`} className="w-40 shrink-0 text-sm">
                  {c.eticheta}
                  {c.obligatoriu && <span className="text-echipa-accent"> *</span>}
                </label>
                <select
                  id={`map-${c.camp}`}
                  className="camp"
                  value={mapare[c.camp] ?? ""}
                  onChange={(e) => {
                    setMapare({ ...mapare, [c.camp]: e.target.value });
                    setPregatite(null);
                  }}
                >
                  <option value="">Nu importa</option>
                  {coloane.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label htmlFor="import-vanzator" className="mb-1.5 block text-sm font-medium">
                Vânzătorul care primește lead-urile
              </label>
              <select id="import-vanzator" className="camp" value={vanzator} onChange={(e) => setVanzator(e.target.value)}>
                <option value="">Nealocat (le aloc mai târziu)</option>
                {vanzatori.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.nume}
                  </option>
                ))}
              </select>
            </div>
            <Buton onClick={verifica} disabled={stare !== ""} mare>
              {stare === "verific" ? "Se verifică..." : "Verifică duplicatele"}
            </Buton>
          </div>
        </Card>
      )}

      {coloane.length > 0 && !pregatite && transformate.length > 0 && (
        <Card className="mb-4">
          <h2 className="mb-3 font-semibold">Previzualizare (primele 5 rânduri)</h2>
          <Tabel randuri={transformate.slice(0, 5).map((d) => ({ date: d, motiv: null }))} />
        </Card>
      )}

      {pregatite && (
        <Card>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Rezultatul verificării</h2>
              <p className="text-sm text-echipa-muted">
                <span className="text-emerald-300">{nrBune} de importat</span>
                {nrDuplicate > 0 && <span className="text-amber-300">, {nrDuplicate} sărite (duplicate sau incomplete)</span>}
              </p>
            </div>
            <Buton varianta="succes" mare onClick={importa} disabled={!nrBune || stare !== ""}>
              {stare === "import" ? "Se importă..." : `Importă ${nrBune} lead-uri`}
            </Buton>
          </div>
          <Tabel randuri={[...pregatite.filter((p) => p.motiv), ...pregatite.filter((p) => !p.motiv)].slice(0, 200)} />
          {pregatite.length > 200 && <p className="mt-2 text-xs text-echipa-muted">Se afișează primele 200 de rânduri.</p>}
        </Card>
      )}
    </div>
  );
}

function Tabel({ randuri }: { randuri: RandPregatit[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-echipa-muted">
          <tr>
            <th className="py-2 pr-3">Afacere</th>
            <th className="py-2 pr-3">Nișă</th>
            <th className="py-2 pr-3">Oraș</th>
            <th className="py-2 pr-3">Telefon</th>
            <th className="py-2 pr-3">Decident</th>
            <th className="py-2">Stare</th>
          </tr>
        </thead>
        <tbody>
          {randuri.map((r, i) => (
            <tr key={i} className="border-t border-echipa-line/60">
              <td className="py-2 pr-3 font-medium">{r.date.afacere || "-"}</td>
              <td className="py-2 pr-3">{NISE[r.date.nisa as Nisa]?.eticheta}</td>
              <td className="py-2 pr-3">{r.date.oras || "-"}</td>
              <td className="py-2 pr-3">{r.date.telefon_afacere || "-"}</td>
              <td className="py-2 pr-3">{r.date.decident_nume || "-"}</td>
              <td className={`py-2 text-xs ${r.motiv ? "text-amber-300" : "text-emerald-300"}`}>{r.motiv ?? "De importat"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
