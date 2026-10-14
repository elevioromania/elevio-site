"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconUtilizatori } from "@/echipa/components/icons";
import { Buton, Camp, LinkButon, Mesaj } from "@/echipa/components/ui";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export default function FormularLogin({ dezactivat }: { dezactivat: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");
  const [seTrimite, setSeTrimite] = useState(false);

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    setSeTrimite(true);
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email: email.trim(), password: parola });
    if (error) {
      setSeTrimite(false);
      setEroare(
        /banned/i.test(error.message)
          ? "Contul tău e dezactivat. Vorbește cu David."
          : "E-mailul sau parola nu sunt corecte.",
      );
      return;
    }
    router.replace("/echipa/app");
    router.refresh();
  }

  return (
    <form onSubmit={trimite} className="space-y-4" noValidate>
      {dezactivat && <Mesaj>Contul tău e dezactivat. Vorbește cu David.</Mesaj>}
      {eroare && <Mesaj>{eroare}</Mesaj>}
      <Camp eticheta="E-mail" htmlFor="email">
        <input id="email" type="email" autoComplete="email" required className="camp" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Camp>
      <Camp eticheta="Parolă" htmlFor="parola">
        <input id="parola" type="password" autoComplete="current-password" required className="camp" value={parola} onChange={(e) => setParola(e.target.value)} />
      </Camp>
      <Buton type="submit" mare className="w-full" disabled={seTrimite || !email || !parola}>
        {seTrimite ? "Se verifică..." : "Intră"}
      </Buton>
      <div className="pt-1 text-center text-sm">
        <Link href="/echipa/resetare" className="text-echipa-muted underline-offset-2 hover:text-echipa-accent hover:underline">
          Am uitat parola
        </Link>
      </div>

      <div className="border-t border-echipa-line/70 pt-5">
        <p className="mb-3 text-center text-sm text-echipa-muted">Nu ai cont încă?</p>
        <LinkButon href="/echipa/inscriere" varianta="secundar" mare className="w-full">
          <IconUtilizatori className="h-5 w-5 text-echipa-accent" />
          Înscrie-te cu codul de invitație
        </LinkButon>
      </div>
    </form>
  );
}
