import type { Replica } from "@/lib/industrii";

// Transcriptul unui apel-exemplu, în stilul CallDemoCard, randat pe server.
export default function ScenariuApel({
  eticheta,
  replici,
}: {
  eticheta: string;
  replici: Replica[];
}) {
  return (
    <figure className="w-full rounded-3xl border border-elevio-border bg-white p-5 shadow-xl shadow-elevio-accent/20 sm:p-6">
      <figcaption className="flex items-center justify-between gap-3 border-b border-elevio-border pb-4">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-elevio-dark/60">
            Transcript · {eticheta}
          </span>
        </span>
        <span className="rounded-full bg-elevio-secondary/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-elevio-dark/60">
          Exemplu
        </span>
      </figcaption>

      <ol className="mt-4 space-y-3">
        {replici.map((r, i) => {
          if (r.cine === "sistem") {
            return (
              <li
                key={i}
                className="flex items-center gap-2 rounded-xl border border-dashed border-elevio-border bg-elevio-bg px-3 py-2 text-xs font-medium text-elevio-dark/70"
              >
                <span className="text-emerald-600" aria-hidden="true">
                  ●
                </span>
                {r.text}
              </li>
            );
          }
          const eElevio = r.cine === "elevio";
          return (
            <li
              key={i}
              className={`flex ${eElevio ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[88%]">
                <span
                  className={`mb-1 block text-[10px] font-bold uppercase tracking-wide text-elevio-dark/40 ${
                    eElevio ? "text-right" : ""
                  }`}
                >
                  {eElevio ? "Elevio AI" : "Client"}
                </span>
                <p
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                    eElevio
                      ? "bg-[linear-gradient(135deg,var(--color-elevio-accent),#0ea5e9)] text-white"
                      : "bg-elevio-secondary/40 text-elevio-dark"
                  }`}
                >
                  {r.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
