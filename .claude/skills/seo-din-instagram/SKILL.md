---
name: seo-din-instagram
description: Orice lucru de SEO pentru elevio-agency.ro — audit, pagini noi, titluri și meta, date structurate, SEO tehnic în Next.js, SEO local, AI SEO / GEO (să fim recomandați de ChatGPT, Perplexity, Google AI Overviews), backlinks și PR. Construit din reel-urile de SEO salvate de Dydy pe Instagram (tools/instagram-salvate/rezultate/seo/). Folosește-l când utilizatorul cere SEO, „să apărem pe Google”, „să ne recomande ChatGPT”, pagini de nișă, blog sau planul SEO.
---

# SEO pentru Elevio (din reel-urile salvate)

Elevio = recepționer vocal AI în română, 24/7, pentru firme mici din România (clinici, cabinete stomatologice, saloane, service-uri auto etc.). Site: **https://elevio-agency.ro**, Next.js App Router, pe Netlify. Conversia care contează: **cerere de demo** (`/demo`) și lead-uri din formular, nu traficul în sine.

**Planul activ e `seo/PLAN-30-ZILE.md`**: research complet de concurență, AI search și canale externe, plus planul pe zile. Mai vechi: `tools/instagram-salvate/rezultate/PLAN-SEO.md`.

**Brand:** numele public e **„Elevio AI”** peste tot. „Elevio” simplu se ciocnește cu elevio.ro (platformă școlară din România) și cu elev.io (SaaS de knowledge base). În schema JSON-LD pune `disambiguatingDescription`. Concurentul de referință la SEO e callio.ro. Breakdown-ul fiecărui reel e în `tools/instagram-salvate/rezultate/seo/`. Marcaj folosit mai jos: **[reel]** = sfat din reel-uri, **[completare]** = adăugat de noi (bune practici).

## 1. Principii

### SEO tehnic (checklist complet: [reel DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/))
- Indexare curată în Google Search Console; zero pagini cu erori, zero `noindex` rătăcit. **[reel]**
- Canonical pe fiecare pagină publică; `metadataBase` setat. **[reel]** + **[completare: în Next.js prin `alternates.canonical`]**
- Core Web Vitals bune; JavaScript crawlabil (conținutul principal în HTML-ul randat pe server). **[reel]**
- Fără pagini orfane: fiecare pagină primește linkuri interne, inclusiv din meniu sau footer. **[reel]**
- Fără link-uri rupte sau 404-uri; redirect-uri directe, fără lanțuri. **[reel]**
- URL-uri curate, descriptive, în română fără diacritice (`/receptioner-ai-clinici`). **[reel]**
- Breadcrumbs și schema markup (JSON-LD). **[reel]**

### On-page
- O pagină = o intenție de căutare = un cuvânt cheie principal. Două pagini pe același cuvânt înseamnă canibalizare: le comasezi și pui redirect. **[reel]**
- Titlu de 50–60 de caractere, cu cuvântul cheie la început; meta descriere unică pe fiecare pagină. **[reel]**
- Un singur H1, cu cuvântul cheie; ierarhie corectă H2/H3. **[reel]**
- **Răspunsul în primele două propoziții**, apoi detaliile. Asta citează și Google, și AI-ul. **[reel De-IHn-Bf8t]** + **[seo-autopilot]**
- Imagini optimizate, cu `alt` descriptiv. **[reel]**
- Conținut original; paginile subțiri sau suprapuse le comasezi. **[reel]**
- Semnale E-E-A-T: cine e în spatele Elevio, fondator, firmă, date de contact reale. **[reel]**

### CTR
- Click-urile influențează ranking-ul (Google a recunoscut-o în procesul DOJ). Paginile de pe prima pagină cu CTR mic primesc titluri și descrieri noi, iar rezultatul se evaluează după ~2 săptămâni. **[reel DfZ6ypijJW-]**
- Test rapid opțional: 3 variante de titlu ca reclame Google Ads (~20$/zi), câștigătoarea merge pe pagină. **[reel]**

