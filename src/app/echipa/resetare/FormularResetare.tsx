"use client";

import Link from "next/link";
import { useState } from "react";
import { Buton, Camp, Mesaj } from "@/echipa/components/ui";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export default function FormularResetare() {
  const [email, setEmail] = useState("");
  const [trimis, setTrimis] = useState(false);
  const [eroare, setEroare] = useState("");
  const [seTrimite, setSeTrimite] = useState(false);

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    setSeTrimite(true);
    const { error } = await supabaseBrowser().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/echipa/parola-noua`,
    });
    setSeTrimite(false);
    if (error) {
      setEroare(/rate|limit/i.test(error.message) ? "Prea multe încercări. Mai încearcă peste o oră." : "Nu am putut trimite e-mailul. Încearcă din nou.");
      return;
    }
    setTrimis(true);
  }

  if (trimis) {
    return (
      <div className="space-y-4">
        <Mesaj tip="succes">
          Dacă există un cont cu adresa asta, ai primit un e-mail cu linkul de resetare. Deschide-l în același browser.
        </Mesaj>
        <Link href="/echipa/login" className="block text-center text-sm text-echipa-accent hover:underline">
          Înapoi la login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={trimite} className="space-y-4" noValidate>
      {eroare && <Mesaj>{eroare}</Mesaj>}
      <Camp eticheta="E-mail" htmlFor="email">
        <input id="email" type="email" autoComplete="email" className="camp" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Camp>
      <Buton type="submit" mare className="w-full" disabled={seTrimite || !email}>
        {seTrimite ? "Se trimite..." : "Trimite linkul"}
      </Buton>
      <Link href="/echipa/login" className="block text-center text-sm text-echipa-muted hover:text-echipa-accent">
        Înapoi la login
      </Link>
    </form>
  );
}
