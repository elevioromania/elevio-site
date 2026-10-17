"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AtribuieLista from "@/echipa/components/AtribuieLista";
import { IconInapoi } from "@/echipa/components/icons";
import { Buton, Card, Gol, Incarcare, Mesaj } from "@/echipa/components/ui";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import ToateLeadurile from "../../leaduri/ToateLeadurile";

// Un fișier de lead-uri: redenumire, atribuire către un om, ștergere și lead-urile din ea.
export default function Lista({ id }: { id: string }) {
  const router = useRouter();
  const [lista, setLista] = useState<{ id: string; nume: string; folder_id: string | null } | null | undefined>(undefined);
  const [foldere, setFoldere] = useState<{ id: string; nume: string }[]>([]);
  const [nume, setNume] = useState("");
  const [cheie, setCheie] = useState(0);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [{ data }, f] = await Promise.all([
      supabase.from("liste").select("id, nume, folder_id").eq("id", id).maybeSingle(),
      supabase.from("foldere").select("id, nume").order("nume"),
    ]);
    setLista(data ?? null);
    setFoldere(f.data ?? []);
    setNume(data?.nume ?? "");
  }, [id]);
  useIncarca(incarca);

  if (lista === undefined) return <Incarcare />;
  if (lista === null) return <Gol titlu="Fișierul nu există" />;

  async function redenumeste() {
    if (!nume.trim() || !lista) return;
    const { error } = await supabaseBrowser().from("liste").update({ nume: nume.trim() }).eq("id", lista.id);
    setMesaj(error ? { tip: "eroare", text: "Nu am putut redenumi fișierul." } : { tip: "succes", text: "Fișierul a fost redenumit." });
    incarca();
  }

  async function mutaInFolder(folderId: string | null) {
    if (!lista) return;
    const { error } = await supabaseBrowser().from("liste").update({ folder_id: folderId }).eq("id", lista.id);
    const dest = foldere.find((f) => f.id === folderId)?.nume;
    setMesaj(error ? { tip: "eroare", text: "Nu am putut muta fișierul." } : { tip: "succes", text: dest ? `Fișierul e acum în folderul „${dest}”.` : "Fișierul nu mai e în niciun folder." });
    incarca();
  }

  async function sterge(cuLeaduri: boolean) {
    if (!lista) return;
    const intrebare = cuLeaduri
      ? `Ștergi fișierul „${lista.nume}” ȘI toate lead-urile din el? Nu se mai pot recupera.`
      : `Ștergi doar fișierul „${lista.nume}”? Lead-urile rămân, doar că nu mai sunt în niciun fișier.`;
    if (!confirm(intrebare)) return;
    const supabase = supabaseBrowser();
    if (cuLeaduri) {
      const { error } = await supabase.from("leads").delete().eq("lista_id", lista.id);
      if (error) return setMesaj({ tip: "eroare", text: "Nu am putut șterge lead-urile." });
    }
    const { error } = await supabase.from("liste").delete().eq("id", lista.id);
    if (error) return setMesaj({ tip: "eroare", text: "Nu am putut șterge fișierul." });
    router.replace("/echipa/app/admin/liste");
  }

  return (
    <div>
      <Link href="/echipa/app/admin/liste" className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
        <IconInapoi className="h-4 w-4" /> Foldere de lead-uri
      </Link>
      <ToateLeadurile
        key={cheie}
        listaId={lista.id}
        titlu={lista.nume}
        sus={
          <Card className="mb-4 space-y-4">
            {mesaj && <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>}
            <div>
              <label htmlFor="folder-fisier" className="mb-1.5 block text-sm font-medium">
                Folderul
              </label>
              <select id="folder-fisier" className="camp mb-4" value={lista.folder_id ?? ""} onChange={(e) => mutaInFolder(e.target.value || null)}>
                <option value="">Fără folder</option>
                {foldere.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nume}
                  </option>
                ))}
              </select>
              <p className="mb-1.5 text-sm font-medium">Dă tot fișierul cuiva</p>
              <AtribuieLista
                listaId={lista.id}
                laGata={(text, eroare) => {
                  setMesaj({ tip: eroare ? "eroare" : "succes", text });
                  setCheie((k) => k + 1);
                }}
              />
            </div>
            <p className="text-xs text-echipa-muted">
              Adaugi lead-uri în fișier din{" "}
              <Link href="/echipa/app/admin/leaduri" className="text-echipa-accent hover:underline">
                Lead-uri și atribuire
              </Link>{" "}
              (le bifezi și alegi „Mută în fișier”) sau{" "}
              <Link href="/echipa/app/admin/import" className="text-echipa-accent hover:underline">
                importând un fișier
              </Link>{" "}
              direct în el.
            </p>
            <div className="flex flex-wrap items-end gap-2">
              <div className="min-w-48 flex-1">
                <label htmlFor="nume-lista" className="mb-1.5 block text-sm font-medium">
                  Numele fișierului
                </label>
                <input id="nume-lista" className="camp" value={nume} onChange={(e) => setNume(e.target.value)} />
              </div>
              <Buton varianta="secundar" onClick={redenumeste} disabled={!nume.trim() || nume.trim() === lista.nume}>
                Redenumește
              </Buton>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-echipa-line/60 pt-4">
              <Buton varianta="fantoma" onClick={() => sterge(false)}>
                Șterge doar fișierul
              </Buton>
              <Buton varianta="pericol" onClick={() => sterge(true)}>
                Șterge fișierul și lead-urile
              </Buton>
            </div>
          </Card>
        }
      />
    </div>
  );
}
