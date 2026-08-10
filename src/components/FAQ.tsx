"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Trebuie să îmi schimb numărul de telefon?",
    a: "Nu. Elevio preia apelurile pe numărul tău existent — clienții tăi sună exact ca până acum, nu observă nicio schimbare în afară de faptul că cineva răspunde mereu.",
  },
  {
    q: "Cât de natural sună vocea?",
    a: "Foarte natural — vorbește română fluentă, cu intonație firească, ton cald și profesionist. Cei mai mulți clienți nu își dau seama din prima că vorbesc cu un asistent AI.",
  },
  {
    q: "Ce se întâmplă dacă Elevio nu poate răspunde la o întrebare?",
    a: "Nu improvizează niciodată. Dacă nu are un răspuns sigur, transferă apelul direct pe telefonul tău, în câteva secunde — sau, dacă nu răspunzi, spune politicos că cineva va reveni cu un răspuns.",
  },
  {
    q: "Se integrează cu calendarul meu?",
    a: "Da — Elevio poate verifica disponibilitatea în timp real și crea rezervări direct în calendarul tău (Cal.com, Calendly), exact cum face deja pentru DonCafe.",
  },
  {
    q: "Cât durează implementarea?",
    a: "În general, de la primul apel de configurare la lansare durează câteva zile — adaptăm Elevio pe serviciile, programul și regulile afacerii tale.",
  },
  {
    q: "Pot renunța oricând?",
    a: "Da. Nu există obligații pe termen lung — începi cu Etapa Inițială gratuită și treci la un plan plătit doar când ești convins că merită.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-elevio-border rounded-2xl border border-elevio-border bg-white shadow-sm">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-semibold text-elevio-dark">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-xl text-elevio-primary transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-elevio-dark/70">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
