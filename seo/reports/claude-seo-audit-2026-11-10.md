# Audit SEO complet: elevio-agency.ro (Elevio AI)

Data: 10 noiembrie 2026. Instrument: Claude SEO toolkit (claude-seo v2.5.0), rulat local din `C:/Users/Dominic/seo-tools/claude-seo`, fără instalare globală. Procedura urmată: `skills/seo/SKILL.md` și `skills/seo-audit/SKILL.md` (sub-auditurile technical, content, schema, sitemap, geo, agentic, performance rulate pe rând, nu în paralel).

## Scor general: 78 / 100

| Categorie | Pondere | Scor | Notă |
|---|---|---|---|
| Tehnic | 22% | 86 | bază solidă; date viitoare în sitemap și lipsă headere de securitate |
| Conținut și E-E-A-T | 23% | 68 | texte bune și unice, dar semnale de încredere slabe |
| On-page | 20% | 82 | titluri și descrieri curate; o canibalizare, linkuri interne pierdute |
| Schema | 10% | 72 | acoperire bogată, dar entități dublate și Article incomplet |
| Performanță (CWV) | 10% | 85 (estimat) | nemăsurat în teren, vezi secțiunea Performanță |
| Pregătire AI / GEO | 10% | 80 | robots și llms.txt bune; llms.txt nu listează ghidurile |
| Imagini | 5% | 60 | aproape nicio imagine; aceeași imagine OG pe 51 de pagini |

Tip de afacere detectat: SaaS / serviciu B2B cu componentă locală (prețuri, demo, pagini pe industrii, ghiduri).

### Ce s-a rulat și ce nu
- Rulat: `sitemap_discovery.py`, `fetch_page.py`, `parse_html.py`, `agentic_check.py`, `preload_check.py`, `content_quality.py`, plus un crawl propriu al celor 51 de URL-uri din sitemap (status, titlu, descriere, canonical, H1, cuvinte, JSON-LD, linkuri interne, imagini, headere) și un test de conținut duplicat (shingles de 5 cuvinte, Jaccard). Datele brute: `C:/Users/Dominic/seo-tools/run/elevio-agency.ro-audit/`.
- Nerulat (cer chei API sau instalări suplimentare): `pagespeed_check.py` (PSI fără cheie a dat „rate limit exceeded”), CrUX, Search Console, GA4, DataForSEO, Moz/Bing backlinks, capturi Playwright (`render_page.py`, `capture_screenshot.py`). Nu s-a trimis nimic nicăieri (fără IndexNow, fără Indexing API).
- Excluse intenționat din raport: lipsa RSS, `/ai/*.json` și `dateModified` pe homepage. Sunt deja în PR-ul `seo/geo-optimizer-fixes` (RSS, `/ai/summary.json`, `/ai/faq.json`, `/.well-known/ai.txt`). Pe site-ul live încă dau 404, ceea ce e normal până la merge.

### Ce funcționează bine
- HTTP la HTTPS și www la non-www: 301. Slash final: 308 spre varianta fără slash. URL inexistent: 404 real.
- Toate cele 51 de URL-uri din sitemap răspund 200, au canonical propriu, exact un H1, `lang="ro"`, Open Graph și Twitter Card.
- Niciun titlu, nicio descriere și niciun H1 duplicat. Titluri între 31 și 60 de caractere, descrieri între 142 și 165.
- robots.txt cu grupuri explicite pentru OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot; `/echipa/` și `/api/` blocate, plus `X-Robots-Tag: noindex` pe `/echipa`.
- Conținutul principal e în HTML fără JavaScript (agentic_check P0: pass). llms.txt respectă regulile Lighthouse.
- Paginile pe industrii (24) sunt suficient de diferite: similaritate medie 0,155, maxim 0,235 (constructii-renovari vs tamplarie-pvc). Sub pragul de avertizare de 30 de pagini programatice.
- content_quality.py: homepage 83, agent-vocal-ai 81, cabinete-stomatologice 79, apeluri-pierdute-firma 76; zero „filler” și zero tipare AI detectate.

---

## Constatări, ordonate după impact

