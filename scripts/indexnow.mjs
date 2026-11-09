#!/usr/bin/env node
// Anunță Bing, Yandex, Seznam, Naver (prin IndexNow) că paginile din sitemap
// s-au schimbat. Google nu folosește IndexNow: acolo rămâne Search Console.
//
// Rulează DUPĂ ce deploy-ul e live (citește sitemap-ul de producție):
//   npm run indexnow
//
// Cheia e fișierul public/<cheie>.txt, servit la https://elevio-agency.ro/<cheie>.txt.
// Dacă schimbi cheia, schimbi și numele fișierului, și constanta de mai jos.

const HOST = "elevio-agency.ro";
const SITE_URL = `https://${HOST}`;
const KEY = "78beedba3b663d57d0f23a24297fd7cd";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Nu pot citi sitemap-ul: HTTP ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((url) => new URL(url).host === HOST);

  if (urlList.length === 0) {
    throw new Error("Sitemap-ul nu conține niciun URL.");
  }
  console.log(`Trimit ${urlList.length} URL-uri la IndexNow:`);
  for (const url of urlList) console.log(`  ${url}`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const body = await res.text();
  // 200 = primit, 202 = primit, cheia încă se validează.
  console.log(`IndexNow: HTTP ${res.status} ${res.statusText}${body ? `\n${body}` : ""}`);
  if (!res.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