### SEO local și AI SEO (GEO)
- **ChatGPT abia îți citește site-ul; citează listele „cei mai buni X”.** Intră în ele (articole de tip „top furnizori”, directoare). **[reel DfPsmmbx4sA]**
- **ChatGPT folosește și Bing.** Ai nevoie de Bing Places (și Yelp, mai puțin relevant în RO), pe lângă Google Business Profile. **[reel]**
- **Prețuri publice.** AI-ul citește des paginile de prețuri; noi avem `/preturi`, așa că le ținem clare, în text, nu în imagini. **[reel]**
- **Mențiuni în presă și organizații** (Camera de Comerț, asociații) contează mai mult decât link-urile simple. **[reel]**
- **Recenziile detaliate** („Ce am rezolvat? Cum a mers?”) sunt preluate de AI. **[reel]**
- **Află ce caută ChatGPT în fundal** (DevTools → Network → „queries”) și folosește exact acele formulări în title, slug, H1 și primele propoziții. **[reel DeVQL35PfNX]**
- **Întreabă periodic ChatGPT, Perplexity și Gemini** despre Elevio și despre categoria noastră; ce e greșit corectezi pe pagina care deține faptul respectiv. **[reel DfPsmmbx4sA]** + **[seo-autopilot]**
- **Revendică profilul de firmă în ChatGPT** când OpenAI îl lansează (în lucru, conform unui leak). **[reel DfaOiI6PdtW]**
- **Insigna Google „Preferred sources”** are prioritate mică: e gândită pentru Top Stories/Discover și o punem doar când avem blog. **[reel DeyBx9-vl0k]**
- `llms.txt` și date structurate clare (Organization, Service, FAQPage, Offer) ajută AI-ul să extragă corect faptele. **[completare]**

### Autoritate (off-page)
- **„Parasite SEO” cinstit:** articole LinkedIn scurte (sub ~330 de cuvinte, răspunsul în prima frază), prezentări Gamma pe nișe cu link spre site, răspunsuri utile pe Reddit. Puțin și bun, nu spam. **[reel De-IHn-Bf8t]**
- **Pagini „cel mai bun X în 2027”** publicate înaintea concurenței: primul conținut bun ia locul și îl păstrează. **[reel]**
- **Comunicate de presă reale**, sindicalizate în presă: AI Overviews le citează. Fraza-țintă apare în titlu sau subtitlu și în prima propoziție. **[reel De3h5TFPtgW]**

## 2. Checklist Next.js (App Router) pentru fiecare pagină publică
- [ ] `export const metadata` cu `title` (50–60 de caractere, cuvântul cheie la început) și `description` unică (140–160 de caractere).
- [ ] `alternates: { canonical: "/ruta" }`, plus `metadataBase: new URL("https://elevio-agency.ro")` în `src/app/layout.tsx`.
- [ ] `openGraph` și `twitter` (titlu, descriere, imagine 1200×630).
- [ ] Un singur `<h1>` cu cuvântul cheie; răspunsul în primul paragraf.
- [ ] JSON-LD într-un `<script type="application/ld+json">`: `Organization` (global), `Service` și `Offer` (prețuri), `FAQPage` (unde există FAQ), `BreadcrumbList` (pe subpagini).
- [ ] Pagina e în `src/app/sitemap.ts` și primește cel puțin 3 linkuri interne cu ancore descriptive.
- [ ] Conținutul principal e randat pe server (nu doar în componente client).
- [ ] Rutele interne (`/echipa`, `/api`) rămân excluse (`X-Robots-Tag` / `robots.ts`).
- [ ] `npm run lint` și `npm run build` trec; pagina e verificată în browser.

## 3. Unelte și repo-uri

