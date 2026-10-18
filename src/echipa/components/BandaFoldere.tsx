"use client";

import { IconFolder, IconLista } from "./icons";

export type FisierInfo = { id: string; nume: string; folder_id: string | null };
export type FolderInfo = { id: string; nume: string };
type LeadMinim = { lista_id: string | null; status: string; ultimul_contact: string | null };
type LeadSortabil = LeadMinim & { afacere: string; actualizat_la: string };

export const FARA_FISIER = "fara";
const FOLDER = "d:";
const FISIER = "f:";

export function eLucrat(l: LeadMinim) {
  return l.status !== "nou" || Boolean(l.ultimul_contact);
}

// Întâi lead-urile sunate (cele mai recente sus), apoi cele neatinse, în ordine alfabetică.
export function sunateIntai<T extends LeadSortabil>(leaduri: T[]): { sunate: T[]; neatinse: T[] } {
  const data = (l: T) => l.ultimul_contact ?? l.actualizat_la;
  return {
    sunate: leaduri.filter(eLucrat).sort((a, b) => data(b).localeCompare(data(a))),
    neatinse: leaduri.filter((l) => !eLucrat(l)).sort((a, b) => a.afacere.localeCompare(b.afacere, "ro")),
  };
}

// Transformă alegerea din bandă („”, folder, fișier sau „Adăugate separat”) într-un filtru pe lista_id.
export function filtruBanda(ales: string, fisiere: FisierInfo[]): (listaId: string | null) => boolean {
  if (!ales) return () => true;
  if (ales === FARA_FISIER) return (id) => !id;
  if (ales.startsWith(FISIER)) return (id) => id === ales.slice(FISIER.length);
  const folder = ales.slice(FOLDER.length);
  const din = new Set(fisiere.filter((f) => f.folder_id === folder).map((f) => f.id));
  return (id) => Boolean(id && din.has(id));
}

type Cifre = { total: number; sunate: number };

