"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Buton, Camp, Mesaj } from "@/echipa/components/ui";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export default function FormularInscriere() {
  const router = useRouter();
  const [f, setF] = useState({ nume: "", email: "", telefon: "", parola: "", confirmare: "", cod: "" });
  const [eroare, setEroare] = useState("");
  const [seTrimite, setSeTrimite] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    if (f.nume.trim().length < 3) return setEroare("Scrie numele și prenumele.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return setEroare("Adresa de e-mail nu e validă.");
    if (f.telefon.replace(/\D/g, "").length < 9) return setEroare("Numărul de telefon nu e valid.");
    if (f.parola.length < 8) return setEroare("Parola trebuie să aibă minimum 8 caractere.");
    if (f.parola !== f.confirmare) return setEroare("Parolele nu coincid.");
    if (!f.cod.trim()) return setEroare("Scrie codul de invitație.");

    setSeTrimite(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.functions.invoke("inscriere", {
      body: { nume: f.nume, email: f.email, telefon: f.telefon, parola: f.parola, cod: f.cod },
    });

    if (error) {
      let mesaj = "Contul nu a putut fi creat. Încearcă din nou.";
      try {
        const corp = await (error as { context?: Response }).context?.json();
        if (corp?.eroare) mesaj = corp.eroare;
      } catch {
        // răspuns fără JSON: păstrăm mesajul general
      }
      setSeTrimite(false);
      return setEroare(mesaj);
    }

    const { error: eroareLogin } = await supabase.auth.signInWithPassword({ email: f.email.trim().toLowerCase(), password: f.parola });
    if (eroareLogin) {
      router.replace("/echipa/login");
      return;
    }
    router.replace("/echipa/app");
    router.refresh();
  }

  return (
    <form onSubmit={trimite} className="space-y-4" noValidate>
      {eroare && <Mesaj>{eroare}</Mesaj>}
      <Camp eticheta="Nume și prenume" htmlFor="nume" obligatoriu>
        <input id="nume" autoComplete="name" className="camp" value={f.nume} onChange={set("nume")} />
      </Camp>
      <Camp eticheta="E-mail" htmlFor="email" obligatoriu>
        <input id="email" type="email" autoComplete="email" className="camp" value={f.email} onChange={set("email")} />
      </Camp>
      <Camp eticheta="Telefon (WhatsApp)" htmlFor="telefon" obligatoriu>
        <input id="telefon" type="tel" autoComplete="tel" inputMode="tel" className="camp" placeholder="07xx xxx xxx" value={f.telefon} onChange={set("telefon")} />
      </Camp>
      <div className="grid gap-4 sm:grid-cols-2">
        <Camp eticheta="Parolă" htmlFor="parola" obligatoriu ajutor="Minimum 8 caractere.">
          <input id="parola" type="password" autoComplete="new-password" className="camp" value={f.parola} onChange={set("parola")} />
        </Camp>
        <Camp eticheta="Confirmă parola" htmlFor="confirmare" obligatoriu>
          <input id="confirmare" type="password" autoComplete="new-password" className="camp" value={f.confirmare} onChange={set("confirmare")} />
        </Camp>
      </div>
      <Camp eticheta="Cod de invitație" htmlFor="cod" obligatoriu>
        <input id="cod" autoComplete="off" autoCapitalize="off" className="camp" value={f.cod} onChange={set("cod")} />
      </Camp>
      <Buton type="submit" mare className="w-full" disabled={seTrimite}>
        {seTrimite ? "Se creează contul..." : "Creează contul"}
      </Buton>
      <p className="text-center text-sm text-echipa-muted">
        Ai deja cont?{" "}
        <Link href="/echipa/login" className="text-echipa-accent underline-offset-2 hover:underline">
          Intră aici
        </Link>
      </p>
    </form>
  );
}
