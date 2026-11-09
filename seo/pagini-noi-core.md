# Pagini noi: landing-uri de bază + ghiduri

Creat pe 9 noiembrie 2026. Lista e pentru legarea ulterioară în `src/app/sitemap.ts`, în Header/Footer și în linkurile interne. Paginile nu sunt încă în sitemap și nici în meniu.

Toate paginile au: un singur H1, răspunsul în primele două propoziții, canonical absolut (`https://elevio-agency.ro/...`, pentru că layout-ul nu are `metadataBase`), Open Graph, FAQ vizibil + `FAQPage` JSON-LD din același array, `BreadcrumbList` JSON-LD și CTA final spre `/demo`. Ghidurile au în plus `Article` JSON-LD (`dateModified` 2026-11-09) și linia vizibilă „Actualizat: 9 noiembrie 2026”.

## Landing-uri

| URL | Title | Description | Interogarea principală | Variante |
|---|---|---|---|---|
| `/agent-vocal-ai` | Agent vocal AI în română pentru firme, 24/7 \| Elevio AI | Agent vocal AI care răspunde la telefon în română, 24/7, pe numărul tău: face programări în calendar, trimite SMS de confirmare și îți dă rezumatul apelului. | agent vocal AI | agent AI vocal, agent vocal AI România |
| `/receptioner-virtual` | Recepționer virtual AI în română, non-stop \| Elevio AI | Recepționer virtual cu AI pentru firme mici: răspunde la telefon 24/7, în română, face programări în calendar, trimite SMS și îți dă rezumatul fiecărui apel. | recepționer virtual | receptionist AI, recepționer AI, recepție virtuală |
| `/robot-telefonic-ai` | Robot telefonic AI pentru programări, fără taste \| Elevio AI | Robot telefonic AI care vorbește liber cu clienții în română, fără taste: face programări în calendar, trimite SMS și transferă apelul la tine când e nevoie. | robot telefonic AI | robot telefonic programări, robot centrală telefonică |

## Ghiduri

| URL | Title | Description | Interogarea principală |
|---|---|---|---|
| `/ghid` | Ghiduri despre agenți vocali AI pentru firme \| Elevio AI | Ghiduri practice despre agenții vocali AI: ce sunt, cât costă în 2027, comparația furnizorilor din România, magazine online, AI Act și GDPR la telefon. | ghiduri agent vocal AI (hub) |
| `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027` | Cei mai buni agenți vocali AI din România 2027: prețuri | Comparăm 10 agenți vocali AI care vând în România: prețuri publice cu sursă (verificate în noiembrie 2026), criterii clare și unde e mai bun fiecare. | cei mai buni agenți vocali AI România 2027 |
| `/ghid/cat-costa-receptioner-ai-2027` | Cât costă un recepționer AI în 2027 față de un angajat | Cât costă un recepționer AI în 2027: prețuri publice din România, ce intră în costul unui angajat la recepție și un exemplu de calcul al apelurilor pierdute. | cât costă un recepționer AI |
| `/ghid/agent-vocal-ai-ecommerce` | Agent vocal AI pentru magazin online: comenzi la telefon | Agent vocal AI pentru magazinul online: preia comenzi la telefon, răspunde la întrebări despre livrare și retur și îți transmite cererile, 24/7, în română. | agent vocal AI magazin online |
| `/ghid/ce-este-un-agent-vocal-ai` | Ce este un agent vocal AI și cum funcționează \| Elevio AI | Ce este un agent vocal AI, explicat simplu: cum transformă vorbirea în text, cum înțelege cererea, cum răspunde cu voce, ce limite are și când merită folosit. | ce este un agent vocal AI |
| `/ghid/ai-act-gdpr-receptioner-ai` | AI Act și GDPR: e legal ca un AI să răspundă la telefon? | E legal ca un AI să răspundă la telefonul firmei? Ce cere AI Act (clientul află că vorbește cu un AI) și ce cere GDPR pentru înregistrări și transcrieri. | AI Act recepționer AI / GDPR apeluri AI |

Sursa unică a ghidurilor (titluri, descrieri, conținut, FAQ): `src/lib/ghiduri.ts`. Un ghid nou se adaugă acolo; ruta `/ghid/[slug]` îl generează static.

## De făcut la legare

- Adaugă cele 9 URL-uri în `src/app/sitemap.ts` (ghidurile cu `lastModified` 2026-11-09, `changeFrequency: "monthly"`).
- Linkuri din Header/Footer cel puțin spre `/agent-vocal-ai` și `/ghid`.
- Paginile trimit deja spre `/industrii`, care încă nu există (o face alt agent). Până apare, linkul dă 404.
- Unifică `src/components/landing/JsonLd.tsx` și `schema.ts` cu helperul comun de JSON-LD.
- Comparația din `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027` se reverifică lunar (prețuri, furnizori noi). Estera are prețul marcat „neconfirmat”.
- Când se publică oficial salariul minim pentru 2027, actualizează secțiunea din `/ghid/cat-costa-receptioner-ai-2027`.
