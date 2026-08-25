import Link from "next/link";
import MarketingLogo from "./MarketingLogo";

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-marketing-border bg-marketing-bg/95 backdrop-blur">
      <div className="container-elevio flex h-16 items-center justify-between">
        <MarketingLogo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/marketing#servicii"
            className="text-sm font-medium text-white/75 transition-colors hover:text-marketing-accent"
          >
            Servicii
          </Link>
          <Link
            href="/marketing#cum-lucram"
            className="text-sm font-medium text-white/75 transition-colors hover:text-marketing-accent"
          >
            Cum lucrăm
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            ← Elevio
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/marketing#oferta"
            className="rounded-full bg-marketing-accent px-5 py-2.5 text-sm font-semibold text-marketing-bg shadow-sm transition-colors hover:bg-white"
          >
            Cere ofertă
          </Link>
        </div>

        <Link
          href="/marketing#oferta"
          className="rounded-full bg-marketing-accent px-4 py-2 text-sm font-semibold text-marketing-bg md:hidden"
        >
          Cere ofertă
        </Link>
      </div>
    </header>
  );
}
