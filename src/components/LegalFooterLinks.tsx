import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/confidentialitate", label: "Confidențialitate" },
  { href: "/cookies", label: "Cookie-uri" },
  { href: "/termeni", label: "Termeni și condiții" },
];

function AnpcSalBadge() {
  return (
    <a
      href="https://anpc.ro/ce-este-sal/"
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="ANPC — Soluționarea alternativă a litigiilor"
      className="inline-flex h-[50px] w-[250px] items-center gap-3 rounded-md border border-white/20 bg-white px-3 text-left transition-opacity hover:opacity-90"
    >
      <span className="rounded bg-[#1d3c88] px-1.5 py-1 text-xs font-extrabold tracking-wide text-white">
        ANPC
      </span>
      <span className="text-[10px] font-bold uppercase leading-tight text-[#1d3c88]">
        Soluționarea alternativă
        <br />a litigiilor
      </span>
    </a>
  );
}

export default function LegalFooterLinks({
  hoverClass = "hover:text-elevio-accent",
}: {
  hoverClass?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/50">
        {LEGAL_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={hoverClass}>
            {l.label}
          </Link>
        ))}
      </nav>
      <AnpcSalBadge />
    </div>
  );
}
