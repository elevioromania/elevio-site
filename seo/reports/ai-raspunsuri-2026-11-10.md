# Răspunsurile AI-urilor la cele 25 de întrebări: 10.11.2026

Metodă: o conversație nouă pentru fiecare întrebare. ChatGPT folosit fără cont, deci fără memorie sau personalizare. „Surse” = domeniile din linkurile din răspuns. Unde nu e trecută nicio sursă, ChatGPT a răspuns din cunoștințe generale, fără căutare pe web.

## ChatGPT (fără cont)

**Rezultat: Elevio AI apare din proprie inițiativă în 0 din 25 de răspunsuri.** Când e întrebat direct de el, ChatGPT îl confundă cu alte firme.

| # | Întrebare (prescurtat) | Elevio? | Surse citate | Observații |
|---|---|---|---|---|
| 1 | Cel mai bun recepționer vocal AI în română | Nu | syncpbx.ro, voice.czrsoftware.ro, kallina.info, synthflow.ai | Locul 1: SyncPBX („de la 29 €/lună”). |
| 2 | Ce agenți vocali AI există în RO | Nu | agentvocalai.ro, voxbee.ro, voice.czrsoftware.ro, nexai.ro, aifactory.ro, automatizez.ro, manvro.com, asistentvocal.ro, kallina.info | |
| 3 | Robot telefonic AI pentru programări | Nu | moonchat.ro, recepto.ro, syncpbx.ro | |
| 4 | Apeluri pierdute la cabinet stomatologic după program | Nu | (fără) | Întrebat ulterior de „elevio”, l-a confundat cu **Levio Health** (levio-health.com). |
| 5 | Asistent AI la telefon pentru clinici | Nu | callio.ro, medicaldox.ai, generativa.ro, moonchat.ro, aida-ai.health | |
| 6 | Cât costă un recepționer AI în RO | Nu | voice.czrsoftware.ro | Reluat curat după contaminare. |
| 7 | Alternative la recepționeră pentru clinică | Nu | (fără) | |
| 8 | Rezervări la restaurant când nu răspunde nimeni | Nu | (fără) | |
| 9 | Agent vocal AI pentru magazin online | Nu | evocal.ro | |
| 10 | Telefonul când ești pe lucrare (instalator) | Nu | (fără) | |
| 11 | Robot telefonic service auto / ITP | Nu | agentis.ro, sambla.ro, voxbee.ro, onist.ro, tryestera.com, zenoagent.ai, novabot.ro, agentvocalai.ro, techingrained.com, svennis.ai, receptionerulvirtual.ro | |
| 12 | Recepție virtuală pensiune / hotel | Nu | (fără) | |
| 13 | **Ce este Elevio AI?** | Da, **greșit** | elevio-ai.com, LinkedIn | Descrie **elevio-ai.com**, altă firmă (ecosistem pentru ospitalitate, „Beta 1.0”, acces anticipat). Nu pomenește elevio-agency.ro și nu spune că e recepționer vocal în română. |
| 14 | Elevio AI vs Callio | Da, fără date | callio.ro | Știe prețurile Callio (Flex 139 €, Starter 189 €, Professional 299 €), dar despre Elevio spune că ar trebui verificat. Nu are nicio sursă despre Elevio. |
| 15 | Elevio AI vs LeadVoz | Da, vag | (fără) | „Elevio (Romania): apeluri inbound”. Programările: da. Apelurile outbound, calificarea lead-urilor și CRM-ul le trece ca „nedocumentate”. Nicio sursă. |
| 16 | E legal ca AI să răspundă la telefonul firmei | Nu | (fără) | |
| 17 | Recepționer AI și GDPR | Nu | (fără) | |
| 18 | Robot telefonic AI vs IVR | Nu | getvoip.com, thoughtly.com | Surse în engleză: nicio sursă românească. Oportunitate de conținut. |
| 19 | Programări automate prin telefon pentru salon | Nu | ringeden.com | |
| 20 | Asistent vocal AI care vorbește bine românește | Nu | (fără) | |
| 21 | Recepționer AI cu Cal.com / Calendly | Nu | elevenlabs.io | Elevio are exact integrarea asta, dar nu apare. |
| 22 | Cum reduc apelurile pierdute (afacere locală) | Nu | kommo.com | |
| 23 | Cei mai buni agenți vocali AI din RO în 2027 | Nu | agentvocal.ro, voxbee.ro, voice.czrsoftware.ro, kallina.info, infraweb.ro, druidai.com, asistentvocal.ro, facemai.ro | Ghidul nostru `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027` nu e încă indexat în Bing. |
| 24 | Secretariat telefonic automat pentru avocatură | Nu | (fără) | |
| 25 | Firmă din București: recepționeri AI pentru clinici | Nu | callio.ro, tenoia.com, medicaldox.ai | |

