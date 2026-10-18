"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { type Status } from "@/echipa/config";
import AtribuieLista from "@/echipa/components/AtribuieLista";
import { IconFolder, IconIncarca, IconManer, IconPlus } from "@/echipa/components/icons";
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
type Folder = { id: string; nume: string; creat_la: string; vanzator_id: string | null };
type Persoana = { id: string; nume: string; activ: boolean };
type RezultatIncarcare = { fisier: string; text: string; eroare?: boolean };

const TIP_DRAG = "application/x-elevio-fisier";

// Cui aparține fișierul: un singur om, mai mulți sau nimeni.
export function proprietar(l: ListaCuLeaduri, nume: Record<string, string>) {
  const ids = [...new Set(l.leads.map((x) => x.vanzator_id))];
  if (ids.length === 0) return "Gol";
  if (ids.length > 1) return "Împărțit între mai mulți";
  return ids[0] ? (nume[ids[0]] ?? "Necunoscut") : "Nealocat";
}

// Managerul de lead-uri al adminului, ca un explorer de fișiere: la „Toate” vezi întâi folderele,
// apoi fișierele care nu sunt în niciun folder. Fișierele dintr-un folder se văd după ce îl deschizi.
// Un folder poate fi „pe numele” cuiva: tot ce intră în el trece la omul acela.
export default function Liste() {
  const [foldere, setFoldere] = useState<Folder[] | null>(null);
  const [fisiere, setFisiere] = useState<ListaCuLeaduri[]>([]);
  const [oameni, setOameni] = useState<Persoana[]>([]);
  const [deschis, setDeschis] = useState<string | null>(null);
  const [folderNou, setFolderNou] = useState("");
  const [cuiImport, setCuiImport] = useState("");
  const [peste, setPeste] = useState<string | null>(null);
  const [seIncarca, setSeIncarca] = useState(false);
  const [rezultate, setRezultate] = useState<RezultatIncarcare[]>([]);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [f, l, p] = await Promise.all([
      supabase.from("foldere").select("id, nume, creat_la, vanzator_id").order("nume"),
      supabase.from("liste").select("id, nume, creat_la, folder_id, leads(vanzator_id, status)").order("creat_la", { ascending: false }),
      supabase.from("profiles").select("id, nume, activ").order("nume"),
    ]);
    setFoldere((f.data as Folder[]) ?? []);
    setFisiere((l.data as ListaCuLeaduri[]) ?? []);
    setOameni((p.data as Persoana[]) ?? []);
  }, []);
  useIncarca(incarca);

  const nume = useMemo(() => Object.fromEntries(oameni.map((o) => [o.id, o.nume])), [oameni]);
  const folderDeschis = foldere?.find((f) => f.id === deschis) ?? null;
  const vizibile = fisiere.filter((l) => (folderDeschis ? l.folder_id === folderDeschis.id : !l.folder_id || !foldere?.some((f) => f.id === l.folder_id)));
  const cuiEfectiv = cuiImport || folderDeschis?.vanzator_id || "";

  function anunta(text: string, eroare?: boolean) {
    setMesaj({ tip: eroare ? "eroare" : "succes", text });
  }

  function deschide(id: string | null) {
    setDeschis(id);
    setCuiImport("");
    setRezultate([]);
  }

  async function creeazaFolder(e: React.FormEvent) {
    e.preventDefault();
    const n = folderNou.trim();
    if (!n) return;
    const { error } = await supabaseBrowser().from("foldere").insert({ nume: n });
    if (error) return anunta("Nu am putut crea folderul.", true);
    setFolderNou("");
    anunta(`Folderul „${n}” e gata. Trage fișierele cu lead-uri pe el.`);
    incarca();
  }

  async function stergeFolder(f: Folder) {
    if (!confirm(`Ștergi folderul „${f.nume}”? Fișierele și lead-urile din el rămân, la „Toate”.`)) return;
    const { error } = await supabaseBrowser().from("foldere").delete().eq("id", f.id);
    if (error) return anunta("Nu am putut șterge folderul.", true);
    if (deschis === f.id) deschide(null);
    anunta("Folderul a fost șters. Fișierele lui sunt acum la „Toate”.");
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

  // Pune folderul pe numele cuiva: toate lead-urile din fișierele lui trec la omul acela.
  async function puneLaOm(f: Folder, omId: string | null) {
    const ids = fisiere.filter((x) => x.folder_id === f.id).map((x) => x.id);
    const om = omId ? nume[omId] : null;
    if (om && ids.length && !confirm(`Pui folderul „${f.nume}” pe numele lui ${om}? Toate lead-urile din el trec la ${om}.`)) return;
    const supabase = supabaseBrowser();
    const { error } = await supabase.from("foldere").update({ vanzator_id: omId }).eq("id", f.id);
    if (error) return anunta("Nu am putut schimba folderul.", true);
    if (omId && ids.length) {
      const { error: e2 } = await supabase.from("leads").update({ vanzator_id: omId }).in("lista_id", ids);
      if (e2) return anunta("Folderul e pe numele lui, dar lead-urile nu au putut fi mutate. Încearcă din nou.", true);
    }
    anunta(om ? `Folderul „${f.nume}” e acum pe numele lui ${om}. Tot ce e în el (și ce pui de acum) e la ${om}.` : `Folderul „${f.nume}” nu mai e pe numele nimănui. Lead-urile au rămas unde erau.`);
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
    const supabase = supabaseBrowser();
    const { error } = await supabase.from("liste").update({ folder_id: folderId }).eq("id", fisierId);
    if (error) {
      anunta("Nu am putut muta fișierul.", true);
      return incarca();
    }
    const dest = folderId ? foldere?.find((x) => x.id === folderId) : null;
    let extra = "";
    if (dest?.vanzator_id && f.leads.length) {
      const { error: e2 } = await supabase.from("leads").update({ vanzator_id: dest.vanzator_id }).eq("lista_id", f.id);
      extra = e2 ? " Lead-urile nu au putut fi mutate la omul folderului." : ` Lead-urile au trecut la ${nume[dest.vanzator_id] ?? "omul folderului"}.`;
    }
    anunta((dest ? `„${f.nume}” a fost mutat în „${dest.nume}”.` : `„${f.nume}” a fost scos din folder.`) + extra);
    incarca();
  }

  // Încarcă unul sau mai multe fișiere CSV/Excel direct într-un folder.
  async function incarcaFisiere(lista: File[], folderId: string | null) {
    const bune = lista.filter((f) => /\.(csv|xlsx)$/i.test(f.name));
    const rez: RezultatIncarcare[] = lista
      .filter((f) => !bune.includes(f))
      .map((f) => ({ fisier: f.name, text: "Doar CSV sau Excel (.xlsx). Word sau PDF îl trimiți lui Claude să-l transforme.", eroare: true }));
    if (!bune.length) return setRezultate(rez);
    const cui = cuiImport || foldere?.find((f) => f.id === folderId)?.vanzator_id || null;
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
            .insert(deImportat.slice(i, i + 500).map((d) => ({ ...d, lista_id: fisier.id, vanzator_id: cui, sursa: "alocat" })));
          if (e2) break;
          importate += Math.min(500, deImportat.length - i);
        }
        rez.push({
          fisier: f.name,
          text: `${importate} lead-uri importate${cui ? ` pentru ${nume[cui] ?? ""}` : ""}${sarite ? `, ${sarite} sărite (duplicate sau incomplete)` : ""}.`,
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

  const activi = oameni.filter((o) => o.activ);

  return (
    <div>
      <TitluPagina titlu="Foldere de lead-uri" subtitlu="Ca în explorerul de pe calculator: folderele sus, fișierele în ele. Un folder pus pe numele cuiva îi dă tot ce e în el." />

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      {/* Bara de sus: unde sunt și folder nou */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <nav aria-label="Unde sunt" className="flex min-w-0 flex-1 items-center gap-1.5 text-lg font-bold">
          <button
            type="button"
            onClick={() => deschide(null)}
            {...tinta("radacina", null)}
            className={`rounded-lg px-2 py-1 ${folderDeschis ? "text-echipa-muted hover:text-echipa-accent" : ""} ${peste === "radacina" ? "bg-echipa-accent/20 ring-2 ring-echipa-accent" : ""}`}
          >
            Toate
          </button>
          {folderDeschis && (
            <>
              <span className="text-echipa-muted">›</span>
              <span className="flex min-w-0 items-center gap-1.5 truncate">
                <IconFolder className="h-5 w-5 shrink-0 text-echipa-accent" />
                <span className="truncate">{folderDeschis.nume}</span>
              </span>
            </>
          )}
        </nav>
        {!folderDeschis && (
          <form onSubmit={creeazaFolder} className="flex w-full gap-2 sm:w-auto">
            <input aria-label="Numele folderului nou" className="camp min-w-0 flex-1 sm:w-56" placeholder="Folder nou (de ex. Ana)" value={folderNou} onChange={(e) => setFolderNou(e.target.value)} />
            <Buton type="submit" disabled={!folderNou.trim()} aria-label="Creează folderul">
              <IconPlus className="h-4 w-4" /> Folder
            </Buton>
          </form>
        )}
      </div>

      {folderDeschis && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3 text-sm">
          <label htmlFor="pe-numele" className="font-medium">
            Pe numele lui:
          </label>
          <select id="pe-numele" className="camp min-w-0 flex-1 py-2 sm:max-w-xs" value={folderDeschis.vanzator_id ?? ""} onChange={(e) => puneLaOm(folderDeschis, e.target.value || null)}>
            <option value="">Nimeni (îl împart eu)</option>
            {activi.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nume}
              </option>
            ))}
          </select>
          <span className="text-xs text-echipa-muted">Tot ce e în folder și ce pui de acum trece la omul ales.</span>
        </div>
      )}

      {/* Încărcare */}
      <div className="mb-5 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
        <label
          {...tinta("upload", folderDeschis?.id ?? null)}
          className={`flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed p-3 text-center hover:border-echipa-accent/60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent ${
            peste === "upload" ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line"
          }`}
        >
          <IconIncarca className="h-6 w-6 text-echipa-accent" />
          <span className="text-sm font-medium">{seIncarca ? "Se încarcă..." : "Trage aici unul sau mai multe fișiere (CSV sau Excel)"}</span>
          <span className="text-xs text-echipa-muted">
            {folderDeschis ? `Intră în folderul „${folderDeschis.nume}”.` : "Intră la „Toate”, fără folder. Deschide un folder ca să intre direct în el."}
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
              if (lista.length) void incarcaFisiere(lista, folderDeschis?.id ?? null);
            }}
          />
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <label htmlFor="cui-import" className="text-echipa-muted">
            Lead-urile încărcate merg la:
          </label>
          <select id="cui-import" className="camp max-w-xs flex-1 py-2" value={cuiEfectiv} onChange={(e) => setCuiImport(e.target.value)}>
            <option value="">Nimeni încă (le dau mai târziu)</option>
            {activi.map((o) => (
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

      {/* Folderele (doar la „Toate”) */}
      {!folderDeschis && foldere.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-echipa-muted">Foldere</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {foldere.map((f) => (
              <CardFolder
                key={f.id}
                f={f}
                fisiere={fisiere.filter((x) => x.folder_id === f.id)}
                om={f.vanzator_id ? (nume[f.vanzator_id] ?? null) : null}
                oameni={activi}
                peste={peste === f.id}
                tinta={tinta(f.id, f.id)}
                laDeschidere={() => deschide(f.id)}
                laRedenumire={(nou) => redenumeste("foldere", f.id, f.nume, nou)}
                laOm={(omId) => puneLaOm(f, omId)}
                laStergere={() => stergeFolder(f)}
              />
            ))}
          </ul>
        </section>
      )}

      {/* Fișierele */}
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-echipa-muted">
          {folderDeschis ? nrFisiere(vizibile.length) : `Fișiere fără folder (${vizibile.length})`}
        </h2>
        {vizibile.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-echipa-line p-8 text-center text-sm text-echipa-muted">
            {folderDeschis ? "Folderul e gol. Trage fișiere aici sau mută-le din „Toate”." : "Toate fișierele sunt în foldere."}
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {vizibile.map((l) => (
              <CardFisier
                key={l.id}
                l={l}
                foldere={foldere}
                proprietar={proprietar(l, nume)}
                arataFolder={false}
                laMutare={(folderId) => mutaFisier(l.id, folderId)}
                laAtribuire={(text, eroare) => {
                  anunta(text, eroare);
                  incarca();
                }}
                laStergere={(cuLeaduri) => stergeFisier(l, cuLeaduri)}
                laRedenumire={(nou) => redenumeste("liste", l.id, l.nume, nou)}
              />
            ))}
          </ul>
        )}
      </section>
      <p className="mt-4 hidden text-xs text-echipa-muted lg:block">
        Ține apăsat pe un fișier și trage-l pe un folder ca să-l muți, sau pe „Toate” ca să-l scoți din folder. Poți trage și fișiere de pe calculator direct pe un folder.
      </p>
    </div>
  );
}

