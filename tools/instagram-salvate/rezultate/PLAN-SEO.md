# Plan SEO pentru elevio-agency.ro

Construit din 14 reel-uri de SEO salvate pe Instagram (breakdown-uri în [`seo/`](seo/)) și din starea actuală a site-ului (verificată în cod pe 9 noiembrie 2026). Regulile de lucru sunt în skill-ul `.claude/skills/seo-din-instagram/SKILL.md`.

## Rezumat

- **Ce avem deja:** titluri și descrieri pe fiecare pagină publică, `sitemap.ts`, `robots.ts`, zona `/echipa` exclusă de la indexare, pagină de prețuri publică, FAQ, termeni și confidențialitate.
- **Ce lipsește:** `metadataBase` și canonical, OpenGraph, date structurate (JSON-LD), un H1 cu cuvântul cheie pe homepage (acum e „Niciun apel ratat. Niciun client pierdut.”), pagini pe nișe (clinici, saloane, service-uri), profilurile externe (Search Console, Bing, Google Business Profile) și prezența în sursele pe care le citează AI-ul.
- **Ce câștigăm:** apariția la căutări de tipul „recepționer virtual AI”, „robot telefonic programări clinică”, „secretară virtuală salon” și recomandări în ChatGPT/Gemini, care aduc cereri de demo.

Efort estimat pe task: **S** = sub 1 oră, **M** = câteva ore, **L** = o zi sau mai mult.

---

## P0 — săptămâna asta

### Cod (le pot face eu pe un branch)

- [ ] **`metadataBase`, canonical și OpenGraph pe tot site-ul** · S
  - **De ce:** checklist-ul tehnic ([DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/)) cere canonical pe fiecare pagină; OpenGraph face link-urile distribuite pe LinkedIn și WhatsApp să arate bine.
  - **Fișiere:** `src/app/layout.tsx` (`metadataBase: new URL("https://elevio-agency.ro")`, `openGraph`, `twitter`); în fiecare `src/app/(site)/*/page.tsx` și în `src/app/marketing/layout.tsx`, `alternates.canonical`. Plus o imagine OG statică, `src/app/opengraph-image.png` (1200×630).
  - **Gata când:** fiecare pagină publică are în HTML `<link rel="canonical">` și `og:title`, `og:image`; build-ul trece.

- [ ] **Date structurate (JSON-LD)** · M
  - **De ce:** schema markup e în checklist ([DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/)); datele structurate ajută și AI-ul să extragă corect faptele ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)).
  - **Fișiere:** o componentă nouă `src/components/JsonLd.tsx`.
    - `Organization` (nume, logo, contact, `sameAs` cu profilurile sociale) în `src/app/layout.tsx`;
    - `Service` + `Offer` pentru fiecare plan, în `src/app/(site)/preturi/page.tsx`;
    - `FAQPage` în `src/components/FAQ.tsx` / `FAQSection.tsx`, din aceleași date ca FAQ-ul afișat;
    - `BreadcrumbList` pe subpagini.
  - **Gata când:** Rich Results Test de la Google nu arată erori pe `/`, `/preturi` și `/demo`.

- [ ] **H1 și titluri cu cuvântul cheie, răspunsul în primele propoziții** · S
  - **De ce:** un singur H1 cu cuvântul cheie, titluri de 50–60 de caractere ([DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/)); răspunsul în prima frază ([De-IHn-Bf8t](https://www.instagram.com/reel/De-IHn-Bf8t/)).
  - **Fișiere:** `src/components/Hero.tsx` și `src/app/layout.tsx`.
    - H1-ul rămâne sloganul, dar primește cuvântul cheie (ex. un rând „Recepționer virtual AI în română” ca parte din H1), sau badge-ul devine H1 și sloganul devine text vizual.
    - Titlul homepage devine „Recepționer virtual AI în română, 24/7 | Elevio” (≈ 50 de caractere).
    - Titlurile subpaginilor încep cu cuvântul cheie, nu cu „Prețuri — Elevio” (ex. „Prețuri recepționer AI pentru firme | Elevio”).
  - **Gata când:** fiecare pagină are un singur H1 relevant și titluri de 50–60 de caractere. **Textul exact îl aprobă Dydy.**

- [ ] **`llms.txt`** · S
  - **De ce:** completare la principiile de AI SEO; un rezumat clar al faptelor pentru asistenții AI.
  - **Fișiere:** `public/llms.txt`, cu ce face Elevio, pentru cine, prețuri (link spre `/preturi`), cum se cere demo, contact.
  - **Gata când:** `https://elevio-agency.ro/llms.txt` răspunde 200.

### Ce faci tu (fără cod)

- [ ] **Google Search Console** · S — verifici domeniul și trimiți `sitemap.xml`. E baza pentru tot restul ([DdZPRfiStXv](https://www.instagram.com/reel/DdZPRfiStXv/), [DfZ6ypijJW-](https://www.instagram.com/reel/DfZ6ypijJW-/)). Verificarea prin DNS se face la CyberFolks, în Netlify DNS sau cu un tag în `metadata.verification`, pe care ți-l pun eu.
- [ ] **Bing Webmaster Tools** · S — import direct din Search Console. ChatGPT folosește Bing ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)).
- [ ] **Google Business Profile pentru Elevio** · S — categorie de servicii software sau de business, descriere cu „recepționer virtual AI”, link spre site, primele recenzii de la clienți, cerute cu întrebări concrete („Ce problemă v-a rezolvat? Cum a mers?”) ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)).
- [ ] **Bing Places** · S — același profil și pe Bing.