### 1. Ridicat: date în viitor și date afișate greșit pe ghiduri (tehnic + schema)
- Pagini: `/ghid/secretariat-telefonic`, `/ghid/mesaj-automat-apel-ratat`, `/ghid/receptioner-ai-cal-com-calendly`, `/ghid/cum-testezi-agent-vocal-ai-romana` au `datePublished` și `dateModified` = `2026-11-11` în JSON-LD, în `og:article` și în `<lastmod>` din sitemap, adică o zi în viitor față de data auditului.
- În plus, toate ghidurile afișează textul „Actualizat: 9 noiembrie 2026”, chiar și cele cu `dateTime="2026-11-10"` sau `"2026-11-11"`. Exemplu live: `/ghid/secretariat-telefonic` are `<time dateTime="2026-11-11">9 noiembrie 2026</time>`. Data vizibilă contrazice data structurată, iar Google ia în calcul neconcordanța.
- Cauza: `src/app/(site)/ghid/[slug]/page.tsx` folosește constanta globală `GHID_DATA_TEXT` în loc să formateze `ghid.dateModified`.
- Reparare: în `src/lib/ghiduri.ts` pune data reală de publicare (nu una viitoare); în `ghid/[slug]/page.tsx` generează textul din `ghid.dateModified` (de ex. `new Date(ghid.dateModified).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })`).
- Cum știm că a mers: Rich Results Test arată aceeași dată ca pagina; nicio dată > azi în sitemap.

### 2. Ridicat: semnale de încredere (E-E-A-T) slabe pentru un serviciu plătit
- Site-wide (`/contact`, `/despre`, `/termeni`, footer): nu apare denumirea firmei, CUI, nr. Registrul Comerțului sau adresa. Legea 365/2002 cere identificarea furnizorului, iar Google tratează lipsa lor ca semnal slab de „Trust”.
- Singurul contact e `elevioromania@gmail.com`; nu există niciun număr de telefon. Pentru un produs care răspunde la telefon, lipsa unui număr demo (pe care vizitatorul îl sună și vorbește cu asistentul) e și o pierdere de conversie, și o dovadă de experiență ratată.
- Ghidurile sunt semnate „Echipa Elevio AI” (`author` = Organization), fără autor uman, fără bio, fără link la LinkedIn-ul fondatorului. Pe subiecte ca AI Act / GDPR (`/ghid/ai-act-gdpr-receptioner-ai`) contează cine scrie.
- Homepage: „30+ / Implementat de peste 30 de antreprenori români” (`src/components/TrustStat.tsx`) și „Clypt România a economisit peste 2.000€” (`src/components/SocialProof.tsx`) nu apar în faptele aprobate din `seo/context.md`. De verificat cu David; dacă nu sunt confirmate, se scot (regula „fără cifre sau clienți inventați”), dacă sunt, se leagă de un studiu de caz.
- Reparare: bloc cu datele firmei în `src/components/Footer.tsx` și pe `/contact`; email pe domeniu (ex. contact@elevio-agency.ro) și în `CONTACT_EMAIL` din `src/lib/seo/schema.ts`; autor „David Morega” cu bio scurt pe ghiduri; număr de telefon demo pe `/contact`, `/demo` și în schema `contactPoint`.

### 3. Ridicat: homepage-ul nu trimite autoritate spre paginile pe industrii
- Pagina: `/` (secțiunea „Pentru cine”). Cele 6 carduri (restaurante, magazine, service auto, cabinete medicale, beauty, altele) duc la `/demo?tip=...` (canonical `/demo`), nu la `/industrii/restaurante`, `/industrii/magazine-online`, `/industrii/service-auto`, `/industrii/clinici-medicale`, `/industrii/saloane-frizerii`.
- Efect: paginile pe industrii primesc doar 1 până la 6 linkuri interne din conținut (vezi secțiunea Linkuri interne), deși sunt paginile comerciale cele mai specifice.
- Reparare: în `src/components/Verticals.tsx` (linia cu `href={`/demo?tip=${v.tag}`}`) titlul cardului să ducă la `/industrii/<slug>`, iar butonul „Vreau demo” să rămână spre `/demo?tip=...`.

### 4. Ridicat: canibalizare pe „agent vocal AI magazin online”
- Pagini: `/industrii/magazine-online` (titlu „Agent vocal AI pentru magazin online, în română, 24/7”) și `/ghid/agent-vocal-ai-ecommerce` (titlu „Agent vocal AI pentru magazin online: comenzi la telefon”). `seo/keyword-map.csv` atribuie interogarea doar paginii de industrie.
- Ghidul are doar 2 linkuri interne spre el, deci riscă să tragă în jos pagina de industrie fără să rankeze el însuși.
- Reparare: repoziționează ghidul pe o intenție informațională distinctă (ex. „cum preiei comenzi telefonice la un magazin online”, „ce întrebări pun clienții la telefon înainte să comande”), schimbă `metaTitle` și H1 în `src/lib/ghiduri.ts`, și pune un link clar din ghid spre `/industrii/magazine-online` cu ancora „agent vocal AI pentru magazin online”. Alternativ: unește-le și pune 301 din ghid spre pagina de industrie.

