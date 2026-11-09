# Planul de 30 de zile: Elevio pe primele locuri în Google și ChatGPT

**Start:** luni, 10 noiembrie 2026 · **Final:** 9 decembrie 2026 · Verificat pe 9 noiembrie 2026.

**Pe ce se bazează:**
- research pe concurență: peste 25 de furnizori din România, verificați pe site-urile lor;
- cum își aleg sursele Google, ChatGPT, Claude și Perplexity, din documentația oficială și studii din 2025–2026;
- canalele externe din România: presă, directoare, Reddit, LinkedIn, Gamma, asociații;
- cele 14 reel-uri SEO salvate (`tools/instagram-salvate/rezultate/seo/`);
- datele de autocomplete Google pentru limba română.

Coloana **Cine:** 🤖 = fac eu (cod, conținut, draft-uri) · 👤 = faci tu (conturi, publicare, bani, decizii).

---

## 0. Ce am aflat. Citește asta înainte de orice.

### 0.1 Trei probleme care blochează tot

1. **Site-ul live e în urmă față de cod (verificat în Netlify).**
   - Deploy-ul de producție e din **20 octombrie** (commit `f4006fe`).
   - Ultimul commit de pe `main` (`194e7b5`: pagini legale, GDPR la formular, insigna ANPC, „+TVA” la prețuri) **nu a fost publicat niciodată**. Sitemap-ul live are 6 URL-uri în loc de 9.
   - Auto-deploy-ul de pe GitHub probabil nu e activ: deploy-ul vine prin API.
   - Până nu repornim deploy-ul, nimic din ce facem nu ajunge pe Google.
2. **Brandul „Elevio” e ocupat de alții.**
   - **elevio.ro** e o platformă de management școlar din România, cu titlul „Elevio, Platforma de Management Școlar Nr. 1 din România”. Are 149 de pagini, 129 dintre ele pe blog.
   - **elev.io** e un SaaS de knowledge base cumpărat de Dixa. Probabil la el se gândesc ChatGPT și Claude când aud „Elevio”.
   - Google spune explicit că nu dă de obicei același nume de site la două site-uri diferite.
   - Concluzia: pentru căutarea **„elevio”** simplu nu vom trece realist peste elevio.ro în 30 de zile. Pentru **„Elevio AI”**, „Elevio recepționer”, „Elevio agent vocal” și „Elevio agency” putem fi primii în câteva săptămâni.
   - De aceea **numele public devine peste tot „Elevio AI”** (detalii la 1.1).
3. **Nișa NU e goală.** Sunt peste 25 de furnizori care vând în română. Cei mai puternici la SEO:

