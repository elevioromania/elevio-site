"use client";

import Link from "next/link";
import { useState } from "react";
import { CALENDAR_URL, DAVID_WHATSAPP_INTL } from "../config";
import { dinInputLocal } from "../lib/format";
import { mesajEroare, mesajWhatsapp } from "../lib/leaduri";
import { supabaseBrowser } from "../lib/supabase-browser";
import type { Lead } from "../lib/tipuri";
import { lanseazaConfetti } from "./confetti";
import { IconCalendar, IconWhatsapp } from "./icons";
import { useProfil } from "./ProfilContext";
import { Buton, ButonCopiere, Camp, LinkButon, Mesaj, Modal } from "./ui";

const FUNCTII = ["Proprietar", "Manager", "Administrator", "Medic"];

export default function FormularPredare({
  lead,
  deschis,
  inchide,
  laSucces,
}: {
  lead: Lead;
  deschis: boolean;
  inchide: () => void;
  laSucces: () => void;
}) {
  const { profil } = useProfil();
  const [f, setF] = useState(() => initial(lead));
  const [eroare, setEroare] = useState("");
  const [seTrimite, setSeTrimite] = useState(false);
  const [mesaj, setMesaj] = useState<string | null>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    const lipsa: string[] = [];
    if (!f.data) lipsa.push("data și ora");
    if (f.format === "locatie" && !f.adresa.trim()) lipsa.push("adresa");
    if (!f.decident_nume.trim()) lipsa.push("numele persoanei de contact");
    if (!f.decident_functie.trim()) lipsa.push("funcția");
    if (!f.decident_telefon.trim()) lipsa.push("telefonul");
    if (!f.decident_email.trim()) lipsa.push("e-mailul");
    if (f.demo === "") lipsa.push("dacă a sunat la demo");
    if (!f.reactie.trim()) lipsa.push("reacția lui");
    if (!f.problema.trim()) lipsa.push("problema lui");
    if (f.altcineva === "") lipsa.push("dacă participă altcineva");
    if (f.altcineva === "da" && !f.cine.trim()) lipsa.push("cine mai participă");
    if (lipsa.length) return setEroare(`Completează: ${lipsa.join(", ")}.`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.decident_email.trim())) return setEroare("E-mailul persoanei de contact nu e valid.");

    const predare = {
      data_intalnire: dinInputLocal(f.data)!,
      format: f.format,
      adresa: f.format === "locatie" ? f.adresa.trim() : null,
      decident_nume: f.decident_nume.trim(),
      decident_functie: f.decident_functie.trim(),
      decident_telefon: f.decident_telefon.trim(),
      decident_email: f.decident_email.trim(),
      a_sunat_demo: f.demo === "da",
      reactie_demo: f.reactie.trim(),
      problema: f.problema.trim(),
      participanti: f.altcineva === "da" ? `Da: ${f.cine.trim()}` : "Nu",
      notite: f.notite.trim() || null,
    };

    setSeTrimite(true);
    const { error } = await supabaseBrowser()
      .from("predari")
      .insert({ ...predare, lead_id: lead.id, vanzator_id: profil.id });
    setSeTrimite(false);
    if (error) return setEroare(mesajEroare(error));

    setMesaj(mesajWhatsapp(lead, predare));
    lanseazaConfetti();
    laSucces();
  }

  if (mesaj) {
    return (
      <Modal deschis={deschis} inchide={inchide} titlu="Întâlnire programată">
        <div className="pop space-y-4">
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
            <p className="text-lg font-bold text-emerald-300">Felicitări, {profil.nume.split(" ")[0]}!</p>
            <p className="mt-1 text-sm text-emerald-100/90">
              Întâlnirea e la echipa de closing. Trimite acum și mesajul pe WhatsApp, ca s-o vadă imediat.
            </p>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl border border-echipa-line bg-echipa-bg p-4 font-sans text-sm leading-relaxed text-echipa-text">
            {mesaj}
          </pre>
          <div className="grid gap-2 sm:grid-cols-2">
            <LinkButon
              href={`https://wa.me/${DAVID_WHATSAPP_INTL}?text=${encodeURIComponent(mesaj)}`}
              target="_blank"
              rel="noopener noreferrer"
              varianta="succes"
              mare
            >
              <IconWhatsapp />
              Trimite pe WhatsApp
            </LinkButon>
            <ButonCopiere text={mesaj} eticheta="Copiază mesajul" className="min-h-12" />
          </div>
          <Buton varianta="fantoma" className="w-full" onClick={inchide}>
            Gata
          </Buton>
        </div>
      </Modal>
    );
  }

  return (
    <Modal deschis={deschis} inchide={inchide} titlu="Predarea către closer" lat>
      <form onSubmit={trimite} className="space-y-5" noValidate>
        <p className="text-sm text-echipa-muted">
          <strong className="text-echipa-text">{lead.afacere}</strong>
          {lead.oras ? `, ${lead.oras}` : ""}. Toate câmpurile sunt obligatorii, în afară de notițe.
        </p>

        <div className="rounded-2xl border border-echipa-line bg-echipa-bg/60 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">Când e întâlnirea</p>
            {CALENDAR_URL ? (
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-echipa-accent hover:underline">
                <IconCalendar className="h-4 w-4" /> Deschide calendarul de closing
              </a>
            ) : (
              <Link href="/echipa/app/calendar" target="_blank" className="inline-flex items-center gap-1.5 text-sm text-echipa-accent hover:underline">
                <IconCalendar className="h-4 w-4" /> Calendarul de closing
              </Link>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Camp eticheta="Data și ora" htmlFor="p-data" obligatoriu>
              <input id="p-data" type="datetime-local" className="camp" value={f.data} onChange={set("data")} />
            </Camp>
            <fieldset>
              <legend className="mb-1.5 text-sm font-medium">
                Unde <span className="text-echipa-accent">*</span>
              </legend>
              <div className="flex gap-2">
                {(["online", "locatie"] as const).map((v) => (
                  <label key={v} className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent ${f.format === v ? "border-echipa-accent bg-echipa-accent/10 text-echipa-accent" : "border-echipa-line"}`}>
                    <input type="radio" name="p-format" className="sr-only" checked={f.format === v} onChange={() => setF({ ...f, format: v })} />
                    {v === "online" ? "Online" : "La locație"}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          {f.format === "locatie" && (
            <Camp eticheta="Adresa" htmlFor="p-adresa" obligatoriu className="mt-4">
              <input id="p-adresa" className="camp" value={f.adresa} onChange={set("adresa")} />
            </Camp>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Camp eticheta="Persoana de contact: nume" htmlFor="p-nume" obligatoriu>
            <input id="p-nume" className="camp" value={f.decident_nume} onChange={set("decident_nume")} />
          </Camp>
          <Camp eticheta="Funcția" htmlFor="p-functie" obligatoriu>
            <input id="p-functie" list="p-functii" className="camp" value={f.decident_functie} onChange={set("decident_functie")} />
            <datalist id="p-functii">
              {FUNCTII.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
          </Camp>
          <Camp eticheta="Telefon" htmlFor="p-tel" obligatoriu>
            <input id="p-tel" type="tel" inputMode="tel" className="camp" value={f.decident_telefon} onChange={set("decident_telefon")} />
          </Camp>
          <Camp eticheta="E-mail" htmlFor="p-email" obligatoriu>
            <input id="p-email" type="email" className="camp" value={f.decident_email} onChange={set("decident_email")} />
          </Camp>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">
            A sunat la demo? <span className="text-echipa-accent">*</span>
          </legend>
          <DaNu valoare={f.demo} schimba={(v) => setF({ ...f, demo: v })} nume="p-demo" />
        </fieldset>
        <Camp eticheta="Reacția lui" htmlFor="p-reactie" obligatoriu ajutor="Pe scurt: ce a spus după ce a auzit agentul (sau de ce n-a sunat încă).">
          <input id="p-reactie" className="camp" value={f.reactie} onChange={set("reactie")} />
        </Camp>
        <Camp eticheta="Problema lui" htmlFor="p-problema" obligatoriu ajutor="De exemplu: „nu răspunde nimeni după 18:00”, „recepția e mereu ocupată dimineața”.">
          <textarea id="p-problema" rows={2} className="camp" value={f.problema} onChange={set("problema")} />
        </Camp>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">
            Participă și altcineva (asociat, coleg)? <span className="text-echipa-accent">*</span>
          </legend>
          <DaNu valoare={f.altcineva} schimba={(v) => setF({ ...f, altcineva: v })} nume="p-altcineva" />
          {f.altcineva === "da" && (
            <input aria-label="Cine mai participă" placeholder="Cine? (nume, rol)" className="camp mt-2" value={f.cine} onChange={set("cine")} />
          )}
        </fieldset>

        <Camp eticheta="Notițe și obiecții" htmlFor="p-notite" ajutor="Opțional. Obiecțiile bifate la lead se adaugă automat în mesaj.">
          <textarea id="p-notite" rows={3} className="camp" value={f.notite} onChange={set("notite")} />
        </Camp>

        {eroare && <Mesaj>{eroare}</Mesaj>}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Buton type="button" varianta="fantoma" onClick={inchide}>
            Renunță
          </Buton>
          <Buton type="submit" varianta="succes" mare disabled={seTrimite}>
            {seTrimite ? "Se trimite..." : "Predă întâlnirea"}
          </Buton>
        </div>
      </form>
    </Modal>
  );
}

function DaNu({ valoare, schimba, nume }: { valoare: string; schimba: (v: "da" | "nu") => void; nume: string }) {
  return (
    <div className="flex gap-2">
      {(["da", "nu"] as const).map((v) => (
        <label
          key={v}
          className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-xl border text-sm sm:max-w-32 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-echipa-accent ${
            valoare === v ? "border-echipa-accent bg-echipa-accent/10 text-echipa-accent" : "border-echipa-line"
          }`}
        >
          <input type="radio" name={nume} className="sr-only" checked={valoare === v} onChange={() => schimba(v)} />
          {v === "da" ? "Da" : "Nu"}
        </label>
      ))}
    </div>
  );
}

function initial(lead: Lead) {
  return {
    data: "",
    format: "online" as "online" | "locatie",
    adresa: lead.adresa ?? "",
    decident_nume: lead.decident_nume ?? "",
    decident_functie: lead.decident_functie ?? "",
    decident_telefon: lead.decident_telefon ?? "",
    decident_email: lead.decident_email ?? "",
    demo: (lead.a_sunat_demo ? "da" : "") as "" | "da" | "nu",
    reactie: "",
    problema: "",
    altcineva: "" as "" | "da" | "nu",
    cine: "",
    notite: "",
  };
}
