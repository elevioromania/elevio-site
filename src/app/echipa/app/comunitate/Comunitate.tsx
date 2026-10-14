"use client";

import { useCallback, useState } from "react";
import { DISCORD_URL, WHATSAPP_GROUP_URL } from "@/echipa/config";
import { IconCalendar, IconLink, IconWhatsapp } from "@/echipa/components/icons";
import Insigna from "@/echipa/components/Insigna";
import { Card, Gol, Incarcare, TitluPagina } from "@/echipa/components/ui";
import { dataOra, linkExtern } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

type Membru = { user_id: string; nume: string; titlu: string; rol: string; insigne: string[] };
export type Sesiune = { id: string; titlu: string; incepe_la: string; link: string | null; locatie: string | null; descriere: string | null };

export default function Comunitate() {
  const [membri, setMembri] = useState<Membru[] | null>(null);
  const [sesiuni, setSesiuni] = useState<Sesiune[] | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const deLa = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
    const [m, s] = await Promise.all([
      supabase.rpc("membri_echipa"),
      supabase.from("sesiuni").select("id, titlu, incepe_la, link, locatie, descriere").gte("incepe_la", deLa).order("incepe_la").limit(20),
    ]);
    setMembri((m.data as Membru[]) ?? []);
    setSesiuni((s.data as Sesiune[]) ?? []);
  }, []);
  useIncarca(incarca);

  return (
    <div className="max-w-4xl space-y-6">
      <TitluPagina titlu="Echipa" subtitlu="Sunăm împreună, ne ajutăm cu obiecțiile și sărbătorim fiecare întâlnire." />

      {(WHATSAPP_GROUP_URL || DISCORD_URL) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {WHATSAPP_GROUP_URL && (
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 hover:border-emerald-400">
              <IconWhatsapp className="h-7 w-7 text-emerald-300" />
              <span>
                <span className="block font-semibold">Grupul de WhatsApp</span>
                <span className="text-sm text-echipa-muted">Anunțuri, întrebări, victorii</span>
              </span>
            </a>
          )}
          {DISCORD_URL && (
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-indigo-400/40 bg-indigo-400/10 p-4 hover:border-indigo-300">
              <IconLink className="h-7 w-7 text-indigo-300" />
              <span>
                <span className="block font-semibold">Serverul de Discord</span>
                <span className="text-sm text-echipa-muted">Sesiuni de apeluri și voice chat</span>
              </span>
            </a>
          )}
        </div>
      )}

      <section>
        <h2 className="mb-3 text-lg font-bold">Sesiuni de apeluri în grup</h2>
        {sesiuni === null ? (
          <Incarcare />
        ) : sesiuni.length === 0 ? (
          <Card>
            <p className="text-sm text-echipa-muted">Nicio sesiune programată acum. David le anunță aici și în grup.</p>
          </Card>
        ) : (
          <ul className="space-y-2">
            {sesiuni.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
                <IconCalendar className="h-6 w-6 shrink-0 text-echipa-accent" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{s.titlu}</p>
                  <p className="text-sm text-echipa-muted">
                    {dataOra(s.incepe_la)}
                    {s.locatie ? `, ${s.locatie}` : ""}
                  </p>
                  {s.descriere && <p className="mt-1 text-sm">{s.descriere}</p>}
                </div>
                {s.link && (
                  <a href={linkExtern(s.link)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-xl bg-echipa-accent px-4 text-sm font-semibold text-echipa-bg">
                    Intră
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Membrii echipei</h2>
        {membri === null ? (
          <Incarcare />
        ) : membri.length === 0 ? (
          <Gol titlu="Echipa abia se formează" />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {membri.map((m) => (
              <li key={m.user_id} className="rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-echipa-accent/15 font-bold text-echipa-accent">
                    {m.nume.trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{m.nume}</p>
                    <p className="truncate text-xs text-echipa-muted">{m.titlu}</p>
                  </div>
                </div>
                {m.insigne.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.insigne.map((i) => (
                      <Insigna key={i} cod={i} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
