"use client";

import { useCallback, useState } from "react";
import { useProfil } from "@/echipa/components/ProfilContext";
import { Buton, Camp, Card, Mesaj, TitluPagina } from "@/echipa/components/ui";
import { dataOra, dinInputLocal, relativ } from "@/echipa/lib/format";
import { useIncarca } from "@/echipa/lib/hooks";
import { supabaseBrowser } from "@/echipa/lib/supabase-browser";
import type { Sesiune } from "../../comunitate/Comunitate";

type Anunt = { id: string; text: string; activ: boolean; creat_la: string };

export default function Sesiuni() {
  const { profil } = useProfil();
  const [sesiuni, setSesiuni] = useState<Sesiune[]>([]);
  const [anunturi, setAnunturi] = useState<Anunt[]>([]);
  const [s, setS] = useState({ titlu: "Power hour", incepe_la: "", link: "", locatie: "", descriere: "" });
  const [text, setText] = useState("");
  const [mesaj, setMesaj] = useState<{ tip: "eroare" | "succes"; text: string } | null>(null);

  const incarca = useCallback(async () => {
    const supabase = supabaseBrowser();
    const [a, b] = await Promise.all([
      supabase.from("sesiuni").select("id, titlu, incepe_la, link, locatie, descriere").order("incepe_la", { ascending: false }).limit(50),
      supabase.from("anunturi").select("id, text, activ, creat_la").order("creat_la", { ascending: false }).limit(50),
    ]);
    setSesiuni((a.data as Sesiune[]) ?? []);
    setAnunturi((b.data as Anunt[]) ?? []);
  }, []);
  useIncarca(incarca);

  async function adaugaSesiune(e: React.FormEvent) {
    e.preventDefault();
    if (!s.titlu.trim() || !s.incepe_la) return setMesaj({ tip: "eroare", text: "Completează titlul, data și ora." });
    const { error } = await supabaseBrowser()
      .from("sesiuni")
      .insert({
        titlu: s.titlu.trim(),
        incepe_la: dinInputLocal(s.incepe_la),
        link: s.link.trim() || null,
        locatie: s.locatie.trim() || null,
        descriere: s.descriere.trim() || null,
        creat_de: profil.id,
      });
    setMesaj(error ? { tip: "eroare", text: "Nu am putut salva sesiunea." } : { tip: "succes", text: "Sesiunea a fost adăugată." });
    if (!error) setS({ titlu: "Power hour", incepe_la: "", link: "", locatie: "", descriere: "" });
    incarca();
  }

  async function stergeSesiune(id: string) {
    if (!confirm("Ștergi sesiunea?")) return;
    await supabaseBrowser().from("sesiuni").delete().eq("id", id);
    incarca();
  }

  async function adaugaAnunt(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const { error } = await supabaseBrowser().from("anunturi").insert({ text: text.trim(), creat_de: profil.id });
    setMesaj(error ? { tip: "eroare", text: "Nu am putut publica anunțul." } : { tip: "succes", text: "Anunțul apare sus în tabloul de bord al tuturor." });
    if (!error) setText("");
    incarca();
  }

  async function comutaAnunt(a: Anunt) {
    await supabaseBrowser().from("anunturi").update({ activ: !a.activ }).eq("id", a.id);
    incarca();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <TitluPagina titlu="Sesiuni și anunțuri" />
      {mesaj && <Mesaj tip={mesaj.tip}>{mesaj.text}</Mesaj>}

      <section>
        <h2 className="mb-3 text-lg font-bold">Anunțuri</h2>
        <Card>
          <form onSubmit={adaugaAnunt} className="space-y-3">
            <Camp eticheta="Anunț nou (apare sus în tabloul de bord al tuturor)" htmlFor="anunt-text">
              <textarea id="anunt-text" rows={2} className="camp" value={text} onChange={(e) => setText(e.target.value)} />
            </Camp>
            <Buton type="submit" disabled={!text.trim()}>
              Publică anunțul
            </Buton>
          </form>
          {anunturi.length > 0 && (
            <ul className="mt-4 divide-y divide-echipa-line/60 border-t border-echipa-line/60">
              {anunturi.map((a) => (
                <li key={a.id} className={`flex flex-wrap items-center justify-between gap-2 py-3 ${a.activ ? "" : "opacity-50"}`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-echipa-muted">{relativ(a.creat_la)}</p>
                  </div>
                  <Buton varianta="fantoma" onClick={() => comutaAnunt(a)}>
                    {a.activ ? "Ascunde" : "Arată din nou"}
                  </Buton>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Sesiuni de apeluri în grup</h2>
        <Card>
          <form onSubmit={adaugaSesiune} className="grid gap-3 sm:grid-cols-2">
            <Camp eticheta="Titlu" htmlFor="s-titlu" obligatoriu>
              <input id="s-titlu" className="camp" value={s.titlu} onChange={(e) => setS({ ...s, titlu: e.target.value })} />
            </Camp>
            <Camp eticheta="Data și ora" htmlFor="s-data" obligatoriu>
              <input id="s-data" type="datetime-local" className="camp" value={s.incepe_la} onChange={(e) => setS({ ...s, incepe_la: e.target.value })} />
            </Camp>
            <Camp eticheta="Link (Zoom, Google Meet)" htmlFor="s-link">
              <input id="s-link" type="url" className="camp" value={s.link} onChange={(e) => setS({ ...s, link: e.target.value })} />
            </Camp>
            <Camp eticheta="Locație (dacă e fizic)" htmlFor="s-loc">
              <input id="s-loc" className="camp" value={s.locatie} onChange={(e) => setS({ ...s, locatie: e.target.value })} />
            </Camp>
            <Camp eticheta="Descriere" htmlFor="s-desc" className="sm:col-span-2">
              <input id="s-desc" className="camp" value={s.descriere} onChange={(e) => setS({ ...s, descriere: e.target.value })} />
            </Camp>
            <div className="sm:col-span-2">
              <Buton type="submit">Adaugă sesiunea</Buton>
            </div>
          </form>
          {sesiuni.length > 0 && (
            <ul className="mt-4 divide-y divide-echipa-line/60 border-t border-echipa-line/60">
              {sesiuni.map((x) => (
                <li key={x.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <p className="text-sm font-semibold">{x.titlu}</p>
                    <p className="text-xs text-echipa-muted">
                      {dataOra(x.incepe_la)}
                      {x.locatie ? `, ${x.locatie}` : ""}
                      {x.link ? `, ${x.link}` : ""}
                    </p>
                  </div>
                  <Buton varianta="fantoma" onClick={() => stergeSesiune(x.id)}>
                    Șterge
                  </Buton>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
