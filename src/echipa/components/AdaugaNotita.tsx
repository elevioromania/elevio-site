"use client";

import { useState } from "react";
import { adaugaActivitate, mesajEroare } from "../lib/leaduri";
import type { Lead } from "../lib/tipuri";
import { useProfil } from "./ProfilContext";
import { Buton, Mesaj, Modal } from "./ui";

export default function AdaugaNotita({
  lead,
  deschis,
  inchide,
  laSalvare,
}: {
  lead: Lead;
  deschis: boolean;
  inchide: () => void;
  laSalvare: () => void;
}) {
  const { profil } = useProfil();
  const [text, setText] = useState("");
  const [eroare, setEroare] = useState("");
  const [seSalveaza, setSeSalveaza] = useState(false);

  async function salveaza() {
    if (!text.trim()) return;
    setSeSalveaza(true);
    const { error } = await adaugaActivitate(lead.id, profil.id, "notita", text.trim());
    setSeSalveaza(false);
    if (error) return setEroare(mesajEroare(error));
    laSalvare();
    inchide();
  }

  return (
    <Modal deschis={deschis} inchide={inchide} titlu="Adaugă notiță">
      <p className="-mt-2 mb-4 text-sm text-echipa-muted">{lead.afacere}</p>
      <label htmlFor="notita-noua" className="sr-only">
        Notița
      </label>
      <textarea id="notita-noua" rows={4} autoFocus className="camp" placeholder="Ce s-a întâmplat? Ce trebuie să știi data viitoare?" value={text} onChange={(e) => setText(e.target.value)} />
      {eroare && (
        <div className="mt-3">
          <Mesaj>{eroare}</Mesaj>
        </div>
      )}
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Buton type="button" varianta="fantoma" onClick={inchide}>
          Renunță
        </Buton>
        <Buton type="button" mare onClick={salveaza} disabled={seSalveaza || !text.trim()}>
          {seSalveaza ? "Se salvează..." : "Salvează notița"}
        </Buton>
      </div>
    </Modal>
  );
}
