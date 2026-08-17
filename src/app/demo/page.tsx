import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Demo gratuit — Elevio",
  description:
    "Cere un demo gratuit și primești pe email o mostră audio de la Elevio, recepționerul vocal AI.",
};

const VALID_TYPES = new Set([
  "restaurant",
  "magazin",
  "service_auto",
  "medical",
  "beauty",
  "altul",
]);

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const tipRaw = Array.isArray(params.tip) ? params.tip[0] : params.tip;
  const defaultBusinessType = tipRaw && VALID_TYPES.has(tipRaw) ? tipRaw : "";

  return (
    <>
      <PageIntro
        eyebrow="Demo gratuit"
        title="Ascultă-l tu însuți. Apoi decide."
        text="Completează formularul și primești pe email o mostră audio Elevio — auzi cum ar răspunde clienților afacerii tale. Fără obligații."
      />

      <section className="py-16">
        <div className="container-elevio grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-elevio-dark">
              Ce se întâmplă după ce trimiți formularul?
            </h2>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elevio-primary text-sm font-bold text-white">
                  1
                </span>
                <p className="text-sm leading-relaxed text-elevio-dark/70">
                  Salvăm datele tale și îți trimitem imediat pe email o
                  mostră audio Elevio, adaptată pe domeniul ales mai jos.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elevio-primary text-sm font-bold text-white">
                  2
                </span>
                <p className="text-sm leading-relaxed text-elevio-dark/70">
                  Asculți cum ar suna Elevio dacă ar răspunde la telefon
                  pentru afacerea ta — direct din inbox, în ritmul tău.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elevio-primary text-sm font-bold text-white">
                  3
                </span>
                <p className="text-sm leading-relaxed text-elevio-dark/70">
                  Dacă vrei să continui, un coleg din echipa Elevio te sună cu
                  detalii pentru configurarea exactă pe afacerea ta — exact
                  cum am făcut pentru Clypt România, care a salvat deja peste
                  2.000€ cu Elevio.
                </p>
              </li>
            </ol>
          </div>

          <div className="rounded-3xl border border-elevio-border bg-white p-6 shadow-xl shadow-elevio-primary/10 sm:p-8">
            <LeadForm defaultBusinessType={defaultBusinessType} />
          </div>
        </div>
      </section>
    </>
  );
}
