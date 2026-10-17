"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { STATUSURI, type Status } from "@/echipa/config";
import AtribuieLista from "@/echipa/components/AtribuieLista";
import { IconFolder, IconIncarca, IconPlus } from "@/echipa/components/icons";
import { Buton, Gol, Incarcare, LinkButon, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { dataScurta } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export type ListaCuLeaduri = {
  id: string;
  nume: string;
  creat_la: string;
  leads: { vanzator_id: string | null; status: Status }[];
};

// Cui aparține folderul: un singur om, mai mulți sau nimeni.
export function proprietar(l: ListaCuLeaduri, nume: Record<string, string>) {
  const ids = [...new Set(l.leads.map((x) => x.vanzator_id))];
  if (ids.length === 0) return "Gol";
  if (ids.length > 1) return "Împărțit între mai mulți";
  return ids[0] ? (nume[ids[0]] ?? "Necunoscut") : "Nealocat";
}

// Folderele de lead-uri (în baza de date: tabelul „liste”). Le creezi, le numești cum vrei
// și le dai cuiva dintr-un click.
export default function Liste() {
  const [liste, setListe] = useState<ListaCuLeaduri[] | null>(null);
  const [nume, setNume] = useState<Record<string, string>>({});
  const [numeNou, setNumeNou] = useState("");
  const [seLucreaza, setSeLucreaza] = useState(false);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [l, p] = await Promise.all([
      supabase.from("liste").select("id, nume, creat_la, leads(vanzator_id, status)").order("creat_la", { ascending: false }),
      supabase.from("profiles").select("id, nume"),
    ]);
    setListe((l.data as ListaCuLeaduri[]) ?? []);
    setNume(Object.fromEntries((p.data ?? []).map((x) => [x.id, x.nume])));
  }, []);
  useIncarca(incarca);

  async function creeaza(e: React.FormEvent) {
    e.preventDefault();
    const n = numeNou.trim();
    if (!n) return;
    setSeLucreaza(true);
    const { error } = await supabaseBrowser().from("liste").insert({ nume: n });
    setSeLucreaza(false);
    if (error) return setMesaj({ tip: "eroare", text: "Nu am putut crea folderul." });
    setNumeNou("");
    setMesaj({ tip: "succes", text: `Folderul „${n}” a fost creat. Mută lead-uri în el din „Lead-uri și atribuire” sau importă un fișier direct în el.` });
    incarca();
  }

  return (
    <div className="max-w-4xl">
      <TitluPagina
        titlu="Foldere de lead-uri"
        subtitlu="Grupează lead-urile cum vrei (clinici, restaurante, saloane, persoane de decizie) și dă un folder întreg cuiva dintr-un click."
        actiuni={
          <LinkButon href="/echipa/app/admin/import" varianta="secundar">
            <IconIncarca className="h-4 w-4" /> Importă lead-uri
          </LinkButon>
        }
      />

      <form onSubmit={creeaza} className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-echipa-line/70 bg-echipa-card p-3">
        <label htmlFor="folder-nou" className="sr-only">
          Numele folderului nou
        </label>
        <input
          id="folder-nou"
          className="camp min-w-0 flex-1"
          placeholder="Numele folderului nou (de ex. Clinici București)"
          value={numeNou}
          onChange={(e) => setNumeNou(e.target.value)}
        />
        <Buton type="submit" disabled={!numeNou.trim() || seLucreaza}>
          <IconPlus className="h-4 w-4" /> Folder nou
        </Buton>
      </form>

      {mesaj && (
        <div className="mb-4">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}

      {liste === null ? (
        <Incarcare />
      ) : liste.length === 0 ? (
        <Gol titlu="Niciun folder încă">Scrie un nume mai sus și apasă „Folder nou”.</Gol>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {liste.map((l) => {
            const total = l.leads.length;
            const noi = l.leads.filter((x) => x.status === "nou").length;
            const intalniri = l.leads.filter((x) => x.status === "intalnire").length;
            return (
              <li key={l.id} className="flex flex-col rounded-2xl border border-echipa-line/70 bg-echipa-card p-4">
                <Link href={`/echipa/app/admin/liste/${l.id}`} className="group flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-echipa-accent/15 text-echipa-accent">
                    <IconFolder className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold group-hover:text-echipa-accent">{l.nume}</span>
                    <span className="block text-sm text-echipa-muted">
                      {total} lead-uri · {proprietar(l, nume)}
                    </span>
                  </span>
                </Link>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-echipa-muted">{noi} nesunate</span>
                  <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: `${STATUSURI.intalnire.hex}1f`, color: STATUSURI.intalnire.hex }}>
                    {intalniri} întâlniri
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-echipa-muted">din {dataScurta(l.creat_la)}</span>
                </div>
                {total > 0 && (
                  <div className="mt-4 border-t border-echipa-line/60 pt-3">
                    <AtribuieLista
                      listaId={l.id}
                      compact
                      laGata={(text, eroare) => {
                        setMesaj({ tip: eroare ? "eroare" : "succes", text });
                        incarca();
                      }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
