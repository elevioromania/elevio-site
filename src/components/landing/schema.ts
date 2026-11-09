import type { Metadata } from "next";
import { pageMetadata as sharedPageMetadata } from "@/lib/seo/metadata";
import { plainText } from "./RichText";
import type { Crumb, FaqItem } from "./types";

export const SITE_URL = "https://elevio-agency.ro";

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Entitatea Elevio AI, folosită ca provider / author / publisher. */
export const ELEVIO_ORG = {
  "@type": "Organization",
  name: "Elevio AI",
  alternateName: ["Elevio", "Elevio Agency"],
  url: SITE_URL,
  description: "Elevio AI, recepționer vocal AI în limba română.",
  disambiguatingDescription:
    "Elevio AI este un recepționer vocal AI pentru firme din România. Nu are legătură cu platforma școlară elevio.ro sau cu produsul elev.io.",
};

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
    })),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function articleSchema({
  path,
  headline,
  description,
  datePublished,
  dateModified,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "ro-RO",
    datePublished,
    dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: ELEVIO_ORG,
    publisher: ELEVIO_ORG,
  };
}

export function serviceSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "Recepționer vocal AI",
    url: absoluteUrl(path),
    areaServed: { "@type": "Country", name: "România" },
    availableLanguage: "ro",
    provider: ELEVIO_ORG,
  };
}

/**
 * Metadatele comune ale paginilor noi. Delegă la helper-ul global
 * (src/lib/seo/metadata.ts), ca toate paginile să aibă aceeași imagine OG,
 * același canonical și aceleași câmpuri Twitter. Titlurile de aici conțin deja
 * „Elevio AI” (sau sunt complete), deci sunt folosite exact, fără șablon.
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const base = sharedPageMetadata({ title, description, path, absoluteTitle: true });
  return { ...base, openGraph: { ...base.openGraph, type } };
}
