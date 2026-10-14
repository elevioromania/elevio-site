import { STATUSURI, type Status } from "../config";

// Statusul apare mereu cu text, nu doar cu culoare.
export default function StatusBadge({ status, mic }: { status: Status; mic?: boolean }) {
  const s = STATUSURI[status];
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border font-semibold ${mic ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
      style={{ borderColor: `${s.hex}66`, backgroundColor: `${s.hex}1f`, color: s.hex === "#71717A" ? "#A1A1AA" : s.hex }}
      title={`${s.culoare}: ${s.descriere}`}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.hex }} aria-hidden="true" />
      <span className="truncate">{s.eticheta}</span>
    </span>
  );
}
