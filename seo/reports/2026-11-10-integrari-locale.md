# Raport: integrările SEO, sesiunea locală (10.11.2026)

Preluat de la sesiunea din cloud după `seo/HANDOFF.md`. Obiectivul de brand: la „elevio ai” trebuie să apară homepage-ul, nu /despre.

## 1. Integrările din reel-uri

| Integrare | Stare | Ce a ieșit |
|---|---|---|
| GEO Optimizer (Auriti-Labs) | rulat (v4.19.10, prin uv) | Homepage 82/100, media pe 25 de pagini 81.9/100. Lipseau: RSS, /ai/*.json, ai.txt. Reparate pe branch. |
| Claude SEO (AgriciDaniel) | audit rulat din repo, fără instalare globală (pune hook-uri în ~/.claude) | Scor 78/100. Detalii mai jos. |
| Illyism seo-skills | instalate în `.claude/skills/` | seo-autopilot (configurat pentru Elevio, mod „PR for review”, fără LinkDR plătit), seo-title-optimization, blog-refresher, blitz-seo. Setup: `seo/backlog.md`, `seo/log.md`. Nu am instalat linkdr (linkuri plătite) și block-ai-scrapers (contrar strategiei). |
| Humanizer (blader) | instalat + rulat | Branch `seo/humanizer-texte` (commit 96fd637): 41 de rânduri în industrii.ts, ghiduri.ts și cele 3 pagini principale. Fapte, cifre și surse neschimbate; „firmă mică” → „afacere locală”. |
| Google Search Console MCP (AminForou) | **neinstalat** | Cere un client OAuth creat în Google Cloud Console (setare de cont): pașii pentru David sunt mai jos. uv e deja instalat. |
| Agent Reach | **neinstalat** | Semnalat „suspicious patterns” pe ClawHub și Skills.sh. Cercetarea Reddit am făcut-o fără el, doar citire: `seo/oportunitati/01b-reddit-2026-11-10.md`. |

## 2. Auditul Claude SEO (78/100): ce am reparat și ce rămâne
Reparat pe branch-ul `seo/geo-optimizer-fixes`:
- butonul „Testează gratuit” din header → „Cere un demo” (regula fără „test gratuit”);
- cardurile de domenii de pe homepage duc acum și spre /industrii/* („Cum funcționează →”), nu doar spre /demo;
- 4 ghiduri aveau data 11.11 (în viitor) → 10.11; fiecare ghid își afișează propria dată de actualizare;
- llms.txt listează paginile de servicii, /industrii și toate cele 13 ghiduri;
- RSS pentru ghiduri, /ai/summary.json, /ai/faq.json, /.well-known/ai.txt.

Rămâne (decizia lui David):
- pe homepage, „30+ antreprenori” și „Clypt … 2.000€” nu apar în faptele aprobate din `seo/context.md`: le confirmi sau le scoatem;
- încredere: firma (denumire, CUI, adresă), un telefon și un email pe domeniu în loc de gmail;
- două pagini concurează pe „agent vocal AI magazin online” (/industrii/magazine-online și /ghid/agent-vocal-ai-ecommerce);
- schema Article: autor numit, imagine, logo pătrat; antete de securitate (Referrer-Policy, X-Frame-Options).

## 3. „elevio ai” → homepage
- Search Console (27.09–8.11): 19 clicuri, 49 de afișări, poziția medie 2,7. Homepage-ul are 18 clicuri; /despre nu are nicio afișare. Interogările nu se văd (volum mic, anonimizate).
- Pe site, live: homepage-ul are titlul cu brandul și schema WebSite; /despre nu mai începe cu brandul.
- „Solicită indexarea” pe /: Google a răspuns „Cotă depășită” azi. Sarcinile programate de la 00:30 și 08:30 (11.11) cer acum întâi / și /despre, apoi ghidurile.
- LinkedIn și Crunchbase: n-am putut verifica câmpul de website (cer logare / blochează roboții).

## 4. Outreach și Gmail
- Conectorul Gmail merge local pe colaborari@elevio-agency.ro.
- Lotul 1: toate cele 11 mailuri au plecat pe 10.11; 2 bounce (webghid.ro: adresa nu există; meseriaslocal.ro: server configurat greșit). `seo/outreach/jurnal.csv` actualizat.
- Sarcină programată pe 14.11, 10:00: răspunsuri, un follow-up în același fir, lotul 2 programat pentru ziua lucrătoare următoare.
- **De la vânzări, nu SEO (pentru David):** Cristian Medical Dent a testat asistentul și întreabă de tarife; Nazzarino Dental Clinic a sunat, i-a plăcut și vrea să înțeleagă cum funcționează fără sistem informatic. Nu le-am răspuns.

## 5. Ce trebuie să facă David
1. Logare în GitHub în browserul din aplicație (sau `gh auth login`), ca să deschid și să unesc PR-urile `seo/geo-optimizer-fixes` și `seo/humanizer-texte`.
2. GSC MCP: în Google Cloud Console, proiect → activezi Search Console API → client OAuth „Desktop app” → descarci JSON-ul în `C:\Users\Dominic\seo-tools\client_secrets.json`. Restul îl configurez eu.
3. Răspuns la cele două clinici de mai sus.
4. Decizia pe afirmațiile de pe homepage și pe datele firmei.
