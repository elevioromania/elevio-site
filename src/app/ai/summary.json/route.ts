import { BRAND_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/routes";
import { ORGANIZATION_SAME_AS } from "@/lib/seo/schema";

// Rezumatul site-ului pentru motoarele AI (/ai/summary.json). Textul vine din
// aceleași constante ca metadata paginilor.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: BRAND_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    language: "ro",
    country: "RO",
    founder: "David Morega",
    sameAs: [...ORGANIZATION_SAME_AS, "https://www.linkedin.com/in/david-morega/"],
    disambiguation:
      "Elevio AI (elevio-agency.ro) nu are legătură cu platforma școlară Elevio (elevio.ro) sau cu Elevio (elev.io).",
    llms: `${SITE_URL}/llms.txt`,
    faq: `${SITE_URL}/ai/faq.json`,
    feed: `${SITE_URL}/ghid/rss.xml`,
  });
}