### Ce e greșit și unde se corectează

1. **Confuzie de nume (cea mai gravă):** „Elevio AI” = elevio-ai.com (hoteluri și restaurante, Beta). Mai apare confuzia cu Levio Health. Pe site, în `src/`, numele trebuie legat clar de domeniu și de produs:
   - JSON-LD `Organization`: `name` „Elevio AI”, `alternateName`, `url` https://elevio-agency.ro, `sameAs` spre LinkedIn și profilurile din directoare;
   - pe `/despre`: o frază de tipul „Elevio AI (elevio-agency.ro) este un recepționer vocal AI în limba română, construit de David Morega în România”.

   Corectarea propriu-zisă vine însă din afară: Bing trebuie să indexeze site-ul (cerut azi), iar profilurile din directoare și de pe LinkedIn trebuie să folosească aceeași formulare.
2. **Nicio sursă despre Elevio:** ChatGPT nu găsește nimic de citat. Cauza principală: site-ul nu e în indexul Bing, unde caută ChatGPT. Prin import, sitemap și cele 43 de URL-uri trimise azi, asta ar trebui să se schimbe în 1–2 săptămâni.

## Surse citate de ChatGPT: ținte de outreach

Grupate după tip. Pentru concurenți, ținta e să apărem lângă ei în listele și articolele care îi citează, nu linkul de la ei.

- **Liste, comparații, articole (ținte reale de outreach):**
  - sambla.ro
  - techingrained.com
  - getvoip.com și thoughtly.com (în engleză, pentru IVR vs AI)
  - kommo.com (blog)
  - ringeden.com
  - infraweb.ro
  - facemai.ro
  - generativa.ro
- **Concurenți citați direct** (îi urmărim; apar în răspunsuri pentru că au pagini indexate):
  - syncpbx.ro, voice.czrsoftware.ro, kallina.info, recepto.ro, moonchat.ro
  - callio.ro, medicaldox.ai, aida-ai.health, tenoia.com
  - agentvocalai.ro, agentvocal.ro, voxbee.ro, nexai.ro, aifactory.ro, automatizez.ro, asistentvocal.ro, manvro.com
  - evocal.ro, agentis.ro, onist.ro, tryestera.com, zenoagent.ai, novabot.ro, svennis.ai, receptionerulvirtual.ro, druidai.com
- **Platforme:** synthflow.ai, elevenlabs.io

## Perplexity (fără cont, oprit la logare)

Perplexity a cerut logare după câteva întrebări („Sign in to continue using Perplexity”). Au rămas 21 de întrebări.

| # | Elevio? | Surse citate | Observații |
|---|---|---|---|
| 1 | Nu | daktela.com, getvoip.com | Locul 1: Daktela AI Voicebot, „soluție românească”. |
| 3 | Nu | geekflare.com, start-up.ro, bland.ai | |
| 4 | Nu | start-up.ro, lucilla.dental | |
| 5 | Nu | start-up.ro | **start-up.ro apare în 3 din 4 răspunsuri:** prima țintă de PR. |

## Gemini, Copilot, Claude

Neîncepute:
- Gemini cere acceptarea termenilor pentru contul Workspace elevio-agency.ro.
- Copilot cere logare.
- Claude cere logare.

## Istoric

| Data | Asistent | Întrebări cu Elevio menționat din proprie inițiativă | Observații |
|---|---|---|---|
| 10.11.2026 | ChatGPT (fără cont) | 0 / 25 | La „Ce este Elevio AI?” descrie elevio-ai.com (altă firmă). Site-ul nu era în indexul Bing. |
| 10.11.2026 | Perplexity (fără cont) | 0 / 4 | Oprit la logare. start-up.ro e citat des. |
