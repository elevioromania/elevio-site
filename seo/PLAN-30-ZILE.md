# Planul de 30 de zile: Elevio pe primele locuri în Google și ChatGPT

**Piața: România.** **Start:** luni, 10 noiembrie 2026 · **Final:** 9 decembrie 2026 · Verificat pe 9 noiembrie 2026.

**Pe ce se bazează:**
- research pe concurență: peste 25 de furnizori din România, verificați pe site-urile lor;
- cum își aleg sursele Google, ChatGPT, Claude și Perplexity, din documentația oficială și studii din 2025–2026;
- canalele externe din România: presă, directoare, Reddit, LinkedIn, Gamma, asociații;
- cele 14 reel-uri SEO salvate (`tools/instagram-salvate/rezultate/seo/`);
- datele de autocomplete Google pentru limba română.

**Focus: doar piața din România.** Tot conținutul e în română, iar canalele sunt cele unde stau patronii români: Google.ro, ChatGPT în română, LinkedIn, Facebook, YouTube, presă și comunități românești. Canalele internaționale rămân doar unde aduc identitate de brand (Crunchbase) și sunt marcate opțional.

Coloana **Cine:** 🤖 = fac eu (cod, conținut, draft-uri) · 👤 = faci tu (conturi, publicare, bani, decizii).

---

## 0. Ce am aflat. Citește asta înainte de orice.

### 0.1 Trei probleme care blochează tot

1. ✅ **Rezolvat pe 9 noiembrie: site-ul live era în urmă față de cod (verificat în Netlify).**
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

- **„robot telefonic AI” / „robot telefonic programări”.** Apare în autocomplete Google. Doar voxbee.ro are un H1 exact.
- **Domeniile pe care nu le acoperă nimeni bine.** Concurenții români se concentrează pe clinici (Callio), vânzări și lead-uri (LeadVoz) și câteva verticale (salon, service auto, pensiuni, asigurări, imobiliare). **Nu am găsit niciun concurent român cu pagini dedicate pentru:**
  - **e-commerce / magazine online**: LeadVoz doar menționează magazinele în reclamă;
  - **meserii și servicii la domiciliu**: reparații acoperișuri, instalatori, electricieni, centrale termice, curățenie, mutări, renovări;
  - **servicii profesionale**: avocați, notari, contabili;
  - **restaurante, școli de șoferi, săli de fitness, rent-a-car.**

  Cine face primul o pagină bună pe nișa respectivă o câștigă: concurența e aproape zero, iar fiecare pagină aduce o căutare long-tail plus un răspuns pe care ChatGPT îl poate cita. Lista completă e în secțiunea 2.2.
