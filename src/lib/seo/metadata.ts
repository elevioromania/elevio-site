import type { Metadata } from "next";

export const BRAND_NAME = "Elevio AI";
export const TITLE_TEMPLATE = `%s | ${BRAND_NAME}`;
export const DEFAULT_TITLE = "Elevio AI · Recepționer vocal AI în română, 24/7";
export const DEFAULT_DESCRIPTION =
  "Elevio AI este recepționerul vocal AI care răspunde clienților firmei tale în română, 24/7: preia programări, dă informații și transferă apelurile la un om.";

// Imaginea generată de src/app/opengraph-image.tsx.
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Elevio AI, recepționer vocal AI în limba română, 24/7",
  type: "image/png",
};

// Câmpurile Open Graph / Twitter comune tuturor paginilor. Next.js nu
// combină obiectele `openGraph` între layout și pagină (o pagină care își
// setează `openGraph` îl înlocuiește complet, inclusiv imaginea din
// opengraph-image.tsx), de aceea le repetăm aici, cu tot cu imagine.
export const SHARED_OPEN_GRAPH = {
  type: "website" as const,
  locale: "ro_RO",
  siteName: BRAND_NAME,
  images: [OG_IMAGE],
};

/**
 * Metadatele unei pagini publice: titlu, descriere, canonical, Open Graph și
 * Twitter, toate din aceleași valori.
 *
 * - `title` trece prin șablonul „%s | Elevio AI” din layout-ul rădăcină.
 * - `absoluteTitle: true` folosește titlul exact, fără șablon (pentru titlurile
 *   care conțin deja „Elevio AI”).
 * - `path` e calea paginii ("/preturi"); devine canonical și og:url.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : TITLE_TEMPLATE.replace("%s", title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
