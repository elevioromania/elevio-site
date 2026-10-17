"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { NISE, type Status } from "@/echipa/config";
import { useActiuniLead } from "@/echipa/components/ActiuniLead";
import { IconInapoi, IconTelefon } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { dataOra, linkTel, normal, relativ } from "@/echipa/lib/format";
import { COLOANE_LEAD, toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";

// Un fișier de lead-uri, văzut de vânzător: întâi lead-urile deja sunate (cele mai recente sus),
// apoi cele neatinse, ca să știe mereu de unde continuă.
export default function FisierLeaduri({ id }: { id: string }) {
  const { profil } = useProfil();
  const [fisier, setFisier] = useState<{ nume: string; folder: { id: string; nume: string } | null } | null | undefined>(undefined);
  const [leaduri, setLeaduri] = useState<Lead[]>([]);
  const [cautare, setCautare] = useState("");

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [f, l] = await Promise.all([
      supabase.from("liste").select("nume, folder_id").eq("id", id).maybeSingle(),
      toatePaginile<Lead>((de, pana) => supabase.from("leads").select(COLOANE_LEAD).eq("lista_id", id).eq("vanzator_id", profil.id).order("id").range(de, pana)),
    ]);
    if (!f.data) return setFisier(null);
    let folder: { id: string; nume: string } | null = null;
    if (f.data.folder_id) {
      const { data } = await supabase.from("foldere").select("id, nume").eq("id", f.data.folder_id).maybeSingle();
      folder = data ?? null;
    }
    setFisier({ nume: f.data.nume, folder });
    setLeaduri(l.data);
  }, [id, profil.id]);
  useIncarca(incarca);
  const actiuni = useActiuniLead(incarca);

  const { sunate, neatinse } = useMemo(() => {
    const q = normal(cautare.trim());
    const toate = leaduri.filter((l) => !q || normal(l.afacere).includes(q) || normal(l.oras).includes(q) || normal(l.telefon_afacere).includes(q));
    const lucrat = (l: Lead) => l.status !== "nou" || Boolean(l.ultimul_contact);
    const data = (l: Lead) => l.ultimul_contact ?? l.actualizat_la;
    return {
      sunate: toate.filter(lucrat).sort((a, b) => data(b).localeCompare(data(a))),
      neatinse: toate.filter((l) => !lucrat(l)).sort((a, b) => a.afacere.localeCompare(b.afacere, "ro")),
    };
  }, [leaduri, cautare]);

  if (fisier === undefined) return <Incarcare />;
  if (fisier === null) return <Gol titlu="Fișierul nu există sau nu ai lead-uri în el" />;

  const total = leaduri.length;
  const nrSunate = leaduri.filter((l) => l.status !== "nou" || l.ultimul_contact).length;
  const procent = total ? Math.round((nrSunate / total) * 100) : 0;

  return (
    <div className="max-w-3xl">
      <Link
        href={fisier.folder ? `/echipa/app/foldere?folder=${fisier.folder.id}` : "/echipa/app/foldere?folder=fara"}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent"
      >
        <IconInapoi className="h-4 w-4" /> {fisier.folder?.nume ?? "Folderele mele"}
      </Link>
      <TitluPagina titlu={fisier.nume} subtitlu={`${total} lead-uri · ${total - nrSunate} neatinse`} />

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-echipa-muted">
          <span>
            {nrSunate} din {total} sunate
          </span>
          <span>{procent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-echipa-accent" style={{ width: `${procent}%` }} />
        </div>
      </div>

      {total > 8 && (
        <input type="search" aria-label="Caută în fișier" className="camp mb-4" placeholder="Caută după nume, oraș sau telefon" value={cautare} onChange={(e) => setCautare(e.target.value)} />
      )}

      <Sectiune titlu="Sunate" numar={sunate.length} gol="Încă n-ai sunat pe nimeni din fișierul ăsta. Începe cu primul de mai jos.">
        {sunate.map((l) => (
          <RandLead key={l.id} l={l} laStatus={() => actiuni.deschideStatus(l, "Cum a mers?")} />
        ))}
      </Sectiune>
      <Sectiune titlu="Neatinse" numar={neatinse.length} gol="Le-ai sunat pe toate. Bravo!">
        {neatinse.map((l) => (
          <RandLead key={l.id} l={l} laStatus={() => actiuni.deschideStatus(l, "Cum a mers?")} />
        ))}
      </Sectiune>

      {actiuni.modale}
    </div>
  );
}

function Sectiune({ titlu, numar, gol, children }: { titlu: string; numar: number; gol: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-echipa-muted">
        {titlu} <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs tabular-nums">{numar}</span>
      </h2>
      {numar === 0 ? (
        <p className="rounded-2xl border border-dashed border-echipa-line p-4 text-sm text-echipa-muted">{gol}</p>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-echipa-line/70 bg-echipa-card">{children}</ul>
      )}
    </section>
  );
}

function RandLead({ l, laStatus }: { l: Lead; laStatus: () => void }) {
  const telefon = l.decident_telefon || l.telefon_afacere;
  const detalii = [
    NISE[l.nisa]?.eticheta,
    l.oras,
    l.ultimul_contact ? `sunat ${relativ(l.ultimul_contact)}` : null,
    l.urmatorul_pas_data ? `următorul pas: ${dataOra(l.urmatorul_pas_data)}` : null,
  ].filter(Boolean);
  return (
    <li className="flex flex-wrap items-center gap-3 border-b border-echipa-line/40 px-4 py-3 last:border-0">
      <Link href={`/echipa/app/leaduri/${l.id}`} className="group min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-medium group-hover:text-echipa-accent">{l.afacere}</span>
          <StatusBadge status={l.status as Status} mic />
        </span>
        <span className="block truncate text-xs text-echipa-muted">{detalii.join(" · ")}</span>
      </Link>
      <div className="flex w-full gap-2 sm:w-auto">
        {telefon && (
          <a href={linkTel(telefon)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-echipa-accent px-4 text-sm font-semibold text-echipa-bg sm:flex-none">
            <IconTelefon className="h-4 w-4" /> Sună
          </a>
        )}
        <Buton varianta="secundar" className="min-h-10 flex-1 sm:flex-none" onClick={laStatus}>
          Status
        </Buton>
      </div>
    </li>
  );
}
