import type { Metadata } from "next";
import ListaFiltrabila from "@/echipa/components/ListaFiltrabila";
import { intrebari } from "@/echipa/lib/ghid";

export const metadata: Metadata = { title: "Întrebări frecvente" };

export default function IntrebariPage() {
  const { lista, categorii, notaGdpr } = intrebari();
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Întrebări frecvente</h1>
      <p className="mt-2 text-sm text-echipa-muted">Ce te întreabă decidenții și ce răspunzi.</p>
      <div className="mt-6">
        <ListaFiltrabila elemente={lista} filtre={categorii} tipFiltru="categorie" placeholder="Caută o întrebare (de ex. calendar, GDPR)" />
      </div>
      {notaGdpr && (
        <div className="mt-8 rounded-2xl border border-echipa-line bg-echipa-card-2 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-echipa-accent">Despre întrebările de GDPR</p>
          <div className="ghid-prose text-sm" dangerouslySetInnerHTML={{ __html: notaGdpr }} />
        </div>
      )}
    </div>
  );
}