### 5. Mediu: textul „Testează gratuit” în meniu pe toate paginile
- Pagini: toate cele 50 de pagini cu header (`src/components/Header.tsx`, liniile 59 și 120).
- Încalcă regula din `seo/context.md` („fără pilot sau test gratuit”) și promite altceva decât pagina (demo, nu test). Ancora e și cea mai repetată ancoră internă spre `/demo`.
- Reparare: „Demo gratuit” sau „Ascultă un demo”, la fel ca în footer.

### 6. Mediu: schema Article incompletă, entitate Organization dublată
- Pagini: toate cele 13 ghiduri `/ghid/*`.
- `articleSchema` din `src/components/landing/schema.ts` folosește `ELEVIO_ORG` pentru `author` și `publisher`, fără `@id`, fără `logo`. Pe aceeași pagină, layout-ul emite Organization cu `@id` `https://elevio-agency.ro/#organization`. Rezultă două entități Organization nelegate.
- Article nu are `image` (Google o cere pentru rich results Article) și nici autor Person.
- `logo` din `organizationJsonLd()` (`src/lib/seo/schema.ts`) e imaginea OG 1200x630; Google vrea un logo pătrat (min. 112x112).
- Reparare: în `ELEVIO_ORG` folosește `{ "@id": "https://elevio-agency.ro/#organization" }`; adaugă `image: absoluteUrl("/opengraph-image")` (sau imagine pe ghid) și `author: { "@type": "Person", name: "David Morega", url: ..., sameAs: [LinkedIn] }`; pune un `public/logo.png` pătrat și folosește-l în `logo`.
- Notă: există două helpere paralele (`src/lib/seo/schema.ts` și `src/components/landing/schema.ts`), fiecare cu propriul `SITE_URL` și `absoluteUrl`. Unificarea ar preveni astfel de divergențe.

### 7. Mediu: llms.txt nu listează ghidurile și paginile pe industrii
- Pagina: `https://elevio-agency.ro/llms.txt` (fișier static `public/llms.txt`, 40 de linii). Listează doar acasă, prețuri, demo, despre, contact, marketing și paginile legale. Lipsesc cele 3 pagini principale de serviciu (`/agent-vocal-ai`, `/receptioner-virtual`, `/robot-telefonic-ai`), hub-urile `/ghid` și `/industrii`, cele 13 ghiduri și cele 24 de pagini pe industrii.
- Nu e în PR-ul GEO în curs (acela atinge RSS, `/ai/*.json`, `ai.txt`).
- Reparare: transformă `llms.txt` într-o rută generată (ex. `src/app/llms.txt/route.ts`) din `PUBLIC_ROUTES`, `GHIDURI` și `INDUSTRII`, cu o linie de descriere pe pagină, ca să nu mai rămână în urmă. Opțional: `llms-full.txt` (acum 404).
- Mai mic: llms.txt spune „un restaurant”, `/despre` spune „restaurante”. Aliniază formularea.

### 8. Mediu: ghiduri aproape orfane
- `/ghid/cum-testezi-agent-vocal-ai-romana`: 1 link intern (doar din `/ghid`).
- `/ghid/agent-vocal-ai-ecommerce` și `/ghid/robot-telefonic-vs-ivr`: câte 2.
- `/ghid/centrala-telefonica-virtuala-vs-receptioner-ai` și `/ghid/secretariat-telefonic`: câte 5.
- Reparare: adaugă-le în câmpul `legate` al ghidurilor înrudite din `src/lib/ghiduri.ts` și în paginile de serviciu (ex. `robot-telefonic-vs-ivr` din `/robot-telefonic-ai`, `cum-testezi-agent-vocal-ai-romana` din `/agent-vocal-ai` și `/demo`).

### 9. Mediu: `lastmod` din sitemap nu reflectă schimbările reale
- `src/app/sitemap.ts` pune `lastModified: "2026-11-09"` fix pentru toate cele 24 de pagini pe industrii; toate rutele fixe din `src/lib/seo/routes.ts` au tot 2026-11-09. Paginile pe industrii nu au `dateModified` nici în schema.
- Reparare: câmp `dateModified` în fiecare intrare din `src/lib/industrii.ts`, folosit în sitemap și în schema `WebPage`/`Service`. Actualizează data doar când se schimbă conținutul.

