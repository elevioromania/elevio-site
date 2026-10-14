"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { CALCULATOR, CALENDAR_URL, LISTA_NISE, NISE, numarDemo, type Nisa } from "@/echipa/config";
import { useActiuniLead } from "@/echipa/components/ActiuniLead";
import { IconCalendar, IconCautare, IconInapoi, IconSageata, IconScut, IconTelefon } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, ButonCopiere, Modal } from "@/echipa/components/ui";
import { lei, linkTel, normal } from "@/echipa/lib/format";
import type { ElementGhid } from "@/echipa/lib/ghid";
import { useIncarca } from "@/echipa/lib/hooks";
import { COLOANE_LEAD } from "@/echipa/lib/leaduri";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";
import { pasiScript, pierdereLunara, type Linie } from "@/echipa/modApel";

export default function ModApel({ leadId, obiectii }: { leadId: string | null; obiectii: ElementGhid[] }) {
  const { profil } = useProfil();
  const [lead, setLead] = useState<Lead | null>(null);
  const [nisaAleasa, setNisaAleasa] = useState<Nisa | null>(null);
  const [pas, setPas] = useState(0);
  const [pret, setPret] = useState("");
  const [apeluri, setApeluri] = useState(String(CALCULATOR.apeluriPierdutePeZi));
  const [zile, setZile] = useState(String(CALCULATOR.zileLucratoare));
  const [rata, setRata] = useState(String(CALCULATOR.rataConversie));
  const [obiectieDeschisa, setObiectieDeschisa] = useState(false);

  const incarca = useCallback(async () => {
    if (!leadId) return;
    const { data } = await supabaseBrowser().from("leads").select(COLOANE_LEAD).eq("id", leadId).maybeSingle();
    setLead((data as Lead) ?? null);
  }, [leadId]);
  useIncarca(incarca);
  const actiuni = useActiuniLead(incarca);

  const nisa: Nisa = nisaAleasa ?? lead?.nisa ?? "stomatologie";
  const demo = numarDemo(nisa);
  const rezultat = Number(pret) > 0 ? pierdereLunara(Number(pret), Number(apeluri) || 0, Number(zile) || 0, Number(rata) || 0) : null;

  const pasi = useMemo(
    () =>
      pasiScript({
        nisa,
        numeVanzator: profil.nume.trim().split(/\s+/)[0],
        demo,
        apeluriPeZi: Number(apeluri) || 0,
        rata: Number(rata) || 0,
        rezultat: rezultat !== null ? lei(rezultat) : null,
      }),
    [nisa, profil.nume, demo, apeluri, rata, rezultat],
  );
  const curent = pasi[pas];
  const telefon = lead?.decident_telefon || lead?.telefon_afacere;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Bara de sus: numărul de demo și obiecțiile, mereu la îndemână */}
      <div className="sticky top-[57px] z-20 -mx-4 mb-4 flex items-center gap-2 border-b border-echipa-line/60 bg-echipa-bg/95 px-4 py-2.5 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border lg:top-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide text-echipa-muted">Demo</p>
          <p className="whitespace-nowrap text-lg font-bold tracking-wide text-echipa-accent sm:text-xl">{demo}</p>
        </div>
        <ButonCopiere text={demo} compact eticheta="Copiază numărul" />
        <button
          type="button"
          onClick={() => setObiectieDeschisa(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-semibold text-echipa-bg hover:bg-amber-300"
        >
          <IconScut className="h-4 w-4" /> Obiecție!
        </button>
      </div>

      {lead && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
          <div className="min-w-0 flex-1">
            <Link href={`/echipa/app/leaduri/${lead.id}`} className="font-semibold hover:text-echipa-accent">
              {lead.afacere}
            </Link>
            <p className="truncate text-xs text-echipa-muted">{[lead.oras, lead.decident_nume, lead.decident_functie].filter(Boolean).join(" · ")}</p>
          </div>
          <StatusBadge status={lead.status} mic />
          {telefon && (
            <a href={linkTel(telefon)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-echipa-accent px-4 text-sm font-semibold text-echipa-bg">
              <IconTelefon className="h-4 w-4" /> Sună
            </a>
          )}
        </div>
      )}

      {/* Comutatorul de nișă */}
      <div className="-mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2" role="group" aria-label="Nișa">
          {LISTA_NISE.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={nisa === n}
              onClick={() => setNisaAleasa(n)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium ${
                nisa === n ? "border-echipa-accent bg-echipa-accent/15 text-echipa-accent" : "border-echipa-line text-echipa-muted"
              }`}
            >
              {NISE[n].eticheta}
            </button>
          ))}
        </div>
      </div>

      {/* Pașii */}
      <ol className="-mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" aria-label="Pașii apelului">
        {pasi.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setPas(i)}
              aria-current={i === pas ? "step" : undefined}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold ${
                i === pas ? "bg-echipa-accent text-echipa-bg" : i < pas ? "bg-echipa-accent/15 text-echipa-accent" : "bg-echipa-card text-echipa-muted"
              }`}
            >
              <span className="tabular-nums">{i + 1}</span>
              {p.titlu}
            </button>
          </li>
        ))}
      </ol>

      <section className="rounded-3xl border border-echipa-line/70 bg-echipa-card p-5 sm:p-7" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wide text-echipa-accent">
          Pasul {pas + 1} din {pasi.length}
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{curent.titlu}</h1>
        <div className="mt-5 space-y-4">
          {curent.linii.map((l, i) => (
            <RandScript key={i} linie={l} />
          ))}
        </div>

        {curent.id === "calculul" && (
          <div className="mt-6 rounded-2xl border border-echipa-accent/40 bg-echipa-bg/70 p-4">
            <p className="mb-3 text-sm font-semibold">Calculatorul pierderii</p>
            <label htmlFor="calc-pret" className="mb-1.5 block text-sm">
              Prețul mediu al unui serviciu (lei)
            </label>
            <input id="calc-pret" type="number" inputMode="decimal" min={0} className="camp text-xl font-bold" placeholder="de ex. 200" value={pret} onChange={(e) => setPret(e.target.value)} />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <ParamCalc id="calc-apeluri" eticheta="Apeluri pierdute / zi" valoare={apeluri} schimba={setApeluri} />
              <ParamCalc id="calc-zile" eticheta="Zile lucrătoare" valoare={zile} schimba={setZile} />
              <ParamCalc id="calc-rata" eticheta="Conversie (%)" valoare={rata} schimba={setRata} />
            </div>
            <div className="mt-4 rounded-2xl bg-echipa-accent/10 p-4 text-center">
              <p className="text-3xl font-bold text-echipa-accent sm:text-4xl">{rezultat !== null ? `aprox. ${lei(rezultat)} lei pe lună` : "Scrie prețul"}</p>
              <p className="mt-1 text-xs text-echipa-muted">
                {apeluri || 0} apeluri × {zile || 0} zile × {rata || 0}% × preț, rotunjit la sute
              </p>
            </div>
            <p className="mt-3 text-sm text-echipa-muted">Prezintă calculul ca pe o estimare făcută împreună („să zicem că...”), nu ca pe un fapt.</p>
          </div>
        )}

        {curent.extra?.map((x) => (
          <details key={x.titlu} className="mt-5 rounded-2xl border border-echipa-line bg-echipa-bg/50">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">{x.titlu}</summary>
            <div className="space-y-3 border-t border-echipa-line/60 px-4 py-4">
              {x.linii.map((l, i) => (
                <RandScript key={i} linie={l} mic />
              ))}
            </div>
          </details>
        ))}

        {curent.id === "programarea" && (
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {CALENDAR_URL ? (
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-echipa-line bg-echipa-card-2 font-semibold hover:border-echipa-accent">
                <IconCalendar /> Calendarul de closing
              </a>
            ) : (
              <Link href="/echipa/app/calendar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-echipa-line bg-echipa-card-2 font-semibold hover:border-echipa-accent">
                <IconCalendar /> Calendarul de closing
              </Link>
            )}
            {lead && lead.status !== "intalnire" && (
              <Buton varianta="succes" mare onClick={() => actiuni.deschidePredare(lead)}>
                Completează predarea
              </Buton>
            )}
          </div>
        )}

        <div className="mt-7 flex gap-2">
          <Buton varianta="secundar" mare className="flex-1" disabled={pas === 0} onClick={() => setPas(pas - 1)}>
            <IconInapoi className="h-4 w-4" /> Înapoi
          </Buton>
          <Buton mare className="flex-1" disabled={pas === pasi.length - 1} onClick={() => setPas(pas + 1)}>
            Următorul <IconSageata className="h-4 w-4" />
          </Buton>
        </div>
      </section>

      <div className="mt-4">
        {lead ? (
          <Buton varianta="secundar" mare className="w-full" onClick={() => actiuni.deschideStatus(lead, "Cum s-a terminat apelul?")}>
            Am terminat apelul
          </Buton>
        ) : (
          <p className="text-center text-sm text-echipa-muted">
            Pornește „Mod apel” dintr-un lead (butonul de pe pagina lead-ului), ca la final să-i poți schimba statusul direct de aici.
          </p>
        )}
      </div>

      <PanouObiectii deschis={obiectieDeschisa} inchide={() => setObiectieDeschisa(false)} obiectii={obiectii} />
      {actiuni.modale}
    </div>
  );
}

