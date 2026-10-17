"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LISTA_NISE, NISE, type Nisa } from "@/echipa/config";
import { CAMPURI, potrivireAutomata, transforma, verificaRanduri, type RandPregatit } from "@/echipa/lib/import";
import { IconIncarca } from "@/echipa/components/icons";
import { Buton, Card, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { citesteFisier } from "@/echipa/lib/csv";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type Vanzator = { id: string; nume: string };

// Folosit pe pagina de import din Admin și, compact, în „Lead-urile mele” ale adminului.
export default function ImportCsv({ compact, vanzatorImplicit = "", laGata }: { compact?: boolean; vanzatorImplicit?: string; laGata?: () => void } = {}) {
  const [vanzatori, setVanzatori] = useState<Vanzator[]>([]);
  const [fisier, setFisier] = useState<string>("");
  const [numeLista, setNumeLista] = useState("");
  const [foldere, setFoldere] = useState<{ id: string; nume: string }[]>([]);
  const [folderExistent, setFolderExistent] = useState("");
  const [parinti, setParinti] = useState<{ id: string; nume: string }[]>([]);
  const [parinte, setParinte] = useState("");
  const [peste, setPeste] = useState(false);
  const [listaNoua, setListaNoua] = useState<{ id: string; nume: string } | null>(null);
  const [coloane, setColoane] = useState<string[]>([]);
  const [randuri, setRanduri] = useState<Record<string, string>[]>([]);
  const [mapare, setMapare] = useState<Record<string, string>>({});
  const [vanzator, setVanzator] = useState(vanzatorImplicit);
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
    supabaseBrowser()
      .from("liste")
      .select("id, nume")
      .order("creat_la", { ascending: false })
      .then(({ data }) => setFoldere(data ?? []));
    supabaseBrowser()
      .from("foldere")
      .select("id, nume")
      .order("nume")
      .then(({ data }) => setParinti(data ?? []));
  }, []);

  async function alegeFisier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    // Golim câmpul, ca același fișier să poată fi ales din nou.
    e.target.value = "";
    if (f) await incarcaFisier(f);
  }

  async function incarcaFisier(f: File) {
    setMesaj(null);
    setPregatite(null);
    setListaNoua(null);
    if (/\.(docx?|pdf)$/i.test(f.name)) {
      return setMesaj({
        tip: "eroare",
        text: "Fișierele Word și PDF nu au coloane clare. Trimite-l lui Claude și cere-i să-l transforme în CSV sau Excel (ori să adauge el lead-urile direct).",
      });
    }
    try {
      const r = await citesteFisier(f);
      setFisier(f.name);
      setNumeLista(f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim());
      setColoane(r.coloane);
      setRanduri(r.randuri);
      const auto = potrivireAutomata(r.coloane);
      setMapare(auto);
    } catch {
      setMesaj({ tip: "eroare", text: "Fișierul nu a putut fi citit. Folosește CSV sau Excel (.xlsx)." });
    }
  }

  const transformate = useMemo(() => transforma(randuri, mapare), [randuri, mapare]);

  async function verifica() {
    if (!mapare.afacere) return setMesaj({ tip: "eroare", text: "Alege coloana pentru numele afacerii." });
    setMesaj(null);
    setStare("verific");
    const rezultat = await verificaRanduri(supabaseBrowser(), transformate);
    if (!rezultat) {
      setStare("");
      return setMesaj({ tip: "eroare", text: "Verificarea duplicatelor a eșuat. Încearcă din nou." });
    }
    setPregatite(rezultat);
    setStare("");
  }

  async function importa() {
    if (!pregatite) return;
    const bune = pregatite.filter((p) => !p.motiv).map((p) => ({ ...p.date, vanzator_id: vanzator || null, sursa: "alocat" }));
    if (!bune.length) return;
    if (!folderExistent && !numeLista.trim()) return setMesaj({ tip: "eroare", text: "Dă un nume fișierului." });
    setStare("import");
    const supabase = supabaseBrowser();
    const existent = foldere.find((f) => f.id === folderExistent);
    const { data: lista, error: eroareLista } = existent
      ? { data: existent, error: null }
      : await supabase.from("liste").insert({ nume: numeLista.trim(), folder_id: parinte || null }).select("id, nume").single();
    if (eroareLista || !lista) {
      setStare("");
      return setMesaj({ tip: "eroare", text: "Fișierul nu a putut fi creat. Încearcă din nou." });
    }
    let importate = 0;
    for (let i = 0; i < bune.length; i += 500) {
      const { error } = await supabase.from("leads").insert(bune.slice(i, i + 500).map((b) => ({ ...b, lista_id: lista.id })));
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
    setListaNoua(lista);
    if (!existent) setFoldere([lista, ...foldere]);
    setMesaj({
      tip: "succes",
      text: `${existent ? `Am adăugat ${importate} lead-uri în fișierul „${lista.nume}”` : `Fișierul „${lista.nume}” a fost creat cu ${importate} lead-uri`}${cui ? `, atribuite lui ${cui}` : " (nealocate)"}.`,
    });
    laGata?.();
  }

  const nrDuplicate = pregatite?.filter((p) => p.motiv).length ?? 0;
  const nrBune = (pregatite?.length ?? 0) - nrDuplicate;

  return (
    <div className={compact ? "" : "max-w-4xl"}>
      {!compact && (
        <TitluPagina
          titlu="Importă lead-uri"
          subtitlu="Pentru fișiere cu coloane neobișnuite: alegi tu ce coloană ce înseamnă. Pentru încărcări rapide, trage fișierele direct în „Foldere de lead-uri”."
        />
      )}

      <Card className="mb-4">
        {compact ? (
          <p className="text-sm text-echipa-muted">Adaugă multe lead-uri deodată dintr-un fișier CSV sau Excel. Implicit le primești tu.</p>
        ) : (
          <>
            <p className="text-sm text-echipa-muted">Formatul recomandat (prima linie):</p>
            <code className="mt-2 block overflow-x-auto whitespace-nowrap rounded-lg bg-echipa-bg px-3 py-2 text-xs text-echipa-accent">
              afacere,nisa,oras,adresa,telefon_afacere,site,google_maps,decident_nume,decident_functie,decident_telefon,decident_email,note
            </code>
            <p className="mt-2 text-xs text-echipa-muted">
              Nișa poate fi: {LISTA_NISE.map((n) => NISE[n].eticheta.toLowerCase()).join(", ")}. Un exemplu e în fișierul exemplu-import-leaduri.csv din repo.
            </p>
          </>
        )}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setPeste(true);
          }}
          onDragLeave={() => setPeste(false)}
          onDrop={(e) => {
            e.preventDefault();
            setPeste(false);
            const f = e.dataTransfer.files?.[0];
            if (f) void incarcaFisier(f);
          }}
          className={`mt-4 flex ${compact ? "min-h-24" : "min-h-32"} cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 text-center hover:border-echipa-accent/60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent ${
            peste ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line"
          }`}
        >
          <IconIncarca className="h-7 w-7 text-echipa-accent" />
          <span className="text-sm font-medium">{fisier || "Trage fișierul aici sau apasă ca să-l alegi"}</span>
          <span className="text-xs text-echipa-muted">{randuri.length > 0 ? `${randuri.length} rânduri` : "CSV sau Excel (.xlsx)"}</span>
          <input
            type="file"
            accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="sr-only"
            onChange={alegeFisier}
          />
        </label>
        <p className="mt-3 text-xs text-echipa-muted">
          Ai lead-urile într-un Word sau într-un PDF? Trimite-l lui Claude: îl transformă în fișier bun de importat sau adaugă lead-urile direct.
        </p>
      </Card>

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>
            {mesaj.text}
            {listaNoua && mesaj.tip === "succes" && (
              <>
                {" "}
                <Link href={`/echipa/app/admin/liste/${listaNoua.id}`} className="font-semibold underline">
                  Deschide fișierul
                </Link>
              </>
            )}
          </Mesaj>
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

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-2">
              <label htmlFor="import-folder" className="block text-sm font-medium">
                În ce fișier intră
              </label>
              <select id="import-folder" className="camp" value={folderExistent} onChange={(e) => setFolderExistent(e.target.value)}>
                <option value="">Fișier nou</option>
                {foldere.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nume}
                  </option>
                ))}
              </select>
              {!folderExistent && (
                <input
                  id="import-lista"
                  aria-label="Numele fișierului nou"
                  className="camp"
                  placeholder="Numele fișierului nou (de ex. Clinici Sector 3)"
                  value={numeLista}
                  onChange={(e) => setNumeLista(e.target.value)}
                />
              )}
              {!folderExistent && parinti.length > 0 && (
                <select aria-label="Folderul fișierului nou" className="camp" value={parinte} onChange={(e) => setParinte(e.target.value)}>
                  <option value="">Fără folder</option>
                  {parinti.map((f) => (
                    <option key={f.id} value={f.id}>
                      În folderul: {f.nume}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label htmlFor="import-vanzator" className="mb-1.5 block text-sm font-medium">
                Cine primește lead-urile
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
            <th className="py-2 pr-3">Contact</th>
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
