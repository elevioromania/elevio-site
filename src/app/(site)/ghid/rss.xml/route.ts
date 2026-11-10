import { GHIDURI } from "@/lib/ghiduri";
import { BRAND_NAME } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/routes";

// Fluxul RSS al ghidurilor: semnal de prospețime pentru cititoare și
// motoarele AI. Se construiește din GHIDURI, deci nu se desincronizează.
export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const items = GHIDURI.map((g) => {
    const url = `${SITE_URL}/ghid/${g.slug}`;
    return `    <item>
      <title>${escapeXml(g.titlu)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(g.metaDescription)}</description>
      <pubDate>${new Date(g.datePublished).toUTCString()}</pubDate>
    </item>`;
  }).join("\n");

  const lastBuild = GHIDURI.map((g) => g.dateModified).sort().at(-1) ?? "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ghiduri ${BRAND_NAME}</title>
    <link>${SITE_URL}/ghid</link>
    <atom:link href="${SITE_URL}/ghid/rss.xml" rel="self" type="application/rss+xml" />
    <description>Ghiduri despre agenți vocali AI și recepționeri virtuali pentru afaceri locale din România.</description>
    <language>ro</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
