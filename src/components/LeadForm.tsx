"use client";

import { useState, type FormEvent } from "react";

const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant / cafenea" },
  { value: "magazin", label: "Magazin" },
  { value: "service_auto", label: "Service auto" },
  { value: "altul", label: "Alt domeniu" },
];

type Status = "idle" | "loading" | "success-audio" | "success-saved" | "error";

export default function LeadForm({
  defaultBusinessType = "",
}: {
  defaultBusinessType?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      businessType: String(data.get("businessType") || ""),
      businessDescription: String(data.get("businessDescription") || ""),
    };

    try {
      const res = await fetch("/api/lead", {
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

      setStatus(result.audioEmailSent ? "success-audio" : "success-saved");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Nu am putut trimite formularul. Verifică conexiunea și încearcă din nou.");
    }
  }

  if (status === "success-audio") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">
          Verifică-ți emailul!
        </p>
        <p className="mt-2 text-sm text-emerald-700">
          Ți-am trimis o mostră audio Elevio, ca să auzi cum sună o
          demonstrație. Un coleg din echipa Elevio te contactează în curând
          cu detalii pentru afacerea ta.
        </p>
      </div>
    );
  }

  if (status === "success-saved") {
    return (
      <div className="rounded-2xl border border-elevio-secondary bg-elevio-secondary/30 p-6 text-center">
        <p className="text-lg font-semibold text-elevio-dark">
          Am primit cererea ta!
        </p>
        <p className="mt-2 text-sm text-elevio-dark/70">
          Un coleg din echipa Elevio te contactează în cel mai scurt timp cu
          o mostră audio și toate detaliile pentru afacerea ta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-elevio-dark">
          Nume
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Numele tău"
          className="mt-1.5 w-full rounded-xl border border-elevio-border bg-white px-4 py-3 text-sm text-elevio-dark placeholder:text-elevio-dark/35 focus:border-elevio-primary focus:outline-none focus:ring-2 focus:ring-elevio-primary/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-elevio-dark">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="07xx xxx xxx"
          className="mt-1.5 w-full rounded-xl border border-elevio-border bg-white px-4 py-3 text-sm text-elevio-dark placeholder:text-elevio-dark/35 focus:border-elevio-primary focus:outline-none focus:ring-2 focus:ring-elevio-primary/20"
        />
        <p className="mt-1 text-xs text-elevio-dark/45">
          Un coleg din echipa Elevio te poate suna pentru detalii.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-elevio-dark">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@afacerea-ta.ro"
          className="mt-1.5 w-full rounded-xl border border-elevio-border bg-white px-4 py-3 text-sm text-elevio-dark placeholder:text-elevio-dark/35 focus:border-elevio-primary focus:outline-none focus:ring-2 focus:ring-elevio-primary/20"
        />
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-elevio-dark">
          Tipul afacerii
        </label>
        <select
          id="businessType"
          name="businessType"
          required
          defaultValue={defaultBusinessType}
          className="mt-1.5 w-full rounded-xl border border-elevio-border bg-white px-4 py-3 text-sm text-elevio-dark focus:border-elevio-primary focus:outline-none focus:ring-2 focus:ring-elevio-primary/20"
        >
          <option value="" disabled>
            Alege tipul afacerii
          </option>
          {BUSINESS_TYPES.map((bt) => (
            <option key={bt.value} value={bt.value}>
              {bt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="businessDescription" className="block text-sm font-medium text-elevio-dark">
          Spune-ne pe scurt despre afacerea ta
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          rows={4}
          placeholder="Ex: Restaurant cu specific italian, 40 de locuri, program 12-23..."
          className="mt-1.5 w-full resize-y rounded-xl border border-elevio-border bg-white px-4 py-3 text-sm text-elevio-dark placeholder:text-elevio-dark/35 focus:border-elevio-primary focus:outline-none focus:ring-2 focus:ring-elevio-primary/20"
        />
        <p className="mt-1 text-xs text-elevio-dark/45">
          Opțional — ne ajută să configurăm agentul potrivit pentru tine.
        </p>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-elevio-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-elevio-primary/25 transition-colors hover:bg-elevio-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Se trimite…" : "Vreau demo"}
      </button>

      <p className="text-center text-xs text-elevio-dark/45">
        Te contactăm doar pentru demo. Zero spam, zero newslettere.
      </p>
    </form>
  );
}
