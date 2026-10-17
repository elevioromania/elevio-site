"use client";

import { useCallback, useState } from "react";
import { useIncarca } from "../lib/hooks";
import { supabaseBrowser } from "../lib/supabase-browser";
import { Buton } from "./ui";

// Dă toate lead-urile dintr-un fișier (listaId) sau dintr-un folder întreg (folderId)
// unui singur om, sau le face nealocate.
export default function AtribuieLista({
  listaId,
  folderId,
  laGata,
  compact,
}: {
  listaId?: string;
  folderId?: string;
  laGata: (mesaj: string, eroare?: boolean) => void;
  compact?: boolean;
}) {
  const [oameni, setOameni] = useState<{ id: string; nume: string }[]>([]);
  const [cui, setCui] = useState("");
  const [seLucreaza, setSeLucreaza] = useState(false);
  const ce = folderId ? "Folderul" : "Fișierul";

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("profiles").select("id, nume").eq("activ", true).order("nume");
    setOameni(data ?? []);
  }, []);
  useIncarca(incarca);

  async function atribuie() {
    if (!cui) return;
    setSeLucreaza(true);
    const supabase = supabaseBrowser();
    let ids = listaId ? [listaId] : [];
    if (folderId) {
      const { data } = await supabase.from("liste").select("id").eq("folder_id", folderId);
      ids = (data ?? []).map((x) => x.id);
    }
    if (!ids.length) {
      setSeLucreaza(false);
      return laGata(`${ce} nu are încă lead-uri.`, true);
    }
    const { error, count } = await supabase
      .from("leads")
      .update({ vanzator_id: cui === "nealocat" ? null : cui }, { count: "exact" })
      .in("lista_id", ids);
    setSeLucreaza(false);
    if (error) return laGata(`Nu am putut atribui ${ce.toLowerCase()}.`, true);
    const nume = oameni.find((o) => o.id === cui)?.nume;
    setCui("");
    laGata(nume ? `${ce} (${count ?? 0} lead-uri) e acum la ${nume}.` : `Lead-urile din ${ce.toLowerCase()} sunt acum nealocate.`);
  }

  return (
    <div className={`flex gap-2 ${compact ? "" : "flex-wrap items-end"}`}>
      <select aria-label={`Dă ${ce.toLowerCase()} lui`} className="camp min-w-0 flex-1" value={cui} onChange={(e) => setCui(e.target.value)}>
        <option value="">{folderId ? "Dă tot folderul lui..." : "Dă fișierul lui..."}</option>
        <option value="nealocat">Nimeni (nealocat)</option>
        {oameni.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nume}
          </option>
        ))}
      </select>
      <Buton onClick={atribuie} disabled={!cui || seLucreaza}>
        {seLucreaza ? "Se salvează..." : "Dă"}
      </Buton>
    </div>
  );
}
