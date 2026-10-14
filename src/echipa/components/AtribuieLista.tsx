"use client";

import { useCallback, useState } from "react";
import { useIncarca } from "../lib/hooks";
import { supabaseBrowser } from "../lib/supabase-browser";
import { Buton } from "./ui";

// Dă toate lead-urile dintr-o listă unui singur om (sau le face nealocate).
export default function AtribuieLista({
  listaId,
  laGata,
  compact,
}: {
  listaId: string;
  laGata: (mesaj: string, eroare?: boolean) => void;
  compact?: boolean;
}) {
  const [oameni, setOameni] = useState<{ id: string; nume: string }[]>([]);
  const [cui, setCui] = useState("");
  const [seLucreaza, setSeLucreaza] = useState(false);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("profiles").select("id, nume").eq("activ", true).order("nume");
    setOameni(data ?? []);
  }, []);
  useIncarca(incarca);

  async function atribuie() {
    if (!cui) return;
    setSeLucreaza(true);
    const { error, count } = await supabaseBrowser()
      .from("leads")
      .update({ vanzator_id: cui === "nealocat" ? null : cui }, { count: "exact" })
      .eq("lista_id", listaId);
    setSeLucreaza(false);
    if (error) return laGata("Nu am putut atribui lista.", true);
    const nume = oameni.find((o) => o.id === cui)?.nume;
    setCui("");
    laGata(nume ? `Lista (${count ?? 0} lead-uri) e acum la ${nume}.` : "Lead-urile din listă sunt acum nealocate.");
  }

  return (
    <div className={`flex gap-2 ${compact ? "" : "flex-wrap items-end"}`}>
      <select aria-label="Atribuie lista lui" className="camp min-w-0 flex-1" value={cui} onChange={(e) => setCui(e.target.value)}>
        <option value="">Atribuie lista lui...</option>
        <option value="nealocat">Nimeni (nealocată)</option>
        {oameni.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nume}
          </option>
        ))}
      </select>
      <Buton onClick={atribuie} disabled={!cui || seLucreaza}>
        {seLucreaza ? "Se salvează..." : "Atribuie"}
      </Buton>
    </div>
  );
}
