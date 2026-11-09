import Link from "next/link";
import type { ReactNode } from "react";

// Markup minimal pentru texte din date: [text](/ruta) și **bold**.
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** Textul fără markup (pentru JSON-LD și alte locuri unde nu avem HTML). */
export function plainText(text: string): string {
  return text.replace(
    TOKEN,
    (_m, label: string | undefined, _href: string | undefined, bold: string | undefined) =>
      label ?? bold ?? "",
  );
}

const linkClass =
  "font-semibold text-elevio-primary underline decoration-elevio-accent decoration-2 underline-offset-4 hover:text-elevio-dark";

export default function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;

  for (const m of text.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const [, label, href, bold] = m;

    if (label && href) {
      if (href.startsWith("/")) {
        parts.push(
          <Link key={i} href={href} className={linkClass}>
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={i}
            href={href}
            className={linkClass}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {label}
          </a>,
        );
      }
    } else if (bold) {
      parts.push(
        <strong key={i} className="font-semibold text-elevio-dark">
          {bold}
        </strong>,
      );
    }

    last = start + m[0].length;
    i += 1;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