### 10. Mediu: headere de securitate lipsă
- Site-wide. Prezente: `Strict-Transport-Security: max-age=31536000` (fără `includeSubDomains`), `X-Content-Type-Options: nosniff`. Lipsesc: `Content-Security-Policy` (măcar `frame-ancestors`), `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Reparare: în `next.config.ts`, în `headers()`, o regulă `source: "/:path*"` cu `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), geolocation=()` (microfonul doar dacă demo-ul îl folosește), HSTS cu `includeSubDomains`.

### 11. Mediu: E-E-A-T pe conținut: lipsesc dovezile proprii
- Pagini: `/`, `/despre`, `/industrii/cabinete-stomatologice`, `/industrii/kinetoterapie`, `/industrii/restaurante`.
- Există o mostră audio (`public/audio/agent-call-sample.m4a`) dar fără transcript afișat și fără schema `AudioObject`. Nu există studiu de caz cu nume, perioadă și rezultat, nici capturi din dashboard / rezumat de apel.
- Reparare: transcript lângă player (citibil de AI și de Google), `AudioObject` cu `transcript`; un studiu de caz pe clinica stomatologică (cu acordul clientului) folosind formularea aprobată, legat din pagina de industrie.

### 12. Scăzut: `/demo` trimite `Cache-Control: no-store`
- Pagina: `/demo` (singura cu `private,no-cache,no-store`), din cauza `searchParams` în `src/app/(site)/demo/page.tsx`. Pagina e randată la fiecare cerere și nu intră în bfcache.
- Reparare: citește `tip` pe client (`useSearchParams` într-un component client în `<Suspense>`), ca pagina să rămână statică.

### 13. Scăzut: pagini cu text puțin
- `/contact` (112 cuvinte), `/demo` (179). Sunt pagini tranzacționale, deci acceptabil, dar seamănă mult între ele (similaritate 0,31). Adaugă pe `/demo` ce se întâmplă în apelul demo, cât durează, ce primește omul după.

### 14. Scăzut / Info
- FAQPage pe 45 de pagini: Google a retras rich results pentru FAQ (mai 2026). Nu e nevoie de eliminare; nu mai adăugați FAQPage pentru SERP.
- `/marketing` (divizia de marketing, recenzii Google Maps, site-uri): 1 singur link intern și subiect diferit de restul site-ului. Nu strică, dar nu ajută topical. Ține-o așa sau mut-o pe subdomeniu dacă divizia crește.
- Titlurile cu „2027” (`/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027`, `/ghid/cat-costa-receptioner-ai-2027`) sunt OK pentru căutările de la sfârșit de an, dar trebuie actualizate în ianuarie 2027 cu date noi.
- `sameAs` include `crunchbase.com/organization/elevio-ai`: nu am putut verifica (Crunchbase blochează crawlerele). Confirmați că profilul există.

---

## Pe categorii

### Tehnic (86)
- Indexabilitate: 51/51 pagini 200, fără `noindex`, canonical corect pe toate; parametrii `?utm_*` și `/demo?tip=*` canonicalizează corect.
- Sitemap: unul singur, valid, declarat în robots.txt; 51 URL-uri = paginile reale. Probleme: date viitoare (constatarea 1) și `lastmod` static (constatarea 9).
- Securitate: HTTPS + HSTS; headere lipsă (constatarea 10).
- Hreflang: absent, corect pentru un site doar în română (engleza e în produs, nu pe site).
- TTFB măsurat de aici: 0,29 până la 0,76 s (un vârf de 1,02 s pe `/industrii/clinici-veterinare`), servit din cache-ul Netlify.

### On-page (82)
- Titluri, descrieri, H1: unice, lungimi bune, cuvântul cheie la început.
- Aproximativ jumătate din titluri nu se termină cu „| Elevio AI” (ex. toate ghidurile și majoritatea industriilor). E o alegere ca să încapă în 60 de caractere; acceptabil, brandul apare în OG și schema.
- Canibalizare: constatarea 4. Anchor text în meniu: constatarea 5.

### Conținut și E-E-A-T (68)
- Experiență și expertiză: texte concrete (coduri de redirecționare, AI Act), fără umplutură. Lipsesc autorul uman, dovezile și studiile de caz (constatările 2 și 11).
- Încredere: date firmă, telefon, email pe domeniu (constatarea 2).
- Duplicat: fără probleme între paginile pe industrii.

### Schema (72)
- Prezent: Organization + WebSite (acasă), Person (fondator), BreadcrumbList, Service + Offer cu prețuri pe `/preturi` și pe industrii, Article pe ghiduri, ItemList pe hub-uri, FAQPage.
- Probleme: constatările 1 și 6. Lipsesc `contactPoint` și `address` în Organization.

### GEO / AI (80)
- Bine: robots.txt deschis pentru boții AI, llms.txt valid, `disambiguatingDescription` față de elevio.ro / elev.io, conținut fără JS.
- De făcut: llms.txt complet (constatarea 7), transcript la mostra audio (constatarea 11), versiune Markdown a paginilor (agentic_check: info), `Content-Signal` în robots.txt (info).
- În lucru în PR: RSS, `/ai/*.json`, `ai.txt`.

### Performanță (estimat 85, nemăsurat)
- Fără cheie PSI nu s-au putut obține LCP / INP / CLS. Semnale indirecte bune: HTML 34 până la 109 kB, 9 scripturi, fără imagini mari, fără analytics terți, fonturi preîncărcate, cache Netlify Durable.
- preload_check.py: 50/100. Fără `<script type="speculationrules">` (prefetch/prerender pentru `/preturi` și `/demo`). LCP-ul pe homepage e text, deci lipsa `fetchpriority` pe imagine nu contează.
- Recomandare: rulați `pagespeed_check.py` cu o cheie Google API și verificați CrUX în Search Console.

### Imagini (60)
- Doar o imagine în tot site-ul (logo Clypt, cu alt). Aceeași imagine OG (`/opengraph-image`) pe toate cele 51 de pagini.
- Reparare: `opengraph-image.tsx` per segment (`src/app/(site)/ghid/[slug]/opengraph-image.tsx`, `src/app/(site)/industrii/[slug]/opengraph-image.tsx`) cu titlul paginii; o imagine/schemă explicativă în ghidurile principale.

### Linkuri interne
Linkuri primite din conținutul altor pagini (fără meniu/footer):
- Puternic: `/preturi` 44, `/` 43, `/agent-vocal-ai` 37, `/industrii` 30, `/ghid/apeluri-pierdute-firma` 29.
- Slab: `/ghid/cum-testezi-agent-vocal-ai-romana` 1, `/industrii/clinici-veterinare` 1, `/marketing` 1, `/ghid/agent-vocal-ai-ecommerce` 2, `/ghid/robot-telefonic-vs-ivr` 2, `/industrii/curatenie-mutari` 2, majoritatea paginilor pe industrii 3 până la 6.
- `/contact` și `/termeni`: 0 din conținut (doar meniu/footer), normal.
- Reparare: constatările 3 și 8; în plus, din fiecare pagină pe industrie, 2 linkuri spre industrii înrudite (stomatologie, clinici medicale, kinetoterapie, veterinar, estetică).

---

## Fixuri sigure de făcut în cod (repo elevio-site)

1. `src/app/(site)/ghid/[slug]/page.tsx`: textul „Actualizat” generat din `ghid.dateModified`, nu din `GHID_DATA_TEXT`.
2. `src/lib/ghiduri.ts`: fără date în viitor la `datePublished` / `dateModified` (cele patru ghiduri cu 2026-11-11); adaugă în `legate` ghidurile orfane.
3. `src/components/Header.tsx` (liniile 59 și 120): „Testează gratuit” devine „Demo gratuit”.
4. `src/components/Verticals.tsx`: cardurile duc la `/industrii/<slug>`, butonul de demo rămâne spre `/demo?tip=...`.
5. `src/components/landing/schema.ts`: `ELEVIO_ORG` înlocuit cu referință `@id` la `#organization`; Article cu `image` și autor Person (David Morega).
6. `src/lib/seo/schema.ts`: `logo` spre un fișier pătrat nou (`public/logo.png`), `contactPoint` când există telefon.
7. `public/llms.txt` (sau rută nouă `src/app/llms.txt/route.ts`): toate paginile de serviciu, ghidurile și industriile.
8. `src/lib/industrii.ts` + `src/app/sitemap.ts`: `dateModified` per industrie, nu data fixă.
9. `next.config.ts`: headere `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS cu `includeSubDomains` pe `/:path*`.
10. `src/app/(site)/demo/page.tsx`: `tip` citit pe client, ca pagina să fie statică.

De decis cu David înainte de cod (nu sunt „sigure”): cifrele din `src/components/TrustStat.tsx` și `src/components/SocialProof.tsx`, datele firmei și emailul pe domeniu, repoziționarea sau unirea ghidului `agent-vocal-ai-ecommerce`.
