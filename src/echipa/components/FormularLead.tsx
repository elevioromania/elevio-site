"use client";

import { LISTA_NISE, NISE, OBIECTII, type Nisa } from "../config";
import type { Lead } from "../lib/tipuri";
import { Camp } from "./ui";

export type DateLead = Pick<
  Lead,
  | "afacere"
  | "nisa"
  | "oras"
  | "adresa"
  | "telefon_afacere"
  | "site"
  | "google_maps"
  | "decident_nume"
  | "decident_functie"
  | "decident_telefon"
  | "decident_email"
  | "notite"
  | "obiectii"
  | "obiectii_text"
  | "a_sunat_demo"
>;

export function dateGoale(): DateLead {
  return {
    afacere: "",
    nisa: "stomatologie",
    oras: "",
    adresa: "",
    telefon_afacere: "",
    site: "",
    google_maps: "",
    decident_nume: "",
    decident_functie: "",
    decident_telefon: "",
    decident_email: "",
    notite: "",
    obiectii: [],
    obiectii_text: "",
    a_sunat_demo: false,
  };
}

// Câmpurile goale devin null în baza de date.
export function curata(d: DateLead) {
  const t = (s: string | null) => (s ?? "").trim() || null;
  return {
    afacere: d.afacere.trim(),
    nisa: d.nisa,
    oras: t(d.oras),
    adresa: t(d.adresa),
    telefon_afacere: t(d.telefon_afacere),
    site: t(d.site),
    google_maps: t(d.google_maps),
    decident_nume: t(d.decident_nume),
    decident_functie: t(d.decident_functie),
    decident_telefon: t(d.decident_telefon),
    decident_email: t(d.decident_email),
    notite: t(d.notite),
    obiectii: d.obiectii,
    obiectii_text: t(d.obiectii_text),
    a_sunat_demo: d.a_sunat_demo,
  };
}

const FUNCTII = ["Proprietar", "Manager", "Administrator", "Medic"];

export default function FormularLead({ date, schimba }: { date: DateLead; schimba: (d: DateLead) => void }) {
  const set = (k: keyof DateLead) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    schimba({ ...date, [k]: e.target.value });

  function comutaObiectie(cod: string) {
    schimba({
      ...date,
      obiectii: date.obiectii.includes(cod) ? date.obiectii.filter((o) => o !== cod) : [...date.obiectii, cod],
    });
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-echipa-muted">Afacerea</h2>
        <Camp eticheta="Numele afacerii" htmlFor="l-afacere" obligatoriu>
          <input id="l-afacere" className="camp" value={date.afacere} onChange={set("afacere")} />
        </Camp>
        <div className="grid gap-4 sm:grid-cols-2">
          <Camp eticheta="Nișa" htmlFor="l-nisa">
            <select id="l-nisa" className="camp" value={date.nisa} onChange={(e) => schimba({ ...date, nisa: e.target.value as Nisa })}>
              {LISTA_NISE.map((n) => (
                <option key={n} value={n}>
                  {NISE[n].eticheta}
                </option>
              ))}
            </select>
          </Camp>
          <Camp eticheta="Oraș" htmlFor="l-oras">
            <input id="l-oras" className="camp" value={date.oras ?? ""} onChange={set("oras")} />
          </Camp>
          <Camp eticheta="Adresa" htmlFor="l-adresa" className="sm:col-span-2">
            <input id="l-adresa" className="camp" value={date.adresa ?? ""} onChange={set("adresa")} />
          </Camp>
          <Camp eticheta="Telefonul afacerii" htmlFor="l-tel">
            <input id="l-tel" type="tel" inputMode="tel" className="camp" value={date.telefon_afacere ?? ""} onChange={set("telefon_afacere")} />
          </Camp>
          <Camp eticheta="Site" htmlFor="l-site">
            <input id="l-site" type="url" inputMode="url" className="camp" value={date.site ?? ""} onChange={set("site")} />
          </Camp>
          <Camp eticheta="Link Google Maps" htmlFor="l-maps" className="sm:col-span-2">
            <input id="l-maps" type="url" inputMode="url" className="camp" value={date.google_maps ?? ""} onChange={set("google_maps")} />
          </Camp>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-echipa-muted">Decidentul</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Camp eticheta="Nume" htmlFor="l-dnume">
            <input id="l-dnume" className="camp" value={date.decident_nume ?? ""} onChange={set("decident_nume")} />
          </Camp>
          <Camp eticheta="Funcția" htmlFor="l-dfunctie">
            <input id="l-dfunctie" list="l-functii" className="camp" value={date.decident_functie ?? ""} onChange={set("decident_functie")} />
            <datalist id="l-functii">
              {FUNCTII.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
          </Camp>
          <Camp eticheta="Telefon direct" htmlFor="l-dtel">
            <input id="l-dtel" type="tel" inputMode="tel" className="camp" value={date.decident_telefon ?? ""} onChange={set("decident_telefon")} />
          </Camp>
          <Camp eticheta="E-mail" htmlFor="l-demail">
            <input id="l-demail" type="email" className="camp" value={date.decident_email ?? ""} onChange={set("decident_email")} />
          </Camp>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-echipa-muted">Discuția</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={date.a_sunat_demo} onChange={(e) => schimba({ ...date, a_sunat_demo: e.target.checked })} />
          A sunat la demo
        </label>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Obiecții primite</legend>
          <div className="flex flex-wrap gap-2">
            {OBIECTII.map((o) => {
              const ales = date.obiectii.includes(o.cod);
              return (
                <button
                  key={o.cod}
                  type="button"
                  aria-pressed={ales}
                  onClick={() => comutaObiectie(o.cod)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    ales ? "border-echipa-accent bg-echipa-accent/15 text-echipa-accent" : "border-echipa-line text-echipa-muted hover:text-echipa-text"
                  }`}
                >
                  {o.eticheta}
                </button>
              );
            })}
          </div>
          <label htmlFor="l-obtext" className="sr-only">
            Altă obiecție
          </label>
          <input id="l-obtext" className="camp mt-2" placeholder="Altă obiecție (text liber)" value={date.obiectii_text ?? ""} onChange={set("obiectii_text")} />
        </fieldset>
        <Camp eticheta="Notițe" htmlFor="l-notite">
          <textarea id="l-notite" rows={4} className="camp" value={date.notite ?? ""} onChange={set("notite")} />
        </Camp>
      </section>
    </div>
  );
}