// Folderul, ca un dreptunghi înalt: se deschide cu un click, primește fișiere trase pe el.
function CardFolder({
  f,
  fisiere,
  om,
  oameni,
  peste,
  tinta,
  laDeschidere,
  laRedenumire,
  laOm,
  laStergere,
}: {
  f: Folder;
  fisiere: ListaCuLeaduri[];
  om: string | null;
  oameni: Persoana[];
  peste: boolean;
  tinta: React.HTMLAttributes<HTMLLIElement>;
  laDeschidere: () => void;
  laRedenumire: (nou: string) => void;
  laOm: (omId: string | null) => void;
  laStergere: () => void;
}) {
  const [editare, setEditare] = useState<string | null>(null);
  const [alegOm, setAlegOm] = useState(false);
  const leaduri = fisiere.flatMap((x) => x.leads);
  const sunate = leaduri.filter((x) => x.status !== "nou").length;
  const procent = leaduri.length ? Math.round((sunate / leaduri.length) * 100) : 0;
  return (
    <li
      {...tinta}
      className={`relative flex aspect-[4/5] flex-col rounded-2xl border p-3 transition ${
        peste ? "border-echipa-accent bg-echipa-accent/15 ring-2 ring-echipa-accent" : "border-echipa-line/70 bg-echipa-card hover:border-echipa-accent/60"
      }`}
    >
      <div className="flex items-start justify-between">
        <button type="button" onClick={laDeschidere} aria-label={`Deschide folderul ${f.nume}`} className="text-echipa-accent">
          <IconFolder className="h-10 w-10" />
        </button>
        <MeniuPuncte
          eticheta={`Opțiuni pentru folderul ${f.nume}`}
          className="-mr-1 -mt-1"
          actiuni={[
            { eticheta: "Deschide", laClick: laDeschidere },
            { eticheta: "Redenumește", laClick: () => setEditare(f.nume) },
            { eticheta: "Pune pe numele cuiva", laClick: () => setAlegOm(true) },
            { eticheta: "Șterge folderul", laClick: laStergere, pericol: true },
          ]}
        />
      </div>
      {editare !== null ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            laRedenumire(editare);
            setEditare(null);
          }}
          className="mt-2 flex gap-1.5"
        >
          <input
            aria-label={`Numele nou pentru ${f.nume}`}
            className="camp min-w-0 flex-1 px-2 py-1.5 text-sm"
            value={editare}
            onChange={(e) => setEditare(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setEditare(null)}
            autoFocus
          />
          <Buton type="submit" className="px-2.5 py-1.5 text-sm">
            OK
          </Buton>
        </form>
      ) : (
        <button type="button" onClick={laDeschidere} className="mt-2 flex flex-1 flex-col text-left">
          <span className="line-clamp-2 font-semibold leading-snug">{f.nume}</span>
          <span className="mt-1 text-xs text-echipa-muted">
            {nrFisiere(fisiere.length)} · {leaduri.length} lead-uri
          </span>
          <span className={`mt-1 truncate text-xs ${om ? "text-echipa-accent" : "text-echipa-muted"}`}>{om ? `Pe numele: ${om}` : "Pe numele nimănui"}</span>
        </button>
      )}
      {alegOm && (
        <select
          aria-label={`Pune folderul ${f.nume} pe numele`}
          className="camp mt-2 px-2 py-1.5 text-sm"
          autoFocus
          defaultValue=""
          onChange={(e) => {
            setAlegOm(false);
            if (e.target.value) laOm(e.target.value === "nimeni" ? null : e.target.value);
          }}
          onBlur={() => setAlegOm(false)}
        >
          <option value="">Alege omul...</option>
          <option value="nimeni">Nimeni</option>
          {oameni.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nume}
            </option>
          ))}
        </select>
      )}
      <span className="mt-3 block">
        <span className="mb-1 block text-[11px] text-echipa-muted">
          {sunate} din {leaduri.length} sunate
        </span>
        <span className="block h-1 overflow-hidden rounded-full bg-white/5">
          <span className="block h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
        </span>
      </span>
    </li>
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
