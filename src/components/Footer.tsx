import Link from "next/link";
import Logo from "./Logo";
import LegalFooterLinks from "./LegalFooterLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-elevio-dark text-white">
      <div className="container-elevio grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Rezervări preluate non-stop, inclusiv vineri seara, când tot
            personalul e în tură. Numărul de persoane, ora și numele, notate
            exact.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Produs</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-elevio-accent">
                Acasă
              </Link>
            </li>
            <li>
              <Link href="/preturi" className="hover:text-elevio-accent">
                Prețuri
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-elevio-accent">
                Demo gratuit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Soluții</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {[
              ["/agent-vocal-ai", "Agent vocal AI"],
              ["/receptioner-virtual", "Recepționer virtual"],
              ["/robot-telefonic-ai", "Robot telefonic AI"],
              ["/industrii", "Pe industrii"],
              ["/ghid", "Ghiduri"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-elevio-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Companie</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link href="/despre" className="hover:text-elevio-accent">
                Despre Elevio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-elevio-accent">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:elevioromania@gmail.com"
                className="hover:text-elevio-accent"
              >
                elevioromania@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-elevio py-6">
          <LegalFooterLinks />
          <p className="mt-4 text-xs text-white/50">
            Citești ghidurile noastre?{" "}
            <a
              href="https://google.com/preferences/source?q=elevio-agency.ro"
              target="_blank"
              rel="noopener"
              className="underline hover:text-elevio-accent"
            >
              Adaugă Elevio AI ca sursă preferată pe Google
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-elevio flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Elevio AI. Toate drepturile rezervate.</p>
          <p>Făcut cu grijă, în România.</p>
        </div>
      </div>
    </footer>
  );
}
