import RichText from "./RichText";

/**
 * Tabel de comparație, în stilul PriceAnchor. Prima coloană e eticheta rândului;
 * `highlight` marchează coloana (index) pe care vrem s-o scoatem în evidență.
 */
export default function CompareTable({
  head,
  rows,
  caption,
  highlight,
  minWidth = 560,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  highlight?: number;
  minWidth?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-elevio-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm" style={{ minWidth }}>
          {caption && (
            <caption className="px-5 pt-4 text-left text-xs text-elevio-dark/50">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="border-b border-elevio-border text-xs font-semibold uppercase tracking-wide text-elevio-dark/50">
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-5 py-4 align-bottom ${i === highlight ? "text-elevio-primary" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-elevio-border/60 align-top last:border-0">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-5 py-4 font-medium text-elevio-dark">
                      <RichText text={cell} />
                    </th>
                  ) : (
                    <td
                      key={i}
                      className={`px-5 py-4 ${
                        i === highlight ? "font-medium text-elevio-dark" : "text-elevio-dark/65"
                      }`}
                    >
                      <RichText text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
