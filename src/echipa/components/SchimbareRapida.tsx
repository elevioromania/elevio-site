"use client";

import { useState } from "react";
import { LISTA_STATUSURI, STATUSURI, type Status } from "../config";
import { dinInputLocal, laInputLocal } from "../lib/format";
import { adaugaActivitate, mesajEroare } from "../lib/leaduri";
import { supabaseBrowser } from "../lib/supabase-browser";
import type { Lead } from "../lib/tipuri";
import { useProfil } from "./ProfilContext";
import { Buton, Camp, Mesaj, Modal } from "./ui";

// Schimbarea rapidă de status, cu notiță și următorul pas. Verde deschide predarea.
export default function SchimbareRapida({
  lead,
  deschis,
  inchide,
  laSalvare,
  laPredare,
  titlu = "Schimbă statusul",
}: {
  lead: Lead;
  deschis: boolean;
  inchide: () => void;
  laSalvare: () => void;
  laPredare: () => void;
  titlu?: string;
}) {
  const { profil } = useProfil();
  const [status, setStatus] = useState<Status>(lead.status);
  const [notita, setNotita] = useState("");
  const [pasData, setPasData] = useState(laInputLocal(lead.urmatorul_pas_data));
  const [pasText, setPasText] = useState(lead.urmatorul_pas_text ?? "");
  const [amSunat, setAmSunat] = useState(true);
  const [eroare, setEroare] = useState("");
  const [seSalveaza, setSeSalveaza] = useState(false);

  async function salveaza() {
    if (status === "intalnire" && lead.status !== "intalnire") {
      laPredare();
      return;
    }
    setEroare("");
    setSeSalveaza(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase
      .from("leads")
      .update({ status, urmatorul_pas_data: dinInputLocal(pasData), urmatorul_pas_text: pasText.trim() || null })
      .eq("id", lead.id);
    if (error) {
      setSeSalveaza(false);
      return setEroare(mesajEroare(error));
    }
    const schimbat = status !== lead.status;
    if (!schimbat && amSunat) {
      await adaugaActivitate(lead.id, profil.id, "apel", notita.trim() || null);
    } else if (notita.trim()) {
      await adaugaActivitate(lead.id, profil.id, "notita", notita.trim());
    }
    setSeSalveaza(false);
    laSalvare();
    inchide();
  }

  return (
    <Modal deschis={deschis} inchide={inchide} titlu={titlu}>
      <p className="-mt-2 mb-4 text-sm text-echipa-muted">{lead.afacere}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Status">
        {LISTA_STATUSURI.map((s) => {
          const info = STATUSURI[s];
          const ales = status === s;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={ales}
              onClick={() => setStatus(s)}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 text-left text-sm font-medium transition-colors ${
                ales ? "bg-white/5" : "border-echipa-line hover:border-echipa-line/100 hover:bg-white/[0.03]"
              }`}
              style={ales ? { borderColor: info.hex, boxShadow: `0 0 0 1px ${info.hex}` } : undefined}
            >
              <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: info.hex }} aria-hidden="true" />
              <span>
                {info.eticheta}
                <span className="block text-xs font-normal text-echipa-muted">{info.culoare}</span>
              </span>
            </button>
          );
        })}
      </div>

      {status === "intalnire" && lead.status !== "intalnire" ? (
        <Mesaj tip="info">Super! Pentru verde completezi predarea către closer. Apasă mai jos.</Mesaj>
      ) : (
        <div className="mt-5 space-y-4">
          {status === lead.status && (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={amSunat} onChange={(e) => setAmSunat(e.target.checked)} />
              {status === "mesaj_trimis" ? "Am mai trimis un mesaj acum (se numără ca activitate)" : "Am sunat acum (se numără ca apel)"}
            </label>
          )}
          <Camp eticheta="Notiță" htmlFor="sr-notita">
            <textarea id="sr-notita" rows={2} className="camp" placeholder={status === "mesaj_trimis" ? "Ce i-ai scris și pe unde (WhatsApp, SMS, mail)?" : "Cum a mers apelul?"} value={notita} onChange={(e) => setNotita(e.target.value)} />
          </Camp>
          <div className="grid gap-4 sm:grid-cols-2">
            <Camp eticheta="Următorul pas: când" htmlFor="sr-pas-data">
              <input id="sr-pas-data" type="datetime-local" className="camp" value={pasData} onChange={(e) => setPasData(e.target.value)} />
            </Camp>
            <Camp eticheta="Ce faci" htmlFor="sr-pas-text">
              <input id="sr-pas-text" className="camp" placeholder={status === "mesaj_trimis" ? "De ex. revin dacă nu răspunde până joi" : "De ex. sun după 14:00"} value={pasText} onChange={(e) => setPasText(e.target.value)} />
            </Camp>
          </div>
        </div>
      )}

      {eroare && (
        <div className="mt-4">
          <Mesaj>{eroare}</Mesaj>
        </div>
      )}
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Buton type="button" varianta="fantoma" onClick={inchide}>
          Renunță
        </Buton>
        <Buton type="button" mare onClick={salveaza} disabled={seSalveaza} varianta={status === "intalnire" && lead.status !== "intalnire" ? "succes" : "principal"}>
          {status === "intalnire" && lead.status !== "intalnire" ? "Completează predarea" : seSalveaza ? "Se salvează..." : "Salvează"}
        </Buton>
      </div>
    </Modal>
  );
}