function RandScript({ linie, mic }: { linie: Linie; mic?: boolean }) {
  if (linie.tip === "tu") {
    return (
      <p className={`border-l-4 border-echipa-accent pl-4 leading-relaxed text-echipa-text ${mic ? "text-base" : "text-lg sm:text-xl"}`}>
        <span className="mr-2 rounded-md bg-echipa-accent/15 px-1.5 py-0.5 text-sm font-bold text-echipa-accent">Tu:</span>
        {linie.text}
      </p>
    );
  }
  if (linie.tip === "regie") return <p className="pl-5 italic text-[#8ea3b3]">{linie.text}</p>;
  if (linie.tip === "titlu") return <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-echipa-muted">{linie.text}</p>;
  return <p className="rounded-xl bg-echipa-bg/60 px-3 py-2 text-sm text-echipa-muted">{linie.text}</p>;
}

function ParamCalc({ id, eticheta, valoare, schimba }: { id: string; eticheta: string; valoare: string; schimba: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] leading-tight text-echipa-muted">
        {eticheta}
      </label>
      <input id={id} type="number" inputMode="decimal" min={0} className="camp text-center" value={valoare} onChange={(e) => schimba(e.target.value)} />
    </div>
  );
}

function PanouObiectii({ deschis, inchide, obiectii }: { deschis: boolean; inchide: () => void; obiectii: ElementGhid[] }) {
  const [q, setQ] = useState("");
  const [ales, setAles] = useState<string | null>(null);
  const cuvinte = normal(q.trim()).split(/\s+/).filter(Boolean);
  const lista = obiectii.filter((o) => cuvinte.every((c) => normal(o.text).includes(c)));
  const deschisa = obiectii.find((o) => o.id === ales);

  return (
    <Modal deschis={deschis} inchide={inchide} titlu="Obiecție!" lat>
      {deschisa ? (
        <div>
          <button type="button" onClick={() => setAles(null)} className="mb-3 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
            <IconInapoi className="h-4 w-4" /> Toate obiecțiile
          </button>
          <h3 className="text-lg font-bold">{deschisa.titlu}</h3>
          <div className="ghid-prose mt-3 text-lg" dangerouslySetInnerHTML={{ __html: deschisa.html }} />
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm text-echipa-muted">Înțelegi, pui o întrebare, aduci omul înapoi la problema lui. Nu te certa niciodată.</p>
          <div className="relative">
            <label htmlFor="cauta-obiectie" className="sr-only">
              Caută obiecția
            </label>
            <IconCautare className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-echipa-muted" />
            <input id="cauta-obiectie" type="search" autoFocus className="camp pl-10" placeholder="Ce a zis? (de ex. preț, AI, e-mail)" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <ul className="mt-3 space-y-2">
            {lista.map((o) => (
              <li key={o.id}>
                <button type="button" onClick={() => setAles(o.id)} className="w-full rounded-xl border border-echipa-line bg-echipa-card px-4 py-3 text-left font-medium hover:border-echipa-accent">
                  {o.titlu}
                </button>
              </li>
            ))}
            {lista.length === 0 && <li className="text-sm text-echipa-muted">Nicio obiecție găsită. Vezi și „Întrebări frecvente”.</li>}
          </ul>
        </>
      )}
    </Modal>
  );
}
