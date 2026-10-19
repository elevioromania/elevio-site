"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import FormularLead, { curata, dateGoale } from "@/echipa/components/FormularLead";
import { IconInapoi } from "@/echipa/components/icons";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Buton, Card, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { areMero, areTelefon } from "@/echipa/lib/curatenie";
import { MESAJ_DUPLICAT, mesajEroare } from "@/echipa/lib/leaduri";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";

export default function LeadNou() {
  const router = useRouter();
  const { profil, esteAdmin } = useProfil();
  const [oameni, setOameni] = useState<{ id: string; nume: string }[]>([]);
  const [cui, setCui] = useState(profil.id);
  const incarcaOameni = useCallback(async () => {
    if (!esteAdmin) return;
    const { data } = await supabaseBrowser().from("profiles").select("id, nume").eq("activ", true).order("nume");
    setOameni(data ?? []);
  }, [esteAdmin]);
  useIncarca(incarcaOameni);
  const [date, setDate] = useState(dateGoale());
  const [eroare, setEroare] = useState("");
  const [seSalveaza, setSeSalveaza] = useState(false);

  async function salveaza(e: React.FormEvent) {
    e.preventDefault();
    setEroare("");
    if (!date.afacere.trim()) return setEroare("Scrie numele afacerii.");
    if (!areTelefon(date)) return setEroare("Adaugă un număr de telefon. Fără telefon lead-ul nu poate fi sunat.");
    if (areMero(date.site)) return setEroare("Afacerea folosește deja Mero, așa că nu e un lead potrivit pentru noi.");
    setSeSalveaza(true);
    const supabase = supabaseBrowser();

    // Verificare pe server: răspunde doar dacă lead-ul există, fără să spună al cui e.
    const { data: exista, error: eroareVerificare } = await supabase.rpc("verifica_duplicat", {
      p_telefon: date.telefon_afacere,
      p_afacere: date.afacere,
      p_oras: date.oras,
    });
    if (eroareVerificare) {
      setSeSalveaza(false);
      return setEroare(mesajEroare(eroareVerificare));
    }
    if (exista) {
      setSeSalveaza(false);
      return setEroare(MESAJ_DUPLICAT);
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({ ...curata(date), vanzator_id: esteAdmin ? cui || null : profil.id, sursa: esteAdmin ? "alocat" : "adaugat_de_vanzator" })
      .select("id")
      .single();
    setSeSalveaza(false);
    if (error) return setEroare(mesajEroare(error));
    router.replace(`/echipa/app/leaduri/${data.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/echipa/app/leaduri" className="mb-4 inline-flex items-center gap-1.5 text-sm text-echipa-muted hover:text-echipa-accent">
        <IconInapoi className="h-4 w-4" /> Lead-urile mele
      </Link>
      <TitluPagina titlu="Adaugă un lead" subtitlu="Verificăm automat să nu fie deja la altcineva din echipă." />
      <form onSubmit={salveaza} noValidate>
        <Card>
          {esteAdmin && (
            <div className="mb-6">
              <label htmlFor="lead-cui" className="mb-1.5 block text-sm font-medium">
                Atribuie lui
              </label>
              <select id="lead-cui" className="camp" value={cui} onChange={(e) => setCui(e.target.value)}>
                <option value="">Nealocat</option>
                {oameni.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.nume}
                  </option>
                ))}
              </select>
            </div>
          )}
          <FormularLead date={date} schimba={setDate} />
        </Card>
        {eroare && (
          <div className="mt-4">
            <Mesaj>{eroare}</Mesaj>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <Buton type="submit" mare disabled={seSalveaza} className="w-full sm:w-auto">
            {seSalveaza ? "Se verifică..." : "Salvează lead-ul"}
          </Buton>
        </div>
      </form>
    </div>
  );
}
