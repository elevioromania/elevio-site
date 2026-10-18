"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { LISTA_NISE, LISTA_STATUSURI, NISE, STATUSURI, type Status } from "@/echipa/config";
import { useActiuniLead } from "@/echipa/components/ActiuniLead";
import BandaFoldere, { FARA_FISIER, sunateIntai, type FisierInfo, type FolderInfo } from "@/echipa/components/BandaFoldere";
import { IconColoane, IconFolder, IconIncarca, IconLista, IconNotita, IconPlus, IconTelefon } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Gol, Incarcare, LinkButon, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { cheieZi, dataOra, linkTel, normal } from "@/echipa/lib/format";
import { COLOANE_LEAD, mesajEroare, schimbaStatus, toatePaginile } from "@/echipa/lib/leaduri";
import { useIncarca, usePreferinta } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";
import ImportCsv from "../admin/import/ImportCsv";

type Vedere = "lista" | "kanban";
type Sortare = "pas" | "recent" | "nume";

export default function ListaLeaduri() {
  const { profil } = useProfil();
  const [leaduri, setLeaduri] = useState<Lead[] | null>(null);
  const [eroare, setEroare] = useState("");
  const [vedere, schimbaVedere] = usePreferinta<Vedere>("echipa-vedere-leaduri", "lista", ["lista", "kanban"]);
  const [cautare, setCautare] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [nisa, setNisa] = useState("");
  const [oras, setOras] = useState("");
  const [listaAleasa, setListaAleasa] = useState("");
  const [liste, setListe] = useState<FisierInfo[]>([]);
  const [foldere, setFoldere] = useState<FolderInfo[]>([]);
  const [sortare, setSortare] = useState<Sortare>("pas");
  const [importDeschis, setImportDeschis] = useState(true);

  const incarca = useCallback(async () => {
    const { data, error } = await toatePaginile<Lead>((de, pana) =>
      supabaseBrowser()
        .from("leads")
        .select(COLOANE_LEAD)
        .eq("vanzator_id", profil.id)
        .order("actualizat_la", { ascending: false })
        .order("id")
        .range(de, pana),
    );
    if (error) setEroare(mesajEroare(error));
    setLeaduri(data);
    const [{ data: l }, { data: f }] = await Promise.all([
      supabaseBrowser().from("liste").select("id, nume, folder_id").order("creat_la", { ascending: false }),
      supabaseBrowser().from("foldere").select("id, nume"),
    ]);
    setListe((l as FisierInfo[]) ?? []);
    setFoldere((f as FolderInfo[]) ?? []);
  }, [profil.id]);

  useIncarca(incarca);

  const actiuni = useActiuniLead(incarca);

  const orase = useMemo(
    () => [...new Set((leaduri ?? []).map((l) => l.oras?.trim()).filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "ro")),
    [leaduri],
  );

  const filtrate = useMemo(() => {
    const q = normal(cautare.trim());
    const lista = (leaduri ?? []).filter(
      (l) =>
        (!q || normal(l.afacere).includes(q) || normal(l.decident_nume).includes(q)) &&
        (!status || l.status === status) &&
        (!nisa || l.nisa === nisa) &&
        (!oras || l.oras?.trim() === oras) &&
        (!listaAleasa || (listaAleasa === FARA_FISIER ? !l.lista_id : l.lista_id === listaAleasa)),
    );
    return lista.sort((a, b) => {
      if (sortare === "nume") return a.afacere.localeCompare(b.afacere, "ro");
      if (sortare === "recent") return b.actualizat_la.localeCompare(a.actualizat_la);
      if (!a.urmatorul_pas_data && !b.urmatorul_pas_data) return b.actualizat_la.localeCompare(a.actualizat_la);
      if (!a.urmatorul_pas_data) return 1;
      if (!b.urmatorul_pas_data) return -1;
      return a.urmatorul_pas_data.localeCompare(b.urmatorul_pas_data);
    });
  }, [leaduri, cautare, status, nisa, oras, listaAleasa, sortare]);

  async function mutaKanban(lead: Lead, nou: Status) {
    if (lead.status === nou) return;
    if (nou === "intalnire") return actiuni.deschidePredare(lead);
    setLeaduri((ls) => ls?.map((l) => (l.id === lead.id ? { ...l, status: nou } : l)) ?? null);
    const { error } = await schimbaStatus(lead.id, nou);
    if (error) setEroare(mesajEroare(error));
    incarca();
  }

  return (
    <>
      <TitluPagina
        titlu="Lead-urile mele"
        subtitlu={leaduri ? `${leaduri.length} lead-uri în total` : undefined}
        actiuni={
          <div className="flex flex-wrap gap-2">
            {profil.rol === "admin" && (
              <Buton varianta="secundar" onClick={() => setImportDeschis((x) => !x)} aria-expanded={importDeschis}>
                <IconIncarca className="h-4 w-4" /> {importDeschis ? "Ascunde importul" : "Adaugă în bulk"}
              </Buton>
            )}
            <LinkButon href="/echipa/app/foldere" varianta="secundar">
              <IconFolder className="h-4 w-4" /> Folderele mele
            </LinkButon>
            <LinkButon href="/echipa/app/leaduri/nou">
              <IconPlus className="h-4 w-4" /> Adaugă lead
            </LinkButon>
          </div>
        }
      />

      {profil.rol === "admin" && importDeschis && <ImportCsv compact vanzatorImplicit={profil.id} laGata={incarca} />}

      {leaduri && leaduri.length > 0 && <BandaFoldere leaduri={leaduri} fisiere={liste} foldere={foldere} ales={listaAleasa} laAlegere={setListaAleasa} />}

      <div className="mb-4 space-y-3">
        <div className="flex gap-2">
          <label htmlFor="cautare-lead" className="sr-only">
            Caută după nume
          </label>
          <input
            id="cautare-lead"
            type="search"
            className="camp flex-1"
            placeholder="Caută după afacere sau persoană de contact"
            value={cautare}
            onChange={(e) => setCautare(e.target.value)}
          />
          <div className="flex shrink-0 rounded-xl border border-echipa-line p-1" role="group" aria-label="Vizualizare">
            <button
              type="button"
              onClick={() => schimbaVedere("lista")}
              aria-pressed={vedere === "lista"}
              className={`rounded-lg px-2.5 ${vedere === "lista" ? "bg-echipa-accent/15 text-echipa-accent" : "text-echipa-muted"}`}
              title="Listă"
            >
              <IconLista />
              <span className="sr-only">Listă</span>
            </button>
            <button
              type="button"
              onClick={() => schimbaVedere("kanban")}
              aria-pressed={vedere === "kanban"}
              className={`rounded-lg px-2.5 ${vedere === "kanban" ? "bg-echipa-accent/15 text-echipa-accent" : "text-echipa-muted"}`}
              title="Kanban"
            >
              <IconColoane />
              <span className="sr-only">Kanban</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <select aria-label="Filtru status" className="camp" value={status} onChange={(e) => setStatus(e.target.value as Status | "")}>
            <option value="">Toate statusurile</option>
            {LISTA_STATUSURI.map((s) => (
              <option key={s} value={s}>
                {STATUSURI[s].eticheta}
              </option>
            ))}
          </select>
          <select aria-label="Filtru nișă" className="camp" value={nisa} onChange={(e) => setNisa(e.target.value)}>
            <option value="">Toate nișele</option>
            {LISTA_NISE.map((n) => (
              <option key={n} value={n}>
                {NISE[n].eticheta}
              </option>
            ))}
          </select>
          <select aria-label="Filtru oraș" className="camp" value={oras} onChange={(e) => setOras(e.target.value)}>
            <option value="">Toate orașele</option>
            {orase.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <select aria-label="Sortare" className="camp" value={sortare} onChange={(e) => setSortare(e.target.value as Sortare)}>
            <option value="pas">După următorul pas</option>
            <option value="recent">Modificate recent</option>
            <option value="nume">După nume</option>
          </select>
        </div>
      </div>

      {eroare && (
        <div className="mb-4">
          <Mesaj>{eroare}</Mesaj>
        </div>
      )}

      {leaduri === null ? (
        <Incarcare />
      ) : leaduri.length === 0 ? (
        <Gol titlu="Încă nu ai lead-uri">
          Primești în curând lista ta de lead-uri. Între timp, poți adăuga un lead găsit de tine.
        </Gol>
      ) : vedere === "lista" ? (
        filtrate.length === 0 ? (
          <Gol titlu="Niciun lead nu se potrivește filtrelor" />
        ) : (
          listaAleasa ? (
            <GrupuriSunate leaduri={filtrate} randeaza={(l) => <CardLead lead={l} actiuni={actiuni} />} />
          ) : (
            <ul className="space-y-3">
              {filtrate.map((l) => (
                <li key={l.id}>
                  <CardLead lead={l} actiuni={actiuni} />
                </li>
              ))}
            </ul>
          )
        )
      ) : (
        <Kanban leaduri={filtrate} muta={mutaKanban} actiuni={actiuni} />
      )}

      {actiuni.modale}
    </>
  );
}

function urmatorulPas(l: Lead) {
  if (!l.urmatorul_pas_data && !l.urmatorul_pas_text) return null;
  const azi = cheieZi(new Date());
  const intarziat = l.urmatorul_pas_data && cheieZi(l.urmatorul_pas_data) < azi;
  const eAzi = l.urmatorul_pas_data && cheieZi(l.urmatorul_pas_data) === azi;
  return (
    <p className={`text-xs ${intarziat ? "text-amber-300" : eAzi ? "text-echipa-accent" : "text-echipa-muted"}`}>
      <span className="font-semibold">{intarziat ? "Întârziat: " : eAzi ? "Azi: " : "Următorul pas: "}</span>
      {l.urmatorul_pas_data ? dataOra(l.urmatorul_pas_data) : ""}
      {l.urmatorul_pas_text ? `${l.urmatorul_pas_data ? ", " : ""}${l.urmatorul_pas_text}` : ""}
    </p>
  );
}

type Actiuni = ReturnType<typeof useActiuniLead>;

function CardLead({ lead: l, actiuni }: { lead: Lead; actiuni: Actiuni }) {
  const telefon = l.decident_telefon || l.telefon_afacere;
  return (
    <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4" style={{ borderLeft: `4px solid ${STATUSURI[l.status].hex}` }}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Link href={`/echipa/app/leaduri/${l.id}`} className="min-w-0 flex-1 hover:text-echipa-accent">
          <p className="truncate text-base font-semibold">{l.afacere}</p>
          <p className="truncate text-sm text-echipa-muted">
            {[NISE[l.nisa]?.eticheta, l.oras, l.decident_nume].filter(Boolean).join(" · ")}
          </p>
        </Link>
        <StatusBadge status={l.status} />
      </div>
      <div className="mt-2">{urmatorulPas(l)}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {telefon ? (
          <a href={linkTel(telefon)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-echipa-accent text-sm font-semibold text-echipa-bg hover:bg-sky-300">
            <IconTelefon className="h-4 w-4" /> Sună
          </a>
        ) : (
          <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-dashed border-echipa-line text-xs text-echipa-muted">
            Fără telefon
          </span>
        )}
        <Buton varianta="secundar" className="min-h-12" onClick={() => actiuni.deschideStatus(l)}>
          Status
        </Buton>
        <Buton varianta="secundar" className="min-h-12" onClick={() => actiuni.deschideNotita(l)}>
          <IconNotita className="h-4 w-4" /> Notiță
        </Buton>
      </div>
    </div>
  );
}

function Kanban({ leaduri, muta, actiuni }: { leaduri: Lead[]; muta: (l: Lead, s: Status) => void; actiuni: Actiuni }) {
  const [trag, setTrag] = useState<string | null>(null);
  const [peste, setPeste] = useState<Status | null>(null);

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
      <div className="flex gap-3" style={{ minWidth: `${LISTA_STATUSURI.length * 15.5}rem` }}>
        {LISTA_STATUSURI.map((s) => {
          const coloana = leaduri.filter((l) => l.status === s);
          return (
            <section
              key={s}
              aria-label={STATUSURI[s].eticheta}
              className={`flex w-60 shrink-0 flex-col rounded-2xl border bg-echipa-card-2 p-2 transition-colors ${peste === s ? "border-echipa-accent" : "border-echipa-line/60"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setPeste(s);
              }}
              onDragLeave={() => setPeste((p) => (p === s ? null : p))}
              onDrop={(e) => {
                e.preventDefault();
                setPeste(null);
                const lead = leaduri.find((l) => l.id === e.dataTransfer.getData("text/plain"));
                if (lead) muta(lead, s);
              }}
            >
              <header className="flex items-center justify-between gap-2 px-2 py-2">
                <span className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: STATUSURI[s].hex }} aria-hidden="true" />
                  <span className="truncate">{STATUSURI[s].eticheta}</span>
                </span>
                <span className="text-xs text-echipa-muted">{coloana.length}</span>
              </header>
              <ul className="flex-1 space-y-2">
                {coloana.map((l) => (
                  <li
                    key={l.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", l.id);
                      setTrag(l.id);
                    }}
                    onDragEnd={() => setTrag(null)}
                    className={`cursor-grab rounded-xl border border-echipa-line/70 bg-echipa-card p-3 active:cursor-grabbing ${trag === l.id ? "opacity-50" : ""}`}
                  >
                    <Link href={`/echipa/app/leaduri/${l.id}`} className="block font-semibold leading-snug hover:text-echipa-accent">
                      {l.afacere}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-echipa-muted">{[l.oras, NISE[l.nisa]?.eticheta].filter(Boolean).join(" · ")}</p>
                    <div className="mt-1.5">{urmatorulPas(l)}</div>
                    {/* Pe telefon nu există drag and drop: schimbarea rapidă de status */}
                    <button
                      type="button"
                      onClick={() => actiuni.deschideStatus(l)}
                      className="mt-2 w-full rounded-lg border border-echipa-line py-1.5 text-xs text-echipa-muted hover:border-echipa-accent hover:text-echipa-accent"
                    >
                      Schimbă statusul
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// Lead-urile dintr-un fișier: întâi cele sunate, apoi cele neatinse.
function GrupuriSunate({ leaduri, randeaza }: { leaduri: Lead[]; randeaza: (l: Lead) => React.ReactNode }) {
  const { sunate, neatinse } = sunateIntai(leaduri);
  return (
    <div className="space-y-6">
      {[
        ["Sunate", sunate],
        ["Neatinse", neatinse],
      ].map(([titlu, lista]) => (
        <section key={titlu as string}>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-echipa-muted">
            {titlu as string} <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs tabular-nums">{(lista as Lead[]).length}</span>
          </h2>
          {(lista as Lead[]).length === 0 ? (
            <p className="rounded-2xl border border-dashed border-echipa-line p-4 text-sm text-echipa-muted">
              {titlu === "Sunate" ? "Încă nimic sunat din fișierul ăsta." : "Toate au fost sunate."}
            </p>
          ) : (
            <ul className="space-y-3">
              {(lista as Lead[]).map((l) => (
                <li key={l.id}>{randeaza(l)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