| Concurent | Ce face bine |
|---|---|
| **callio.ro** (clinici, Timișoara) | Cel mai avansat. Pagini dedicate: /ai-receptionist-romania, /receptioner-ai-pentru-clinici, /agent-vocal-ai-clinica-stomatologica. Peste 20 de pagini Q&A /intrebari/*, comparații (vs Vapi, vs Retell), llms.txt, schema FAQPage + Product + SoftwareApplication, articol pe start-up.ro |
| **leadvoz.ro** | Pagini pe industrii, blog de ~12 articole, calculator ROI, comparații |
| **tryestera.com/ro** | Peste 25 de pagini „/ro/receptioner-ai-pentru-{nișă}” (dentar, salon, service auto, veterinar, fizioterapie…) |
| **receptionerulvirtual.ro / aireceptionist.ro** | Domenii exact-match + ~4.000 de pagini generate (industrii × orașe) |
| **agentvocalai.ro, vocalyy.ro, voxbee.ro, nexaiagency.ro** | Pagini de scenarii, FAQ, prețuri publice, blog |

### 0.2 Unde putem câștiga repede (concurență slabă)

- **„secretară virtuală” / „secretară virtuală AI”.** E cea mai bună oportunitate: site-urile care apar sunt subțiri, iar o parte sunt servicii cu oameni, nu AI.
- **„robot telefonic AI” / „robot telefonic programări”.** Apare în autocomplete Google. Doar voxbee.ro are un H1 exact.
- **Saloane și service-uri auto.** Callio face doar clinici, iar jucătorii locali acoperă slab aceste nișe.
- **Comparația independentă „agenți vocali AI în România 2026”, cu prețuri.** Nu există. Lista CloudTalk are doar furnizori internaționali. E exact tipul de pagină pe care îl citează ChatGPT: 43,8% din sursele citate de ChatGPT la întrebări „best X” sunt astfel de liste (Ahrefs, decembrie 2025).
- **Pagini lipsă la toată lumea:**
  - „cât costă un recepționer AI vs o recepționeră (salariu 2026)”;
  - „robot telefonic AI vs IVR / centrală clasică”;
  - „GDPR + AI Act art. 50 pentru clinici”;
  - „recepționer AI pentru salon”;
  - „robot telefonic pentru service auto / vulcanizare”.

### 0.3 Cum aleg sursele asistenții AI (verificat)

| Asistent | De unde ia informația | Ce înseamnă pentru noi |
|---|---|---|
| **Google, AI Overviews, AI Mode, Gemini** | Indexul Google | Search Console + conținut bun = baza |
| **ChatGPT** | Crawlerul propriu `OAI-SearchBot` + Bing (confirmat de OpenAI în 2024 și 2025) | **Bing Webmaster Tools e obligatoriu**; `OAI-SearchBot` trebuie permis |
| **Claude** | Brave Search (subprocesator Anthropic) | Brave nu are consolă de webmaster; crawlează ce poate crawla Googlebot. Indexarea vine organic, din backlinkuri și mențiuni |
| **Perplexity** | Index propriu (`PerplexityBot`) | Robots deschis |
| **Copilot** | Bing | Același Bing Webmaster |

**Ce citează AI-ul cel mai des:**
- conținutul de pe site-urile producătorilor (~51% din citările la recomandări de software);
- site-urile mici de nișă (~23%);
- **Reddit, YouTube, LinkedIn** (cele mai citate domenii terțe);
- **listele „cele mai bune X”**.

G2 și Capterra au avut **0 citări** în studiul DerivateX. Le facem pentru backlink și entitate, nu pentru citări.

**llms.txt:** niciun efect dovedit. Google spune că nu e nevoie, iar studiile pe 300.000 de domenii nu găsesc nicio corelație. Îl punem doar pentru că durează 10 minute.

### 0.4 Ce e realist în 30 de zile (fără promisiuni false)

| În 30 de zile, realist | Durează 2–6 luni |
|---|---|
| Primul loc la „Elevio AI”, „Elevio recepționer”, „Elevio agent vocal” | Top 3 la „agent vocal AI” / „recepționer AI” |
| Top 10, poate top 3, pe long-tail: „secretară virtuală AI salon”, „robot telefonic programări service auto” | Citări constante în ChatGPT la întrebări generice |
| Toate paginile indexate în Google și Bing | Indexarea în Brave, deci în Claude |
| Apariția în ChatGPT la întrebări cu numele nostru sau foarte specifice | Wikidata, Knowledge Panel |
| 8–12 mențiuni externe (presă, directoare, LinkedIn, YouTube, Gamma) | „Elevio” simplu înaintea elevio.ro (poate niciodată) |

Ținta la 30 de zile: **toată fundația + peste 20 de pagini noi + peste 10 mențiuni externe**. Poziția 1 la termenii mari vine după, ca efect al lor. Cine promite locul 1 la „agent vocal AI” în 30 de zile, cu 25 de concurenți, minte.

---

## 1. Decizii de luat în prima zi 👤

### 1.1 Numele public: „Elevio AI”

- Peste tot același nume: titlul site-ului, LinkedIn, YouTube, Google, directoare, comunicate.
- Descriptorul fix: **„Elevio AI, recepționer vocal AI în limba română”**.
- În schema JSON-LD:
  - `name: "Elevio AI"`;
  - `alternateName: ["Elevio", "Elevio Agency"]`;
  - `disambiguatingDescription`, care spune explicit că nu are legătură cu platforma școlară Elevio sau cu elev.io.

### 1.2 Domeniul

`elevio-agency.ro` sună a agenție, nu a produs. **elevioai.ro** și **elevio-ai.ro** par libere: nu au DNS. Disponibilitatea trebuie confirmată la registrar.

- **Varianta A (recomandată pe 30 de zile):** rămâi pe elevio-agency.ro. Cumperi elevioai.ro și îl redirecționezi 301, ca să-l ai și să nu ți-l ia altcineva. Mutarea pe alt domeniu se face mai târziu, cu redirect-uri 301, când site-ul se schimbă oricum.
- **Varianta B:** muți acum totul pe elevioai.ro. Domeniul e nou, deci nu pierzi autoritate. Dar trebuie refăcut tot ce e legat de domeniu (email, Search Console, profiluri). Merită doar dacă decizi în primele 2 zile.

### 1.3 Marca

- Înainte de bani mulți pe brand, verifici pe **tmdn.org/tmview** și pe **OSIM e-services** dacă „Elevio” e înregistrată în clasele 9, 38 sau 42.
- elevio.ro poate avea drept anterior în România, iar Dixa (elev.io) poate avea marcă UE.
- Dacă e liber, depui „Elevio AI” la OSIM: costă de ordinul sutelor de lei. O verificare cu un consilier de proprietate industrială e recomandată.

### 1.4 Bugetul pe 30 de zile (estimativ)

| Ce | Cost |
|---|---|
| Gamma Pro: necesar ca paginile Gamma să fie indexate de Google; implicit nu sunt | ~10–20 USD/lună |
| There's An AI For That (listare permanentă) | 49 USD |
| Comunicat pe comunicatedepresa.ro, pachetul Premium (3 linkuri do-follow) | 48 EUR |
| Domeniul elevioai.ro | ~10 EUR/an |
| Opțional: Google Ads 5–7 zile pe 3 variante de titlu, ca test de CTR, plus acces complet la Keyword Planner | ~100–150 EUR |
| **Total** | **~150 EUR, sau ~300 EUR cu testul Ads** |

---

## 2. Harta de cuvinte cheie → pagini

Fiecare pagină are **o singură** interogare principală, ca să nu se canibalizeze între ele. Variantele (cu sau fără diacritice, „receptioner” / „receptionist”) intră pe aceeași pagină ca sinonime.

| Pagina (URL) | Interogarea principală | Variante pe aceeași pagină |
|---|---|---|
| `/` (homepage) | recepționer vocal AI | Elevio AI, recepționer AI, asistent vocal AI pentru firme |
| `/agent-vocal-ai` | agent vocal AI | agent AI vocal, agent vocal AI România, agent vocal ro |
| `/receptioner-virtual` | recepționer virtual | receptionist AI, receptionist ai romania, recepție virtuală |
| `/secretara-virtuala` | secretară virtuală AI | secretară virtuală, asistent virtual telefon |
| `/robot-telefonic-ai` | robot telefonic AI | robot telefonic programări, robot centrală telefonică |
| `/receptioner-ai-cabinet-stomatologic` | recepționer AI cabinet stomatologic | agent vocal stomatologie, programări dentist telefon |
| `/receptioner-ai-clinica` | recepționer AI clinică | programări telefonice clinică, asistent vocal clinică medicală |
| `/receptioner-ai-salon` | recepționer AI salon | programări salon automat, secretară virtuală salon |
| `/robot-telefonic-service-auto` | robot telefonic service auto | programări service auto, vulcanizare programări telefon |
| `/preturi` | preț recepționer AI | cât costă un agent vocal AI |
| `/ghid/cat-costa-receptioner-ai-vs-receptionera` | cât costă un recepționer AI | salariu recepționeră 2026 vs AI |
| `/ghid/agenti-vocali-ai-romania-comparatie` | cei mai buni agenți vocali AI România | comparație recepționer AI, alternative |
| `/ghid/robot-telefonic-ai-vs-ivr` | robot telefonic AI vs IVR | centrală telefonică clasică vs AI |
| `/ghid/ai-act-gdpr-receptioner-ai` | AI Act recepționer AI / GDPR apeluri AI | e legal să răspundă un robot la telefon |
| `/ghid/ce-este-un-agent-vocal-ai` | ce este un agent vocal AI | cum funcționează un recepționer AI |
| `/ghid/apeluri-pierdute-cabinet` | apeluri pierdute cabinet / clinică | cât pierde un cabinet din apeluri nepreluate |
| `/intrebari/*` (8–12 pagini scurte) | câte o întrebare reală | „funcționează în română?”, „poate face programări în calendarul meu?”, „ce se întâmplă dacă nu știe un răspuns?”, „merge cu numărul meu actual?”… |

**Pasul 1, ziua 2:** validez volumele cu Google Keyword Planner (cont Google Ads gratuit 👤, apoi export 🤖) și extrag interogările pe care le face ChatGPT în spate pentru 15 întrebări, cu metoda din DevTools. Harta finală intră în `seo/keyword-map.csv`.

**Regula de conținut pentru fiecare pagină:**
- Răspunsul e în primele 2 propoziții.
- Pagina are ceva ce concurenții nu au: mostră audio reală pe nișa respectivă, prețuri clare, calcul de cost, conversația reală a unui apel.
- Nu inventăm cifre, clienți sau testimoniale. Testimonialele reale le adaugi când le ai, și sunt cel mai puternic semnal pe care îl putem pune.

---

## 3. Planul pe zile

### Săptămâna 1 (10–16 nov): fundația. Fără ea, restul nu contează.

| Zi | Task | Cine |
|---|---|---|
| L 10 | **Repar deploy-ul Netlify:** producția e pe commit-ul din 20 octombrie. Verific legătura cu GitHub / auto-deploy-ul și declanșez deploy pentru `main`. | 🤖 (conectorul Netlify vede proiectul `elevio-site`) + 👤 confirmare |
| L 10 | Decizia de brand „Elevio AI” și de domeniu (1.1–1.2). Cumperi elevioai.ro. | 👤 |
| L 10 | **Google Search Console:** proprietate de tip Domain, verificare prin DNS (CyberFolks sau Netlify DNS), apoi trimiți `sitemap.xml`. | 👤 (te ghidez pas cu pas) |
| L 10 | **Bing Webmaster Tools:** import din Search Console, cu un click. Asta e ChatGPT + Copilot. | 👤 |
| M 11 | **Cod, pachetul SEO tehnic:** `metadataBase`, canonical, OpenGraph + imagine OG; titluri noi cu cuvântul cheie (homepage: „Elevio AI · Recepționer vocal AI în română, 24/7”); H1 cu cuvântul cheie; JSON-LD `Organization` + `WebSite` (cu dezambiguizare), `SoftwareApplication` / `Service` + `Offer` (prețuri), `FAQPage`, `BreadcrumbList`; `llms.txt`; robots.txt cu permisiune explicită pentru `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `GPTBot`, `ClaudeBot`; **IndexNow** (fișier cheie + ping automat după deploy). Totul într-un singur PR. | 🤖 |
| M 11 | Aprobi textele pentru titluri și H1. | 👤 |
| Mi 12 | Merge, deploy, apoi „Request indexing” în Search Console pentru cele 9 pagini. Validez în Rich Results Test. | 🤖 + 👤 |
| Mi 12 | **Pagina de companie LinkedIn „Elevio AI”:** tagline „Recepționer vocal AI în limba română”, site, industrie, produse, logo, copertă; angajații legați de pagină. Profilul tău: headline „Fondator Elevio AI · recepționer vocal AI”. | 👤 (texte de la mine 🤖) |
| J 13 | **Canalul de YouTube „Elevio AI”:** primul video, un **demo real de apel în română** (2–3 min), titlu „Recepționer vocal AI în română: apel real de programare la cabinet”, cu descriere + transcriere. | 👤 înregistrare, 🤖 titluri/descrieri/transcriere |
| J 13 | **Crunchbase** (profil gratuit), **Apple Business Connect**. | 👤 |
| V 14 | Primele **4 pagini de bani**: `/agent-vocal-ai`, `/receptioner-virtual`, `/secretara-virtuala`, `/robot-telefonic-ai`, fiecare cu FAQ + schema + 3 linkuri interne. | 🤖 |
| V 14 | **Listafirme / Termene / Risco:** verifici că datele de la ONRC sunt corecte și le ceri să adauge site-ul. Primești de la mine textul mailului. | 👤 |
| S–D | Primul **articol LinkedIn** (vezi secțiunea 4.2) + 2 postări scurte. | 👤 publici, 🤖 draft |

**Sfârșitul săptămânii 1:** site corect tehnic, indexat în Google și Bing, cu 4 pagini noi, LinkedIn și YouTube active.

### Săptămâna 2 (17–23 nov): pagini de nișă + primele mențiuni externe

| Zi | Task | Cine |
|---|---|---|
| L 17 | 4 pagini de nișă: cabinet stomatologic, clinică, salon, service auto. Fiecare cu scenariu real, mostră audio (dacă o avem), FAQ specific și CTA spre /demo. | 🤖 (👤 îmi dai mostrele audio pe nișă, dacă există) |
| M 18 | **Directoare gratuite:** SaaSHub (intri automat și în lista de startup-uri din București), AlternativeTo, Capterra/GetApp, G2, Product Hunt (doar profilul, lansarea vine în săptămâna 4), AI Agents Directory (categoria Voice), Voice Agent Index, AI Agents Listing (stork.ai), StartupBlink, Seedtable. Toate cu același text. | 👤 conturi, 🤖 texte RO + EN gata de lipit |
| M 18 | **There's An AI For That** (49 USD). | 👤 |
| Mi 19 | **Comunicat de presă** (doar fapte reale): de exemplu „Elevio AI lansează un recepționer vocal AI în limba română pentru cabinete, saloane și service-uri auto, disponibil 24/7”. Fraza „recepționer vocal AI” apare în titlu și în prima propoziție. Distribuit pe **comunicatedepresa.ro Premium** (48 EUR, 3 linkuri do-follow). | 🤖 text, 👤 plată și trimitere |
| J 20 | **Pitch la presă** (subiect cu date, nu „am lansat”): start-up.ro (hello@start-up.ro, sau direct vlad@start-up.ro), StartupCafe (redactie@startupcafe.ro), ZF Hi-Tech (adrian.seceleanu@zf.ro), Wall-Street.ro (redactie@wall-street.ro). Callio a obținut articol pe start-up.ro, deci se poate. | 🤖 draft-uri personalizate, 👤 trimitere |
| V 21 | **Gamma** (vezi 4.4): primul **site Gamma public**, „Ghidul recepționerului AI pentru cabinete stomatologice”, cu indexarea activată și link spre pagina de nișă. | 👤 cont Pro, 🤖 conținut |
| S–D | Al doilea articol LinkedIn + 3 postări; al doilea video YouTube (demo salon); încep activitatea pe Reddit (vezi 4.3). | 👤 + 🤖 |

### Săptămâna 3 (24–30 nov): ghidurile pe care le citează ChatGPT

| Zi | Task | Cine |
|---|---|---|
| L 24 | **„Agenți vocali AI în România 2026: comparație onestă”.** Tabel cu prețurile publice ale concurenților (Callio 139–299 €, Agentul Vocal 299–499 €/lună, Vocalyy 600–3.360 lei, Voxbee, Estera de la 49 €…), criterii clare, data actualizării. Elevio inclus corect, inclusiv acolo unde alții sunt mai buni. Fiecare preț are sursă și dată. | 🤖 |
| M 25 | „Cât costă un recepționer AI vs o recepționeră în 2026”: calcul cu salariul minim brut din 2026 plus taxe, comparat cu 150 €/lună, plus calculator simplu pe pagină. | 🤖 |
| Mi 26 | „AI Act art. 50 + GDPR: e legal să răspundă un AI la telefon?” (cu surse oficiale) și „Robot telefonic AI vs IVR”. | 🤖 |
| J 27 | 8–12 pagini scurte `/intrebari/*` (câte o întrebare reală pe pagină, răspuns în 2 propoziții, apoi detalii). Pornesc de la întrebările de la apelurile demo: 👤 îmi spui ce te întreabă clienții. | 🤖 |
| V 28 | **Cereri de includere în liste existente:** loleworks.com (acceptă corecturi pe mail), cosimo.dev, aitfel.ro, natix.ro, spotmedia.ro. Plus CloudTalk RO (lista lor „best AI voice agents” nu are niciun român), unde e o șansă mică, dar merită. | 🤖 mailuri, 👤 trimitere |
| S–D | Al doilea și al treilea site Gamma (salon, service auto); LinkedIn; YouTube #3 (service auto); Reddit. | 👤 + 🤖 |

### Săptămâna 4 (1–9 dec): autoritate, lansare, măsurare

| Zi | Task | Cine |
|---|---|---|
| L 1 | **Product Hunt launch** (după ce ai strâns 10–20 de oameni care să susțină în ziua lansării). | 👤 |
| M 2 | **Asociații:** CMSR / PMSR (stomatologi), PADIR / ANSBR (beauty), CCIB / CCIR (Camera de Comerț), IMM România. Scopul: o listare, un articol în newsletter sau un webinar „Cum nu mai pierzi apeluri la cabinet”. | 👤 (🤖 mailuri) |
| Mi 3 | **Prima verificare AI:** cele 25 de întrebări din `seo/ai-prompts.md` în ChatGPT, Claude, Gemini, Perplexity și Copilot. Notăm unde apărem, ce se spune și ce surse se citează. Sursele citate devin ținte de outreach. | 🤖 + 👤 (ChatGPT logat) |
| J 4 | **Search Console:** paginile cu impresii pe pozițiile 8–20 primesc completări + linkuri interne; cele cu CTR mic primesc titluri noi. | 🤖 |
| V 5 | Podcast-uri: pitch la Inovatorii / Work in Progress (start-up.ro), Pastila de antreprenoriat, Permis de Antreprenor. | 🤖 draft, 👤 trimitere |
| L 8 | 2 pagini noi pe orașe, doar cu conținut real (de ex. „Recepționer AI București”), **doar** dacă Search Console arată căutări pe orașe. Nu facem mii de pagini automate. | 🤖 |
| Ma 9 | **Raportul de 30 de zile** (`seo/reports/2026-12-09.md`) + planul pentru lunile 2–3. | 🤖 |

---

## 4. Canalele, în detaliu

### 4.1 Google Search Console + Bing (ziua 1)

- **Search Console, proprietate de tip Domain:** verificare prin înregistrare TXT în DNS, care acoperă și www, și orice subdomeniu. Apoi:
  - Sitemaps → `https://elevio-agency.ro/sitemap.xml`;
  - URL Inspection → „Request indexing” pentru fiecare pagină nouă (cotă zilnică limitată).
- **Bing Webmaster Tools:** „Import from Google Search Console”, fără verificare separată. Raportul nou **AI Performance** din Bing arată aparițiile în Copilot.
- **IndexNow:** îl pun eu în cod. La fiecare deploy anunțăm automat Bing, Yandex, Seznam și Naver. Google nu participă, de aceea rămâne și Search Console.
- **Măsurare:** în analytics, `utm_source=chatgpt.com` arată vizitele venite din ChatGPT.

### 4.2 LinkedIn (cea mai bună platformă pentru noi)

Date: articolele sunt 50–66% din conținutul LinkedIn citat de AI (Semrush 2026, 325.000 de prompturi). În ChatGPT, 59% din citările LinkedIn vin de la **persoane**, nu de la pagini de companie.

**Ritmul:** 1 articol pe săptămână (500–2.000 de cuvinte, titlul formulat ca întrebare) + 3–4 postări scurte (50–300 de cuvinte), de pe **profilul tău**. Pagina de companie le redistribuie.

**Cele 4 articole din cele 30 de zile** (le scriu eu, tu le ajustezi pe vocea ta):
1. „Ce este un recepționer vocal AI și cât costă pentru un cabinet stomatologic în 2026?”
2. „Câte apeluri pierde un salon pe lună și ce înseamnă asta în bani”
3. „Agent vocal AI sau secretară? Calcul real pentru o firmă mică din România”
4. „E legal ca un AI să răspundă la telefonul firmei tale? AI Act și GDPR, pe scurt”

Fiecare articol: răspunsul în prima frază, link spre pagina corespunzătoare de pe site, iar la final „Elevio AI, recepționer vocal AI în română”.

### 4.3 Reddit (pe care nu-l putem forța)

Reddit e domeniul cel mai citat de AI, dar e și cel mai ușor de stricat: un post de spam ia ban și nu mai e citat niciodată.

- **Unde scrii:**
  - r/Romania (~1,1 milioane de membri): doar răspunsuri utile, niciodată reclamă;
  - r/antreprenoriat (mic, dar exact pe subiect);
  - r/programare: un post tehnic, „cum am făcut recunoaștere vocală în română: latență, diacritice, accente”, care e cinstit și interesant;
  - r/AI_Agents: firul săptămânal „Project Display”;
  - r/SaaS, r/smallbusiness: doar valoare, fără reclamă.
- **Regula 90/10:** de pe contul tău personal, cu istoric. Răspunzi la întrebări de genul „cum nu mai pierd apeluri / programări”. Menționezi Elevio doar când chiar e răspunsul, cu „disclaimer: e produsul meu”.
- **Ce NU faci:** conturi noi, același text în mai multe subreddit-uri, upvote-uri cumpărate, lansare directă pe r/Romania.
- 🤖 îți dau zilnic 1–2 thread-uri relevante și un draft de răspuns, iar tu postezi.

### 4.4 Gamma

**Important, verificat în documentația Gamma:**
- Site-urile Gamma noi **nu sunt indexate implicit**.
- Indexarea se activează doar pe **Pro/Ultra/Business**: Site Settings → „Make discoverable on the web”, apoi republici.
- Domeniul propriu e disponibil tot de la Pro.

Cum îl folosim:
- **3–4 site-uri Gamma cu conținut UNIC**, nu copii ale site-ului:
  - „Ghidul recepționerului AI pentru cabinete stomatologice”;
  - „Cum automatizezi programările la salon”;
  - „Robot telefonic pentru service auto: ghid practic”;
  - „Agenți vocali AI în România: ce trebuie să știi înainte să alegi”.
- Fiecare: titlu și descriere setate din Page Setup, conținut util, 1–2 linkuri spre pagina de nișă de pe elevio-agency.ro, verificat în Search Console.
- **Prezentări Gamma pentru vânzări:** aceleași deck-uri le folosești în pitch la clinici, deci au dublă utilizare.
- **Riscul:** subdomeniul gamma.site are autoritate mică, iar duplicatele concurează cu propriul site. De aceea conținutul e unic și trimite spre noi.

### 4.5 YouTube (al doilea cel mai citat domeniu în răspunsurile AI)

- 4 video-uri în 30 de zile, fiecare un **demo real de apel în română** pe o nișă (cabinet, salon, service, recepție generală).
- Titlul conține cuvântul cheie, descrierea are 150 de cuvinte și link spre pagina de nișă, iar transcrierea e încărcată.
- Shorts de 30–45 de secunde din aceleași apeluri, cu subtitrări. Avem deja Whisper în tool-ul de Instagram, deci pot genera subtitrările.
- Video-urile le pun și pe paginile de nișă (schema `VideoObject`).

### 4.6 X / Twitter

Valoare mică pentru SEO în România. Facem contul „Elevio AI” pentru consecvența numelui și reluăm în engleză demo-urile și postările de pe LinkedIn (pentru comunitatea internațională de voice AI, de exemplu replies la postările Vapi, Retell, ElevenLabs). 15 minute pe săptămână, nu mai mult.

### 4.7 Presă și PR

- Comunicat pe comunicatedepresa.ro (48 EUR) + pitch-uri personalizate (vezi săptămâna 2).
- Subiectul care prinde: **date**, de exemplu „X% din apelurile la cabinetele mici rămân nepreluate”. Le putem aduna din apelurile demo, cu acordul clienților, sau dintr-un mini-sondaj de 20 de cabinete. Plus fondatorul disponibil pentru interviu.
- Tribună de opinie pe Republica.ro: „De ce firmele mici din România pierd clienți la telefon”.
- **Wikidata:** abia după 1–2 articole independente în presă. Fără ele, item-ul se șterge.

### 4.8 Directoare (pentru backlink și consecvența entității, nu pentru citări)

- **Gratuite:** SaaSHub, AlternativeTo, Capterra/GetApp (video în engleză), G2, Crunchbase, Product Hunt, AI Agents Directory, Voice Agent Index, AI Agents Listing, StartupBlink, Seedtable, RankMyAI România.
- **Plătit:** There's An AI For That (49 USD, listare permanentă).
- **Același text peste tot:** „Elevio AI, recepționer vocal AI în limba română pentru firme mici: răspunde 24/7, face programări, preia lead-uri.”

---

## 5. Ce NU facem (ne-ar putea arunca înapoi)

- Mii de pagini automate oraș × industrie. Concurența o face, dar Google a lovit în 2026 site-urile AI SaaS cu pagini și liste auto-promoționale generate la scară.
- Liste „cele mai bune X” în care ne punem pe primul loc fără motiv. Comparația noastră e onestă și are surse.
- Recenzii, testimoniale, cifre sau rating-uri inventate. Unul dintre concurenți are rating auto-declarat 4,9/50 în schema; noi nu facem asta.
- Auto-proclamări de tipul „Nr. 1 în România” fără dovadă (riscă probleme cu ANPC pentru practici comerciale înșelătoare).
- Google Business Profile cu adresă falsă. Ghidurile cer locație fizică vizitată de clienți sau deplasare la client; un SaaS pur online nu e eligibil. **Doar** dacă faci instalare sau onboarding fizic la clienți, îl putem face ca firmă cu zonă de deservire.
- Spam pe Reddit sau upvote-uri cumpărate.
- Copierea paginilor site-ului pe Gamma, Medium sau Notion.

---

## 6. Cum măsurăm (tabloul săptămânal)

| KPI | Sursă | Ținta la 30 de zile |
|---|---|---|
| Pagini indexate | Search Console → Pagini | Toate (peste 25) |
| Impresii organice / săptămână | Search Console | Creștere săptămână de săptămână; reper de pornire: 0 |
| Poziția la „Elevio AI” | Search Console + căutare manuală incognito | 1 |
| Interogări cu impresii pe pozițiile 1–20 | Search Console | Peste 30 |
| Apariții în ChatGPT, Claude, Gemini, Perplexity, Copilot la cele 25 de întrebări | `seo/ai-prompts.md` | Peste 5 din 25 (pornim de la 0) |
| Mențiuni externe cu link | listă în `seo/log.md` | Peste 10 |
| Vizite din ChatGPT | analytics, `utm_source=chatgpt.com` | Primele vizite |
| **Cereri de demo din organic și AI** | formularul `/demo` (sursa) | Primele lead-uri; e KPI-ul care contează |

---

## 7. Ce am nevoie de la tine (acces)

1. **Netlify:** conectorul vede proiectul `elevio-site`. Am nevoie de acordul tău să declanșez un deploy de producție și să verific setarea de auto-deploy din GitHub.
2. **DNS (CyberFolks sau Netlify DNS):** acces sau 10 minute împreună, pentru verificarea Search Console și eventual pentru elevioai.ro.
3. **Search Console + Bing:** după ce le creezi, adaugă-mă prin Claude Code cu un connector sau cu mcp-gsc (îți arăt cum), ca să citesc datele în auditul săptămânal.
4. **Mostre audio reale pe nișe** (cabinet, salon, service), cu acordul celor înregistrați, pentru paginile de nișă și YouTube.
5. **Întrebările reale** pe care ți le pun clienții la demo-uri. Din ele fac paginile `/intrebari/*`.
6. **Testimoniale reale**, când le ai: nume, firmă, oraș și o frază. Sunt cel mai puternic semnal pe care îl putem adăuga.
7. Deciziile din secțiunea 1: nume, domeniu, marcă, buget.

---

### Surse principale

- **Concurență:** callio.ro, leadvoz.ro, agentvocal.ro, agentulvocal.ro, agentvocalai.ro, vocalyy.ro, receptionerulvirtual.ro, tryestera.com/ro, nexaiagency.ro, voxbee.ro (paginile au fost descărcate pe 9 noiembrie 2026).
- **OpenAI bots:** https://developers.openai.com/api/docs/bots
- **Brave crawler:** https://search.brave.com/help/brave-search-crawler
- **Google AI features:** https://developers.google.com/search/docs/appearance/ai-features
- **Google site names:** https://developers.google.com/search/docs/appearance/site-names
- **IndexNow:** https://www.indexnow.org/faq
- **Ahrefs, liste „best X”:** https://ahrefs.com/blog/best-lists-research/
- **Semrush, LinkedIn:** https://www.semrush.com/blog/linkedin-ai-visibility-study/
- **Gamma, indexare:** https://help.gamma.app/en/articles/11047720-what-does-google-indexing-mean-for-my-site
- **Google Business Profile, eligibilitate:** https://support.google.com/business/answer/3038177
- **Google, reputația site-ului (2026):** https://developers.google.com/search/blog/2026/08/update-site-reputation-policy
- **Wikidata, notabilitate:** https://www.wikidata.org/wiki/Wikidata:Notability
- **comunicatedepresa.ro:** https://www.comunicatedepresa.ro/servicii/
- **There's An AI For That:** https://theresanaiforthat.com/get-featured/
