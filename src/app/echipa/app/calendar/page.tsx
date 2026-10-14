import type { Metadata } from "next";
import Link from "next/link";
import { CALENDAR_URL } from "@/echipa/config";

export const metadata: Metadata = { title: "Programează întâlnirea" };

export default function CalendarPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Programează întâlnirea</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-echipa-muted">
          Întâlnirile de closing sunt <strong className="text-echipa-text">după-amiaza</strong>. Rezervă ora în calendar{" "}
          <strong className="text-echipa-text">în timp ce ești la telefon cu clientul</strong>, apoi completează predarea: pe lead, alegi
          statusul verde (Întâlnire programată).
        </p>
        <Link href="/echipa/app/leaduri" className="mt-3 inline-block text-sm text-echipa-accent hover:underline">
          Mergi la lead-uri, pentru predare
        </Link>
      </div>

      {CALENDAR_URL ? (
        <div className="overflow-hidden rounded-2xl border border-echipa-line bg-white">
          <iframe src={CALENDAR_URL} title="Calendarul de closing" className="h-[75vh] min-h-[560px] w-full" loading="lazy" />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-amber-500/50 bg-amber-500/5 p-6">
          <p className="font-semibold text-amber-200">Calendarul nu e setat încă</p>
          <p className="mt-2 text-sm text-echipa-muted">
            Linkul de Cal.com sau Google Calendar trebuie pus în configurare (variabila NEXT_PUBLIC_CALENDAR_URL din
            Netlify sau CALENDAR_URL din src/echipa/config.ts). Până atunci, cere linkul în grupul echipei.
          </p>
        </div>
      )}

      {CALENDAR_URL && (
        <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-echipa-accent hover:underline">
          Deschide calendarul într-o fereastră nouă
        </a>
      )}
    </div>
  );
}