- **Conținutul pentru 2027, publicat de acum.** Nimeni nu a scris încă „cei mai buni agenți vocali AI în 2027”. Prima pagină bună pe o căutare cu anul viitor tinde să ia poziția și s-o țină (reel-ul [De-IHn-Bf8t](https://www.instagram.com/reel/De-IHn-Bf8t/)). Detalii în secțiunea 2.3.
- **Comparația independentă „cei mai buni agenți vocali AI în România 2027”, cu prețuri.** Nu există. Lista CloudTalk are doar furnizori internaționali. E exact tipul de pagină pe care îl citează ChatGPT: 43,8% din sursele citate de ChatGPT la întrebări „best X” sunt astfel de liste (Ahrefs, decembrie 2025).
- **Pagini lipsă la toată lumea:**
  - „cât costă un recepționer AI vs o recepționeră (salariu 2026)”;
  - „robot telefonic AI vs IVR / centrală clasică”;
  - „GDPR + AI Act art. 50 pentru clinici”;
  - „agent vocal AI pentru magazin online (comenzi, retururi, status livrare)”;
  - „robot telefonic pentru firme de reparații acoperișuri / instalatori”;
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
| Top 10, poate top 3, pe long-tail: „agent vocal AI magazin online”, „robot telefonic firmă acoperișuri”, „cei mai buni agenți vocali AI 2027” | Citări constante în ChatGPT la întrebări generice |
| Toate paginile indexate în Google și Bing | Indexarea în Brave, deci în Claude |
| Apariția în ChatGPT la întrebări cu numele nostru sau foarte specifice | Wikidata, Knowledge Panel |
| 8–12 mențiuni externe (presă, directoare, LinkedIn, YouTube, Gamma) | „Elevio” simplu înaintea elevio.ro (poate niciodată) |

Ținta la 30 de zile: **toată fundația + peste 20 de pagini noi + peste 10 mențiuni externe**. Poziția 1 la termenii mari vine după, ca efect al lor. Cine promite locul 1 la „agent vocal AI” în 30 de zile, cu 25 de concurenți, minte.

---

## 1. Decizii de luat în prima zi 👤

### 1.1 Numele public: „Elevio AI” ✅ (decis pe 9 noiembrie)

- Peste tot același nume: titlul site-ului, LinkedIn, YouTube, Google, directoare, comunicate.
- Descriptorul fix: **„Elevio AI, recepționer vocal AI în limba română”**.
- În schema JSON-LD:
  - `name: "Elevio AI"`;
  - `alternateName: ["Elevio", "Elevio Agency"]`;
  - `disambiguatingDescription`, care spune explicit că nu are legătură cu platforma școlară Elevio sau cu elev.io.

### 1.2 Domeniul

`elevio-agency.ro` sună a agenție, nu a produs. **elevioai.ro** și **elevio-ai.ro** par libere: nu au DNS. Disponibilitatea trebuie confirmată la registrar.

- **Varianta A (recomandată pe 30 de zile):** rămâi pe elevio-agency.ro. Pentru SEO **nu e obligatoriu** un domeniu nou: Google și ChatGPT lucrează la fel de bine cu elevio-agency.ro. elevioai.ro e doar o protecție, ca să nu-l ia altcineva (~10 €/an); îl cumperi când vrei, cu redirect 301 spre site. Mutarea pe alt domeniu se face mai târziu, cu redirect-uri 301, când site-ul se schimbă oricum.
- **Varianta B:** muți acum totul pe elevioai.ro. Domeniul e nou, deci nu pierzi autoritate. Dar trebuie refăcut tot ce e legat de domeniu (email, Search Console, profiluri). Merită doar dacă decizi în primele 2 zile.

### 1.3 Marca

- Înainte de bani mulți pe brand, verifici pe **tmdn.org/tmview** și pe **OSIM e-services** dacă „Elevio” e înregistrată în clasele 9, 38 sau 42.
- elevio.ro poate avea drept anterior în România, iar Dixa (elev.io) poate avea marcă UE.
- Dacă e liber, depui „Elevio AI” la OSIM: costă de ordinul sutelor de lei. O verificare cu un consilier de proprietate industrială e recomandată.

### 1.4 Bugetul pe luna asta: maximum 25 € ✅ (decis pe 9 noiembrie)

Gamma Pro rămâne pentru luna următoare. Tot restul planului e **gratuit**. Singura cheltuială este **un articol plătit (sau două mai mici), în total maximum 25 €**.

| Ce | Cost | Note |
|---|---|---|
| **Articolul plătit**, varianta 1: comunicat pe comunicatedepresa.ro, pachetul Basic (9 €), care merge la redacții. Plus, din restul de ~15 €, un articol sponsorizat pe un blog românesc de nișă (e-commerce, antreprenoriat, meserii), negociat prin outreach-ul din 4.9. | ~9 € + ~15 € | Recomandat: două mențiuni în loc de una |
| **Articolul plătit**, varianta 2: comunicatedepresa.ro, pachetul Standard (1 link do-follow, distribuit la ~2.100 de jurnaliști) | 28 € (ușor peste buget; TVA neclar) | Dacă vrei un singur pachet simplu |
| Domeniul elevioai.ro | ~10 €/an | Amânat |
| Gamma Pro | ~10–20 USD | Amânat pe luna următoare |
| **Total luna asta** | **≤ 25 €** | |

**Cum înlocuim Gamma Pro luna asta:**
- Ghidurile externe (4.4) merg pe **Google Sites**, care e gratuit, se indexează și se poate verifica în Search Console. Când iei Gamma Pro, le republicăm și acolo, mai frumos.
- **Gamma gratuit** îl folosești pentru prezentările de vânzări, unde contează designul, nu indexarea.

**Ce mai e gratuit:**
- **Pitch-uri directe** la start-up.ro, StartupCafe, ZF Hi-Tech și Wall-Street.ro. Callio a ajuns pe start-up.ro tot așa.
- **Cereri de includere** în listele existente (loleworks, cosimo.dev, aitfel.ro, natix.ro, spotmedia).
- **Outreach prin e-mail cu tool-ul tău** pentru articole gratuite (vezi 4.9).
- **Testul de titluri** din Search Console. Keyword Planner merge și cu un cont Google Ads fără nicio campanie activă.

---

## 2. Harta de cuvinte cheie → pagini

Fiecare pagină are **o singură** interogare principală, ca să nu se canibalizeze între ele. Variantele (cu sau fără diacritice, „receptioner” / „receptionist”) intră pe aceeași pagină ca sinonime.

| Pagina (URL) | Interogarea principală | Variante pe aceeași pagină |
|---|---|---|
| `/` (homepage) | recepționer vocal AI | Elevio AI, recepționer AI, asistent vocal AI pentru firme |
| `/agent-vocal-ai` | agent vocal AI | agent AI vocal, agent vocal AI România, agent vocal ro |
| `/receptioner-virtual` | recepționer virtual | receptionist AI, receptionist ai romania, recepție virtuală |
| `/robot-telefonic-ai` | robot telefonic AI | robot telefonic programări, robot centrală telefonică |
| `/industrii` | agent vocal AI pe industrii | hub cu toate domeniile (2.2), linkuri spre fiecare |
| `/industrii/{domeniu}` | vezi 2.2 | câte o pagină pe domeniu |
| `/preturi` | preț recepționer AI | cât costă un agent vocal AI |
| `/ghid/cat-costa-receptioner-ai-2027` | cât costă un recepționer AI | 2027, salariu recepționeră vs AI, preț agent vocal AI |
| `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027` | cei mai buni agenți vocali AI România 2027 | comparație recepționer AI, alternative, 2026 (vezi 2.3) |
| `/ghid/robot-telefonic-ai-vs-ivr` | robot telefonic AI vs IVR | centrală telefonică clasică vs AI |
| `/ghid/ai-act-gdpr-receptioner-ai` | AI Act recepționer AI / GDPR apeluri AI | e legal să răspundă un robot la telefon |
| `/ghid/ce-este-un-agent-vocal-ai` | ce este un agent vocal AI | cum funcționează un recepționer AI |
| `/ghid/apeluri-pierdute-firme-mici` | apeluri pierdute firmă | cât pierde o firmă mică din apeluri nepreluate (exemple pe 4–5 domenii) |
| `/ghid/agent-vocal-ai-ecommerce` | agent vocal AI magazin online | suport telefonic automat e-commerce, status comandă telefon |
| `/intrebari/*` (8–12 pagini scurte) | câte o întrebare reală | „funcționează în română?”, „poate face programări în calendarul meu?”, „ce se întâmplă dacă nu știe un răspuns?”, „merge cu numărul meu actual?”… |

**Pasul 1, ziua 2:** validez volumele cu Google Keyword Planner (cont Google Ads gratuit 👤, apoi export 🤖) și extrag interogările pe care le face ChatGPT în spate pentru 15 întrebări, cu metoda din DevTools. Harta finală intră în `seo/keyword-map.csv`.

### 2.2 Paginile pe domenii (`/industrii/...`)

**Toate domeniile din România în care Elevio poate prelua apeluri**, grupate pe valuri. Întâi vin domeniile cu bani și concurență mică, apoi cele unde concurența e mai mare.

| Val | Domeniu | URL | Interogarea principală | De ce sună clienții (scenariul de pe pagină) |
|---|---|---|---|---|
| **1** (săpt. 2) | **Magazine online / e-commerce** | `/industrii/magazine-online` | agent vocal AI magazin online | status comandă, retururi, livrare, stoc, comandă telefonică |
| 1 | **Reparații acoperișuri** | `/industrii/reparatii-acoperisuri` | robot telefonic firmă acoperișuri | infiltrații urgente, cerere de ofertă, programare la evaluare |
| 1 | **Instalatori** | `/industrii/instalatori` | robot telefonic instalator | urgențe (țeavă spartă), programare intervenție, zona de deplasare, tarif |
| 1 | **Electricieni** | `/industrii/electricieni` | agent vocal AI electrician | urgențe, programare, ofertă |
| 1 | **Centrale termice / climatizare** | `/industrii/centrale-termice-climatizare` | programări revizie centrală telefon | revizii anuale (sezon de vârf), defecte, montaj aer condiționat |
| 1 | **Cabinete stomatologice** | `/industrii/cabinete-stomatologice` | recepționer AI cabinet stomatologic | programări, urgențe dentare, prețuri, reprogramări |
| 1 | **Saloane & frizerii** | `/industrii/saloane-frizerii` | recepționer AI salon | programări pe specialist și serviciu, anulări, prețuri |
| 1 | **Service auto** | `/industrii/service-auto` | robot telefonic service auto | programări, ITP, vulcanizare, estimări, status mașină |
| **2** (săpt. 3) | Clinici medicale | `/industrii/clinici-medicale` | recepționer AI clinică | programări pe medic, analize, decontare CAS |
| 2 | Clinici veterinare | `/industrii/clinici-veterinare` | programări veterinar telefon | urgențe, vaccinări, programări |
| 2 | Kinetoterapie / fizioterapie | `/industrii/kinetoterapie` | programări kinetoterapie | ședințe, abonamente |
| 2 | Clinici estetice / dermatologie | `/industrii/clinici-estetice` | programări clinică estetică | consultații, proceduri, prețuri |
| 2 | Restaurante | `/industrii/restaurante` | rezervări restaurant telefon automat | rezervări, program, meniu, evenimente |
| 2 | Hoteluri & pensiuni | `/industrii/hoteluri-pensiuni` | recepție virtuală pensiune | disponibilitate, rezervări, check-in, prețuri |
| 2 | Imobiliare | `/industrii/imobiliare` | agent vocal AI imobiliare | calificare lead-uri, programare vizionări |
| 2 | Curățenie & mutări | `/industrii/curatenie-mutari` | programări firmă curățenie | oferte, programări, zone |
| 2 | Construcții & renovări | `/industrii/constructii-renovari` | robot telefonic firmă construcții | cereri de ofertă, programare evaluare |
| **3** (săpt. 4) | Avocați & notari | `/industrii/avocati-notari` | recepționer virtual cabinet avocatură | programări consultații, filtrare cazuri |
| 3 | Contabilitate | `/industrii/contabilitate` | asistent telefonic firmă contabilitate | programări, întrebări frecvente, termene |
| 3 | Școli de șoferi | `/industrii/scoli-soferi` | programări școală de șoferi | înscrieri, programări ore, prețuri |
| 3 | Săli de fitness | `/industrii/sali-fitness` | recepție telefonică sală fitness | abonamente, program, clase |
| 3 | Rent-a-car | `/industrii/rent-a-car` | rezervări rent a car telefon | disponibilitate, prețuri, rezervări |
| 3 | Asigurări & credite | `/industrii/asigurari-credite` | agent vocal AI asigurări | calificare lead-uri, programare cu consultantul |
| 3 | Ferestre PVC / tâmplărie | `/industrii/tamplarie-pvc` | robot telefonic firmă termopane | cereri de ofertă, programare măsurători |

Lista e deschisă. Dacă vinzi deja într-un domeniu care nu e aici, îl adăugăm primul, pentru că acolo avem povești reale.

**Reguli ca să nu fie „pagini subțiri”** (Google penalizează paginile identice în care se schimbă doar denumirea):
- Fiecare pagină are **scenariul ei real**: întrebările concrete pe care le pun clienții din acel domeniu, un exemplu de conversație, ce face Elevio cu urgențele din domeniu (o țeavă spartă la 23:00 nu e același lucru cu o programare la tuns).
- Fiecare pagină are un **FAQ propriu** (minimum 5 întrebări specifice), calculul de cost adaptat („un instalator care ratează 3 urgențe pe săptămână…”) și CTA spre /demo.
- **Promitem doar ce face Elevio azi.** La e-commerce, „status comandă” apare doar dacă avem integrarea cu platforma magazinului (Shopify, WooCommerce, Gomag, MerchantPro etc.). 👤 Îmi confirmi lista exactă de capabilități și integrări înainte să scriu paginile.
- Mostrele audio și testimonialele reale pe domeniu ridică pagina peste concurență. Le adăugăm pe măsură ce le ai.
- Ritmul: **8 pagini pe săptămână**, nu 200 dintr-odată. Le scriu eu, iar tu le citești înainte de publicare.

### 2.3 SEO pentru 2027, început de acum

**Ideea:** căutările cu anul viitor („cei mai buni … 2027”, „cât costă … în 2027”) încep să apară din noiembrie–decembrie, iar în ianuarie explodează. Acum nu are nimeni astfel de pagini în română, în nișa noastră. Prima pagină bună, publicată și indexată din timp, adună vechime, linkuri și citări până când apar concurenții. De aceea tinde să rămână sus (reel-ul [De-IHn-Bf8t](https://www.instagram.com/reel/De-IHn-Bf8t/)). În plus, ChatGPT preferă listele actualizate recent: 79% dintre listele citate fuseseră actualizate în anul curent (Ahrefs).

**Paginile 2027** (publicate în săptămânile 2–3, ca să fie indexate înainte de ianuarie):

| Pagina | Interogarea | Ce conține |
|---|---|---|
| `/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027` | cei mai buni agenți vocali AI România 2027 | Comparație onestă cu toți furnizorii români: prețuri publice cu sursă și dată, criterii clare, inclusiv unde alții sunt mai buni. **Pagina-vedetă pentru ChatGPT.** |
| `/ghid/cat-costa-receptioner-ai-2027` | cât costă un recepționer AI 2027 | Prețuri de piață + salariul minim din 2027, când e anunțat oficial (până atunci cel din 2026, marcat clar), calculator |
| `/ghid/tendinte-agenti-vocali-ai-2027` | agenți vocali AI 2027 / AI pentru firme mici 2027 | Ce se schimbă în 2027: AI Act (obligațiile de transparență), voci mai naturale în română, integrări. Opinia ta de fondator. |
| `/ghid/automatizare-firma-mica-2027` | automatizare firmă mică 2027 | Ghid practic pe domenii (meserii, e-commerce, cabinete): ce automatizezi întâi, cu agentul vocal ca prim pas |

**Regulile pentru paginile 2027:**
- **Anul apare în title, H1 și URL.** URL-ul rămâne fix, iar în ianuarie 2028 îl actualizăm, nu facem altul. Așa păstrăm tot ce a adunat pagina.
- **Data actualizării e vizibilă pe pagină** („Actualizat: noiembrie 2026”) și în schema `dateModified`. **Actualizăm lunar** cu prețuri noi și concurenți noi. Asta e semnalul de prospețime.
- **Nu inventăm date „din 2027”.** Ce nu se știe încă (salariul minim, prețurile din 2027) apare marcat ca estimare, cu sursa ultimei valori reale.
- **Aceeași temă pe toate canalele:** articol LinkedIn „Agenți vocali AI în 2027: ghid pentru firmele din România”, ghid extern (Google Sites, apoi Gamma) „Agenți vocali AI în România 2027”, video YouTube „Recepționer AI în 2027: ce trebuie să știi”. Toate trimit spre pagina de comparație de pe site.
- **În ianuarie 2027** (după cele 30 de zile): un al doilea val de pagini 2027 pe domenii, de exemplu „Cel mai bun robot telefonic pentru service auto în 2027”, plus cereri de includere în listele „top 2027” pe care le publică alții.


**Regula de conținut pentru fiecare pagină:**
- Răspunsul e în primele 2 propoziții.
- Pagina are ceva ce concurenții nu au: mostră audio reală pe nișa respectivă, prețuri clare, calcul de cost, conversația reală a unui apel.
- Nu inventăm cifre, clienți sau testimoniale. Testimonialele reale le adaugi când le ai, și sunt cel mai puternic semnal pe care îl putem pune.

---

## 3. Planul pe zile

### Săptămâna 1 (10–16 nov): fundația. Fără ea, restul nu contează.

| Zi | Task | Cine |
|---|---|---|
| ✅ 9 nov | **Deploy reparat:** `main` (commit `194e7b5`) e live, cu 9 pagini în sitemap și paginile legale. **De știut:** site-ul se publică prin upload (API), nu automat din GitHub. După fiecare merge pe `main` trebuie dat deploy (îl dau eu) sau activat auto-deploy-ul din Netlify → Site configuration → Build & deploy → Link repository. | 🤖 |
| L 10 | Decizia de brand „Elevio AI” și de domeniu (1.1–1.2). Cumperi elevioai.ro. | 👤 |
| L 10 | **Google Search Console:** proprietate de tip Domain, verificare prin DNS (CyberFolks sau Netlify DNS), apoi trimiți `sitemap.xml`. | 👤 (te ghidez pas cu pas) |
| L 10 | **Bing Webmaster Tools:** import din Search Console, cu un click. Asta e ChatGPT + Copilot. | 👤 |
| M 11 | **Cod, pachetul SEO tehnic:** `metadataBase`, canonical, OpenGraph + imagine OG; titluri noi cu cuvântul cheie (homepage: „Elevio AI · Recepționer vocal AI în română, 24/7”); H1 cu cuvântul cheie; JSON-LD `Organization` + `WebSite` (cu dezambiguizare), `SoftwareApplication` / `Service` + `Offer` (prețuri), `FAQPage`, `BreadcrumbList`; `llms.txt`; robots.txt cu permisiune explicită pentru `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `GPTBot`, `ClaudeBot`; **IndexNow** (fișier cheie + ping automat după deploy). Totul într-un singur PR. | 🤖 |
| M 11 | Aprobi textele pentru titluri și H1. | 👤 |
| Mi 12 | Merge, deploy, apoi „Request indexing” în Search Console pentru cele 9 pagini. Validez în Rich Results Test. | 🤖 + 👤 |
| Mi 12 | **Pagina de companie LinkedIn „Elevio AI”:** tagline „Recepționer vocal AI în limba română”, site, industrie, produse, logo, copertă; angajații legați de pagină. Profilul tău: headline „Fondator Elevio AI · recepționer vocal AI”. | 👤 (texte de la mine 🤖) |
| J 13 | **Canalul de YouTube „Elevio AI”:** primul video, un **demo real de apel în română** (2–3 min), titlu „Recepționer vocal AI în română: apel real de programare la cabinet”, cu descriere + transcriere. | 👤 înregistrare, 🤖 titluri/descrieri/transcriere |
| J 13 | **Crunchbase** (profil gratuit), **Apple Business Connect**. | 👤 |
| V 14 | Primele **3 pagini de bani** + hub-ul de industrii: `/agent-vocal-ai`, `/receptioner-virtual`, `/robot-telefonic-ai`, `/industrii`, fiecare cu FAQ, schema și 3 linkuri interne. | 🤖 |
| V 14 | **Listafirme / Termene / Risco:** verifici că datele de la ONRC sunt corecte și le ceri să adauge site-ul. Primești de la mine textul mailului. | 👤 |
| S–D | Primul **articol LinkedIn** (vezi secțiunea 4.2) + 2 postări scurte. | 👤 publici, 🤖 draft |

**Sfârșitul săptămânii 1:** site corect tehnic, indexat în Google și Bing, cu 4 pagini noi, LinkedIn și YouTube active. 👤 Îmi confirmi lista de capabilități și integrări Elevio (vezi 2.2) ca să pot scrie paginile pe domenii.

### Săptămâna 2 (17–23 nov): primul val de pagini pe domenii + paginile 2027 + primele mențiuni externe

| Zi | Task | Cine |
|---|---|---|
| L 17 – V 21 | **Valul 1, 8 pagini pe domenii** (2.2): magazine online, reparații acoperișuri, instalatori, electricieni, centrale termice, cabinete stomatologice, saloane și frizerii, service auto. Fiecare cu scenariu real, FAQ specific, calcul de cost și CTA spre /demo. Plus ghidul `/ghid/agent-vocal-ai-ecommerce`. | 🤖 scriu, 👤 citești înainte de publicare (+ mostre audio dacă există) |
| Ma 18 | **Paginile 2027 (2.3):** „Cei mai buni agenți vocali AI din România în 2027” (mutată aici din săptămâna 3, ca să fie indexată cât mai devreme) și „Cât costă un recepționer AI în 2027”. | 🤖 |
| M 18 | **Listări românești + cele care alimentează listele pe România:** SaaSHub (te pune automat în pagina de startup-uri din București), StartupBlink România, RankMyAI (top unelte AI România), Seedtable România, plus Crunchbase (identitate de brand). Opțional, fără prioritate: Capterra, G2. Toate cu același text în română. | 👤 conturi, 🤖 texte gata de lipit |
| Mi 19 | **Grupuri de Facebook de antreprenori** (Grupul Antreprenorilor din România, Antreprenori – Start Up Romania, Romanian Startups) și grupurile pe domenii (meseriași, e-commerce, cabinete): intri și răspunzi util, la fel ca pe Reddit (vezi 4.6). | 👤 + 🤖 draft-uri |
| Mi 19 | **Comunicat de presă** (doar fapte reale): de exemplu „Elevio AI lansează un recepționer vocal AI în limba română pentru cabinete, saloane și service-uri auto, disponibil 24/7”. Fraza „recepționer vocal AI” apare în titlu și în prima propoziție. Trimis **gratuit** direct la redacții, împreună cu pitch-ul din 20 nov. Opțional pe comunicatedepresa.ro Basic (9 €). | 🤖 text, 👤 trimitere |
| J 20 | **Pitch la presă** (subiect cu date, nu „am lansat”): start-up.ro (hello@start-up.ro, sau direct vlad@start-up.ro), StartupCafe (redactie@startupcafe.ro), ZF Hi-Tech (adrian.seceleanu@zf.ro), Wall-Street.ro (redactie@wall-street.ro). Callio a obținut articol pe start-up.ro, deci se poate. | 🤖 draft-uri personalizate, 👤 trimitere |
| V 21 | **Primul ghid extern pe Google Sites** (vezi 4.4): „Ghidul recepționerului AI pentru cabinete stomatologice”, cu link spre pagina de nișă. Gamma Pro vine luna viitoare. | 👤 publici, 🤖 conținut |
| V 21 | **Outreach prin e-mail, lotul 1** (vezi 4.9): 30–40 de bloguri și site-uri românești. | 👤 trimiți cu tool-ul tău, 🤖 lista + mesajele |
| S–D | Al doilea articol LinkedIn + 3 postări; al doilea video YouTube (demo magazin online: apel despre o comandă); încep activitatea pe Reddit (vezi 4.3). | 👤 + 🤖 |

### Săptămâna 3 (24–30 nov): ghidurile pe care le citează ChatGPT

| Zi | Task | Cine |
|---|---|---|
| L 24 | **Completez comparația 2027** cu toate datele: Tabel cu prețurile publice ale concurenților (Callio 139–299 €, Agentul Vocal 299–499 €/lună, Vocalyy 600–3.360 lei, Voxbee, Estera de la 49 €…), criterii clare, data actualizării. Elevio inclus corect, inclusiv acolo unde alții sunt mai buni. Fiecare preț are sursă și dată. | 🤖 |
| M 25 | „Cât costă un recepționer AI vs o recepționeră în 2026”: calcul cu salariul minim brut din 2026 plus taxe, comparat cu 150 €/lună, plus calculator simplu pe pagină. | 🤖 |
| Mi 26 | „AI Act art. 50 + GDPR: e legal să răspundă un AI la telefon?” (cu surse oficiale) și „Robot telefonic AI vs IVR”. | 🤖 |
| L 24 – V 28 | **Valul 2, 9 pagini pe domenii:** clinici medicale, veterinare, kinetoterapie, clinici estetice, restaurante, hoteluri și pensiuni, imobiliare, curățenie și mutări, construcții. | 🤖 + 👤 review |
| J 27 | 8–12 pagini scurte `/intrebari/*` (câte o întrebare reală pe pagină, răspuns în 2 propoziții, apoi detalii). Pornesc de la întrebările de la apelurile demo: 👤 îmi spui ce te întreabă clienții. | 🤖 |
| V 28 | **Cereri de includere în liste existente:** loleworks.com (acceptă corecturi pe mail), cosimo.dev, aitfel.ro, natix.ro, spotmedia.ro. Plus CloudTalk RO (lista lor „best AI voice agents” nu are niciun român), unde e o șansă mică, dar merită. | 🤖 mailuri, 👤 trimitere |
| S–D | Al doilea și al treilea ghid pe Google Sites (magazine online, meserii: acoperișuri / instalatori / electricieni); outreach prin e-mail, lotul 2 + follow-up la lotul 1; LinkedIn; YouTube #3 (demo urgență la instalator sau acoperișuri); Reddit. | 👤 + 🤖 |

### Săptămâna 4 (1–9 dec): autoritate, lansare, măsurare

| Zi | Task | Cine |
|---|---|---|
| L 1 | **Lansare în comunitatea românească:** postare de lansare pe LinkedIn (tu + pagina companiei), în grupurile de Facebook de antreprenori (unde regulile permit) și mesaj către ROTSA (asociația startup-urilor tech). Product Hunt nu, pentru că publicul e internațional. | 👤 + 🤖 texte |
| M 2 | **Asociații:** ARMO (Asociația Magazinelor Online) și comunitatea GPeC (e-commerce), CMSR / PMSR (stomatologi), PADIR / ANSBR (beauty), FIHR (hoteluri), CCIB / CCIR (Camera de Comerț), IMM România. Contactele de la ARMO, GPeC și FIHR nu le-am verificat încă. Scopul: o listare, un articol în newsletter sau un webinar „Cum nu mai pierzi apeluri și comenzi la telefon”. | 👤 (🤖 mailuri) |
| Mi 3 | **Prima verificare AI:** cele 25 de întrebări din `seo/ai-prompts.md` în ChatGPT, Claude, Gemini, Perplexity și Copilot. Notăm unde apărem, ce se spune și ce surse se citează. Sursele citate devin ținte de outreach. | 🤖 + 👤 (ChatGPT logat) |
| J 4 | **Search Console:** paginile cu impresii pe pozițiile 8–20 primesc completări + linkuri interne; cele cu CTR mic primesc titluri noi. | 🤖 |
| V 5 | Podcast-uri: pitch la Inovatorii / Work in Progress (start-up.ro), Pastila de antreprenoriat, Permis de Antreprenor. | 🤖 draft, 👤 trimitere |
| Mi 3 – V 5 | **Valul 3, 7 pagini pe domenii:** avocați și notari, contabilitate, școli de șoferi, săli de fitness, rent-a-car, asigurări și credite, tâmplărie PVC. | 🤖 + 👤 review |
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
1. „Ce este un recepționer vocal AI și cât costă în 2027? Ghid pentru firmele mici din România”
2. „Câte comenzi pierde un magazin online care nu răspunde la telefon”
3. „Un instalator ratează 3 urgențe pe săptămână. Cât îl costă? (calcul pentru meseriași)”
4. „E legal ca un AI să răspundă la telefonul firmei tale? AI Act și GDPR, pe scurt”

Fiecare articol: răspunsul în prima frază, link spre pagina corespunzătoare de pe site, iar la final „Elevio AI, recepționer vocal AI în română”.

### 4.3 Reddit (pe care nu-l putem forța)

Reddit e domeniul cel mai citat de AI, dar e și cel mai ușor de stricat: un post de spam ia ban și nu mai e citat niciodată.

- **Unde scrii:**
  - r/Romania (~1,1 milioane de membri): doar răspunsuri utile, niciodată reclamă;
  - r/antreprenoriat (mic, dar exact pe subiect);
  - r/programare: un post tehnic, „cum am făcut recunoaștere vocală în română: latență, diacritice, accente”, care e cinstit și interesant;
- **Regula 90/10:** de pe contul tău personal, cu istoric. Răspunzi la întrebări de genul „cum nu mai pierd apeluri / programări”. Menționezi Elevio doar când chiar e răspunsul, cu „disclaimer: e produsul meu”.
- **Ce NU faci:** conturi noi, același text în mai multe subreddit-uri, upvote-uri cumpărate, lansare directă pe r/Romania.
- 🤖 îți dau zilnic 1–2 thread-uri relevante și un draft de răspuns, iar tu postezi.

### 4.4 Ghiduri externe: Google Sites acum, Gamma luna viitoare

**Luna asta (fără buget):** aceleași ghiduri le publicăm pe **Google Sites**. E gratuit, se indexează în Google și se verifică în Search Console. Gamma gratuit rămâne pentru prezentările de vânzări. Restul secțiunii se aplică pentru când iei Gamma Pro.


**Important, verificat în documentația Gamma:**
- Site-urile Gamma noi **nu sunt indexate implicit**.
- Indexarea se activează doar pe **Pro/Ultra/Business**: Site Settings → „Make discoverable on the web”, apoi republici.
- Domeniul propriu e disponibil tot de la Pro.

Cum îl folosim:
- **3–4 site-uri Gamma cu conținut UNIC**, nu copii ale site-ului:
  - „Ghidul recepționerului AI pentru cabinete stomatologice”;
  - „Agent vocal AI pentru magazine online: comenzi, retururi, livrări”;
  - „Ghid pentru meseriași: cum nu mai pierzi urgențe la telefon (acoperișuri, instalații, electrice)”;
  - „Robot telefonic pentru service auto: ghid practic”;
  - „Agenți vocali AI în România 2027: ce trebuie să știi înainte să alegi”.
- Fiecare: titlu și descriere setate din Page Setup, conținut util, 1–2 linkuri spre pagina de nișă de pe elevio-agency.ro, verificat în Search Console.
- **Prezentări Gamma pentru vânzări:** aceleași deck-uri le folosești în pitch la clinici, deci au dublă utilizare.
- **Riscul:** subdomeniul gamma.site are autoritate mică, iar duplicatele concurează cu propriul site. De aceea conținutul e unic și trimite spre noi.

### 4.5 YouTube (al doilea cel mai citat domeniu în răspunsurile AI)

- 4 video-uri în 30 de zile, fiecare un **demo real de apel în română** pe un domeniu (cabinet stomatologic, magazin online, urgență la instalator sau acoperișuri, service auto).
- Titlul conține cuvântul cheie, descrierea are 150 de cuvinte și link spre pagina de nișă, iar transcrierea e încărcată.
- Shorts de 30–45 de secunde din aceleași apeluri, cu subtitrări. Avem deja Whisper în tool-ul de Instagram, deci pot genera subtitrările.
- Video-urile le pun și pe paginile de nișă (schema `VideoObject`).

### 4.6 Facebook & Instagram (unde stau patronii români)

În România, patronii de saloane, service-uri, firme de meserii și magazine online sunt pe **Facebook**, mult mai mult decât pe Reddit sau X.
- **Grupuri de antreprenori:** Grupul Antreprenorilor din România (~125.000 de membri, cifră veche, de verificat), Antreprenori – Start Up Romania, Romanian Startups. Plus grupurile pe domenii: meseriași, e-commerce (comunitatea GPeC), cabinete stomatologice, saloane.
- Aceeași regulă ca pe Reddit: răspunsuri utile de pe profilul tău și Elevio menționat doar când e chiar răspunsul.
- Pagina de Facebook și profilul de Instagram „Elevio AI”: aceleași clipuri demo ca pe YouTube (format Reels), pentru consecvența numelui și pentru patronii care caută pe Facebook.
- **X / Twitter:** în România nu aduce aproape nimic. Rezervăm doar numele „Elevio AI” și atât.

### 4.7 Presă și PR

- Comunicat trimis gratuit la redacții (opțional comunicatedepresa.ro Basic, 9 €) + pitch-uri personalizate (vezi săptămâna 2).
- Subiectul care prinde: **date**, de exemplu „X% din apelurile la cabinetele mici rămân nepreluate”. Le putem aduna din apelurile demo, cu acordul clienților, sau dintr-un mini-sondaj de 20 de cabinete. Plus fondatorul disponibil pentru interviu.
- Tribună de opinie pe Republica.ro: „De ce firmele mici din România pierd clienți la telefon”.
- **Wikidata:** abia după 1–2 articole independente în presă. Fără ele, item-ul se șterge.

### 4.8 Directoare (pentru backlink și consecvența entității, nu pentru citări)

- **Românești sau cu pagini pe România:** ListaFirme / Termene / Risco (datele de la ONRC), SaaSHub (pagina București), StartupBlink România, RankMyAI România, Seedtable România.
- **Identitate de brand:** Crunchbase, LinkedIn.
- **Opțional, fără prioritate:** Capterra, G2, AlternativeTo. Internaționale, aduc doar un backlink.
- **Același text peste tot:** „Elevio AI, recepționer vocal AI în limba română pentru firme mici: răspunde 24/7, face programări, preia lead-uri.”

---

### 4.9 Outreach prin e-mail cu tool-ul tău (pentru articole și mențiuni gratuite)

**Merită? Da, dar doar mic și personalizat.** Ce se trimite în masă („vreți să scrieți gratis despre noi?”) are rată de răspuns aproape zero și poate strica reputația domeniului de e-mail. Ce funcționează e să le oferi ceva util: un subiect pentru audiența lor, date, un articol scris gata de noi sau un demo gratuit pentru cititorii lor.

**Cui scriem** (30–40 de adrese în total, în 2 loturi):
1. **Autorii listelor existente** cu „firme / unelte AI în România”: loleworks.com (acceptă corecturi pe mail), cosimo.dev, aitfel.ro, natix.ro, spotmedia.ro. Le cerem să adauge Elevio AI, cu informații corecte.
2. **Bloguri de nișă** care vorbesc cu clienții noștri:
   - e-commerce (bloguri pentru magazine online, comunitatea GPeC);
   - antreprenoriat și IMM;
   - meserii și construcții;
   - stomatologie, beauty, auto.

   Le oferim un **articol scris de noi, gata de publicat** (guest post), de exemplu „Câte comenzi pierde un magazin online care nu răspunde la telefon”, cu un singur link spre noi.
3. **Jurnaliști și podcast-uri** (start-up.ro, StartupCafe, ZF Hi-Tech, Inovatorii, Pastila de antreprenoriat). Pitch-ul are un subiect cu date, nu „am lansat un produs”.
4. **Furnizori complementari** (soft de programări, CRM, platforme de magazin online, firme de web design): articole sau mențiuni reciproce, eventual o integrare.

**Cum:**
- Fiecare mail are o primă frază personalizată: articolul lor și de ce se potrivește.
- Maximum 3 paragrafe, o singură cerere clară, un follow-up după 4–5 zile și apoi stop.
- 🤖 fac lista (site, persoană, de ce ei, ce le oferim) și mesajele, 👤 le trimiți cu tool-ul tău.
- **Volum mic** (10–15 pe zi), dintr-o adresă reală (a ta) și cu opțiunea clară de dezabonare. E outreach B2B către adrese publice de redacție sau contact, în linie cu GDPR (interes legitim, cu opt-out).
- **Bugetul de 25 €** îl folosim pe blogul care cere o taxă mică pentru publicare, dacă are audiența potrivită.

**Așteptare realistă:** din 40 de mailuri bine țintite, 3–6 răspunsuri și 1–3 articole sau mențiuni. Sunt puține ca număr, dar fiecare link de pe un site românesc relevant contează mult pentru un domeniu nou.

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

1. ✅ **Netlify:** deploy-ul e făcut. Opțional: activează auto-deploy-ul din GitHub (Netlify → Site configuration → Build & deploy), ca fiecare merge pe `main` să se publice singur.
2. **DNS (CyberFolks sau Netlify DNS):** acces sau 10 minute împreună, pentru verificarea Search Console și eventual pentru elevioai.ro.
3. **Search Console + Bing:** după ce le creezi, adaugă-mă prin Claude Code cu un connector sau cu mcp-gsc (îți arăt cum), ca să citesc datele în auditul săptămânal.
4. **Capabilitățile și integrările exacte ale Elevio** (calendar, CRM, platforme de magazin online, transfer de apel, SMS), ca să nu promitem pe pagini ce nu face produsul.
5. **Mostre audio reale pe domenii** (magazin online, meserii, cabinet, salon, service), cu acordul celor înregistrați, pentru paginile pe domenii și YouTube.
6. **Întrebările reale** pe care ți le pun clienții la demo-uri. Din ele fac paginile `/intrebari/*`.
7. **Testimoniale reale**, când le ai: nume, firmă, oraș și o frază. Sunt cel mai puternic semnal pe care îl putem adăuga.
8. Deciziile din secțiunea 1: nume, domeniu, marcă, buget.

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
