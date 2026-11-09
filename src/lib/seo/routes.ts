import type { MetadataRoute } from "next";

/**
 * Registrul paginilor publice ale site-ului. `src/app/sitemap.ts` se
 * construiește din el.
 *
 * Cum adaugi o pagină nouă:
 * 1. Adaugi un obiect în `PUBLIC_ROUTES` cu `path` (fără slash la final, în
 *    afară de "/"), `changeFrequency` și `priority`.
 * 2. Pui `lastModified` cu data zilei în care ai publicat sau ai schimbat
 *    conținutul paginii, ca șir "AAAA-LL-ZZ". Nu folosi `new Date()`: data se
 *    schimbă doar când se schimbă pagina.
 * 3. Nu adăuga aici rute interne (`/echipa/**`, `/api/**`): ele nu se indexează.
 */
export type PublicRoute = {
  /** Calea relativă, de ex. "/preturi". */
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  /** Între 0 și 1. */
  priority: number;
  /** Data ultimei schimbări de conținut, "AAAA-LL-ZZ". */
  lastModified?: string;
};

export const SITE_URL = "https://elevio-agency.ro";

export const PUBLIC_ROUTES: PublicRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: "2026-11-09" },
  { path: "/preturi", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-11-09" },
  { path: "/demo", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-11-09" },
  { path: "/marketing", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-11-09" },
  { path: "/despre", changeFrequency: "yearly", priority: 0.6, lastModified: "2026-11-09" },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6, lastModified: "2026-11-09" },
  { path: "/confidentialitate", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-11-09" },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-11-09" },
  { path: "/termeni", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-11-09" },
  // Pagini SEO principale (noiembrie 2026)
  { path: "/agent-vocal-ai", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-11-09" },
  { path: "/receptioner-virtual", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-11-09" },
  { path: "/robot-telefonic-ai", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-11-09" },
  { path: "/ghid", changeFrequency: "weekly", priority: 0.7, lastModified: "2026-11-09" },
  // Ghidurile se adaugă automat din src/lib/ghiduri.ts (vezi sitemap.ts).
];

/** URL absolut pentru o cale relativă: absoluteUrl("/preturi"). */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
