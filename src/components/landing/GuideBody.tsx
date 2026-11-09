import CompareTable from "./CompareTable";
import RichText from "./RichText";
import type { Bloc, SectiuneGhid } from "./types";

const NOTA_STIL: Record<"info" | "exemplu" | "atentie", { box: string; label: string }> = {
  info: { box: "border-elevio-border bg-elevio-secondary/40", label: "De reținut" },
  exemplu: { box: "border-amber-200 bg-amber-50", label: "Exemplu ilustrativ" },
  atentie: { box: "border-rose-200 bg-rose-50", label: "Atenție" },
};

function BlocView({ bloc }: { bloc: Bloc }) {
  switch (bloc.tip) {
    case "p":
      return (
        <p className="leading-relaxed text-elevio-dark/75">
          <RichText text={bloc.text} />
        </p>
      );
    case "h3":
      return <h3 className="pt-2 text-xl font-bold text-elevio-dark">{bloc.text}</h3>;
    case "lista": {
      const Tag = bloc.numerotata ? "ol" : "ul";
      return (
        <Tag
          className={`space-y-2 pl-5 leading-relaxed text-elevio-dark/75 marker:text-elevio-primary ${
            bloc.numerotata ? "list-decimal" : "list-disc"
          }`}
        >
          {bloc.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "tabel":
      return (
        <figure className="space-y-3">
          <CompareTable head={bloc.cap} rows={bloc.randuri} caption={bloc.legenda} />
          {bloc.nota && (
            <figcaption className="text-xs leading-relaxed text-elevio-dark/55">
              <RichText text={bloc.nota} />
            </figcaption>
          )}
        </figure>
      );
    case "nota": {
      const stil = NOTA_STIL[bloc.ton];
      return (
        <aside className={`rounded-2xl border p-5 ${stil.box}`}>
          <p className="text-xs font-bold uppercase tracking-wide text-elevio-dark/60">
            {bloc.titlu ?? stil.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-elevio-dark/80">
            <RichText text={bloc.text} />
          </p>
        </aside>
      );
    }
  }
}

/** Conținutul unui ghid: cuprins + secțiuni cu H2. */
export default function GuideBody({ sectiuni }: { sectiuni: SectiuneGhid[] }) {
  return (
    <div className="container-elevio py-14">
      <div className="mx-auto max-w-3xl">
        <nav
          aria-label="Cuprins"
          className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-elevio-primary">Cuprins</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-elevio-dark/75 marker:text-elevio-dark/40">
            {sectiuni.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-elevio-primary hover:underline">
                  {s.titlu}
                </a>
              </li>
            ))}
            <li>
              <a href="#intrebari-frecvente" className="hover:text-elevio-primary hover:underline">
                Întrebări frecvente
              </a>
            </li>
          </ol>
        </nav>

        {sectiuni.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 pt-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight text-elevio-dark sm:text-3xl">
              {s.titlu}
            </h2>
            <div className="mt-5 space-y-5">
              {s.blocuri.map((b, i) => (
                <BlocView key={i} bloc={b} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
