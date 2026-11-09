import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoCta from "@/components/landing/DemoCta";
import FaqBlock from "@/components/landing/FaqBlock";
import GuideBody from "@/components/landing/GuideBody";
import JsonLd from "@/components/landing/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import RelatedLinks from "@/components/landing/RelatedLinks";
import RichText from "@/components/landing/RichText";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/components/landing/schema";
import type { Crumb } from "@/components/landing/types";
import { GHID_DATA_TEXT, GHIDURI, getGhid } from "@/lib/ghiduri";

// Doar ghidurile din listă; orice alt slug dă 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return GHIDURI.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ghid/[slug]">): Promise<Metadata> {
  const ghid = getGhid((await params).slug);
  if (!ghid) return {};
  const base = pageMetadata({
    path: `/ghid/${ghid.slug}`,
    title: ghid.metaTitle,
    description: ghid.metaDescription,
    type: "article",
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: ghid.datePublished,
      modifiedTime: ghid.dateModified,
    },
  };
}

export default async function GhidPage({ params }: PageProps<"/ghid/[slug]">) {
  const { slug } = await params;
  const ghid = getGhid(slug);
  if (!ghid) notFound();

  const path = `/ghid/${ghid.slug}`;
  const crumbs: Crumb[] = [
    { name: "Acasă", path: "/" },
    { name: "Ghiduri", path: "/ghid" },
    { name: ghid.titlu, path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={articleSchema({
          path,
          headline: ghid.titlu,
          description: ghid.metaDescription,
          datePublished: ghid.datePublished,
          dateModified: ghid.dateModified,
        })}
      />

      <LandingHero
        crumbs={crumbs}
        eyebrow={ghid.eyebrow}
        title={ghid.titlu}
        lead={
          <p>
            <RichText text={ghid.rezumat} />
          </p>
        }
        meta={
          <>
            Actualizat: <time dateTime={ghid.dateModified}>{GHID_DATA_TEXT}</time> · Echipa
            Elevio AI
          </>
        }
        secondary={{ href: "/preturi", label: "Vezi prețurile Elevio AI" }}
      />

      <article>
        <GuideBody sectiuni={ghid.sectiuni} />
      </article>

      <FaqBlock items={ghid.faq} />

      <RelatedLinks links={ghid.legate} />

      <DemoCta />
    </>
  );
}
