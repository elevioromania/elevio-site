import Link from "next/link";

function LayersMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 84" className={className} aria-hidden="true">
      <polygon points="16,58 50,44 84,58 50,72" fill="#33363b" />
      <polygon points="16,42 50,28 84,42 50,56" fill="#63676d" />
      <polygon points="16,26 50,12 84,26 50,40" fill="#9aa0a6" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 text-2xl font-extrabold tracking-tight ${className}`}
    >
      <LayersMark className="h-10 w-11 shrink-0" />
      <span className="text-logo-gradient">Elevio</span>
    </Link>
  );
}
