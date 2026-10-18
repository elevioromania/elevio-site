"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { type Status } from "@/echipa/config";
import AtribuieLista from "@/echipa/components/AtribuieLista";
import { IconFolder, IconIncarca, IconLista, IconManer, IconPlus } from "@/echipa/components/icons";
import MeniuPuncte from "@/echipa/components/MeniuPuncte";
import { Buton, Incarcare, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { citesteFisier } from "@/echipa/lib/csv";
import { dataScurta, nrFisiere } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { potrivireAutomata, transforma, verificaRanduri } from "@/echipa/lib/import";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export type ListaCuLeaduri = {
  id: string;
  nume: string;
  creat_la: string;
  folder_id: string | null;
  leads: { vanzator_id: string | null; status: Status }[];
};
type Folder = { id: string; nume: string; creat_la: string };
type Persoana = { id: string; nume: string; activ: boolean };
type Selectie = "toate" | "fara" | string;
type RezultatIncarcare = { fisier: string; text: string; eroare?: boolean };

const TIP_DRAG = "application/x-elevio-fisier";

// Cui aparține fișierul: un singur om, mai mulți sau nimeni.
export function proprietar(l: ListaCuLeaduri, nume: Record<string, string>) {
  const ids = [...new Set(l.leads.map((x) => x.vanzator_id))];
  if (ids.length === 0) return "Gol";
  if (ids.length > 1) return "Împărțit între mai mulți";
  return ids[0] ? (nume[ids[0]] ?? "Necunoscut") : "Nealocat";
}

// Managerul de lead-uri al adminului: foldere în stânga, fișierele din folderul ales în dreapta.
// Fișierele se încarcă direct în folder (mai multe deodată), se trag dintr-un folder în altul
// și se dau cuiva dintr-un click, unul câte unul sau tot folderul.
export default function Liste() {
  const [foldere, setFoldere] = useState<Folder[] | null>(null);
  const [fisiere, setFisiere] = useState<ListaCuLeaduri[]>([]);
  const [oameni, setOameni] = useState<Persoana[]>([]);
  const [selectie, setSelectie] = useState<Selectie>("toate");
  const [folderNou, setFolderNou] = useState("");
  const [redenumire, setRedenumire] = useState<string | null>(null);
  const [cuiImport, setCuiImport] = useState("");
  const [peste, setPeste] = useState<string | null>(null);
  const [seIncarca, setSeIncarca] = useState(false);
  const [rezultate, setRezultate] = useState<RezultatIncarcare[]>([]);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [f, l, p] = await Promise.all([
      supabase.from("foldere").select("id, nume, creat_la").order("nume"),
      supabase.from("liste").select("id, nume, creat_la, folder_id, leads(vanzator_id, status)").order("creat_la", { ascending: false }),
      supabase.from("profiles").select("id, nume, activ").order("nume"),
    ]);
    setFoldere((f.data as Folder[]) ?? []);
    setFisiere((l.data as ListaCuLeaduri[]) ?? []);
    setOameni((p.data as Persoana[]) ?? []);
  }, []);
  useIncarca(incarca);

  const nume = useMemo(() => Object.fromEntries(oameni.map((o) => [o.id, o.nume])), [oameni]);
  const folderAles = foldere?.find((f) => f.id === selectie) ?? null;
  const vizibile = fisiere.filter((l) => (selectie === "toate" ? true : selectie === "fara" ? !l.folder_id : l.folder_id === selectie));
  const nrInFolder = (id: string | null) => fisiere.filter((l) => l.folder_id === id).length;

  function anunta(text: string, eroare?: boolean) {
    setMesaj({ tip: eroare ? "eroare" : "succes", text });
  }

  async function creeazaFolder(e: React.FormEvent) {
    e.preventDefault();
    const n = folderNou.trim();
    if (!n) return;
    const { data, error } = await supabaseBrowser().from("foldere").insert({ nume: n }).select("id").single();
    if (error || !data) return anunta("Nu am putut crea folderul.", true);
    setFolderNou("");
    await incarca();
    setSelectie(data.id);
    anunta(`Folderul „${n}” e gata. Trage fișierele cu lead-uri în el.`);
  }

  async function redenumesteFolder() {
    if (!folderAles || !redenumire?.trim()) return;
    const { error } = await supabaseBrowser().from("foldere").update({ nume: redenumire.trim() }).eq("id", folderAles.id);
    if (error) return anunta("Nu am putut redenumi folderul.", true);
    setRedenumire(null);
    anunta("Folderul a fost redenumit.");
    incarca();
  }

  async function stergeFolder(f: Folder | null = folderAles) {
    if (!f) return;
    if (!confirm(`Ștergi folderul „${f.nume}”? Fișierele și lead-urile din el rămân, doar că nu mai sunt în niciun folder.`)) return;
    const { error } = await supabaseBrowser().from("foldere").delete().eq("id", f.id);
    if (error) return anunta("Nu am putut șterge folderul.", true);
    if (selectie === f.id) setSelectie("toate");
    anunta("Folderul a fost șters. Fișierele lui sunt acum la „Fără folder”.");
    incarca();
  }

  async function redenumeste(tabel: "foldere" | "liste", id: string, vechi: string, nou: string) {
    const n = nou.trim();
    if (!n || n === vechi) return;
    const { error } = await supabaseBrowser().from(tabel).update({ nume: n }).eq("id", id);
    if (error) return anunta("Nu am putut redenumi.", true);
    anunta(`„${vechi}” se numește acum „${n}”.`);
    incarca();
  }

  async function stergeFisier(f: ListaCuLeaduri, cuLeaduri: boolean) {
    const supabase = supabaseBrowser();
    if (cuLeaduri) {
      const { error } = await supabase.from("leads").delete().eq("lista_id", f.id);
      if (error) return anunta("Nu am putut șterge lead-urile din fișier.", true);
    }
    const { error } = await supabase.from("liste").delete().eq("id", f.id);
    if (error) return anunta("Nu am putut șterge fișierul.", true);
    anunta(cuLeaduri ? `Am șters fișierul „${f.nume}” și cele ${f.leads.length} lead-uri din el.` : `Am șters fișierul „${f.nume}”. Lead-urile au rămas, fără fișier.`);
    incarca();
  }

  async function mutaFisier(fisierId: string, folderId: string | null) {
    const f = fisiere.find((x) => x.id === fisierId);
    if (!f || f.folder_id === folderId) return;
    setFisiere(fisiere.map((x) => (x.id === fisierId ? { ...x, folder_id: folderId } : x)));
    const { error } = await supabaseBrowser().from("liste").update({ folder_id: folderId }).eq("id", fisierId);
    if (error) {
      anunta("Nu am putut muta fișierul.", true);
      return incarca();
    }
    const dest = folderId ? foldere?.find((x) => x.id === folderId)?.nume : null;
    anunta(dest ? `„${f.nume}” a fost mutat în „${dest}”.` : `„${f.nume}” nu mai e în niciun folder.`);
  }

  // Încarcă unul sau mai multe fișiere CSV/Excel direct într-un folder.
  async function incarcaFisiere(lista: File[], folderId: string | null) {
    const bune = lista.filter((f) => /\.(csv|xlsx)$/i.test(f.name));
    const rez: RezultatIncarcare[] = lista
      .filter((f) => !bune.includes(f))
      .map((f) => ({ fisier: f.name, text: "Doar CSV sau Excel (.xlsx). Word sau PDF îl trimiți lui Claude să-l transforme.", eroare: true }));
    if (!bune.length) return setRezultate(rez);
    setSeIncarca(true);
    setRezultate([]);
    setMesaj(null);
    const supabase = supabaseBrowser();
    const vazute = new Set<string>();
    for (const f of bune) {
      try {
        const { coloane, randuri } = await citesteFisier(f);
        const mapare = potrivireAutomata(coloane);
        if (!mapare.afacere) {
          rez.push({ fisier: f.name, text: "Nu am găsit coloana cu numele afacerii. Folosește „Import avansat” ca să alegi coloanele.", eroare: true });
          continue;
        }
        const verificate = await verificaRanduri(supabase, transforma(randuri, mapare), vazute);
        if (!verificate) {
          rez.push({ fisier: f.name, text: "Verificarea duplicatelor a eșuat. Încearcă din nou.", eroare: true });
          continue;
        }
        const deImportat = verificate.filter((r) => !r.motiv).map((r) => r.date);
        const sarite = verificate.length - deImportat.length;
        if (!deImportat.length) {
          rez.push({ fisier: f.name, text: `Nimic nou: toate cele ${verificate.length} rânduri erau duplicate sau incomplete.`, eroare: true });
          continue;
        }
        const { data: fisier, error } = await supabase
          .from("liste")
          .insert({ nume: f.name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").trim(), folder_id: folderId })
          .select("id")
          .single();
        if (error || !fisier) {
          rez.push({ fisier: f.name, text: "Fișierul nu a putut fi creat.", eroare: true });
          continue;
        }
        let importate = 0;
        for (let i = 0; i < deImportat.length; i += 500) {
          const { error: e2 } = await supabase
            .from("leads")
            .insert(deImportat.slice(i, i + 500).map((d) => ({ ...d, lista_id: fisier.id, vanzator_id: cuiImport || null, sursa: "alocat" })));
          if (e2) break;
          importate += Math.min(500, deImportat.length - i);
        }
        rez.push({
          fisier: f.name,
          text: `${importate} lead-uri importate${sarite ? `, ${sarite} sărite (duplicate sau incomplete)` : ""}.`,
          eroare: importate < deImportat.length,
        });
      } catch {
        rez.push({ fisier: f.name, text: "Fișierul nu a putut fi citit.", eroare: true });
      }
    }
    setRezultate(rez);
    setSeIncarca(false);
    incarca();
  }

  function laDrop(e: React.DragEvent, folderId: string | null) {
    e.preventDefault();
    setPeste(null);
    const fisierId = e.dataTransfer.getData(TIP_DRAG);
    if (fisierId) return void mutaFisier(fisierId, folderId);
    const lista = Array.from(e.dataTransfer.files ?? []);
    if (lista.length) void incarcaFisiere(lista, folderId);
  }

  function tinta(id: string, folderId: string | null) {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        setPeste(id);
      },
      onDragLeave: () => setPeste((x) => (x === id ? null : x)),
      onDrop: (e: React.DragEvent) => laDrop(e, folderId),
    };
  }

  if (foldere === null) return <Incarcare />;

  const folderDestinatie = selectie === "toate" || selectie === "fara" ? null : selectie;
  const titluSectiune = selectie === "toate" ? "Toate fișierele" : selectie === "fara" ? "Fără folder" : (folderAles?.nume ?? "");

  return (
    <div>
      <TitluPagina
        titlu="Foldere de lead-uri"
        subtitlu="Folderele le creezi și le numești tu. În fiecare folder pui fișierele cu lead-uri și le dai cuiva dintr-un click."
      />

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
        {/* Folderele */}
        <aside className="space-y-3">
          <form onSubmit={creeazaFolder} className="flex gap-2">
            <input
              aria-label="Numele folderului nou"
              className="camp min-w-0 flex-1"
              placeholder="Folder nou..."
              value={folderNou}
              onChange={(e) => setFolderNou(e.target.value)}
            />
            <Buton type="submit" disabled={!folderNou.trim()} aria-label="Creează folderul">
              <IconPlus className="h-4 w-4" />
            </Buton>
          </form>
          <nav aria-label="Foldere" className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            <ElementFolder activ={selectie === "toate"} onClick={() => setSelectie("toate")} eticheta="Toate fișierele" numar={fisiere.length} icon={<IconLista className="h-4 w-4" />} />
            {foldere.map((f) => (
              <ElementFolder
                key={f.id}
                activ={selectie === f.id}
                peste={peste === f.id}
                onClick={() => setSelectie(f.id)}
                eticheta={f.nume}
                numar={nrInFolder(f.id)}
                icon={<IconFolder className="h-4 w-4" />}
                tinta={tinta(f.id, f.id)}
                laStergere={() => stergeFolder(f)}
                laRedenumire={(nou) => redenumeste("foldere", f.id, f.nume, nou)}
              />
            ))}
            <ElementFolder
              activ={selectie === "fara"}
              peste={peste === "fara"}
              onClick={() => setSelectie("fara")}
              eticheta="Fără folder"
              numar={nrInFolder(null)}
              icon={<IconLista className="h-4 w-4 opacity-60" />}
              tinta={tinta("fara", null)}
            />
          </nav>
          <p className="hidden text-xs text-echipa-muted lg:block">Ține apăsat pe un card și trage-l pe un folder de aici ca să-l muți. Poți trage și fișiere de pe calculator direct pe un folder.</p>
        </aside>

        {/* Fișierele din folderul ales */}
        <section className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {folderAles && redenumire !== null ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void redenumesteFolder();
                }}
                className="flex flex-1 gap-2"
              >
                <input aria-label="Numele folderului" className="camp min-w-0 flex-1" value={redenumire} onChange={(e) => setRedenumire(e.target.value)} autoFocus />
                <Buton type="submit">Salvează</Buton>
                <Buton type="button" varianta="fantoma" onClick={() => setRedenumire(null)}>
                  Anulează
                </Buton>
              </form>
            ) : (
              <h2 className="flex min-w-0 flex-1 items-center gap-2 text-xl font-bold">
                {folderAles && <IconFolder className="h-5 w-5 shrink-0 text-echipa-accent" />}
                <span className="truncate">{titluSectiune}</span>
                <span className="text-sm font-normal text-echipa-muted">{nrFisiere(vizibile.length)}</span>
              </h2>
            )}
            {folderAles && redenumire === null && (
              <div className="flex gap-2">
                <Buton varianta="fantoma" onClick={() => setRedenumire(folderAles.nume)}>
                  Redenumește
                </Buton>
                <Buton varianta="fantoma" onClick={() => stergeFolder()}>
                  Șterge folderul
                </Buton>
              </div>
            )}
          </div>

          {folderAles && vizibile.length > 0 && (
            <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
              <AtribuieLista
                folderId={folderAles.id}
                compact
                laGata={(text, eroare) => {
                  anunta(text, eroare);
                  incarca();
                }}
              />
            </div>
          )}

          {/* Încărcare */}
          <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
            <label
              {...tinta("upload", folderDestinatie)}
              className={`flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-4 text-center hover:border-echipa-accent/60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent ${
                peste === "upload" ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line"
              }`}
            >
              <IconIncarca className="h-6 w-6 text-echipa-accent" />
              <span className="text-sm font-medium">
                {seIncarca ? "Se încarcă..." : "Trage aici unul sau mai multe fișiere (CSV sau Excel)"}
              </span>
              <span className="text-xs text-echipa-muted">
                {folderDestinatie ? `Intră în folderul „${folderAles?.nume}”.` : "Intră fără folder. Alege un folder din stânga ca să intre direct în el."}
              </span>
              <input
                type="file"
                multiple
                accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="sr-only"
                disabled={seIncarca}
                onChange={(e) => {
                  const lista = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  if (lista.length) void incarcaFisiere(lista, folderDestinatie);
                }}
              />
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <label htmlFor="cui-import" className="text-echipa-muted">
                Lead-urile încărcate merg la:
              </label>
              <select id="cui-import" className="camp max-w-xs flex-1 py-2" value={cuiImport} onChange={(e) => setCuiImport(e.target.value)}>
                <option value="">Nimeni încă (le dau mai târziu)</option>
                {oameni
                  .filter((o) => o.activ)
                  .map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.nume}
                    </option>
                  ))}
              </select>
              <Link href="/echipa/app/admin/import" className="ml-auto text-xs text-echipa-accent hover:underline">
                Import avansat (aleg eu coloanele)
              </Link>
            </div>
            {rezultate.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-sm">
                {rezultate.map((r, i) => (
                  <li key={i} className={`rounded-lg px-3 py-2 ${r.eroare ? "bg-amber-500/10 text-amber-100" : "bg-emerald-500/10 text-emerald-200"}`}>
                    <strong className="font-semibold">{r.fisier}</strong>: {r.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {vizibile.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-echipa-line p-8 text-center text-sm text-echipa-muted">
              {selectie === "toate" ? "Niciun fișier încă. Trage primul fișier mai sus." : "Folderul e gol. Trage fișiere aici sau mută-le din alt folder."}
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {vizibile.map((l) => (
                <CardFisier
                  key={l.id}
                  l={l}
                  foldere={foldere}
                  proprietar={proprietar(l, nume)}
                  arataFolder={selectie === "toate"}
                  laMutare={(folderId) => mutaFisier(l.id, folderId)}
                  laStergere={(cuLeaduri) => stergeFisier(l, cuLeaduri)}
                  laRedenumire={(nou) => redenumeste("liste", l.id, l.nume, nou)}
                  laAtribuire={(text, eroare) => {
                    anunta(text, eroare);
                    incarca();
                  }}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function ElementFolder({
  activ,
  peste,
  eticheta,
  numar,
  icon,
  onClick,
  tinta,
  laStergere,
  laRedenumire,
}: {
  activ: boolean;
  peste?: boolean;
  eticheta: string;
  numar: number;
  icon: React.ReactNode;
  onClick: () => void;
  tinta?: React.HTMLAttributes<HTMLDivElement>;
  laStergere?: () => void;
  laRedenumire?: (nou: string) => void;
}) {
  const [editare, setEditare] = useState<string | null>(null);
  if (editare !== null && laRedenumire) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          laRedenumire(editare);
          setEditare(null);
        }}
        className="flex shrink-0 items-center gap-1.5 lg:w-full"
      >
        <input
          aria-label={`Numele nou pentru ${eticheta}`}
          className="camp min-w-0 flex-1 py-1.5 text-sm"
          value={editare}
          onChange={(e) => setEditare(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setEditare(null)}
          autoFocus
        />
        <Buton type="submit" className="px-3 py-1.5 text-sm">
          OK
        </Buton>
      </form>
    );
  }
  return (
    <div
      {...tinta}
      className={`flex shrink-0 items-center rounded-xl border text-sm transition lg:w-full ${
        peste
          ? "border-echipa-accent bg-echipa-accent/20"
          : activ
            ? "border-echipa-accent/60 bg-echipa-accent/10 text-echipa-text"
            : "border-transparent text-echipa-muted hover:bg-white/5 hover:text-echipa-text"
      }`}
    >
      <button type="button" onClick={onClick} className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left">
        <span className={activ ? "text-echipa-accent" : ""}>{icon}</span>
        <span className="min-w-0 flex-1 truncate font-medium">{eticheta}</span>
        <span className="text-xs tabular-nums opacity-70">{numar}</span>
      </button>
      {(laStergere || laRedenumire) && (
        <MeniuPuncte
          eticheta={`Opțiuni pentru folderul ${eticheta}`}
          className="mr-1"
          actiuni={[
            { eticheta: "Deschide", laClick: onClick },
            ...(laRedenumire ? [{ eticheta: "Redenumește", laClick: () => setEditare(eticheta) }] : []),
            ...(laStergere ? [{ eticheta: "Șterge folderul", laClick: laStergere, pericol: true }] : []),
          ]}
        />
      )}
    </div>
  );
}

function CardFisier({
  l,
  foldere,
  proprietar,
  arataFolder,
  laMutare,
  laAtribuire,
  laStergere,
  laRedenumire,
}: {
  l: ListaCuLeaduri;
  foldere: Folder[];
  proprietar: string;
  arataFolder: boolean;
  laMutare: (folderId: string | null) => void;
  laAtribuire: (text: string, eroare?: boolean) => void;
  laStergere: (cuLeaduri: boolean) => void;
  laRedenumire: (nou: string) => void;
}) {
  const router = useRouter();
  const [confirmare, setConfirmare] = useState(false);
  const [editare, setEditare] = useState<string | null>(null);
  const total = l.leads.length;
  const sunate = l.leads.filter((x) => x.status !== "nou").length;
  const intalniri = l.leads.filter((x) => x.status === "intalnire").length;
  const procent = total ? Math.round((sunate / total) * 100) : 0;
  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(TIP_DRAG, l.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="flex cursor-grab flex-col rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-echipa-muted" title="Trage ca să muți în alt folder">
          <IconManer className="h-4 w-4" />
        </span>
        {editare !== null ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              laRedenumire(editare);
              setEditare(null);
            }}
            className="flex min-w-0 flex-1 gap-1.5"
          >
            <input
              aria-label={`Numele nou pentru ${l.nume}`}
              className="camp min-w-0 flex-1 py-1.5 text-sm"
              value={editare}
              onChange={(e) => setEditare(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setEditare(null)}
              autoFocus
            />
            <Buton type="submit" className="px-3 py-1.5 text-sm">
              OK
            </Buton>
          </form>
        ) : (
          <Link href={`/echipa/app/admin/liste/${l.id}`} className="group min-w-0 flex-1" draggable={false}>
            <span className="block truncate font-semibold group-hover:text-echipa-accent">{l.nume}</span>
            <span className="block truncate text-xs text-echipa-muted">
              {total} lead-uri · {proprietar} · {dataScurta(l.creat_la)}
              {arataFolder && l.folder_id && ` · ${foldere.find((f) => f.id === l.folder_id)?.nume ?? ""}`}
            </span>
          </Link>
        )}
        <MeniuPuncte
          eticheta={`Opțiuni pentru ${l.nume}`}
          className="-mr-1 -mt-1"
          actiuni={[
            { eticheta: "Deschide", laClick: () => router.push(`/echipa/app/admin/liste/${l.id}`) },
            { eticheta: "Redenumește", laClick: () => setEditare(l.nume) },
            { eticheta: "Șterge", laClick: () => setConfirmare(true), pericol: true },
          ]}
        />
      </div>
      {confirmare && (
        <div className="mt-3 space-y-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm">
          <p className="font-medium">Ștergi „{l.nume}”?</p>
          <div className="flex flex-col gap-1.5">
            <Buton varianta="secundar" onClick={() => laStergere(false)}>
              Doar fișierul (lead-urile rămân)
            </Buton>
            {total > 0 && (
              <Buton varianta="pericol" onClick={() => confirm(`Ștergi definitiv și cele ${total} lead-uri? Nu se mai pot recupera.`) && laStergere(true)}>
                Fișierul și cele {total} lead-uri
              </Buton>
            )}
            <Buton varianta="fantoma" onClick={() => setConfirmare(false)}>
              Anulează
            </Buton>
          </div>
        </div>
      )}
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[11px] text-echipa-muted">
          <span>
            {sunate} din {total} sunate
          </span>
          {intalniri > 0 && <span className="text-emerald-300">{intalniri} întâlniri</span>}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
        </div>
      </div>
      <div className="mt-3 space-y-2 border-t border-echipa-line/60 pt-3">
        <select
          aria-label={`Mută „${l.nume}” în folder`}
          className="camp py-2 text-sm"
          value={l.folder_id ?? ""}
          onChange={(e) => laMutare(e.target.value || null)}
        >
          <option value="">Fără folder</option>
          {foldere.map((f) => (
            <option key={f.id} value={f.id}>
              În folderul: {f.nume}
            </option>
          ))}
        </select>
        {total > 0 && <AtribuieLista listaId={l.id} compact laGata={laAtribuire} />}
      </div>
    </li>
  );
}
