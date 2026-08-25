"use client";

import { useState, type FormEvent } from "react";

const SERVICES = [
  { value: "google_maps_reviews", label: "Recenzii Google Maps" },
  { value: "google_maps_profile", label: "Optimizare profil Google Maps" },
  { value: "website", label: "Website" },
  { value: "social_media", label: "Profile social media (Instagram, Facebook, TikTok)" },
  { value: "ads", label: "Reclame organice și plătite" },
  { value: "altceva", label: "Altceva / nu știu exact" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function MarketingLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(value: string) {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedServices.length === 0) {
      setStatus("error");
      setErrorMessage("Alege cel puțin un serviciu.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      services: selectedServices,
      businessDescription: String(data.get("businessDescription") || ""),
    };

    try {
      const res = await fetch("/api/marketing-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "A apărut o eroare. Încearcă din nou.");
        return;
      }

      setStatus("success");
      form.reset();
      setSelectedServices([]);
    } catch {
      setStatus("error");
      setErrorMessage("Nu am putut trimite formularul. Verifică conexiunea și încearcă din nou.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-marketing-accent/30 bg-marketing-accent/10 p-6 text-center">
        <p className="text-lg font-semibold text-marketing-accent">
          Am primit cererea ta!
        </p>
        <p className="mt-2 text-sm text-white/70">
          Un coleg din echipa Elevio Marketing te contactează în cel mai scurt
          timp cu o ofertă pentru afacerea ta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mkt-name" className="block text-sm font-medium text-white">
          Nume
        </label>
        <input
          id="mkt-name"
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Numele tău"
          className="mt-1.5 w-full rounded-xl border border-marketing-border bg-marketing-surface px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-marketing-accent focus:outline-none focus:ring-2 focus:ring-marketing-accent/20"
        />
      </div>

      <div>
        <label htmlFor="mkt-phone" className="block text-sm font-medium text-white">
          Telefon
        </label>
        <input
          id="mkt-phone"
          name="phone"
          type="tel"
          required
          placeholder="07xx xxx xxx"
          className="mt-1.5 w-full rounded-xl border border-marketing-border bg-marketing-surface px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-marketing-accent focus:outline-none focus:ring-2 focus:ring-marketing-accent/20"
        />
      </div>

      <div>
        <label htmlFor="mkt-email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="mkt-email"
          name="email"
          type="email"
          required
          placeholder="tu@afacerea-ta.ro"
          className="mt-1.5 w-full rounded-xl border border-marketing-border bg-marketing-surface px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-marketing-accent focus:outline-none focus:ring-2 focus:ring-marketing-accent/20"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-white">
          Ce servicii te interesează?
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <label
              key={s.value}
              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
                selectedServices.includes(s.value)
                  ? "border-marketing-accent bg-marketing-accent/10 text-white"
                  : "border-marketing-border bg-marketing-surface text-white/70 hover:border-white/25"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(s.value)}
                onChange={() => toggleService(s.value)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#f5b700]"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="mkt-desc" className="block text-sm font-medium text-white">
          Spune-ne pe scurt despre afacerea ta
        </label>
        <textarea
          id="mkt-desc"
          name="businessDescription"
          rows={4}
          placeholder="Ex: Restaurant cu specific italian, vreau mai multe recenzii pe Google Maps..."
          className="mt-1.5 w-full resize-y rounded-xl border border-marketing-border bg-marketing-surface px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-marketing-accent focus:outline-none focus:ring-2 focus:ring-marketing-accent/20"
        />
        <p className="mt-1 text-xs text-white/45">
          Opțional — ne ajută să pregătim o ofertă potrivită pentru tine.
        </p>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-marketing-accent px-6 py-3.5 text-sm font-semibold text-marketing-bg shadow-lg shadow-marketing-accent/25 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Se trimite…" : "Cere ofertă"}
      </button>

      <p className="text-center text-xs text-white/45">
        Te contactăm doar pentru ofertă. Zero spam, zero newslettere.
      </p>
    </form>
  );
}