| Unealtă | Link | Ce face | Cum o folosim la Elevio | Sursa |
|---|---|---|---|---|
| Illyism/seo-skills (seo-autopilot, seo-title-optimization, blog-refresher, linkdr) | https://github.com/Illyism/seo-skills · `npx skills add Illyism/seo-skills` | „Agenție SEO” care rulează zilnic în repo: health check, pagina 2→1, întrebări către AI, keyword map, backlog în `seo/` | Preluăm structura `seo/` și fluxul (secțiunea 4); opțional instalăm skill-ul | [reel](https://www.instagram.com/reel/Deu0eKalKi1/), [reel](https://www.instagram.com/reel/DfbqqTCu7mw/) |
| mcp-gsc | https://github.com/AminForou/mcp-gsc | Conectează Claude la Google Search Console | Analiza pozițiilor 8–20 și a CTR-ului, lunar | [reel](https://www.instagram.com/reel/DdZPRfiStXv/) |
| GEO Optimizer Skill | https://github.com/Auriti-Labs/geo-optimizer-skill | Audit: ne citează ChatGPT, Perplexity, Gemini, AI Overviews? | Rulat înainte și după modificările de AI SEO | [reel](https://www.instagram.com/reel/DdZPRfiStXv/) |
| OpenSEO | mai multe repo-uri cu acest nume (ex. github.com/TahaHachana/OpenSEO); exact nu se știe | Alternativă gratuită la Ahrefs/Semrush | Cercetare de cuvinte cheie, dacă avem nevoie | [reel](https://www.instagram.com/reel/DdZPRfiStXv/) |
| Google Search Console | https://search.google.com/search-console | Indexare, interogări, CTR | Obligatoriu, pasul 0 | [reel](https://www.instagram.com/reel/DcUCK5LiGiU/) |
| Bing Webmaster Tools / Bing Places | https://www.bing.com/webmasters · https://www.bingplaces.com | Indexare Bing (sursă pentru ChatGPT) + profil local | Verificare site + profil firmă | [reel](https://www.instagram.com/reel/DfPsmmbx4sA/) |
| Google Business Profile | https://business.google.com | Profil local, recenzii, program | Profil Elevio + argument de vânzare pentru clienți (24/7) | [reel](https://www.instagram.com/reel/DfPsmmbx4sA/) |
| Gamma | https://gamma.app | Prezentări publice indexabile | O prezentare per nișă, cu link spre pagina de nișă | [reel](https://www.instagram.com/reel/De-IHn-Bf8t/) |
| Google Preferred Sources | Google Search Central | Insignă „sursă preferată” | Doar după ce avem blog | [reel](https://www.instagram.com/reel/DeyBx9-vl0k/) |
| LinkDR, AI SEO Tracker | https://linkdr.com · https://aiseotracker.com | Backlinks și urmărirea răspunsurilor AI (plătite) | Opțional, mai târziu | seo-autopilot |

## 4. Fluxuri de lucru

**Stare în repo** (după modelul seo-autopilot): folderul `seo/` la rădăcină, cu:
- `context.md`: produs, cumpărător, prețuri, limite, concurenți; fiecare fapt cu sursa (fișier sau URL);
- `keyword-map.csv`: interogare, intenție, URL țintă, status, poziție, data verificării;
- `backlog.md`: ordonat după „lead-uri estimate pe oră de muncă”;
- `log.md`: o linie datată pentru fiecare schimbare livrată;
- `ai-prompts.md`: 25 de întrebări pe care un patron de clinică sau salon le-ar pune unui AI, plus ce a răspuns fiecare asistent.

Citește `seo/` la începutul fiecărei sesiuni de SEO și actualizează-l la final.

**Pagină nouă optimizată**
1. Alege interogarea din `keyword-map.csv`. Caută-o și citește primele 5 rezultate. Dacă nu poți spune ce va avea pagina noastră în plus, nu o scrie.
2. Verifică ce interogări face ChatGPT pentru întrebarea respectivă (DevTools, vezi mai sus) și folosește acele formulări.
3. Scrie răspunsul în primele două propoziții. Folosește ce știm doar noi: mostre audio reale, cifre reale, scenarii reale din nișă.
4. Aplică checklist-ul Next.js (secțiunea 2), adaugă 3 linkuri interne spre pagină și o intrare în sitemap.
5. Lint și build, verifici vizual, faci PR. Adaugi linia în `seo/log.md`.

**Audit lunar**
1. Search Console (prin mcp-gsc): erori de indexare, pagini neindexate și cauza lor, interogările de pe pozițiile 8–20, pagini cu CTR mic.
2. Pozițiile 8–20: citești top 3, completezi ce lipsește, pui interogarea în title/H1 dacă sună natural, adaugi linkuri interne.
3. CTR mic: titlu și descriere noi; reevaluezi după 2 săptămâni.
4. Întrebările din `ai-prompts.md` în ChatGPT, Perplexity și Gemini. Notezi dacă apărem, ce se spune despre noi și ce surse se citează. Sursele citate devin ținte de outreach.
5. Rulezi GEO Optimizer pe site.
6. Scrii un raport scurt în `seo/reports/AAAA-LL-ZZ.md`, sub 300 de cuvinte.

## 5. Ce NU facem
- Afirmații false sau auto-proclamări („cel mai bun”, „lider”, „best-selling”) fără dovadă. Riscant juridic (practici comerciale înșelătoare) și reputațional. Comunicatele spun doar lucruri adevărate.
- Testimoniale, recenzii, statistici sau clienți inventați.
- Spam pe Reddit sau zeci de pagini Gamma și LinkedIn subțiri, făcute pe bandă.
- Program 24/7 pe Google pentru cineva care nu răspunde efectiv (la clienții noștri: doar dacă au Elevio activ).
- Publicare automată fără review. Orice pagină trece prin PR.
- Trimiterea de emailuri, crearea de conturi sau postarea pe rețele în numele firmei fără acordul lui Dydy: le pregătim ca draft.
- Indexarea zonei `/echipa` sau a `/api`.
