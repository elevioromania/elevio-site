import Link from "next/link";
import Section from "./Section";

const linkClass =
  "font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4";

/** „Cine suntem” pe paginile de produs: cine construiește Elevio AI și cu cine lucrăm. */
export default function AboutFounder() {
  return (
    <Section
      id="cine-suntem"
      eyebrow="Cine suntem"
      title="Cine construiește Elevio AI"
      intro={
        <>
          <p>
            Elevio AI e construit în București de{" "}
            <a href="https://www.linkedin.com/in/david-morega/" className={linkClass} rel="noopener" target="_blank">
              David Morega
            </a>
            , fondator. Configurăm fiecare asistent pe afacerea clientului: programul, serviciile, întrebările
            frecvente, regulile de transfer și calendarul.
          </p>
          <p>
            Lucrăm deja cu clinici stomatologice, un centru de kinetoterapie și restaurante. Clinicile cu care lucrăm
            au recuperat multe programări cu asistentul, deși aveau deja pe cineva la recepție. Mai multe despre noi,
            pe pagina{" "}
            <Link href="/despre" className={linkClass}>
              Despre
            </Link>
            .
          </p>
        </>
      }
    />
  );
}
