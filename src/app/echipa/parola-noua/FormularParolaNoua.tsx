"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Buton, Camp, Incarcare, Mesaj } from "@/echipa/components/ui";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export default function FormularParolaNoua({ cod }: { cod: string | null }) {
  const router = useRouter();
  const [stare, setStare] = useState<"verific" | "gata" | "invalid">("verific");
  const [parola, setParola] = useState("");
  const [confirmare, setConfirmare] = useState("");
  const [eroare, setEroare] = useState("");
  const [seTrimite, setSeTrimite] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    (async () => {
      if (cod) {
        const { error } = await supabase.auth.exchangeCodeForSession(cod);
        if (!error) return setStare("gata");
      }
      const { data } = await supabase.auth.getSession();
      setStare(data.session ? "gata" : "invalid");
    })();
  }, [cod]);

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    if (parola.length < 8) return setEroare("Parola trebuie să aibă minimum 8 caractere.");
    if (parola !== confirmare) return setEroare("Parolele nu coincid.");
    setSeTrimite(true);
    const { error } = await supabaseBrowser().auth.updateUser({ password: parola });
    setSeTrimite(false);
    if (error) return setEroare("Parola nu a putut fi schimbată. Alege alta și încearcă din nou.");
    router.replace("/echipa/app");
    router.refresh();
  }

  if (stare === "verific") return <Incarcare text="Verific linkul..." />;
  if (stare === "invalid") {
    return (
      <div className="space-y-4">
        <Mesaj>
          Linkul nu mai e valid. Cere unul nou și deschide-l în același browser în care l-ai cerut.
        </Mesaj>
        <Link href="/echipa/resetare" className="block text-center text-sm text-echipa-accent hover:underline">
          Cere un link nou
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={trimite} className="space-y-4" noValidate>
      {eroare && <Mesaj>{eroare}</Mesaj>}
      <Camp eticheta="Parola nouă" htmlFor="parola" ajutor="Minimum 8 caractere.">
        <input id="parola" type="password" autoComplete="new-password" className="camp" value={parola} onChange={(e) => setParola(e.target.value)} />
      </Camp>
      <Camp eticheta="Confirmă parola" htmlFor="confirmare">
        <input id="confirmare" type="password" autoComplete="new-password" className="camp" value={confirmare} onChange={(e) => setConfirmare(e.target.value)} />
      </Camp>
      <Buton type="submit" mare className="w-full" disabled={seTrimite}>
        {seTrimite ? "Se salvează..." : "Salvează parola"}
      </Buton>
    </form>
  );
}
