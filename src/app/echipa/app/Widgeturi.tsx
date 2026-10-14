"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { DEMO_NUMBER, DISCORD_URL, INSIGNE, WHATSAPP_GROUP_URL } from "@/echipa/config";
import { IconBifa, IconFulger } from "@/echipa/components/icons";
import Insigna from "@/echipa/components/Insigna";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Card } from "@/echipa/components/ui";
import { relativ } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { useProgresGhid } from "@/echipa/lib/progres";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export type SectiuneScurta = { slug: string; parte: number };

// Anunțurile adminului, sus în tabloul de bord.
export function Anunturi() {
  const [lista, setLista] = useState<{ id: string; text: string; creat_la: string }[]>([]);
  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("anunturi").select("id, text, creat_la").eq("activ", true).order("creat_la", { ascending: false }).limit(3);
    setLista(data ?? []);
  }, []);
  useIncarca(incarca);
  if (!lista.length) return null;
  return (
    <div className="space-y-2">
      {lista.map((a) => (
        <div key={a.id} className="flex gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4" role="status">
          <IconFulger className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <div>
            <p className="whitespace-pre-wrap text-sm text-amber-50">{a.text}</p>
            <p className="mt-1 text-xs text-amber-200/70">David, {relativ(a.creat_la)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Checklist-ul de start: unele bife se pun singure, altele le pune vânzătorul.
export function ChecklistStart({ sectiuni, insigne }: { sectiuni: SectiuneScurta[]; insigne: string[] }) {
  const { profil, reincarca } = useProfil();
  const { citite } = useProgresGhid(profil.id);
  const manual = profil.onboarding ?? {};
  const partea1 = sectiuni.filter((s) => s.parte === 1).map((s) => s.slug);
  const grup = WHATSAPP_GROUP_URL || DISCORD_URL;

  const pasi = [
    { id: "ghid", text: "Citește Partea 1 a ghidului.", gata: partea1.length > 0 && partea1.every((s) => citite?.includes(s)), href: "/echipa/app/ghid" },
    { id: "demo", text: `Sună tu la numărul de demo ${DEMO_NUMBER} și ascultă agentul.`, gata: Boolean(manual.demo), manual: true },
    { id: "grup", text: "Intră în grupul echipei.", gata: Boolean(manual.grup), manual: true, href: grup || "/echipa/app/comunitate" },
    { id: "apel", text: "Fă primul apel.", gata: insigne.includes("primul_apel"), href: "/echipa/app/leaduri" },
    { id: "intalnire", text: "Programează prima întâlnire.", gata: insigne.includes("prima_intalnire"), href: "/echipa/app/mod-apel" },
  ];
  const facute = pasi.filter((p) => p.gata).length;
  if (citite === null || facute === pasi.length) return null;

  async function bifeaza(id: string, valoare: boolean) {
    await supabaseBrowser()
      .from("profiles")
      .update({ onboarding: { ...manual, [id]: valoare } })
      .eq("id", profil.id);
    reincarca();
  }

  return (
    <Card>
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-lg font-bold">Primii pași</h2>
        <span className="text-sm text-echipa-muted">
          {facute} din {pasi.length}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-echipa-bg">
        <div className="h-full rounded-full bg-echipa-accent" style={{ width: `${(facute / pasi.length) * 100}%` }} />
      </div>
      <ol className="mt-4 space-y-2">
        {pasi.map((p, i) => (
          <li key={p.id} className="flex items-start gap-3">
            {p.manual ? (
              <input
                type="checkbox"
                className="mt-0.5"
                checked={p.gata}
                onChange={(e) => bifeaza(p.id, e.target.checked)}
                aria-label={p.text}
              />
            ) : (
              <span
                className={`mt-0.5 flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full ${p.gata ? "bg-emerald-500 text-echipa-bg" : "border border-echipa-line"}`}
                aria-hidden="true"
              >
                {p.gata && <IconBifa className="h-3 w-3" />}
              </span>
            )}
            <span className={`text-sm ${p.gata ? "text-echipa-muted line-through" : ""}`}>
              {i + 1}.{" "}
              {p.href && !p.gata ? (
                p.href.startsWith("http") ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-echipa-accent hover:underline">
                    {p.text}
                  </a>
                ) : (
                  <Link href={p.href} className="hover:text-echipa-accent hover:underline">
                    {p.text}
                  </Link>
                )
              ) : (
                p.text
              )}
              {!p.manual && !p.gata && <span className="ml-1 text-xs text-echipa-muted">(se bifează singur)</span>}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function ProgresGhid({ total }: { total: number }) {
  const { profil } = useProfil();
  const { citite } = useProgresGhid(profil.id);
  const n = citite?.length ?? 0;
  return (
    <Link href="/echipa/app/ghid" className="block rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60">
      <p className="text-sm text-echipa-muted">Ghidul citit</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">
        {Math.min(n, total)} <span className="text-sm font-normal text-echipa-muted">din {total} secțiuni</span>
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-echipa-bg">
        <div className="h-full rounded-full bg-echipa-accent" style={{ width: `${total ? Math.min(100, (n / total) * 100) : 0}%` }} />
      </div>
    </Link>
  );
}

export function ProgresBonus({ clienti }: { clienti: number }) {
  const [praguri, setPraguri] = useState<{ prag: number }[] | null>(null);
  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("bonusuri_config").select("prag").order("prag");
    setPraguri(data ?? []);
  }, []);
  useIncarca(incarca);
  if (!praguri?.length) return null;
  const urmatorul = praguri.find((p) => p.prag > clienti);
  const anterior = [...praguri].reverse().find((p) => p.prag <= clienti)?.prag ?? 0;
  const progres = urmatorul ? ((clienti - anterior) / (urmatorul.prag - anterior)) * 100 : 100;
  return (
    <Link href="/echipa/app/castiguri" className="block rounded-2xl border border-echipa-line/70 bg-echipa-card p-4 hover:border-echipa-accent/60">
      <p className="text-sm text-echipa-muted">Spre următorul bonus</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">
        {urmatorul ? (
          <>
            {clienti} <span className="text-sm font-normal text-echipa-muted">din {urmatorul.prag} clienți</span>
          </>
        ) : (
          <span className="text-lg">Toate bonusurile atinse</span>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-echipa-bg">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${Math.min(100, progres)}%` }} />
      </div>
    </Link>
  );
}

type Eveniment = { nume: string; tip: "intalnire" | "client" | "insigna"; detaliu: string | null; la: string };

export function FeedEchipa() {
  const [lista, setLista] = useState<Eveniment[] | null>(null);
  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().rpc("feed_echipa", { p_limita: 12 });
    setLista((data as Eveniment[]) ?? []);
  }, []);
  useIncarca(incarca);

  function text(e: Eveniment) {
    const prenume = e.nume.trim().split(/\s+/)[0];
    if (e.tip === "client") return <><strong>{prenume}</strong> a închis un client</>;
    if (e.tip === "intalnire") return <><strong>{prenume}</strong> a programat o întâlnire</>;
    return <><strong>{prenume}</strong> a obținut insigna „{INSIGNE[e.detaliu ?? ""]?.titlu ?? e.detaliu}”</>;
  }

  return (
    <Card>
      <h2 className="mb-3 text-lg font-bold">Ce face echipa</h2>
      {!lista || lista.length === 0 ? (
        <p className="text-sm text-echipa-muted">Încă liniște. Prima întâlnire programată apare aici.</p>
      ) : (
        <ul className="space-y-2.5">
          {lista.map((e, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${e.tip === "client" ? "bg-emerald-400" : e.tip === "intalnire" ? "bg-echipa-accent" : "bg-amber-300"}`}
                aria-hidden="true"
              />
              <span className="flex-1">{text(e)}</span>
              <span className="shrink-0 text-xs text-echipa-muted">{relativ(e.la)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function InsigneleMele({ insigne }: { insigne: string[] }) {
  if (!insigne.length) return null;
  return (
    <Card>
      <h2 className="mb-3 text-lg font-bold">Insignele mele</h2>
      <div className="flex flex-wrap gap-2">
        {insigne.map((i) => (
          <Insigna key={i} cod={i} mare />
        ))}
      </div>
    </Card>
  );
}
