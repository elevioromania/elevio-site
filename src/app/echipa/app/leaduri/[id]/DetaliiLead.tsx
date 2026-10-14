"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { etichetaObiectie, NISE, REZULTATE_PREDARE, STATUSURI, type Status } from "@/echipa/config";
import { useActiuniLead } from "@/echipa/components/ActiuniLead";
import FormularLead, { curata, type DateLead } from "@/echipa/components/FormularLead";
import { IconFulger, IconHarta, IconInapoi, IconLink, IconNotita, IconTelefon } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, Card, Gol, Incarcare, Mesaj } from "@/echipa/components/ui";
import { dataOra, dataScurta, linkExtern, linkTel } from "@/echipa/lib/format";
import { COLOANE_LEAD, mesajEroare } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Activitate, Lead, Predare } from "@/echipa/lib/tipuri";

export default function DetaliiLead({ id }: { id: string }) {
  const { profil, esteAdmin } = useProfil();
  const [lead, setLead] = useState<Lead | null | undefined>(undefined);
  const [jurnal, setJurnal] = useState<Activitate[]>([]);
  const [predari, setPredari] = useState<Predare[]>([]);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [editez, setEditez] = useState(false);
  const [date, setDate] = useState<DateLead | null>(null);
  const [eroare, setEroare] = useState("");
  const [seSalveaza, setSeSalveaza] = useState(false);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, j, p] = await Promise.all([
      supabase.from("leads").select(COLOANE_LEAD).eq("id", id).maybeSingle(),
      supabase.from("lead_activitate").select("*").eq("lead_id", id).order("creat_la", { ascending: false }),
      supabase.from("predari").select("*").eq("lead_id", id).order("creat_la", { ascending: false }),
    ]);
    setLead((l.data as Lead) ?? null);
    setJurnal((j.data as Activitate[]) ?? []);
    setPredari((p.data as Predare[]) ?? []);
  }, [id]);

  useIncarca(incarca);

  // Adminul vede numele autorilor din jurnal.
  useEffect(() => {
    if (!esteAdmin) return;
    supabaseBrowser()
      .from("profiles")
      .select("id, nume")
      .then(({ data }) => setNume(Object.fromEntries((data ?? []).map((p) => [p.id, p.nume]))));
  }, [esteAdmin]);

  const actiuni = useActiuniLead(incarca);

  if (lead === undefined) return <Incarcare />;
  if (lead === null) {
    return (
      <Gol titlu="Lead-ul nu există sau nu e alocat ție">
        <Link href="/echipa/app/leaduri" className="text-echipa-accent hover:underline">
          Înapoi la lead-urile mele
        </Link>
      </Gol>
    );
  }

  async function salveaza() {
    if (!date || !lead) return;
    if (!date.afacere.trim()) return setEroare("Scrie numele afacerii.");
    setEroare("");
    setSeSalveaza(true);
    const { error } = await supabaseBrowser().from("leads").update(curata(date)).eq("id", lead.id);
    setSeSalveaza(false);
    if (error) return setEroare(mesajEroare(error));
    setEditez(false);
    incarca();
  }

  function autor(a: Activitate) {
    if (a.autor_id === profil.id) return "Tu";
    return nume[a.autor_id ?? ""] ?? "Echipa Elevio";
  }

  function descriere(a: Activitate) {
    if (a.tip === "status") {
      return (
        <span className="flex flex-wrap items-center gap-1.5">
          Status: {a.de_la && <StatusBadge status={a.de_la as Status} mic />} <span aria-hidden="true">→</span>{" "}
          <StatusBadge status={a.la as Status} mic />
        </span>
      );
    }
    if (a.tip === "apel") return a.text ? `Apel: ${a.text}` : "Apel marcat";
    return a.text;
  }

  const telefoane = [
    { eticheta: "Sună afacerea", nr: lead.telefon_afacere },
    { eticheta: "Sună decidentul", nr: lead.decident_telefon },
  ].filter((t) => t.nr);

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/echipa/app/leaduri" className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
        <IconInapoi className="h-4 w-4" /> Lead-urile mele
      </Link>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{lead.afacere}</h1>
          <p className="mt-1 text-sm text-echipa-muted">
            {[NISE[lead.nisa]?.eticheta, lead.oras].filter(Boolean).join(" · ")}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {telefoane.map((t) => (
          <a key={t.eticheta} href={linkTel(t.nr)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-echipa-accent px-3 text-sm font-semibold text-echipa-bg hover:bg-sky-300">
            <IconTelefon className="h-4 w-4" /> {t.eticheta}
          </a>
        ))}
        <Link
          href={`/echipa/app/mod-apel?lead=${lead.id}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-echipa-accent/60 bg-echipa-accent/10 px-3 text-sm font-semibold text-echipa-accent hover:bg-echipa-accent/20"
        >
          <IconFulger className="h-4 w-4" /> Mod apel
        </Link>
        <Buton varianta="secundar" className="min-h-12" onClick={() => actiuni.deschideStatus(lead)}>
          Schimbă statusul
        </Buton>
        <Buton varianta="secundar" className="min-h-12" onClick={() => actiuni.deschideNotita(lead)}>
          <IconNotita className="h-4 w-4" /> Adaugă notiță
        </Buton>
      </div>

      {(lead.urmatorul_pas_data || lead.urmatorul_pas_text) && (
        <Card className="mb-4 border-echipa-accent/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-echipa-accent">Următorul pas</p>
          <p className="mt-1 font-medium">
            {[dataOra(lead.urmatorul_pas_data), lead.urmatorul_pas_text].filter(Boolean).join(", ")}
          </p>
        </Card>
      )}

      {editez && date ? (
        <Card className="mb-4">
          <FormularLead date={date} schimba={setDate} />
          {eroare && (
            <div className="mt-4">
              <Mesaj>{eroare}</Mesaj>
            </div>
          )}
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Buton varianta="fantoma" onClick={() => setEditez(false)}>
              Renunță
            </Buton>
            <Buton mare onClick={salveaza} disabled={seSalveaza}>
              {seSalveaza ? "Se salvează..." : "Salvează"}
            </Buton>
          </div>
        </Card>
      ) : (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Detalii</h2>
            <Buton
              varianta="fantoma"
              onClick={() => {
                setDate({ ...lead });
                setEroare("");
                setEditez(true);
              }}
            >
              Editează
            </Buton>
          </div>
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            <Rand eticheta="Adresa" valoare={lead.adresa} />
            <Rand eticheta="Telefonul afacerii" valoare={lead.telefon_afacere} />
            <Rand eticheta="Decident" valoare={[lead.decident_nume, lead.decident_functie].filter(Boolean).join(", ")} />
            <Rand eticheta="Telefon decident" valoare={lead.decident_telefon} />
            <Rand eticheta="E-mail decident" valoare={lead.decident_email} />
            <Rand eticheta="A sunat la demo" valoare={lead.a_sunat_demo ? "Da" : "Nu"} />
            <Rand eticheta="Sursa" valoare={lead.sursa === "alocat" ? "Alocat de David" : "Adăugat de vânzător"} />
            <Rand eticheta="Creat" valoare={dataScurta(lead.creat_la)} />
            <Rand eticheta="Ultimul contact" valoare={lead.ultimul_contact ? dataOra(lead.ultimul_contact) : "Încă nu"} />
          </dl>
          {(lead.site || lead.google_maps) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {lead.site && (
                <a href={linkExtern(lead.site)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-echipa-line px-3 py-2 text-sm hover:border-echipa-accent">
                  <IconLink className="h-4 w-4" /> Site
                </a>
              )}
              {lead.google_maps && (
                <a href={linkExtern(lead.google_maps)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-echipa-line px-3 py-2 text-sm hover:border-echipa-accent">
                  <IconHarta className="h-4 w-4" /> Google Maps
                </a>
              )}
            </div>
          )}
          {(lead.obiectii.length > 0 || lead.obiectii_text) && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-echipa-muted">Obiecții</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {lead.obiectii.map((o) => (
                  <span key={o} className="rounded-full border border-echipa-line px-2.5 py-1 text-xs">
                    {etichetaObiectie(o)}
                  </span>
                ))}
                {lead.obiectii_text && <span className="rounded-full border border-echipa-line px-2.5 py-1 text-xs">{lead.obiectii_text}</span>}
              </div>
            </div>
          )}
          {lead.notite && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-echipa-muted">Notițe</p>
              <p className="mt-1 whitespace-pre-wrap text-sm">{lead.notite}</p>
            </div>
          )}
        </Card>
      )}

      {predari.length > 0 && (
        <Card className="mb-4">
          <h2 className="mb-3 font-semibold">Întâlniri predate</h2>
          <ul className="space-y-2 text-sm">
            {predari.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-echipa-bg/60 px-3 py-2">
                <span>
                  {dataOra(p.data_intalnire)}, {p.format === "online" ? "online" : "la locație"}
                </span>
                <span className="text-xs font-semibold text-echipa-accent">{REZULTATE_PREDARE[p.rezultat]}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="mb-4 font-semibold">Istoric</h2>
        {jurnal.length === 0 ? (
          <p className="text-sm text-echipa-muted">Încă nimic. Fiecare schimbare de status și fiecare notiță apar aici.</p>
        ) : (
          <ol className="relative space-y-4 border-l border-echipa-line pl-5">
            {jurnal.map((a) => (
              <li key={a.id} className="relative">
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: a.tip === "status" && a.la ? STATUSURI[a.la as Status]?.hex : "#38bdf8" }}
                  aria-hidden="true"
                />
                <div className="text-sm text-echipa-text">{descriere(a)}</div>
                <p className="mt-0.5 text-xs text-echipa-muted">
                  {autor(a)}, {dataOra(a.creat_la)}
                </p>
              </li>
            ))}
          </ol>
        )}
      </Card>

      {actiuni.modale}
    </div>
  );
}

function Rand({ eticheta, valoare }: { eticheta: string; valoare: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs text-echipa-muted">{eticheta}</dt>
      <dd className="mt-0.5 break-words">{valoare || <span className="text-echipa-muted">-</span>}</dd>
    </div>
  );
}
