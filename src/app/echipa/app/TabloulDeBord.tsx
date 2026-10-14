"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { DEMO_NUMBER, MESAJ_BUN_VENIT, NISE, STATUSURI } from "@/echipa/config";
import { useActiuniLead } from "@/echipa/components/ActiuniLead";
import { IconCalendar, IconCarte, IconLeaduri, IconTelefon, IconTrofeu } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import StatusBadge from "@/echipa/components/StatusBadge";
import { Buton, ButonCopiere, Card, Incarcare } from "@/echipa/components/ui";
import { cheieZi, dataOra, linkTel } from "@/echipa/lib/format";
import { COLOANE_LEAD } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Lead } from "@/echipa/lib/tipuri";

type RandClasament = { user_id: string; clienti: number; intalniri: number; apeluri: number; pozitie: number };

export default function TabloulDeBord() {
  const { profil, reincarca: reincarcaProfil } = useProfil();
  const [deFacut, setDeFacut] = useState<Lead[] | null>(null);
  const [saptamana, setSaptamana] = useState<RandClasament | null>(null);
  const [total, setTotal] = useState<RandClasament | null>(null);
  const [nrEchipa, setNrEchipa] = useState(0);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const sfarsitAzi = new Date();
    sfarsitAzi.setHours(23, 59, 59, 999);
    const [l, s, t] = await Promise.all([
      supabase
        .from("leads")
        .select(COLOANE_LEAD)
        .eq("vanzator_id", profil.id)
        .not("status", "in", "(intalnire,neinteresat,invalid)")
        .lte("urmatorul_pas_data", sfarsitAzi.toISOString())
        .order("urmatorul_pas_data", { ascending: true })
        .limit(50),
      supabase.rpc("clasament", { p_perioada: "saptamana" }),
      supabase.rpc("clasament", { p_perioada: "total" }),
    ]);
    setDeFacut((l.data as Lead[]) ?? []);
    const randS = (s.data as RandClasament[] | null) ?? [];
    setNrEchipa(randS.length);
    setSaptamana(randS.find((r) => r.user_id === profil.id) ?? null);
    setTotal(((t.data as RandClasament[] | null) ?? []).find((r) => r.user_id === profil.id) ?? null);
  }, [profil.id]);

  useIncarca(incarca);

  const actiuni = useActiuniLead(incarca);
  const prenume = profil.nume.trim().split(/\s+/)[0];
  const azi = cheieZi(new Date());
  const ora = useMemo(() => new Date().getHours(), []);
  const salut = ora < 12 ? "Bună dimineața" : ora < 18 ? "Salut" : "Bună seara";

  async function amInteles() {
    await supabaseBrowser().from("profiles").update({ bun_venit_vazut: true }).eq("id", profil.id);
    reincarcaProfil();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {salut}, {prenume}!
        </h1>
        <p className="mt-1 text-sm text-echipa-muted">{profil.titlu}</p>
      </div>

      {!profil.bun_venit_vazut && (
        <div className="pop rounded-3xl border border-echipa-accent/50 bg-gradient-to-br from-echipa-card to-echipa-bg p-5 shadow-[0_0_60px_-25px_rgba(56,189,248,0.6)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-echipa-accent">Bine ai venit în echipa Elevio</p>
          <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{MESAJ_BUN_VENIT}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/echipa/app/ghid" className="inline-flex min-h-10 items-center rounded-xl bg-echipa-accent px-4 text-sm font-semibold text-echipa-bg hover:bg-sky-300">
              Începe cu ghidul
            </Link>
            <Buton varianta="fantoma" onClick={amInteles}>
              Am înțeles
            </Buton>
          </div>
        </div>
      )}

      {/* Cifrele mele */}
      <section aria-labelledby="cifre" className="grid gap-3 sm:grid-cols-3">
        <h2 id="cifre" className="sr-only">
          Cifrele mele
        </h2>
        <Cifra eticheta="Apeluri marcate" saptamana={saptamana?.apeluri} total={total?.apeluri} />
        <Cifra eticheta="Întâlniri programate" saptamana={saptamana?.intalniri} total={total?.intalniri} />
        <Cifra eticheta="Clienți închiși" saptamana={saptamana?.clienti} total={total?.clienti} />
      </section>

      {saptamana && profil.rol === "vanzator" && (
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-echipa-accent/15 text-echipa-accent">
            <IconTrofeu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-echipa-muted">Locul tău în clasamentul săptămânii</p>
            <p className="text-xl font-bold">
              {saptamana.pozitie} <span className="text-sm font-normal text-echipa-muted">din {nrEchipa}</span>
            </p>
          </div>
        </Card>
      )}

      {/* Acces rapid */}
      <section aria-label="Acces rapid" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Rapid href="/echipa/app/leaduri" icon={<IconLeaduri className="h-6 w-6" />} titlu="Lead-urile mele" />
        <Rapid href="/echipa/app/ghid" icon={<IconCarte className="h-6 w-6" />} titlu="Ghid" />
        <Rapid href="/echipa/app/calendar" icon={<IconCalendar className="h-6 w-6" />} titlu="Calendarul lui David" />
        <div className="flex flex-col justify-between rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
          <p className="text-xs text-echipa-muted">Numărul de demo</p>
          <p className="mt-1 text-lg font-bold tracking-wide text-echipa-accent">{DEMO_NUMBER}</p>
          <ButonCopiere text={DEMO_NUMBER} className="mt-2 w-full" />
        </div>
      </section>

      {/* De făcut azi */}
      <section aria-labelledby="de-facut">
        <div className="mb-3 flex items-end justify-between">
          <h2 id="de-facut" className="text-lg font-bold">
            De făcut azi
          </h2>
          <Link href="/echipa/app/leaduri" className="text-sm text-echipa-accent hover:underline">
            Toate lead-urile
          </Link>
        </div>
        {deFacut === null ? (
          <Incarcare />
        ) : deFacut.length === 0 ? (
          <Card>
            <p className="text-sm text-echipa-muted">
              Nimic programat pentru azi. Alege un lead „Nou” și fă primul apel.
            </p>
          </Card>
        ) : (
          <ul className="space-y-2">
            {deFacut.map((l) => {
              const intarziat = l.urmatorul_pas_data && cheieZi(l.urmatorul_pas_data) < azi;
              const telefon = l.decident_telefon || l.telefon_afacere;
              return (
                <li key={l.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3" style={{ borderLeft: `4px solid ${STATUSURI[l.status].hex}` }}>
                  <Link href={`/echipa/app/leaduri/${l.id}`} className="min-w-0 flex-1 hover:text-echipa-accent">
                    <p className="truncate font-semibold">{l.afacere}</p>
                    <p className={`truncate text-xs ${intarziat ? "text-amber-300" : "text-echipa-muted"}`}>
                      {intarziat ? "Întârziat: " : ""}
                      {[dataOra(l.urmatorul_pas_data), l.urmatorul_pas_text, NISE[l.nisa]?.eticheta].filter(Boolean).join(" · ")}
                    </p>
                  </Link>
                  <StatusBadge status={l.status} mic />
                  <div className="flex w-full gap-2 sm:w-auto">
                    {telefon && (
                      <a href={linkTel(telefon)} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-echipa-accent px-4 text-sm font-semibold text-echipa-bg sm:flex-none">
                        <IconTelefon className="h-4 w-4" /> Sună
                      </a>
                    )}
                    <Buton varianta="secundar" className="min-h-11 flex-1 sm:flex-none" onClick={() => actiuni.deschideStatus(l, "Cum a mers?")}>
                      Status
                    </Buton>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {actiuni.modale}
    </div>
  );
}

function Cifra({ eticheta, saptamana, total }: { eticheta: string; saptamana?: number; total?: number }) {
  return (
    <div className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
      <p className="text-sm text-echipa-muted">{eticheta}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{saptamana ?? 0}</p>
      <p className="text-xs text-echipa-muted">
        săptămâna asta, <span className="text-echipa-text">{total ?? 0}</span> în total
      </p>
    </div>
  );
}

function Rapid({ href, icon, titlu }: { href: string; icon: React.ReactNode; titlu: string }) {
  return (
    <Link href={href} className="flex flex-col gap-3 rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60">
      <span className="text-echipa-accent">{icon}</span>
      <span className="font-semibold leading-tight">{titlu}</span>
    </Link>
  );
}
