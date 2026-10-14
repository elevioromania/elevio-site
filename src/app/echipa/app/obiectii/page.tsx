import type { Metadata } from "next";
import ListaFiltrabila from "@/echipa/components/ListaFiltrabila";
import { obiectii } from "@/echipa/lib/ghid";

export const metadata: Metadata = { title: "Obiecții" };

export default function ObiectiiPage() {
  const { intro, lista } = obiectii();
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Obiecții și cum le răspunzi</h1>
      {intro && <div className="ghid-prose mt-3" dangerouslySetInnerHTML={{ __html: intro }} />}
      <div className="mt-6">
        <ListaFiltrabila elemente={lista} filtre={lista.map((o) => o.titlu)} tipFiltru="element" placeholder="Caută o obiecție (de ex. preț, recepționeră)" />
      </div>
    </div>
  );
}
