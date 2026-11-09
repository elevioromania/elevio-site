import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, absoluteUrl } from "@/lib/seo/routes";
import { GHIDURI } from "@/lib/ghiduri";

// Paginile fixe vin din registrul `src/lib/seo/routes.ts`; paginile generate
// din date (ghiduri) se adaugă din fișierele lor de date.
export default function sitemap(): MetadataRoute.Sitemap {
  const fixe = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const ghiduri = GHIDURI.map((g) => ({
    url: absoluteUrl(`/ghid/${g.slug}`),
    lastModified: g.dateModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...fixe, ...ghiduri];
}
