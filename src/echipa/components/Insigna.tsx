import { INSIGNE } from "../config";
import { IconStea } from "./icons";

export default function Insigna({ cod, mare }: { cod: string; mare?: boolean }) {
  const info = INSIGNE[cod] ?? { titlu: cod, descriere: "" };
  return (
    <span
      title={info.descriere}
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 font-semibold text-amber-200 ${mare ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-[11px]"}`}
    >
      <IconStea className={mare ? "h-4 w-4" : "h-3 w-3"} />
      {info.titlu}
    </span>
  );
}