// Bandă orizontală ca într-un explorator de fișiere: întâi folderele, apoi fișierele care nu
// sunt în niciun folder. Un click pe folder arată lead-urile din el.
export default function BandaFoldere({
  leaduri,
  fisiere,
  foldere,
  ales,
  laAlegere,
}: {
  leaduri: LeadMinim[];
  fisiere: FisierInfo[];
  foldere: FolderInfo[];
  ales: string;
  laAlegere: (id: string) => void;
}) {
  const peFisier = new Map<string, Cifre>();
  for (const l of leaduri) {
    const k = l.lista_id ?? FARA_FISIER;
    const c = peFisier.get(k) ?? { total: 0, sunate: 0 };
    c.total++;
    if (eLucrat(l)) c.sunate++;
    peFisier.set(k, c);
  }
  const cuLeaduri = fisiere.filter((f) => peFisier.has(f.id));
  const existente = new Set(foldere.map((f) => f.id));
  const inFolder = (f: FisierInfo) => Boolean(f.folder_id && existente.has(f.folder_id));

  const carduriFoldere = foldere
    .map((d) => {
      const din = cuLeaduri.filter((f) => f.folder_id === d.id);
      const c = din.reduce((s, f) => ({ total: s.total + peFisier.get(f.id)!.total, sunate: s.sunate + peFisier.get(f.id)!.sunate }), { total: 0, sunate: 0 });
      return { ...d, fisiere: din, c };
    })
    .filter((d) => d.c.total > 0)
    .sort((a, b) => a.nume.localeCompare(b.nume, "ro"));
  const libere = cuLeaduri.filter((f) => !inFolder(f)).sort((a, b) => a.nume.localeCompare(b.nume, "ro"));
  if (!carduriFoldere.length && !libere.length && !peFisier.has(FARA_FISIER)) return null;

  const fisierAles = ales.startsWith(FISIER) ? fisiere.find((f) => f.id === ales.slice(FISIER.length)) : undefined;
  const folderDeschis = ales.startsWith(FOLDER) ? ales.slice(FOLDER.length) : fisierAles && inFolder(fisierAles) ? fisierAles.folder_id : null;
  const deschis = carduriFoldere.find((d) => d.id === folderDeschis);
  const total = { total: leaduri.length, sunate: leaduri.filter(eLucrat).length };

  return (
    <div className="mb-4">
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Foldere de lead-uri">
        <div className="flex gap-3">
          <Chenar activ={ales === ""} onClick={() => laAlegere("")} titlu="Toate lead-urile" detaliu="toate fișierele" c={total} icon={<IconLista className="h-9 w-9" />} />
          {carduriFoldere.map((d) => (
            <Chenar
              key={d.id}
              activ={folderDeschis === d.id}
              onClick={() => laAlegere(FOLDER + d.id)}
              titlu={d.nume}
              detaliu={d.fisiere.length === 1 ? "1 fișier" : `${d.fisiere.length} fișiere`}
              c={d.c}
              icon={<IconFolder className="h-9 w-9" />}
              folder
            />
          ))}
          {libere.map((f) => (
            <Chenar key={f.id} activ={ales === FISIER + f.id} onClick={() => laAlegere(FISIER + f.id)} titlu={f.nume} detaliu="fișier" c={peFisier.get(f.id)!} icon={<IconLista className="h-9 w-9" />} />
          ))}
          {peFisier.has(FARA_FISIER) && (
            <Chenar
              activ={ales === FARA_FISIER}
              onClick={() => laAlegere(FARA_FISIER)}
              titlu="Adăugate separat"
              detaliu="fără fișier"
              c={peFisier.get(FARA_FISIER)!}
              icon={<IconLista className="h-9 w-9" />}
            />
          )}
        </div>
      </div>

      {deschis && deschis.fisiere.length > 1 && (
        <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label={`Fișierele din ${deschis.nume}`}>
          <span className="text-xs text-echipa-muted">În {deschis.nume}:</span>
          <Pastila activ={ales === FOLDER + deschis.id} onClick={() => laAlegere(FOLDER + deschis.id)}>
            Toate ({deschis.c.total})
          </Pastila>
          {deschis.fisiere.map((f) => (
            <Pastila key={f.id} activ={ales === FISIER + f.id} onClick={() => laAlegere(FISIER + f.id)}>
              {f.nume} ({peFisier.get(f.id)!.total})
            </Pastila>
          ))}
        </div>
      )}
    </div>
  );
}

function Chenar({
  activ,
  onClick,
  titlu,
  detaliu,
  c,
  icon,
  folder = false,
}: {
  activ: boolean;
  onClick: () => void;
  titlu: string;
  detaliu: string;
  c: Cifre;
  icon: React.ReactNode;
  folder?: boolean;
}) {
  const procent = c.total ? Math.round((c.sunate / c.total) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activ}
      className={`flex min-h-48 w-36 shrink-0 flex-col rounded-2xl border p-3 text-left transition sm:w-40 ${
        activ ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card hover:border-echipa-accent/50"
      }`}
    >
      <span className={activ || folder ? "text-echipa-accent" : "text-echipa-muted"}>{icon}</span>
      <span className="mt-3 line-clamp-2 text-sm font-semibold leading-snug">{titlu}</span>
      <span className="mt-0.5 text-[11px] text-echipa-muted">
        {detaliu} · {c.total} lead-uri
      </span>
      <span className="mt-auto pt-3 text-[11px] text-echipa-muted">
        {c.sunate} din {c.total} sunate
      </span>
      <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/5">
        <span className="block h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
      </span>
    </button>
  );
}

function Pastila({ activ, onClick, children }: { activ: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activ}
      className={`rounded-full border px-3 py-1 text-xs ${activ ? "border-echipa-accent bg-echipa-accent/10 text-echipa-accent" : "border-echipa-line text-echipa-muted hover:text-echipa-text"}`}
    >
      {children}
    </button>
  );
}
