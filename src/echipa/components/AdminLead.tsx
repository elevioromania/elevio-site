"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useIncarca } from "../lib/hooks";
import { supabaseBrowser } from "../lib/supabase-browser";
import type { Lead } from "../lib/tipuri";
import { Buton, Card, Mesaj } from "./ui";

type Persoana = { id: string; nume: string };

// Doar pentru admin: cui e atribuit lead-ul și ștergerea lui.
export default function AdminLead({ lead, laSchimbare }: { lead: Lead; laSchimbare: () => void }) {
  const router = useRouter();
  const [oameni, setOameni] = useState<Persoana[]>([]);
  const [cui, setCui] = useState(lead.vanzator_id ?? "");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);
  const [seLucreaza, setSeLucreaza] = useState(false);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("profiles").select("id, nume").eq("activ", true).order("nume");
    setOameni((data as Persoana[]) ?? []);
  }, []);
  useIncarca(incarca);

  async function atribuie() {
    setSeLucreaza(true);
    const { error } = await supabaseBrowser().from("leads").update({ vanzator_id: cui || null }).eq("id", lead.id);
    setSeLucreaza(false);
    const numeNou = oameni.find((o) => o.id === cui)?.nume;
    setMesaj(error ? { tip: "eroare", text: "Nu am putut atribui lead-ul." } : { tip: "succes", text: numeNou ? `Lead-ul e acum la ${numeNou}.` : "Lead-ul e acum nealocat." });
    laSchimbare();
  }

  async function sterge() {
    if (!confirm(`Ștergi definitiv lead-ul „${lead.afacere}”? Se șterg și istoricul și întâlnirile predate pentru el.`)) return;
    setSeLucreaza(true);
    const { error } = await supabaseBrowser().from("leads").delete().eq("id", lead.id);
    setSeLucreaza(false);
    if (error) return setMesaj({ tip: "eroare", text: "Nu am putut șterge lead-ul." });
    router.replace("/echipa/app/admin/leaduri");
  }

  return (
    <Card className="mb-4 border-amber-400/30">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300">Admin</p>
      {mesaj && (
        <div className="mb-3">
          <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>
        </div>
      )}
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-48 flex-1">
          <label htmlFor="atribuie-lead" className="mb-1 block text-sm font-medium">
            Atribuit lui
          </label>
          <select id="atribuie-lead" className="camp" value={cui} onChange={(e) => setCui(e.target.value)}>
            <option value="">Nealocat</option>
            {oameni.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nume}
              </option>
            ))}
          </select>
        </div>
        <Buton onClick={atribuie} disabled={seLucreaza || cui === (lead.vanzator_id ?? "")}>
          Atribuie
        </Buton>
        <Buton varianta="pericol" onClick={sterge} disabled={seLucreaza}>
          Șterge lead-ul
        </Buton>
      </div>
    </Card>
  );
}
