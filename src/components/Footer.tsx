import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-elevio-dark text-white">
      <div className="container-elevio grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Recepționer vocal AI în limba română, disponibil 24/7. Niciun apel
            ratat, niciun client pierdut. Elevio răspunde cald, natural, și
            nu improvizează niciodată — transferă apelul direct pe telefonul
            tău, în câteva secunde, când e nevoie.
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
        <div className="container-elevio flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Elevio. Toate drepturile rezervate.</p>
          <p>Făcut cu grijă, în România.</p>
        </div>
      </div>
    </footer>
  );
}
