import Link from "next/link";

function LayersMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 84" className={className} aria-hidden="true">
      <polygon points="16,58 50,44 84,58 50,72" fill="#8a6a12" />
      <polygon points="16,42 50,28 84,42 50,56" fill="#c99a1a" />
      <polygon points="16,26 50,12 84,26 50,40" fill="#f5b700" />
    </svg>
  );
}

export default function MarketingLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/marketing"
      className={`flex items-center gap-2.5 text-2xl font-extrabold tracking-tight ${className}`}
    >
      <LayersMark className="h-10 w-11 shrink-0" />
      <span className="text-white">
        Elevio <span className="text-marketing-accent">Marketing</span>
      </span>
    </Link>
  );
}
