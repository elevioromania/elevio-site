import { FAQ_ITEMS } from "@/lib/faq";
import { SITE_URL } from "@/lib/seo/routes";

// Întrebările frecvente pentru motoarele AI (/ai/faq.json), din aceeași sursă
// ca FAQ-ul de pe pagină și schema FAQPage.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    url: SITE_URL,
    faq: FAQ_ITEMS.map(({ q, a }) => ({ question: q, answer: a })),
  });
}
