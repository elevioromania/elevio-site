import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconInapoi, IconSageata } from "@/echipa/components/icons";
import { sectiune, sectiuni } from "@/echipa/lib/ghid";

export async function generateMetadata({ params }: PageProps<"/echipa/app/ghid/[slug]">): Promise<Metadata> {
  const s = sectiune((await params).slug);
  return { title: s ? `${s.numar}. ${s.titlu}` : "Ghid" };
}

export default async function SectiunePage({ params }: PageProps<"/echipa/app/ghid/[slug]">) {
  const { slug } = await params;
  const s = sectiune(slug);
  if (!s) notFound();
  const toate = sectiuni();
  const i = toate.findIndex((x) => x.slug === slug);
  const inainte = toate[i - 1];
  const dupa = toate[i + 1];

  return (
    <article className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wide text-echipa-accent">Partea {s.parte}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {s.numar}. {s.titlu}
      </h1>
      <div className="ghid-prose mt-6" dangerouslySetInnerHTML={{ __html: s.html }} />

      <nav className="mt-10 grid gap-3 border-t border-echipa-line pt-6 sm:grid-cols-2" aria-label="Secțiuni vecine">
        {inainte ? (
          <Link href={`/echipa/app/ghid/${inainte.slug}`} className="rounded-2xl border border-echipa-line p-4 hover:border-echipa-accent/60">
            <span className="flex items-center gap-1.5 text-xs text-echipa-muted">
              <IconInapoi className="h-3.5 w-3.5" /> Înapoi
            </span>
            <span className="mt-1 block font-medium">
              {inainte.numar}. {inainte.titlu}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {dupa && (
          <Link href={`/echipa/app/ghid/${dupa.slug}`} className="rounded-2xl border border-echipa-line p-4 text-right hover:border-echipa-accent/60">
            <span className="flex items-center justify-end gap-1.5 text-xs text-echipa-muted">
              Mai departe <IconSageata className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block font-medium">
              {dupa.numar}. {dupa.titlu}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
