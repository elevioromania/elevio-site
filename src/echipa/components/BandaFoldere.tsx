"use client";

import { IconFolder, IconLista } from "./icons";

export type FisierInfo = { id: string; nume: string; folder_id: string | null };
export type FolderInfo = { id: string; nume: string };
type LeadMinim = { lista_id: string | null; status: string; ultimul_contact: string | null };
type LeadSortabil = LeadMinim & { afacere: string; actualizat_la: string };

export const FARA_FISIER = "fara";

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

// Bandă orizontală cu câte un chenar pentru fiecare fișier de lead-uri al unui om
// (cu folderul deasupra), plus „Toate”. Un click alege fișierul.
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
  const cifre = new Map<string, { total: number; sunate: number }>();
  for (const l of leaduri) {
    const k = l.lista_id ?? FARA_FISIER;
    const c = cifre.get(k) ?? { total: 0, sunate: 0 };
    c.total++;
    if (eLucrat(l)) c.sunate++;
    cifre.set(k, c);
  }
  const numeFolder = new Map(foldere.map((f) => [f.id, f.nume]));
  const carduri = fisiere
    .filter((f) => cifre.has(f.id))
    .map((f) => ({ id: f.id, nume: f.nume, folder: f.folder_id ? (numeFolder.get(f.folder_id) ?? null) : null }))
    .sort((a, b) => (a.folder ?? "~").localeCompare(b.folder ?? "~", "ro") || a.nume.localeCompare(b.nume, "ro"));
  if (cifre.has(FARA_FISIER)) carduri.push({ id: FARA_FISIER, nume: "Adăugate separat", folder: null });
  if (!carduri.length) return null;

  const total = { total: leaduri.length, sunate: leaduri.filter(eLucrat).length };

  return (
    <div className="-mx-4 mb-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Foldere de lead-uri">
      <div className="flex gap-2.5">
        <Chenar activ={ales === ""} onClick={() => laAlegere("")} titlu="Toate lead-urile" folder={null} c={total} icon={<IconLista className="h-4 w-4" />} />
        {carduri.map((f) => (
          <Chenar key={f.id} activ={ales === f.id} onClick={() => laAlegere(f.id)} titlu={f.nume} folder={f.folder} c={cifre.get(f.id)!} icon={<IconFolder className="h-4 w-4" />} />
        ))}
      </div>
    </div>
  );
}

function Chenar({
  activ,
  onClick,
  titlu,
  folder,
  c,
  icon,
}: {
  activ: boolean;
  onClick: () => void;
  titlu: string;
  folder: string | null;
  c: { total: number; sunate: number };
  icon: React.ReactNode;
}) {
  const procent = c.total ? Math.round((c.sunate / c.total) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activ}
      className={`flex w-44 shrink-0 flex-col rounded-2xl border p-3 text-left transition ${
        activ ? "border-echipa-accent bg-echipa-accent/10" : "border-echipa-line/70 bg-echipa-card hover:border-echipa-accent/50"
      }`}
    >
      <span className="flex h-4 items-center gap-1 truncate text-[11px] text-echipa-muted">{folder}</span>
      <span className="mt-0.5 flex items-center gap-1.5">
        <span className={activ ? "text-echipa-accent" : "text-echipa-muted"}>{icon}</span>
        <span className="truncate text-sm font-semibold">{titlu}</span>
      </span>
      <span className="mt-2 text-[11px] text-echipa-muted">
        {c.sunate} din {c.total} sunate
      </span>
      <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/5">
        <span className="block h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
      </span>
    </button>
  );
}
