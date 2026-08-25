import Link from "next/link";
import MarketingLogo from "./MarketingLogo";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-marketing-border bg-marketing-bg text-white">
      <div className="container-elevio grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <MarketingLogo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Divizia de marketing Elevio — recenzii Google Maps, profile
            optimizate, site-uri web și social media, pentru afaceri locale.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Servicii</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link href="/marketing#servicii" className="hover:text-marketing-accent">
                Recenzii Google Maps
              </Link>
            </li>
            <li>
              <Link href="/marketing#servicii" className="hover:text-marketing-accent">
                Website și social media
              </Link>
            </li>
            <li>
              <Link href="/marketing#oferta" className="hover:text-marketing-accent">
                Cere ofertă
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Companie</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-marketing-accent">
                Elevio (recepționer AI)
              </Link>
            </li>
            <li>
              <a
                href="mailto:elevioromania@gmail.com"
                className="hover:text-marketing-accent"
              >
                elevioromania@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-marketing-border">
        <div className="container-elevio flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Elevio Marketing. Toate drepturile rezervate.</p>
          <p>Făcut cu grijă, în România.</p>
        </div>
      </div>
    </footer>
  );
}
