# Predare: SEO Elevio AI, de la sesiunea din cloud la sesiunea locală (10.11.2026)

De acum, sesiunea locală (Workstation, `C:\Users\Dominic\Desktop\claude\elevio-site`) conduce tot SEO-ul. Citește documentul ăsta întâi, apoi fișierele din „Unde e tot”.

## Reguli de lucru (David le-a cerut explicit)
- **Autonomie:** David a cerut să fie făcute toate demersurile fără să i se mai ceară aprobarea. Excepții, unde întrebi întâi: plăți, ștergeri, setări de cont și postări publice în numele lui.
- **Text:** skill-ul `elevio-copywriting`. Fără linie de pauză (—), „afaceri locale”, fără „pilot” sau „test gratuit”, fără cifre sau clienți inventați. Rezultatul clienților se formulează așa: „au recuperat multe programări cu asistentul, deși aveau deja pe cineva la recepție”. Vocea lui David pe LinkedIn: o poveste reală, fraze scurte, „am construit Elevio ca să rezolv exact asta”.
- **Piața:** doar România.
- **Brand:** „Elevio AI”, pe domeniul elevio-agency.ro. Se poate confunda cu elevio.ro (platformă școlară) și cu elev.io.
- **Git:** `git pull` pe main → branch nou → `npm run lint` + `npm run build` → PR → merge. Netlify publică automat după merge (verificat pe 10.11). După deploy: `npm run indexnow`.
- **Mailuri:** pentru redacții și bloguri, variantele din `seo/outreach/mesaje.md`. Template-ul „Passive Script” (`vanzari/cold-email-clienti.md`) e DOAR pentru vânzări către clienți. Nu dăm numele clienților fără acordul lor.

## Ce e făcut
- **Site (PR-urile #20–#24, #30–#32, toate live):**
  - 33 de pagini noi: /agent-vocal-ai, /receptioner-virtual, /robot-telefonic-ai, /industrii + 24 de domenii, /ghid + 5 ghiduri (inclusiv „cei mai buni agenți vocali AI România 2027”).
  - Metadata, canonical, OG, JSON-LD: Organization cu sameAs (LinkedIn, Crunchbase) și fondatorul; WebSite doar pe homepage.
  - robots cu roboții AI, llms.txt, IndexNow, link Google Preferred Sources.
- **Brand:** căutarea „elevio ai” ducea pe /despre. Reparat pe 10.11: titlul /despre fără brand la început, link spre acasă, WebSite doar pe homepage. Rămâne de verificat în Search Console după reindexare.
- **Instagram:** cele 150 de postări salvate sunt analizate (`tools/instagram-salvate/rezultate/`). Skill-urile `seo-din-instagram` și `instagram-salvate` există.
- **Outreach:** lotul 1, 11 mailuri, trimis pe 10.11 de pe colaborari@elevio-agency.ro (`seo/outreach/jurnal.csv`, cu thread_id).
- **Research:** `seo/oportunitati/00-PLAN-ACTIUNE.md` (planul consolidat), 01–05 (Reddit, forumuri, 46 de ținte noi, PR și podcasturi, unde apar concurenții), plus `seo/outreach/prospecti.csv` (65 de ținte).
- **Conținut:**
  - `seo/linkedin/articole.md`: 5 articole pe vocea lui David; primul e cel despre restaurante;
  - `seo/presa/articol-redactie-elevio.docx`: articolul general pentru redacții;
  - `seo/outreach/articol-*.md`: 3 articole oaspete.
- **Ce a făcut sesiunea locală de Search Console:** Crunchbase live, SaaSHub / EveryDev / RankMyAI / Future Tools trimise, indexarea Google automată la 00:30 și 08:30, testul AI pe 12 ale fiecărei luni.

## Ce urmează (în ordine)
1. **Integrările SEO din reel-uri.** Le instalezi și le rulezi tu, local. Citește fiecare repo înainte să-l instalezi.
   - Google Search Console MCP (github.com/AminForou/mcp-gsc), conectat la elevio-agency.ro.
   - GEO Optimizer (github.com/Auriti-Labs/geo-optimizer-skill): rulat pe site, repari ce e sigur, cu PR.
   - Illyism seo-skills (`npx skills add Illyism/seo-skills`): seo-autopilot configurat din `seo/context.md`, mod „PR for review”, apoi „Setup”.
   - Claude SEO: audit complet, raportul în `seo/reports/`.
   - Humanizer (github.com/blader/humanizer): treci prin el textele din `src/lib/industrii.ts`, `src/lib/ghiduri.ts` și paginile /agent-vocal-ai, /receptioner-virtual, /robot-telefonic-ai. Păstrezi faptele și regulile, faci PR.
   - Agent Reach: discuții Reddit pentru `seo/oportunitati/01-reddit.md`. Nu posta nimic.
2. **„elevio ai” → /despre:** din Search Console, „Solicită indexarea” pe / și /despre, verifici ce pagină primește căutarea „elevio ai” și verifici că LinkedIn, Crunchbase și directoarele au ca site homepage-ul.
3. **14.11, follow-up la outreach:** sarcina programată vine în sesiunea locală.
   - Răspunsuri: cei interesați primesc articolul; un singur follow-up celorlalți, în același fir.
   - Lotul 2, după `00-PLAN-ACTIUNE.md`: start-up.ro (Vlad Andriescu), ZF IT Generation, DentalNews, StartupCafe, podcasturile, partenerii din stomatologie. Se programează pentru ziua lucrătoare următoare la 10:00.
   - Trimiterea se face de pe colaborari@elevio-agency.ro, prin conectorul Gmail. Dacă în sesiunea locală nu ai conectorul Gmail, scrie-i sesiunii din cloud (session_01YZAbWGJjQAi865PQcpN2MB) să trimită ea.
4. **Peste 2–4 săptămâni:** testul titlurilor pentru CTR din datele Search Console (seo-title-optimization), plus bucla lunară de blog (cercetare → articol → PR → măsurare).
5. **Luna viitoare:** Gamma Pro (3–4 ghiduri indexabile) și comunicatul de 9 € (opțional).

## Ce face David
- Cere 3–5 recenzii reale de la clienți (Google / Trustpilot).
- Publică un articol LinkedIn pe săptămână și comentează la postările lui Alexandru Boghiu și Alexandru Onetiu.
- Își face conturi pe Qwoted și Featured.com.
- Conectează OpenSEO din claude.ai → Connectors (opțional).

## Unde e tot
- `seo/PLAN-30-ZILE.md`: planul pe 30 de zile.
- `seo/context.md`: faptele despre produs, concurenții, regulile.
- `seo/keyword-map.csv`, `seo/ai-prompts.md`: datele de lucru.
- `seo/oportunitati/`, `seo/outreach/`, `seo/linkedin/`, `seo/presa/`, `seo/reports/`, `seo/directories.md`.
- Skill-uri: `.claude/skills/seo-din-instagram`, `elevio-search-console`, `instagram-salvate`.
