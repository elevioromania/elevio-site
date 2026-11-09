import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/routes";

const DISALLOW = ["/api/", "/echipa/"];

// Crawlerele motoarelor de căutare și ale asistenților AI pe care le permitem
// explicit (ChatGPT, Claude, Perplexity, Gemini, Bing, Google).
const AI_AND_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Googlebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
