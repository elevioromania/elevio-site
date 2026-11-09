---
name: elevio-search-console
description: Audit și reparații în Google Search Console și Bing Webmaster Tools pentru elevio-agency.ro, rubrică cu rubrică, folosind browserul (Claude in Chrome sau browserul din aplicația Claude Desktop) cu contul Google al lui David deja logat. Folosește-l când David cere „intră în Search Console”, „verifică Search Console”, „cere indexarea”, „vezi ce e în Bing Webmaster” sau un audit SEO pe datele reale.
---

# Search Console și Bing Webmaster pentru Elevio AI

Lucrezi pentru David Morega, fondatorul Elevio AI (https://elevio-agency.ro): recepționer vocal AI în română, 24/7, pentru afaceri locale din România. Sesiunea asta rulează pe calculatorul lui, cu browserul lui. Sesiunile din cloud au construit site-ul și planul. Partea ta e să intri în conturi și să lucrezi pe datele reale.

## Înainte de orice

1. `git pull` pe `main`, ca să ai ultima versiune.
2. Citește:
   - `seo/context.md`: faptele despre produs, concurenții, regulile de text;
   - `seo/PLAN-30-ZILE.md`: planul pe 30 de zile (secțiunile 0, 2 și 4.1);
   - `seo/keyword-map.csv`: interogare → pagina țintă;
   - `.claude/skills/seo-din-instagram/SKILL.md`: principiile SEO și checklist-ul Next.js;
   - skill-ul `elevio-copywriting` (dacă e disponibil), pentru orice text scris.
3. Deschide browserul (Claude in Chrome sau browserul din aplicație: Ctrl+Shift+B). Dacă Google cere logare sau confirmare, îl rogi pe David să o facă el. Nu ceri parole și nu schimbi setările contului.

## Starea la 9.11.2026 (ce e deja făcut)

- Site-ul are 43 de URL-uri în `https://elevio-agency.ro/sitemap.xml`:
  - acasă, prețuri, demo, despre, contact, marketing, paginile legale;
  - `/agent-vocal-ai`, `/receptioner-virtual`, `/robot-telefonic-ai`;
  - `/industrii` + 24 de pagini `/industrii/{domeniu}`;
  - `/ghid` + 5 ghiduri.
- Canonical, Open Graph, JSON-LD (Organization cu LinkedIn și fondator, WebSite, Service, FAQPage, BreadcrumbList, Article), `robots.txt` cu roboții AI permiși, `llms.txt`.
- IndexNow (Bing) trimis pe 9.11. Se repetă după fiecare deploy cu `npm run indexnow`.
- Proprietatea de tip Domeniu e verificată prin DNS (TXT `google-site-verification`). Bing e importat din Search Console, după spusele lui David.
- Zona `/echipa/**` și `/api/**` NU trebuie indexată (noindex + robots). E corect să apară ca „exclusă”.
- Site-ul e nou: rapoartele de performanță și Core Web Vitals pot fi aproape goale primele 1–2 săptămâni. Asta nu e o eroare.

## Ce faci, rubrică cu rubrică (Google Search Console)

La fiecare rubrică: citești, notezi ce vezi (cifre exacte), decizi, faci doar ce e sigur, notezi ce ai făcut.

1. **Prezentare generală:** notezi alertele și mesajele (și din clopoțel, „Mesaje”).
2. **Sitemaps:** `https://elevio-agency.ro/sitemap.xml` trebuie să apară cu starea „Reușit” și ~43 de URL-uri descoperite. Dacă lipsește, îl adaugi. Dacă are erori, le notezi exact.
3. **Inspectarea adreselor URL:** pentru fiecare pagină de mai jos verifici starea și, dacă nu e indexată, apeși „Solicită indexarea”. Google limitează câteva pe zi, deci le faci în ordinea asta și te oprești la limită:
   1. `/`
   2. `/agent-vocal-ai`
   3. `/receptioner-virtual`
   4. `/robot-telefonic-ai`
   5. `/industrii`
   6. `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027`
   7. `/preturi`
   8. `/industrii/magazine-online`
   9. `/industrii/cabinete-stomatologice`
   10. `/industrii/restaurante`
   11. `/industrii/instalatori`
   12. `/ghid/cat-costa-receptioner-ai-2027`

   Ce nu apuci azi, notezi pentru mâine.
4. **Pagini (indexare):** pentru fiecare motiv de neindexare notezi URL-urile și cauza.
   - „Descoperită/accesată, neindexată” la un site nou e normal; ceri indexarea pentru cele importante.
   - Erorile reale (404, redirecționări greșite, canonical alternativ, „blocat de robots.txt” pe o pagină publică) devin taskuri de cod.
5. **Performanță:** după ce există date, notezi interogările cu impresii, pozițiile și CTR-ul.
   - Interogările pe pozițiile 8–20 și paginile cu CTR mic merg în `seo/keyword-map.csv` (coloanele pozitie și verificat).
   - Fiecare devine o propunere de îmbunătățire: titlu sau descriere, conținut, linkuri interne.
6. **Experiența paginii / Core Web Vitals / HTTPS:** notezi orice URL marcat „Slab” sau „Necesită îmbunătățiri”, cu metrica (LCP, INP, CLS).
7. **Îmbunătățiri / Date structurate** (FAQ, Breadcrumbs, Article, Logo etc.): orice eroare sau avertisment, cu URL-ul și câmpul exact.
8. **Linkuri:** notezi linkurile externe și paginile cele mai legate intern.
9. **Eliminări:** nu ar trebui să existe nimic. Nu crea eliminări.
10. **Setări:** verifici proprietarii și utilizatorii (doar raportezi, nu schimbi) și statisticile de crawling (erori de server, răspunsuri lente).

## Bing Webmaster Tools

Aceleași lucruri: site-ul există, sitemap-ul e trimis și procesat, „URL Inspection” pe paginile principale, „URL Submission” pentru cele neindexate, raportul „AI Performance” (dacă e disponibil), plus erorile din „Site Explorer” și „SEO Reports”.

## Ce ai voie să faci singur

- Trimiterea sitemap-ului, „Solicită indexarea”, „Validează remedierea” după ce o eroare a fost reparată în cod.
- Reparații în codul site-ului pentru erori clare (date structurate, canonical, linkuri rupte, metadate), pe un branch nou din `main`.
  - Rulezi `npm run lint` și `npm run build`.
  - Apoi deschizi PR și îl unești doar dacă David a cerut asta în sesiunea curentă.
  - După deploy: `npm run indexnow`.
- Textele noi respectă regulile din `seo/context.md`: fără linie de pauză (—), „afaceri locale”, fără „pilot”, fără cifre sau clienți inventați, fără prețuri în texte de vânzare.

## Ce NU faci

- Nu ștergi proprietăți, utilizatori sau sitemap-uri și nu creezi eliminări de URL-uri.
- Nu schimbi setările contului Google, nu adaugi utilizatori și nu dai acces altcuiva.
- Nu ceri parole. Logarea și verificările de securitate le face David.
- Nu schimbi prețuri, promisiuni sau fapte despre produs pe site.
- Nu marchezi o problemă ca rezolvată dacă n-ai verificat-o.

## Raportul

La final scrii `seo/reports/AAAA-LL-ZZ-search-console.md` cu:

1. ce ai găsit pe fiecare rubrică, cu cifre exacte și starea;
2. ce ai făcut (indexări cerute, sitemap, reparații, cu link spre PR);
3. ce rămâne de făcut, ordonat după impact;
4. ce trebuie să facă David personal.

Apoi faci commit cu raportul (și cu `seo/keyword-map.csv` actualizat) și îi spui lui David pe scurt, în română, cele mai importante 5 lucruri.
