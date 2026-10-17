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

// Un folder: redenumire, atribuire către un om, ștergere și lead-urile din ea.
export default function Lista({ id }: { id: string }) {
  const router = useRouter();
  const [lista, setLista] = useState<{ id: string; nume: string } | null | undefined>(undefined);
  const [nume, setNume] = useState("");
  const [cheie, setCheie] = useState(0);
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("liste").select("id, nume").eq("id", id).maybeSingle();
    setLista(data ?? null);
    setNume(data?.nume ?? "");
  }, [id]);
  useIncarca(incarca);

  if (lista === undefined) return <Incarcare />;
  if (lista === null) return <Gol titlu="Folderul nu există" />;

  async function redenumeste() {
    if (!nume.trim() || !lista) return;
    const { error } = await supabaseBrowser().from("liste").update({ nume: nume.trim() }).eq("id", lista.id);
    setMesaj(error ? { tip: "eroare", text: "Nu am putut redenumi folderul." } : { tip: "succes", text: "Folderul a fost redenumit." });
    incarca();
  }

  async function sterge(cuLeaduri: boolean) {
    if (!lista) return;
    const intrebare = cuLeaduri
      ? `Ștergi folderul „${lista.nume}” ȘI toate lead-urile din el? Nu se mai pot recupera.`
      : `Ștergi doar folderul „${lista.nume}”? Lead-urile rămân, doar că nu mai sunt în niciun folder.`;
    if (!confirm(intrebare)) return;
    const supabase = supabaseBrowser();
    if (cuLeaduri) {
      const { error } = await supabase.from("leads").delete().eq("lista_id", lista.id);
      if (error) return setMesaj({ tip: "eroare", text: "Nu am putut șterge lead-urile." });
    }
    const { error } = await supabase.from("liste").delete().eq("id", lista.id);
    if (error) return setMesaj({ tip: "eroare", text: "Nu am putut șterge folderul." });
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
              <p className="mb-1.5 text-sm font-medium">Dă tot folderul cuiva</p>
              <AtribuieLista
                listaId={lista.id}
                laGata={(text, eroare) => {
                  setMesaj({ tip: eroare ? "eroare" : "succes", text });
                  setCheie((k) => k + 1);
                }}
              />
            </div>
            <p className="text-xs text-echipa-muted">
              Adaugi lead-uri în folder din{" "}
              <Link href="/echipa/app/admin/leaduri" className="text-echipa-accent hover:underline">
                Lead-uri și atribuire
              </Link>{" "}
              (le bifezi și alegi „Mută în folder”) sau{" "}
              <Link href="/echipa/app/admin/import" className="text-echipa-accent hover:underline">
                importând un fișier
              </Link>{" "}
              direct în el.
            </p>
            <div className="flex flex-wrap items-end gap-2">
              <div className="min-w-48 flex-1">
                <label htmlFor="nume-lista" className="mb-1.5 block text-sm font-medium">
                  Numele folderului
                </label>
                <input id="nume-lista" className="camp" value={nume} onChange={(e) => setNume(e.target.value)} />
              </div>
              <Buton varianta="secundar" onClick={redenumeste} disabled={!nume.trim() || nume.trim() === lista.nume}>
                Redenumește
              </Buton>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-echipa-line/60 pt-4">
              <Buton varianta="fantoma" onClick={() => sterge(false)}>
                Șterge doar folderul
              </Buton>
              <Buton varianta="pericol" onClick={() => sterge(true)}>
                Șterge folderul și lead-urile
              </Buton>
            </div>
          </Card>
        }
      />
    </div>
  );
}
