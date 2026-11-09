# Search Console și Bing Webmaster: 10.11.2026

Proprietate Google: `sc-domain:elevio-agency.ro` (Domeniu, adăugată pe 28.09.2026). Verificat în browser, cu contul lui David.

## 1. Ce am găsit în Google Search Console

| Rubrică | Starea la 10.11.2026 |
|---|---|
| Prezentare generală | 19 clicuri în ultimele 3 luni. 3 pagini indexate, 3 neindexate. Nicio alertă pe proprietate. |
| Performanță (90 de zile) | 19 clicuri, 49 de afișări, CTR 38,8 %, poziție medie 2,7. Pe pagini: `/` 18 clicuri, 49 de afișări, poz. 2,7; `/demo` 1 clic, 15 afișări, poz. 3,3; `/marketing` 0 clicuri, 7 afișări, poz. 3,7. Interogările nu se văd (volum prea mic, Google le ascunde). Practic tot traficul vine din căutări pe nume (brand). |
| Sitemaps | **Problemă găsită:** `sitemap.xml` era citit pe 9.11, dar avea doar **6 pagini descoperite**, deși site-ul are 43. **Retrimis** pe 10.11: stare „Succes”, **43 de pagini descoperite**. |
| Pagini (indexare) | 3 indexate. 3 neindexate, toate cu motivul „Descoperită – nu este indexată” (sursa: Google, validare neîncepută). Normal la un site nou. Nu sunt erori 404, redirecționări greșite, canonical alternativ sau blocări robots. |
| Inspectarea adreselor URL | `/` e indexată și se servește prin HTTPS. Celelalte 11 pagini principale nu sunt indexate: ori „Descoperită – nu este indexată”, ori „Google nu cunoaște adresa URL” (`/agent-vocal-ai`, `/industrii`). La toate am cerut indexarea (lista de la secțiunea 2). |
| Eliminări | Nicio solicitare în ultimele 6 luni. Corect. |
| Experiența paginii / Core Web Vitals | „Nu există suficiente date de utilizare” pe mobil și pe desktop. Normal la traficul de acum. |
| HTTPS | 2 URL-uri HTTPS, 0 non-HTTPS, nicio problemă. |
| Date structurate / Îmbunătățiri | „Nu au apărut încă îmbunătățiri”: Google n-a accesat încă paginile cu FAQ, Breadcrumb și Article. Am verificat JSON-LD-ul live pe `/`, `/agent-vocal-ai`, `/preturi`, `/industrii/instalatori` și `/ghid/cat-costa-receptioner-ai-2027`: toate blocurile sunt JSON valid (Organization, WebSite, Service, FAQPage, BreadcrumbList, Article). |
| Linkuri | Linkuri externe: **0**. Linkuri interne: 3 (`/` 2, `/demo` 1). Google n-a parcurs încă paginile noi. |
| Setări | Proprietar confirmat: David. Utilizatori: doar raportat, nimic schimbat. „AI generativ în Căutare”: Include. robots.txt valid. Crawling în 90 de zile: 126 de solicitări, răspuns mediu 214 ms, 98 % cu 200 și 2 % cu 301, gazda fără probleme. |

### Verificări tehnice făcute direct pe site

- Cele 9 pagini verificate dau 200, au canonical spre ele însele și nu au `noindex`.
- `/echipa/login` are `noindex, nofollow` și e blocată în robots.txt. Corect.
- O pagină inexistentă dă 404. Corect.
- `http://` și `www.` redirecționează 301 spre `https://elevio-agency.ro/`. `http://www.` face 2 pași (`http://www` → `https://www` → `https://`). E un detaliu minor, nu blochează nimic.
- `robots.txt` permite Googlebot, Bingbot și roboții AI și blochează doar `/api/` și `/echipa/`.

## 2. Ce am făcut

- Am retrimis `https://elevio-agency.ro/sitemap.xml`: Google a citit imediat 43 de pagini, față de 6 înainte.
- „Solicită indexarea”, confirmat de Google pentru fiecare:
  1. `/agent-vocal-ai`
  2. `/receptioner-virtual`
  3. `/robot-telefonic-ai`
  4. `/industrii`
  5. `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027`
  6. `/preturi`
  7. `/industrii/magazine-online`
  8. `/industrii/cabinete-stomatologice`
  9. `/industrii/restaurante`
  10. `/industrii/instalatori`
  11. `/ghid/cat-costa-receptioner-ai-2027`
- La `/` n-am cerut indexarea: e deja indexată.
- Reparații în cod: niciuna. N-am găsit erori clare de reparat.

## 3. Ce rămâne, ordonat după impact

1. **Linkuri externe: 0.** Asta frânează indexarea și poziția cel mai mult. Directoarele, profilurile LinkedIn și ghidurile externe din planul de 30 de zile sunt pasul următor.
2. **Mâine (11.11):** cer indexarea pentru paginile rămase, în ordine: celelalte 20 de pagini `/industrii/*`, ghidurile `agent-vocal-ai-ecommerce`, `ce-este-un-agent-vocal-ai`, `ai-act-gdpr-receptioner-ai`, apoi `/ghid`, `/despre`, `/contact`, `/demo`.
3. **Peste 7–10 zile:** verific din nou Pagini (câte din 43 sunt indexate), Date structurate (apar FAQ și Breadcrumb?) și Performanță (primele interogări non-brand → `seo/keyword-map.csv`).
4. Opțional: redirecționarea `http://www` direct spre `https://elevio-agency.ro/`, într-un singur pas (setare de domeniu în Netlify).

## 4. Ce trebuie să faci tu

- Nimic urgent pentru Search Console și Bing. Logarea în Bing și acordul pentru import le-ai dat deja.

## Bing Webmaster Tools

**Site-ul nu era în Bing Webmaster.** Contul tău (logat cu Google, `David@elevio-agency.ro`) nu avea niciun site, deci importul din Search Console nu fusese făcut. Cu acordul tău, l-am importat pe 10.11. Bing a primit doar acces de citire la datele din Search Console.

| Rubrică | Stare și ce am făcut |
|---|---|
| Site | `https://elevio-agency.ro/` importat din GSC, rol Administrator. |
| Sitemaps | Importul n-a adus niciun sitemap. Am trimis `https://elevio-agency.ro/sitemap.xml`, stare „Processing”, 0 erori, 0 avertismente. |
| URL Inspection | `/`: „Not discovered”. Bing nu cunoștea nicio pagină a site-ului. |
| URL Submission | Am trimis **toate cele 43 de URL-uri** din sitemap: „43 URLs submitted successfully”. Cota zilnică e 100, au rămas 57. |
| Site Explorer | Indexed URLs: nicio dată. |
| SEO Reports (Recommendations) | Nicio dată: nimic accesat încă. |
| AI Performance (Copilot și parteneri, 3 luni) | 0 citări, 0 pagini citate. |

**IndexNow:** pe 9.11, IndexNow ar fi trebuit să-i anunțe pe Bing de toate paginile, dar Bing n-avea niciuna. Am verificat: cheia `78beedba….txt` e publicată (200) și scriptul e corect. Probabil Bing n-a acordat încă prioritate unui domeniu necunoscut. Pe 10.11, după import, am rulat din nou `npm run indexnow`: HTTP 200, 43 de URL-uri. ChatGPT și Copilot caută prin indexul Bing, deci până nu e indexat site-ul acolo, Elevio nu poate apărea în răspunsurile lor.

**Peste 2–3 zile:** verific din nou URL Inspection pe `/`, `/agent-vocal-ai`, `/receptioner-virtual` și starea sitemap-ului.
