"use client";

import { useState } from "react";
import type { Lead } from "../lib/tipuri";
import AdaugaNotita from "./AdaugaNotita";
import FormularPredare from "./FormularPredare";
import SchimbareRapida from "./SchimbareRapida";

type Fereastra = "status" | "notita" | "predare" | null;

// Ferestrele comune pentru un lead: status, notiță, predare. Folosite în listă, kanban și pagina lead-ului.
export function useActiuniLead(reincarca: () => void) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [fereastra, setFereastra] = useState<Fereastra>(null);
  const [titluStatus, setTitluStatus] = useState<string | undefined>();

  const inchide = () => setFereastra(null);

  // Fereastra se montează doar cât e deschisă, deci pornește mereu cu datele lead-ului.
  const modale =
    lead && fereastra === "status" ? (
      <SchimbareRapida
        lead={lead}
        deschis
        inchide={inchide}
        laSalvare={reincarca}
        laPredare={() => setFereastra("predare")}
        titlu={titluStatus}
      />
    ) : lead && fereastra === "notita" ? (
      <AdaugaNotita lead={lead} deschis inchide={inchide} laSalvare={reincarca} />
    ) : lead && fereastra === "predare" ? (
      <FormularPredare lead={lead} deschis inchide={inchide} laSucces={reincarca} />
    ) : null;

  return {
    deschideStatus: (l: Lead, titlu?: string) => {
      setLead(l);
      setTitluStatus(titlu);
      setFereastra("status");
    },
    deschideNotita: (l: Lead) => {
      setLead(l);
      setFereastra("notita");
    },
    deschidePredare: (l: Lead) => {
      setLead(l);
      setFereastra("predare");
    },
    modale,
  };
}