---

## P1 — luna asta

### Cod

- [ ] **Pagini pe nișe** · L (≈ M per pagină)
  - **Ce:** `/receptioner-ai-clinici-medicale`, `/receptioner-ai-cabinete-stomatologice`, `/receptioner-ai-saloane`, `/receptioner-ai-service-auto` (lista finală după keyword map).
  - **De ce:** o pagină pentru fiecare intenție de căutare ([DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/)); paginile se aliniază cu interogările pe care le face ChatGPT ([DeVQL35PfNX](https://www.instagram.com/reel/DeVQL35PfNX/)).
  - **Fișiere:** `src/app/(site)/[nisa]/page.tsx` (sau rute statice), cu datele într-un fișier `src/lib/nise.ts`, plus `sitemap.ts`, plus linkuri din Header, Footer și homepage.
  - **Conținut:** răspunsul în primele 2 propoziții, scenariul concret al nișei (programări, urgențe, apeluri în afara programului), mostră audio pe nișă dacă o avem, FAQ specific cu `FAQPage`, CTA spre `/demo`.
  - **Gata când:** cel puțin 3 pagini live, fiecare cu cel puțin 3 linkuri interne și în sitemap.

- [ ] **Folderul `seo/` în repo (după modelul seo-autopilot)** · M
  - **Ce:** `seo/context.md`, `seo/keyword-map.csv`, `seo/backlog.md`, `seo/log.md`, `seo/ai-prompts.md` (25 de întrebări ale unui patron de clinică sau salon).
  - **De ce:** [Deu0eKalKi1](https://www.instagram.com/reel/Deu0eKalKi1/) — starea și istoricul SEO trăiesc în repo, iar fiecare sesiune pornește de acolo.
  - **Gata când:** fișierele există, iar keyword map-ul are cel puțin 30 de interogări cu URL țintă.

- [ ] **Breadcrumbs vizibile pe subpagini** · S — componentă nouă `src/components/Breadcrumbs.tsx`, plus `BreadcrumbList` în JSON-LD ([DcUCK5LiGiU](https://www.instagram.com/reel/DcUCK5LiGiU/)).

- [ ] **Audit vizual „AI slop” pe homepage** · S
  - **De ce:** [DcEJDHBTyPY](https://www.instagram.com/reel/DcEJDHBTyPY/) — vizitatorii recunosc site-urile generate și scade încrederea.
  - **Ce verific:** gradiente, carduri identice pe trei coloane, formulări „nu e X, e Y”, em dash-uri; adaug dovezi reale (mostra audio e deja un punct forte).
  - **Fișiere:** componentele din `src/components/`.

### Fără cod

- [ ] **Interogările reale din ChatGPT** · M — pentru 15 întrebări ale clienților extragem din DevTools ce caută ChatGPT ([DeVQL35PfNX](https://www.instagram.com/reel/DeVQL35PfNX/)). Rezultatul intră în `seo/keyword-map.csv` și în titlurile paginilor de nișă.
- [ ] **Prima verificare în AI** · S — întrebăm ChatGPT, Perplexity și Gemini „care e cel mai bun recepționer AI în limba română?” și „cum nu mai pierd apeluri la cabinet?”. Notăm dacă apărem și ce surse sunt citate ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)). Sursele citate devin lista de outreach.
- [ ] **Articole LinkedIn** · M — 4 articole scurte (sub ~330 de cuvinte, răspunsul în prima frază), pe pagina lui Dydy sau a Elevio, câte unul pe nișă, cu link spre pagina de nișă ([De-IHn-Bf8t](https://www.instagram.com/reel/De-IHn-Bf8t/)). Eu scriu draft-urile, tu le publici.
- [ ] **Listele „cei mai buni” și directoarele** · M — găsim listele românești de „soluții AI pentru firme”, „robot telefonic” și directoarele de software (SaaS, AI) unde putem fi incluși ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)). Skill-ul `directory-submissions` ajută la listă și texte.
- [ ] **Comunicat de presă real** · M — de exemplu „Elevio lansează primul recepționer vocal AI în limba română pentru clinici și saloane”. Fraza-țintă apare în titlu și în prima propoziție; distribuim pe site-uri de business românești (Start-up.ro, Wall-Street.ro etc.) ([De3h5TFPtgW](https://www.instagram.com/reel/De3h5TFPtgW/)). **Numai afirmații adevărate.**

---

## P2 — continuu

- [ ] **Audit SEO lunar cu Claude** · M/lună — după fluxul din skill (secțiunea 4): Search Console prin [mcp-gsc](https://github.com/AminForou/mcp-gsc), pozițiile 8–20, CTR mic → titluri noi ([DfZ6ypijJW-](https://www.instagram.com/reel/DfZ6ypijJW-/)), întrebările din `ai-prompts.md`, raport în `seo/reports/`.
- [ ] **GEO Optimizer** · S — rulăm [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) pe site acum, ca bază de comparație, și după fiecare val de modificări ([DdZPRfiStXv](https://www.instagram.com/reel/DdZPRfiStXv/)).
- [ ] **Blog / ghiduri** · L — 1–2 articole pe lună cu răspunsuri la întrebările reale ale clienților („Câte apeluri pierde un cabinet stomatologic?”, „Recepționer uman vs. AI: costuri”). Fiecare articol: top 5 rezultate citite înainte, răspunsul în primele 2 propoziții, 3 linkuri interne, draft de postare LinkedIn. Pipeline-ul e cel din [DenI2AWACSH](https://www.instagram.com/reel/DenI2AWACSH/), dar cu PR și review, nu publicare automată.
- [ ] **Pagini „Elevio vs. X” și „alternative la X”** · M — pentru concurenții pe care clienții îi caută (ex. LeadVoz, care apare în salvatele tale, și soluțiile internaționale). Corecte și cu surse ([seo-autopilot](https://github.com/Illyism/seo-skills)). Skill-ul `competitors` ajută.
- [ ] **Prezentări Gamma pe nișe** · S fiecare — câte una pe nișă, cu link spre pagina de nișă ([De-IHn-Bf8t](https://www.instagram.com/reel/De-IHn-Bf8t/)). Doar după ce paginile de nișă sunt live.
- [ ] **Profil de firmă în ChatGPT** · S — de urmărit; când OpenAI lansează „Claim your business in ChatGPT”, revendicăm imediat ([DfaOiI6PdtW](https://www.instagram.com/reel/DfaOiI6PdtW/)).
- [ ] **Insigna Google „Preferred sources”** · S — doar după ce avem blog ([DeyBx9-vl0k](https://www.instagram.com/reel/DeyBx9-vl0k/)).
- [ ] **Recenzii** · continuu — după fiecare client mulțumit, cerem recenzie pe Google Business Profile cu întrebări concrete ([DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/)).

## Argument de vânzare (bonus, din aceleași reel-uri)

[DfPsmmbx4sA](https://www.instagram.com/reel/DfPsmmbx4sA/): firmele cu program 24/7 pe Google apar primele în listele pe care le citează ChatGPT. **Elevio face real posibil programul 24/7** pentru clinici și saloane, deci e un argument direct în pitch și în copy-ul paginilor de nișă.

## Unelte de instalat sau încercat

```bash
# skill-urile SEO (seo-autopilot, seo-title-optimization etc.) în Claude Code
npx skills add Illyism/seo-skills

# Search Console în Claude: vezi README-ul din github.com/AminForou/mcp-gsc
# (are nevoie de un service account sau OAuth Google pentru proprietatea elevio-agency.ro)

# audit GEO: vezi README-ul din github.com/Auriti-Labs/geo-optimizer-skill
```

## Cum măsurăm

| KPI | Sursă | Frecvență |
|---|---|---|
| Pagini indexate / erori de indexare | Search Console → Pagini | lunar |
| Impresii și click-uri organice, CTR pe pagină | Search Console → Performanță | lunar |
| Poziția medie la interogările din keyword map | Search Console (prin mcp-gsc) | lunar |
| Apariția în ChatGPT, Perplexity, Gemini la cele 25 de întrebări | `seo/ai-prompts.md` | lunar |
| **Cereri de demo din trafic organic** | formularul `/demo` (sursa lead-ului) | lunar — singurul KPI care contează la final |
