import Link from "next/link";

export default function PromoBanner() {
  return (
    <Link
      href="/demo"
      className="block bg-elevio-accent px-4 py-2.5 text-center text-sm font-semibold text-elevio-dark transition-colors hover:bg-white"
    >
      Demo gratuit, fără obligații — plus prima săptămână{" "}
      <span className="underline">GRATUITĂ</span> dacă te înscrii până pe 31
      august.
    </Link>
  );
}
