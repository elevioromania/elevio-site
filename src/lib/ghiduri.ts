import type { FaqItem, LinkCard, SectiuneGhid } from "@/components/landing/types";

// Ghidurile de pe /ghid/[slug]. Textele pot conține [text](/ruta) și **bold**
// (randate de RichText). Nu inventăm clienți, cifre sau integrări: orice calcul
// e marcat ca exemplu, iar prețurile concurenților au sursă și dată.

export const GHID_DATA_ISO = "2026-11-09";
export const GHID_DATA_TEXT = "9 noiembrie 2026";

export type Ghid = {
  slug: string;
  /** H1 */
  titlu: string;
  /** <title>, 50–60 de caractere, cuvântul cheie la început. */
  metaTitle: string;
  /** Meta description, 140–160 de caractere. */
  metaDescription: string;
  interogare: string;
  variante: string[];
  eyebrow: string;
  /** Răspunsul în primele două propoziții. */
  rezumat: string;
  /** Textul scurt de pe cardul din /ghid. */
  descriereCard: string;
  datePublished: string;
  dateModified: string;
  sectiuni: SectiuneGhid[];
  faq: FaqItem[];
  legate: LinkCard[];
};

const VERIFICAT = "verificat noiembrie 2026";

const LINK_COMPARATIE: LinkCard = {
  href: "/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027",
  title: "Cei mai buni agenți vocali AI din România în 2027",
  text: "Comparație onestă între furnizori, cu prețuri publice, sursă și dată.",
};
const LINK_COST: LinkCard = {
  href: "/ghid/cat-costa-receptioner-ai-2027",
  title: "Cât costă un recepționer AI în 2027",
  text: "Recepționer AI vs angajat la recepție, cu un exemplu de calcul al apelurilor pierdute.",
};
const LINK_CE_ESTE: LinkCard = {
  href: "/ghid/ce-este-un-agent-vocal-ai",
  title: "Ce este un agent vocal AI",
  text: "Definiția, cum funcționează, ce limite are și când merită.",
};
const LINK_LEGAL: LinkCard = {
  href: "/ghid/ai-act-gdpr-receptioner-ai",
  title: "AI Act și GDPR pentru recepționerul AI",
  text: "Ce trebuie să le spui clienților și cum tratezi înregistrările și transcrierile.",
};
const LINK_AGENT: LinkCard = {
  href: "/agent-vocal-ai",
  title: "Agent vocal AI Elevio",
  text: "Ce face agentul vocal AI în română, pas cu pas, și cât costă.",
};
const LINK_ROBOT: LinkCard = {
  href: "/robot-telefonic-ai",
  title: "Robot telefonic AI pentru programări",
  text: "Prin ce diferă de centrala clasică cu „apăsați tasta 1”.",
};
const LINK_RECEPTIONER: LinkCard = {
  href: "/receptioner-virtual",
  title: "Recepționer virtual AI",
  text: "Cum arată o zi în care telefonul firmei e preluat 24/7.",
};

export const GHIDURI: Ghid[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "cei-mai-buni-agenti-vocali-ai-romania-2027",
    titlu: "Cei mai buni agenți vocali AI din România în 2027",
    metaTitle: "Cei mai buni agenți vocali AI din România 2027: prețuri",
    metaDescription:
      "Comparăm 10 agenți vocali AI care vând în România: prețuri publice cu sursă (verificate în noiembrie 2026), criterii clare și unde e mai bun fiecare.",
    interogare: "cei mai buni agenți vocali AI România 2027",
    variante: [
      "comparație recepționer AI",
      "alternative agent vocal AI",
      "agenți vocali AI România 2026",
    ],
    eyebrow: "Comparație 2027",
    rezumat:
      "Nu există un singur „cel mai bun” agent vocal AI: cel potrivit depinde de domeniul tău, de câte apeluri primești și de cum vrei să plătești. Mai jos găsești 10 furnizori care vând în România, cu prețurile publice verificate în noiembrie 2026 și criteriile după care să alegi.",
    descriereCard:
      "10 furnizori din România, prețuri publice cu sursă, criterii clare și unde sunt alții mai buni decât noi.",
    datePublished: GHID_DATA_ISO,
    dateModified: GHID_DATA_ISO,
    sectiuni: [
      {
        id: "transparenta",
        titlu: "Cine a scris comparația",
        blocuri: [
          {
            tip: "nota",
            ton: "info",
            titlu: "Transparență",
            text: "Comparația e scrisă de echipa Elevio AI, iar Elevio AI apare și el în tabel. Ca să rămână corectă: fiecare preț are sursa lui, am spus unde alții sunt mai potriviți și nu ne-am dat locul întâi. Verifică orice cifră pe site-ul furnizorului.",
          },
        ],
      },
      {
        id: "pe-scurt",
        titlu: "Pe scurt: ce să alegi, în funcție de nevoie",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Ai o clinică:** Callio e specializat doar pe clinici, de la 139 EUR/lună.",
              "**Vrei în principal vânzări și calificarea lead-urilor:** LeadVoz e concentrat pe asta (preț la cerere).",
              "**Ai un call-center:** Agent Vocal (agentvocal.ro) e orientat pe automatizarea call-center-ului (preț nepublicat).",
              "**Primești puține apeluri:** un tarif pe minut, ca la AgentVocalAI.ro (0,185–0,29 €/min), poate ieși mai ieftin decât un abonament.",
              "**Ai o afacere locală și vrei programări, rezervări și comenzi pe numărul existent:** Elevio AI, de la 150 €/lună + TVA. Detalii pe pagina de [prețuri](/preturi).",
            ],
          },
        ],
      },
      {
        id: "criterii",
        titlu: "Criteriile după care să compari",
        blocuri: [
          {
            tip: "p",
            text: "Prețul e doar unul dintre criterii. Iată ce merită verificat la fiecare furnizor, înainte să semnezi ceva:",
          },
          {
            tip: "lista",
            numerotata: true,
            items: [
              "**Calitatea în limba română.** Cere o mostră audio sau sună la demo. Ascultă cum se descurcă cu nume, adrese, cifre și cu un client care vorbește repede.",
              "**Transferul la un om.** Ce se întâmplă când agentul nu știe răspunsul? Transferă apelul? În cât timp? Pe ce număr?",
              "**Integrarea cu calendarul.** Verifică disponibilitatea în timp real și face programarea singur, sau doar notează cererea? Cu ce calendar lucrează?",
              "**Prețul public.** E publicat? În lei sau în euro, cu sau fără TVA? Există taxă de setup sau cost pe minut peste pachet?",
              "**Domeniile (verticalele).** Un furnizor specializat pe un domeniu are, de regulă, scenariile acelui domeniu deja gândite.",
              "**Condițiile contractului.** Durata minimă, preavizul și ce se întâmplă cu datele tale dacă renunți.",
            ],
          },
          {
            tip: "nota",
            ton: "atentie",
            titlu: "Ce nu am făcut",
            text: "Nu am testat la telefon fiecare furnizor. Tabelul de mai jos compară doar ce e public: prețul și focusul declarat. Calitatea vocii, transferul și integrările le verifici tu, la demo.",
          },
        ],
      },
      {
        id: "tabel-preturi",
        titlu: "Furnizorii și prețurile publice (noiembrie 2026)",
        blocuri: [
          {
            tip: "p",
            text: "Ordinea e alfabetică, nu un clasament. Prețurile sunt copiate exact cum apar pe site-ul fiecărui furnizor, cu moneda lor.",
          },
          {
            tip: "tabel",
            cap: ["Furnizor", "Pe ce se concentrează", "Model de preț", "Preț public (sursă)"],
            randuri: [
              [
                "Agent Vocal (agentvocal.ro)",
                "Automatizarea call-center-ului",
                "La cerere",
                `Preț nepublicat. Sursa: [agentvocal.ro](https://agentvocal.ro), ${VERIFICAT}`,
              ],
              [
                "AgentVocalAI.ro (White Hat Technology)",
                "neevaluat",
                "Pe minut",
                `0,185–0,29 €/min. Sursa: [agentvocalai.ro](https://agentvocalai.ro), ${VERIFICAT}`,
              ],
              [
                "Agentul Vocal (agentulvocal.ro)",
                "neevaluat",
                "Abonament lunar",
                `299 / 399 / 499 €/lună. Sursa: [agentulvocal.ro](https://agentulvocal.ro), ${VERIFICAT}`,
              ],
              [
                "Automatizez.ro",
                "neevaluat",
                "Setup + abonament",
                `1.200 € setup + 250 €/lună. Sursa: [automatizez.ro](https://automatizez.ro), ${VERIFICAT}`,
              ],
              [
                "Callio (callio.ro)",
                "Doar clinici (Timișoara)",
                "Abonament lunar + setup",
                `139 / 189 / 299 EUR/lună, setup 49 EUR. Sursa: [callio.ro](https://callio.ro), ${VERIFICAT}`,
              ],
              [
                "Elevio AI (noi)",
                "Afaceri locale: programări, rezervări, comenzi",
                "Abonament lunar + implementare",
                `150 / 300 / 600 €/lună + TVA, plus taxa de implementare. Sursa: [elevio-agency.ro/preturi](/preturi), ${VERIFICAT}`,
              ],
              [
                "Estera (tryestera.com/ro)",
                "neevaluat",
                "Neclar",
                `De la 49 € (**neconfirmat**: nu am putut confirma prețul). Sursa: [tryestera.com/ro](https://tryestera.com/ro), ${VERIFICAT}`,
              ],
              [
                "LeadVoz (leadvoz.ro)",
                "Vânzări și calificarea lead-urilor",
                "La cerere",
                `Preț la cerere. Sursa: [leadvoz.ro](https://leadvoz.ro), ${VERIFICAT}`,
              ],
              [
                "Receptionerul Virtual (aireceptionist.ro)",
                "neevaluat",
                "Pachete",
                `299 / 399 / 1.099 / 2.099 lei. Sursa: [aireceptionist.ro](https://aireceptionist.ro), ${VERIFICAT}`,
              ],
              [
                "Vocalyy (vocalyy.ro)",
                "neevaluat",
                "Abonament lunar",
                `599,99–3.359,99 lei/lună. Sursa: [vocalyy.ro](https://vocalyy.ro), ${VERIFICAT}`,
              ],
            ],
            nota: "„neevaluat” înseamnă că nu am evaluat încă pe ce domenii se concentrează furnizorul. Prețurile se schimbă: le-am verificat în noiembrie 2026 și actualizăm tabelul lunar. Nu am verificat pentru fiecare furnizor dacă prețul include TVA sau ce conține fiecare pachet (minute, apeluri, funcții).",
          },
        ],
      },
      {
        id: "unde-altii-sunt-mai-buni",
        titlu: "Unde sunt alții mai potriviți decât Elevio AI",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Callio, pentru clinici.** E construit doar pentru clinici, deci scenariile lor sunt deja gândite. Iar abonamentul de intrare (139 EUR/lună) e puțin sub planul nostru START (150 €/lună + TVA). Compară totuși și setup-ul și ce include fiecare pachet.",
              "**LeadVoz, pentru vânzări.** Dacă vrei în principal calificarea lead-urilor și apeluri de vânzare, LeadVoz e concentrat pe asta. Elevio AI e un recepționer: e făcut pentru apelurile pe care le primești (programări, rezervări, comenzi).",
              "**Tariful pe minut, pentru volume mici.** La puține apeluri, plata pe minut poate ieși mai ieftin decât orice abonament fix (vezi exemplul de mai jos).",
              "**Agent Vocal (agentvocal.ro), pentru call-center.** Dacă ai un call-center cu mai mulți operatori, un furnizor orientat pe automatizarea call-center-ului poate fi mai potrivit.",
              "**Prețuri în lei.** Vocalyy și Receptionerul Virtual își afișează prețurile în lei, ceea ce te scutește de diferențele de curs.",
            ],
          },
          {
            tip: "nota",
            ton: "exemplu",
            text: "100 de apeluri pe lună × 2 minute fiecare = 200 de minute. La 0,185–0,29 €/min, asta înseamnă 37–58 € pe lună. Cifrele sunt presupuse, doar ca să arate calculul. La volume mari, calculul se poate inversa în favoarea abonamentului.",
          },
        ],
      },
      {
        id: "cum-alegi",
        titlu: "Cum alegi agentul vocal AI potrivit, în 6 pași",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "**Numără apelurile.** Câte primești pe lună și câte pierzi? Din asta reiese dacă te avantajează plata pe minut sau un abonament. Te ajută ghidul [cât costă un recepționer AI](/ghid/cat-costa-receptioner-ai-2027).",
              "**Scrie 5 apeluri tipice.** De exemplu: o programare, o reprogramare, o întrebare de preț, o urgență, un client nervos. Testează-le la demo cu 2–3 furnizori.",
              "**Testează transferul la tine.** Cere-i agentului ceva ce nu are cum să știe și vezi ce face.",
              "**Verifică integrarea cu calendarul tău.** Ideal, agentul vede orele libere și face programarea singur.",
              "**Calculează costul pe 12 luni.** Abonament + setup sau implementare + TVA + eventuale minute peste pachet.",
              "**Citește condițiile.** Durata minimă, preavizul, unde sunt stocate datele și contractul de prelucrare a datelor (vezi ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai)).",
            ],
          },
        ],
      },
      {
        id: "ce-lipseste",
        titlu: "Ce lipsește încă pe piață",
        blocuri: [
          {
            tip: "p",
            text: "Câteva lucruri pe care le-am observat cât am strâns datele. Ne includem și pe noi în ele:",
          },
          {
            tip: "lista",
            items: [
              "**Prețuri greu de comparat.** În tabel sunt cel puțin patru moduri diferite de a afișa prețul: abonament lunar, tarif pe minut, setup separat și „la cerere”. Unele sunt în lei, altele în euro.",
              "**Prețuri care nu sunt publice.** Trei din cei zece furnizori nu au un preț public confirmat: doi nu îl publică, iar pe unul nu l-am putut confirma.",
              "**Niciun test independent al vocii în română.** Nu am găsit un test public, făcut de cineva neutru, care să compare calitatea vocii între furnizori. Până apare, singurul test bun e să asculți tu fiecare demo.",
            ],
          },
        ],
      },
      {
        id: "cum-am-facut",
        titlu: "Cum am făcut comparația",
        blocuri: [
          {
            tip: "p",
            text: "Am luat prețurile de pe site-urile publice ale furnizorilor în noiembrie 2026. Unde un preț nu apărea clar, am scris asta. Nu am folosit oferte personalizate și nici prețuri primite pe email.",
          },
          {
            tip: "p",
            text: "Reprezinți unul dintre furnizori și vezi o greșeală sau un preț schimbat? Scrie-ne la elevioromania@gmail.com și corectăm la următoarea actualizare. Dacă vrei să auzi și varianta noastră, cere un [demo gratuit](/demo).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Care este cel mai bun agent vocal AI din România?",
        a: "Depinde de ce ai nevoie. Pentru clinici, Callio e specializat pe clinici. Pentru vânzări și lead-uri, LeadVoz. Pentru volume mici, un tarif pe minut poate ieși mai ieftin. Pentru afaceri locale care vor programări, rezervări și comenzi pe numărul existent, Elevio AI e o opțiune de la 150 €/lună + TVA. Testează 2–3 furnizori la demo înainte să alegi.",
      },
      {
        q: "Cât costă un agent vocal AI în România?",
        a: "Din prețurile publice verificate în noiembrie 2026: tarife pe minut de 0,185–0,29 €/min, abonamente de la 139 EUR/lună până la 3.359,99 lei/lună la cele mai mari planuri, plus, la unii furnizori, o taxă de setup. Detalii în tabelul de mai sus și în ghidul [cât costă un recepționer AI](/ghid/cat-costa-receptioner-ai-2027).",
      },
      {
        q: "Prețurile din tabel includ TVA?",
        a: "Diferă de la furnizor la furnizor. Prețurile Elevio AI sunt fără TVA. Pentru ceilalți furnizori nu am verificat, așa că întreabă-i direct înainte să compari.",
      },
      {
        q: "De ce aș avea încredere într-o comparație scrisă de un furnizor?",
        a: "Nu trebuie să ne crezi pe cuvânt. Fiecare preț are sursa lui, deci îl poți verifica. Am spus unde alții sunt mai potriviți și nu ne-am pus pe primul loc.",
      },
      {
        q: "Cât de des actualizați comparația?",
        a: "Lunar. Ultima actualizare: 9 noiembrie 2026. Prețurile se schimbă, așa că verifică întotdeauna și pe site-ul furnizorului.",
      },
      {
        q: "Am găsit o greșeală sau vreau să fiu inclus. Ce fac?",
        a: "Scrie-ne la elevioromania@gmail.com, cu sursa publică a prețului. Corectăm sau adăugăm la următoarea actualizare.",
      },
    ],
    legate: [LINK_COST, LINK_AGENT, LINK_LEGAL],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "cat-costa-receptioner-ai-2027",
    titlu: "Cât costă un recepționer AI în 2027 (și cât un angajat)",
    metaTitle: "Cât costă un recepționer AI în 2027 față de un angajat",
    metaDescription:
      "Cât costă un recepționer AI în 2027: prețuri publice din România, ce intră în costul unui angajat la recepție și un exemplu de calcul al apelurilor pierdute.",
    interogare: "cât costă un recepționer AI",
    variante: [
      "cât costă un recepționer AI 2027",
      "salariu recepționeră vs AI",
      "preț agent vocal AI",
    ],
    eyebrow: "Costuri 2027",
    rezumat:
      "Un recepționer AI costă în România de la câteva zeci de euro pe lună (tarif pe minut, la volume mici) până la câteva sute de euro pe lună la abonamentele obișnuite, uneori plus o taxă de setup. Un angajat la recepție costă salariul brut plus contribuțiile angajatorului și acoperă doar programul lui: în jur de 40 din cele 168 de ore ale unei săptămâni.",
    descriereCard:
      "Prețurile recepționerilor AI din România, costul real al unui angajat și un exemplu de calcul al apelurilor pierdute.",
    datePublished: GHID_DATA_ISO,
    dateModified: GHID_DATA_ISO,
    sectiuni: [
      {
        id: "preturi-receptioner-ai",
        titlu: "Cât costă un recepționer AI în România",
        blocuri: [
          {
            tip: "p",
            text: "Din prețurile publice ale furnizorilor care vând în România (verificate în noiembrie 2026):",
          },
          {
            tip: "lista",
            items: [
              "**Tarif pe minut:** 0,185–0,29 €/min (AgentVocalAI.ro). Avantajos la puține apeluri.",
              "**Abonamente lunare:** de la 139 EUR/lună (Callio, doar clinici) până la 499 €/lună (Agentul Vocal) sau 3.359,99 lei/lună (Vocalyy, cel mai mare plan).",
              "**Setup separat, la unii furnizori:** de exemplu 49 EUR (Callio) sau 1.200 € plus 250 €/lună (Automatizez.ro).",
              "**Elevio AI:** START de la 150 €/lună, PRO de la 300 €/lună, BUSINESS de la 600 €/lună, toate + TVA, plus taxa de implementare. Planurile diferă prin numărul de apeluri incluse și prin funcții; detalii pe pagina de [prețuri](/preturi).",
            ],
          },
          {
            tip: "p",
            text: "Tabelul complet, cu sursa fiecărui preț, e în [comparația agenților vocali AI din România](/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027).",
          },
          {
            tip: "h3",
            text: "Ce să întrebi ca să afli costul real",
          },
          {
            tip: "lista",
            items: [
              "Prețul include TVA?",
              "Există taxă de setup sau de implementare? Cât e?",
              "Câte apeluri sau minute intră în pachet și cât costă ce trece peste?",
              "Există o durată minimă a contractului? (La Elevio AI nu există contract pe termen lung.)",
            ],
          },
        ],
      },
      {
        id: "cost-angajat",
        titlu: "Cât costă de fapt un angajat la recepție",
        blocuri: [
          {
            tip: "p",
            text: "Salariul din anunț e doar o parte. Costul total pentru firmă include, de regulă:",
          },
          {
            tip: "lista",
            items: [
              "**Salariul brut.** Cel puțin salariul minim pe economie; pentru cineva cu experiență, de obicei mai mult.",
              "**Contribuțiile angajatorului** datorate peste salariul brut.",
              "**Beneficiile**, dacă le dai: tichete de masă, bonusuri.",
              "**Concediul de odihnă:** cel puțin 20 de zile lucrătoare pe an, plătite, în care cineva trebuie să răspundă în locul lui.",
              "**Concediile medicale și absențele neprevăzute**, care trebuie și ele acoperite.",
              "**Recrutarea și instruirea**, de fiecare dată când cineva pleacă.",
              "**Orele din afara programului.** Seara, în weekend și de sărbători fie plătești ore suplimentare sau ture, fie telefonul sună în gol.",
            ],
          },
          {
            tip: "nota",
            ton: "atentie",
            titlu: "Despre salariul minim din 2027",
            text: "Nu dăm aici o cifră pentru salariul minim din 2027: la data actualizării (9 noiembrie 2026) nu aveam o valoare oficială confirmată. Pentru calculul tău, folosește salariul pe care l-ai plăti efectiv și cere-i contabilului costul total pentru firmă.",
          },
          {
            tip: "tabel",
            cap: ["", "Angajat la recepție", "Recepționer AI"],
            randuri: [
              ["Ore acoperite pe săptămână", "În jur de 40 din 168 (aprox. 24%)", "168 din 168 (24/7)"],
              ["Weekend și sărbători", "Doar cu ture sau ore suplimentare", "Incluse"],
              ["Concediu și absențe", "Trebuie acoperite de altcineva", "Nu e cazul"],
              ["Ce face în afară de telefon", "Primește clienții, face și alte sarcini", "Doar telefonul"],
              ["Ce plătești", "Salariu brut + contribuții + beneficii", "Abonament + TVA (+ setup sau implementare)"],
            ],
            nota: "40 din 168 de ore: un program de 8 ore, 5 zile pe săptămână, raportat la toate orele unei săptămâni.",
          },
        ],
      },
      {
        id: "apeluri-pierdute",
        titlu: "Cât te costă apelurile pe care nu le preiei (exemplu)",
        blocuri: [
          {
            tip: "p",
            text: "Comparația corectă nu e doar „abonament vs salariu”. Contează și cât pierzi azi din apelurile la care nu răspunde nimeni.",
          },
          {
            tip: "nota",
            ton: "exemplu",
            titlu: "Exemplu ilustrativ, cu cifre presupuse",
            text: "Un salon primește 20 de apeluri pe zi și nu răspunde la 15% dintre ele: 3 apeluri pe zi. Să zicem că jumătate ar fi fost programări noi, deci 1,5 programări pe zi, la o valoare medie de 150 lei. Asta înseamnă 225 lei pe zi, adică 5.625 lei pe lună la 25 de zile lucrătoare. Cifrele nu vin de la un client real și nu sunt medii de piață: sunt puse doar ca să arate calculul.",
          },
          {
            tip: "p",
            text: "**Formula, ca s-o faci cu cifrele tale:** apeluri pe zi × procentul de apeluri nepreluate × procentul care ar fi devenit clienți × valoarea medie a unui client × zile lucrătoare pe lună.",
          },
          {
            tip: "p",
            text: "În exemplul de mai sus, pierderea lunară e mult peste prețul planului START (150 €/lună + TVA). La tine poate fi altfel: dacă pierzi foarte puține apeluri, s-ar putea ca un recepționer AI să nu merite.",
          },
          {
            tip: "h3",
            text: "Cum afli câte apeluri pierzi",
          },
          {
            tip: "lista",
            items: [
              "Uită-te în istoricul telefonului la apelurile nepreluate din ultimele două săptămâni.",
              "Verifică factura detaliată de la operator, dacă o ai.",
              "Timp de o săptămână, notează câte apeluri nu ai putut prelua și de ce: erai cu un client, era după program, era weekend.",
            ],
          },
        ],
      },
      {
        id: "cand-merita",
        titlu: "Când merită un recepționer AI și când nu",
        blocuri: [
          {
            tip: "p",
            text: "**Merită** când pierzi apeluri în timp ce lucrezi, când mare parte din apeluri sunt programări sau întrebări care se repetă, sau când clienții sună și după program.",
          },
          {
            tip: "p",
            text: "**Nu merită** când primești foarte puține apeluri, sau când fiecare apel e o discuție lungă și unică, pe care doar tu o poți purta.",
          },
          {
            tip: "p",
            text: "Multe firme nu aleg între om și AI: recepționerul AI preia apelurile când angajatul e ocupat, în pauză sau acasă. Vezi cum arată asta în pagina despre [recepționerul virtual](/receptioner-virtual) sau ascultă o mostră cerând un [demo gratuit](/demo).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă un recepționer AI pe lună?",
        a: "În România, din prețurile publice verificate în noiembrie 2026: de la tarife pe minut (0,185–0,29 €/min) până la abonamente de la 139 EUR/lună în sus. Elevio AI pornește de la 150 €/lună + TVA, plus taxa de implementare. Vezi [prețurile Elevio AI](/preturi).",
      },
      {
        q: "Un recepționer AI e mai ieftin decât un angajat?",
        a: "De regulă, abonamentul e mai mic decât costul total al unui angajat. Dar nu fac același lucru: AI-ul răspunde doar la telefon, angajatul face și alte sarcini. Compară costul și cu apelurile pe care le pierzi azi.",
      },
      {
        q: "Care e salariul minim în 2027?",
        a: "Nu îl dăm aici: la 9 noiembrie 2026 nu aveam o valoare oficială confirmată pentru 2027. Verifică sursele oficiale sau întreabă contabilul.",
      },
      {
        q: "Are costuri ascunse un recepționer AI?",
        a: "Întreabă de taxa de setup sau implementare, de TVA, de costul minutelor peste pachet și de durata minimă a contractului. La Elevio AI, prețurile sunt + TVA, se adaugă taxa de implementare, iar contractul nu e pe termen lung.",
      },
      {
        q: "Pot să-l ascult înainte să plătesc?",
        a: "Da. Cere un [demo gratuit](/demo) și primești pe email o mostră audio: auzi cum ar răspunde Elevio AI clienților tăi.",
      },
    ],
    legate: [LINK_COMPARATIE, LINK_RECEPTIONER, LINK_CE_ESTE],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "agent-vocal-ai-ecommerce",
    titlu: "Agent vocal AI pentru magazinul online: ce face cu apelurile",
    metaTitle: "Agent vocal AI pentru magazin online: comenzi la telefon",
    metaDescription:
      "Agent vocal AI pentru magazinul online: preia comenzi la telefon, răspunde la întrebări despre livrare și retur și îți transmite cererile, 24/7, în română.",
    interogare: "agent vocal AI magazin online",
    variante: [
      "suport telefonic automat e-commerce",
      "comenzi telefonice magazin online",
      "agent vocal AI ecommerce",
    ],
    eyebrow: "E-commerce",
    rezumat:
      "Un agent vocal AI pentru magazinul online răspunde la telefon când clienții sună cu întrebări înainte de cumpărare, vor să comande telefonic sau întreabă de livrare și retur. Elevio AI răspunde din informațiile pe care i le dai, notează cererea completă și ți-o transmite; nu verifică singur statusul comenzilor.",
    descriereCard:
      "Ce face un agent vocal AI cu apelurile unui magazin online: întrebări, comenzi telefonice, livrare și retur. Și ce nu face.",
    datePublished: GHID_DATA_ISO,
    dateModified: GHID_DATA_ISO,
    sectiuni: [
      {
        id: "de-ce-suna",
        titlu: "De ce sună clienții unui magazin online",
        blocuri: [
          {
            tip: "p",
            text: "Chiar dacă vinzi online, telefonul sună. De obicei, din trei motive:",
          },
          {
            tip: "lista",
            items: [
              "**Înainte de cumpărare:** mărimi, compatibilitate, cât durează livrarea, dacă se poate plăti la livrare.",
              "**Ca să comande la telefon:** clienți care nu vor să comande pe site sau care au o comandă mai complicată.",
              "**După cumpărare:** unde e coletul, cum fac retur, cum schimb un produs.",
            ],
          },
          {
            tip: "p",
            text: "Dacă nimeni nu răspunde, o parte dintre ei cumpără din altă parte. Cu un agent vocal AI, fiecare apel primește răspuns, inclusiv seara și în weekend.",
          },
        ],
      },
      {
        id: "ce-face",
        titlu: "Ce face Elevio AI la fiecare tip de apel",
        blocuri: [
          {
            tip: "tabel",
            cap: ["Tipul de apel", "Ce face Elevio AI", "Ce rămâne la tine"],
            randuri: [
              [
                "Întrebări despre livrare, plată, retur",
                "Răspunde din informațiile pe care i le dai la configurare: termene, costuri, politica de retur, program",
                "Să actualizezi informațiile când se schimbă",
              ],
              [
                "Întrebări despre un produs",
                "Răspunde dacă are informația. Dacă nu e sigur, nu inventează: transferă apelul sau notează întrebarea",
                "Răspunsurile tehnice detaliate",
              ],
              [
                "Comandă telefonică",
                "Notează numele, telefonul, produsele, cantitățile, datele de livrare și cerințele speciale. Clientul primește SMS de confirmare",
                "Să introduci comanda și să confirmi stocul și prețul final",
              ],
              [
                "„Unde e comanda mea?”",
                "Nu verifică statusul comenzii. Notează numărul comenzii și datele clientului și ți le trimite, sau transferă apelul",
                "Să verifici și să revii la client",
              ],
              [
                "Retur, schimb, reclamație",
                "Explică pașii din politica ta de retur, notează cererea și transferă apelul când e cazul",
                "Decizia finală",
              ],
            ],
          },
          {
            tip: "nota",
            ton: "atentie",
            titlu: "Ce nu face",
            text: "Elevio AI nu verifică statusul comenzilor, al coletelor și nici stocul în timp real. Preia cererea completă și ți-o transmite, cu transcriptul și rezumatul apelului. Promitem doar ce face azi.",
          },
        ],
      },
      {
        id: "exemplu-comanda",
        titlu: "Exemplu: o comandă primită la telefon",
        blocuri: [
          {
            tip: "nota",
            ton: "exemplu",
            text: "Exemplu scris de noi ca să arate fluxul, nu transcriptul unui apel real. Duminică, la 21:00, o clientă sună la un magazin online de articole pentru casă. Vrea două seturi de lenjerie și întreabă dacă poate plăti la livrare. Agentul îi răspunde din informațiile magazinului, notează numele, telefonul, adresa, produsele și cantitatea, apoi îi spune că a preluat cererea. Clienta primește SMS de confirmare. Luni dimineață, tu găsești rezumatul și introduci comanda.",
          },
        ],
      },
      {
        id: "configurare",
        titlu: "Ce pregătești ca să-l configurăm pe magazinul tău",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Politica de livrare: curieri, termene, costuri, livrare gratuită de la ce sumă.",
              "Politica de retur și de schimb, pe scurt.",
              "Metodele de plată și programul în care răspunde echipa.",
              "Ce date vrei să fie notate la o comandă telefonică.",
              "Când vrei să fie transferat apelul la tine: de exemplu, la reclamații sau la comenzi mari.",
            ],
          },
          {
            tip: "p",
            text: "Configurarea durează câteva zile și nu există contract pe termen lung. Prețurile sunt pe pagina de [prețuri](/preturi). Pentru alte domenii, vezi [agentul vocal AI pe industrii](/industrii).",
          },
        ],
      },
      {
        id: "cand-merita",
        titlu: "Când merită pentru un magazin online",
        blocuri: [
          {
            tip: "p",
            text: "**Merită** dacă primești zilnic apeluri cu aceleași întrebări, dacă pierzi apeluri cât împachetezi comenzi sau dacă ai clienți care preferă să comande la telefon.",
          },
          {
            tip: "p",
            text: "**Nu merită** dacă telefonul sună rar sau dacă aproape toate apelurile sunt despre statusul comenzilor: pe acelea Elevio AI doar le notează, nu le rezolvă singur.",
          },
          {
            tip: "p",
            text: "Nu știi în ce categorie ești? Cere un [demo gratuit](/demo) și discutăm pe apelurile magazinului tău.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Poate agentul vocal AI să-i spună clientului unde e coletul?",
        a: "Nu. Elevio AI nu verifică statusul comenzilor sau al coletelor. Notează numărul comenzii și datele clientului și ți le transmite, sau transferă apelul la tine.",
      },
      {
        q: "Poate prelua comenzi la telefon?",
        a: "Da. Notează numele, telefonul, produsele, cantitățile și cerințele speciale, iar clientul primește SMS de confirmare. Tu introduci comanda și confirmi stocul și prețul final.",
      },
      {
        q: "Se conectează la platforma magazinului meu?",
        a: "Elevio AI nu verifică comenzi sau stocuri în platforma magazinului. Lucrează cu informațiile pe care i le dai la configurare și îți transmite cererile. Dacă ai o nevoie anume, discutăm la [demo](/demo).",
      },
      {
        q: "Ce face cu un client nemulțumit?",
        a: "Ascultă, notează cererea și, când nu e sigur ce să răspundă, transferă apelul pe telefonul tău în câteva secunde. Nu improvizează.",
      },
      {
        q: "Răspunde și seara sau în weekend?",
        a: "Da, 24/7, inclusiv în weekend și de sărbători, pe numărul pe care îl ai deja.",
      },
      {
        q: "Cât costă pentru un magazin online?",
        a: "Aceleași planuri ca pentru orice firmă: de la 150 €/lună (START), 300 €/lună (PRO) sau 600 €/lună (BUSINESS), toate + TVA, plus taxa de implementare. Detalii pe pagina de [prețuri](/preturi).",
      },
    ],
    legate: [LINK_AGENT, LINK_COST, LINK_COMPARATIE],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "ce-este-un-agent-vocal-ai",
    titlu: "Ce este un agent vocal AI și cum funcționează",
    metaTitle: "Ce este un agent vocal AI și cum funcționează | Elevio AI",
    metaDescription:
      "Ce este un agent vocal AI, explicat simplu: cum transformă vorbirea în text, cum înțelege cererea, cum răspunde cu voce, ce limite are și când merită folosit.",
    interogare: "ce este un agent vocal AI",
    variante: [
      "cum funcționează un recepționer AI",
      "agent vocal AI definiție",
      "ce face un agent vocal AI",
    ],
    eyebrow: "Ghid de bază",
    rezumat:
      "Un agent vocal AI este un program care poartă o conversație la telefon: ascultă ce spune omul, înțelege cererea și îi răspunde cu voce, în limbaj natural. Firmele îl folosesc ca recepționer: răspunde la apeluri, face programări și transmite cererile, iar când nu știe ceva, dă apelul unui om.",
    descriereCard:
      "Definiția, cum funcționează pas cu pas (vorbire → înțelegere → răspuns vocal), ce limite are și când merită.",
    datePublished: GHID_DATA_ISO,
    dateModified: GHID_DATA_ISO,
    sectiuni: [
      {
        id: "definitie",
        titlu: "Definiția, pe scurt",
        blocuri: [
          {
            tip: "p",
            text: "Un agent vocal AI e un asistent cu inteligență artificială care vorbește la telefon. Spre deosebire de un robot cu meniu („apăsați tasta 1”), nu urmează un scenariu fix: înțelege ce i se spune și răspunde potrivit.",
          },
          {
            tip: "p",
            text: "Vei mai auzi și alte denumiri pentru același lucru: **recepționer AI**, **[recepționer virtual](/receptioner-virtual)**, **[robot telefonic AI](/robot-telefonic-ai)** sau asistent vocal. În practică, toate descriu un program care răspunde la telefon în locul tău.",
          },
        ],
      },
      {
        id: "cum-functioneaza",
        titlu: "Cum funcționează, pas cu pas",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "**Recunoașterea vorbirii.** Ce spune clientul e transformat în text (speech-to-text).",
              "**Înțelegerea.** Un model de limbaj citește textul și înțelege ce vrea omul: o programare, o informație, o comandă. Răspunde pe baza informațiilor și a regulilor firmei tale.",
              "**Acțiunea.** Dacă e nevoie, face ceva concret: verifică orele libere din calendar, face programarea, notează comanda.",
              "**Răspunsul vocal.** Răspunsul e transformat înapoi în voce (text-to-speech) și clientul îl aude.",
              "**După apel.** Rămân transcriptul și rezumatul conversației, iar clientul poate primi un SMS de confirmare.",
            ],
          },
          {
            tip: "p",
            text: "Toți pașii se repetă la fiecare replică, în timpul conversației, ca omul să nu aștepte.",
          },
          {
            tip: "h3",
            text: "Concret, la Elevio AI",
          },
          {
            tip: "lista",
            items: [
              "Răspunde 24/7, în română naturală, pe numărul pe care îl ai deja.",
              "Ia programări, rezervări și comenzi: nume, dată, oră, cerințe speciale.",
              "Verifică disponibilitatea în timp real și programează în calendar (Cal.com, Calendly).",
              "Trimite SMS de confirmare clientului.",
              "Îți dă transcriptul și rezumatul fiecărui apel.",
              "Nu improvizează: dacă nu e sigur, transferă apelul pe telefonul tău în câteva secunde.",
            ],
          },
        ],
      },
      {
        id: "limite",
        titlu: "Ce nu poate face un agent vocal AI",
        blocuri: [
          {
            tip: "p",
            text: "E important să știi și limitele, nu doar ce face bine:",
          },
          {
            tip: "lista",
            items: [
              "**Nu știe ce nu i-ai spus.** Dacă o informație nu există în ce i-ai dat, nu are de unde s-o ia. Un agent bun recunoaște asta și dă apelul unui om, în loc să inventeze.",
              "**Poate înțelege greșit**, ca și un om: zgomot puternic, semnal slab, cineva care vorbește foarte neclar. De aceea contează transcriptul, ca să poți verifica.",
              "**Nu ia decizii care țin de tine:** reduceri, excepții, situații delicate.",
              "**Nu înlocuiește relația personală** cu clienții care vor să vorbească anume cu tine.",
            ],
          },
        ],
      },
      {
        id: "comparatie",
        titlu: "Agent vocal AI vs IVR vs mesagerie vocală",
        blocuri: [
          {
            tip: "tabel",
            cap: ["", "Mesagerie vocală", "IVR (meniu cu taste)", "Agent vocal AI"],
            randuri: [
              ["Ce aude clientul", "„Lăsați un mesaj după semnal”", "„Apăsați tasta 1…”", "O conversație normală"],
              ["Rezolvă cererea pe loc", "Nu", "Rareori", "Da, pentru cererile obișnuite"],
              ["Face programări", "Nu", "Nu", "Da, în calendar"],
              ["Ce primești tu", "Un mesaj de ascultat", "Statistici de apeluri", "Transcript și rezumat"],
            ],
          },
        ],
      },
      {
        id: "cand-merita",
        titlu: "Când are sens pentru o afacere locală",
        blocuri: [
          {
            tip: "lista",
            items: [
              "Pierzi apeluri cât lucrezi cu clienții.",
              "Multe apeluri sunt la fel: programări, program, prețuri, adresă.",
              "Clienții sună seara, în weekend sau de sărbători.",
              "Vrei să știi ce s-a vorbit la fiecare apel, fără să asculți înregistrări.",
            ],
          },
          {
            tip: "p",
            text: "Dacă primești foarte puține apeluri, sau dacă fiecare apel e o discuție complicată pe care doar tu o poți purta, probabil nu ai nevoie de el. Cât costă, vezi în ghidul [cât costă un recepționer AI](/ghid/cat-costa-receptioner-ai-2027) și pe pagina de [prețuri](/preturi). Exemple pe domenii găsești în pagina [agent vocal AI pe industrii](/industrii).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Ce este un agent vocal AI?",
        a: "Un program cu inteligență artificială care vorbește la telefon: ascultă ce spune omul, înțelege cererea și răspunde cu voce, în limbaj natural. Firmele îl folosesc ca recepționer.",
      },
      {
        q: "Cum funcționează un recepționer AI?",
        a: "Transformă vorbirea în text, înțelege cererea cu un model de limbaj, face acțiunea necesară (de exemplu, o programare în calendar) și răspunde cu voce. După apel rămân transcriptul și rezumatul.",
      },
      {
        q: "Înțelege bine limba română?",
        a: "Depinde de furnizor. Elevio AI vorbește română naturală, cu intonație firească. Calitatea diferă de la un furnizor la altul, așa că ascultă o mostră: cere un [demo gratuit](/demo).",
      },
      {
        q: "Clienții își dau seama că vorbesc cu un AI?",
        a: "Unii da, alții nu. Recomandăm oricum ca agentul să spună de la început că e un asistent AI. Așa e corect, iar regulile europene (AI Act) cer, ca principiu, ca oamenii să știe când vorbesc cu un sistem AI. Detalii în ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
      },
      {
        q: "Un agent vocal AI poate greși?",
        a: "Da, ca orice sistem. De aceea contează două lucruri: să nu improvizeze când nu știe (Elevio AI transferă atunci apelul la tine în câteva secunde) și să ai transcriptul fiecărui apel, ca să poți verifica.",
      },
      {
        q: "Care e diferența dintre un agent vocal AI și un chatbot?",
        a: "Chatbotul scrie, de obicei pe site sau în aplicații de mesagerie. Agentul vocal AI vorbește, la telefon. Tehnologia de înțelegere e asemănătoare, dar agentul vocal are în plus recunoașterea vorbirii și vocea.",
      },
    ],
    legate: [LINK_AGENT, LINK_ROBOT, LINK_COMPARATIE],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "ai-act-gdpr-receptioner-ai",
    titlu: "AI Act și GDPR: e legal ca un AI să răspundă la telefon?",
    metaTitle: "AI Act și GDPR: e legal ca un AI să răspundă la telefon?",
    metaDescription:
      "E legal ca un AI să răspundă la telefonul firmei? Ce cere AI Act (clientul află că vorbește cu un AI) și ce cere GDPR pentru înregistrări și transcrieri.",
    interogare: "AI Act recepționer AI",
    variante: [
      "GDPR apeluri AI",
      "e legal să răspundă un robot la telefon",
      "înregistrare apeluri GDPR",
    ],
    eyebrow: "Legal, pe înțeles",
    rezumat:
      "În general, da: e legal ca un asistent AI să răspundă la telefonul firmei, cu două condiții de bază. Oamenii trebuie să știe că vorbesc cu un AI (AI Act), iar datele din apel, adică înregistrările, transcrierile, numele și telefoanele, trebuie tratate conform GDPR.",
    descriereCard:
      "Ce cere AI Act (transparența) și ce cere GDPR pentru înregistrări și transcrieri, explicat simplu. Nu e consultanță juridică.",
    datePublished: GHID_DATA_ISO,
    dateModified: GHID_DATA_ISO,
    sectiuni: [
      {
        id: "disclaimer",
        titlu: "Înainte să citești",
        blocuri: [
          {
            tip: "nota",
            ton: "atentie",
            titlu: "Nu este consultanță juridică",
            text: "Ghidul e informativ și general. Pentru situația firmei tale, mai ales dacă lucrezi cu date medicale, discută cu un avocat sau cu responsabilul cu protecția datelor (DPO).",
          },
        ],
      },
      {
        id: "ai-act",
        titlu: "AI Act: clientul trebuie să știe că vorbește cu un AI",
        blocuri: [
          {
            tip: "p",
            text: "AI Act este Regulamentul (UE) 2024/1689 privind inteligența artificială. Articolul 50 stabilește obligații de transparență: sistemele AI care interacționează direct cu oamenii trebuie concepute astfel încât oamenii să fie informați că vorbesc cu un sistem AI, cu excepția cazului în care e evident.",
          },
          {
            tip: "p",
            text: "Obligația cade în principal pe furnizorul sistemului AI. Dar firma care îl folosește la telefon are tot interesul ca agentul să se prezinte corect, pentru că el vorbește în numele ei.",
          },
          {
            tip: "p",
            text: "**Când se aplică.** Regulamentul a intrat în vigoare pe 1 august 2024. Conform calendarului inițial, cele mai multe obligații, inclusiv cele de transparență din articolul 50, se aplică din 2 august 2026. La nivelul UE s-au discutat ajustări ale calendarului pentru unele obligații, așa că verifică forma în vigoare când citești.",
          },
          {
            tip: "p",
            text: "**Nivelul de risc.** Un recepționer AI care face programări nu se încadrează, de regulă, în categoriile cu risc ridicat din AI Act, care privesc de exemplu angajarea, creditarea sau accesul la servicii esențiale. Regulile sunt însă mult mai stricte dacă AI-ul ar fi folosit, de exemplu, pentru triajul urgențelor medicale.",
          },
        ],
      },
      {
        id: "gdpr",
        titlu: "GDPR: înregistrările și transcrierile sunt date personale",
        blocuri: [
          {
            tip: "p",
            text: "Vocea, numele, numărul de telefon și ce spune clientul în apel sunt date cu caracter personal. Un recepționer AI produce de regulă transcrieri și rezumate ale apelurilor (Elevio AI face asta la fiecare apel), deci GDPR se aplică. Esențialul:",
          },
          {
            tip: "lista",
            items: [
              "**Temeiul legal (art. 6 GDPR).** Ai nevoie de un temei pentru prelucrare: de exemplu, pașii făcuți la cererea clientului înainte de un contract (o programare), interesul legitim sau consimțământul. Alegerea depinde de scop.",
              "**Informarea (art. 13).** La începutul apelului spui pe scurt că apelul e preluat de un asistent AI, dacă e înregistrat sau transcris și unde găsește clientul detalii (politica de confidențialitate).",
              "**Minimizarea și păstrarea.** Colectezi doar ce îți trebuie pentru scop. Stabilești cât păstrezi înregistrările și transcrierile și le ștergi după aceea.",
              "**Contractul cu furnizorul (art. 28).** Furnizorul de AI prelucrează de regulă datele în numele tău, ca persoană împuternicită. Ai nevoie de un acord de prelucrare a datelor. Întreabă unde sunt stocate datele și ce subprocesatori folosește.",
              "**Drepturile clienților.** Clienții pot cere acces la date sau ștergerea lor. Trebuie să poți găsi și șterge datele unei persoane.",
              "**Datele de sănătate (art. 9).** La clinici și cabinete, datele despre sănătate sunt o categorie specială și au nevoie de protecție sporită. Ideal, agentul nu cere mai multe detalii medicale decât îi trebuie pentru programare.",
              "**Securitatea (art. 32).** Acces la transcrieri doar pentru cine are nevoie, parole bune, furnizori care protejează datele.",
            ],
          },
          {
            tip: "p",
            text: "În România, autoritatea de supraveghere este ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal).",
          },
        ],
      },
      {
        id: "mesaj-inceput",
        titlu: "Cum poate suna mesajul de început",
        blocuri: [
          {
            tip: "nota",
            ton: "exemplu",
            text: "„Bună ziua, ați sunat la Cabinetul X. Sunt asistentul virtual al cabinetului, un sistem de inteligență artificială. Convorbirea este înregistrată și transcrisă ca să vă putem prelua programarea. Detalii despre date găsiți pe site-ul nostru. Cu ce vă pot ajuta?” Textul e doar un exemplu; formularea exactă o stabilești cu cine te consiliază pe protecția datelor.",
          },
        ],
      },
      {
        id: "checklist",
        titlu: "Checklist înainte să pornești un recepționer AI",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Agentul spune din prima frază că e un asistent AI.",
              "Clientul află la început dacă apelul e înregistrat sau transcris.",
              "Politica de confidențialitate menționează apelurile, transcrierile și furnizorul.",
              "Ai stabilit cât păstrezi înregistrările și transcrierile.",
              "Ai un acord de prelucrare a datelor cu furnizorul.",
              "Știi cum găsești și ștergi datele unui client, dacă ți se cere.",
              "Agentul transferă la un om situațiile delicate. Elevio AI, de exemplu, transferă apelul pe telefonul tău când nu e sigur de un răspuns.",
            ],
          },
          {
            tip: "p",
            text: "Ai întrebări despre cum tratează Elevio AI datele din apeluri? Întreabă-ne la [demo](/demo), cum ai întreba orice furnizor. Despre produs, vezi pagina [agent vocal AI](/agent-vocal-ai), iar despre costuri, pagina de [prețuri](/preturi).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "E legal ca un AI să răspundă la telefonul firmei?",
        a: "În general, da, dacă oamenii știu că vorbesc cu un AI și dacă datele din apel sunt tratate conform GDPR. Nu e consultanță juridică: pentru cazul tău, discută cu un specialist.",
      },
      {
        q: "Trebuie să le spun clienților că vorbesc cu un AI?",
        a: "Da. Articolul 50 din AI Act cere ca sistemele AI care vorbesc direct cu oamenii să fie concepute astfel încât oamenii să știe asta, cu excepția cazului în care e evident. Cel mai simplu: agentul spune din prima frază că e asistent AI.",
      },
      {
        q: "Am nevoie de consimțământ ca să înregistrez apelurile?",
        a: "Nu neapărat. GDPR permite mai multe temeiuri legale, de exemplu pașii făcuți la cererea clientului sau interesul legitim, în funcție de scop. Indiferent de temei, trebuie să-l informezi pe client la începutul apelului. Temeiul potrivit îl stabilești cu un specialist.",
      },
      {
        q: "Cât timp pot păstra înregistrările și transcrierile?",
        a: "GDPR nu dă un termen fix: doar cât e necesar pentru scop. Stabilește un termen, scrie-l în politica de confidențialitate și respectă-l.",
      },
      {
        q: "Ce e diferit pentru clinici și cabinete medicale?",
        a: "Datele despre sănătate sunt o categorie specială în GDPR și au nevoie de protecție sporită. Agentul ar trebui să ceară doar ce e necesar pentru programare. Merită o discuție cu DPO-ul sau cu un avocat înainte de pornire.",
      },
      {
        q: "Ghidul acesta e consultanță juridică?",
        a: "Nu. E o explicație generală, scrisă pe înțeles. Pentru decizii concrete, consultă un avocat sau un specialist în protecția datelor.",
      },
    ],
    legate: [LINK_CE_ESTE, LINK_RECEPTIONER, LINK_COMPARATIE],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "redirectionare-apeluri",
    titlu: "Redirecționare apeluri: coduri, activare, verificare și anulare",
    metaTitle: "Redirecționare apeluri: coduri **21*, **61*, ##002#",
    metaDescription:
      "Cum redirecționezi apelurile de pe mobil: coduri pentru toate apelurile (**21*), când nu răspunzi (**61*), ocupat (**67*), fără semnal (**62*) și anulare (##002#).",
    interogare: "redirecționare apeluri",
    variante: [
      "cod redirecționare apeluri",
      "cum redirecționez apelurile",
      "anulare redirecționare apeluri",
      "redirecționare apeluri Orange Vodafone Digi",
    ],
    eyebrow: "Ghid practic",
    rezumat:
      "Redirecționarea se activează din tastatura telefonului, cu un cod: **21*număr# pentru toate apelurile, **61*număr# când nu răspunzi, **67*număr# când ești ocupat și **62*număr# când nu ai semnal. Toate se anulează cu ##002#.",
    descriereCard:
      "Codurile pentru fiecare situație, cum verifici ce e activ, cum anulezi și către cine merită să redirecționezi telefonul firmei.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    sectiuni: [
      {
        id: "coduri",
        titlu: "Codurile de redirecționare, pe situații",
        blocuri: [
          {
            tip: "p",
            text: "Codurile de mai jos sunt coduri GSM standard. Funcționează la operatorii mobili din România (Orange, Vodafone, Digi și ceilalți), pe orice telefon, Android sau iPhone. În loc de „număr” scrii numărul către care vrei să trimiți apelurile, de preferat în format internațional (de exemplu +40 7xx xxx xxx).",
          },
          {
            tip: "tabel",
            cap: ["Situația", "Activare", "Verificare", "Anulare"],
            randuri: [
              ["Toate apelurile, mereu", "**21*număr#", "*#21#", "##21#"],
              ["Când nu răspunzi", "**61*număr#", "*#61#", "##61#"],
              ["Când ești ocupat", "**67*număr#", "*#67#", "##67#"],
              ["Când nu ai semnal sau telefonul e închis", "**62*număr#", "*#62#", "##62#"],
              ["Toate cele condiționate (61, 62, 67) deodată", "**004*număr#", "", "##004#"],
              ["Anulează orice redirecționare", "", "", "##002#"],
            ],
            legenda: "După ce tastezi codul, apeși tasta de apel. Telefonul afișează un mesaj de confirmare de la rețea.",
          },
          {
            tip: "h3",
            text: "Câte secunde sună înainte să se redirecționeze",
          },
          {
            tip: "p",
            text: "La redirecționarea „când nu răspunzi” poți alege după câte secunde pleacă apelul mai departe: **61*număr**20# trimite apelul după 20 de secunde. Rețelele acceptă de obicei valori între 5 și 30 de secunde, din 5 în 5.",
          },
        ],
      },
      {
        id: "pe-care-o-alegi",
        titlu: "Pe care o alegi",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Lipsești o perioadă (concediu, spital, alt număr):** toate apelurile, cu **21*.",
              "**Vrei să răspunzi tu când poți, iar restul să nu se piardă:** combinația „când nu răspunzi” + „ocupat” + „fără semnal”, cel mai simplu cu **004*.",
              "**Ai un singur telefon pentru firmă și ești des pe teren:** tot redirecționările condiționate. Clientul te sună întâi pe tine și ajunge mai departe doar dacă nu poți.",
            ],
          },
        ],
      },
      {
        id: "setari-telefon",
        titlu: "Din setările telefonului, fără coduri",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**iPhone:** Setări → Telefon (sau Aplicații → Telefon) → Redirecționare apeluri. iPhone are doar redirecționarea tuturor apelurilor; pentru cele condiționate folosești codurile.",
              "**Android:** aplicația Telefon → meniul cu trei puncte → Setări → Conturi de apelare sau Setări suplimentare → Redirecționare apeluri. Aici găsești și variantele condiționate.",
            ],
          },
          {
            tip: "nota",
            ton: "info",
            text: "Meniurile diferă puțin de la un model la altul. Dacă nu găsești opțiunea, codurile din tabel funcționează pe orice telefon.",
          },
        ],
      },
      {
        id: "cost",
        titlu: "Cât costă",
        blocuri: [
          {
            tip: "p",
            text: "Activarea e gratuită. Apelul redirecționat se taxează, de regulă, ca un apel făcut de pe numărul tău către numărul destinație, după abonamentul tău. Dacă ai minute naționale incluse, de obicei intră în ele. Pentru redirecționări către numere din străinătate sau speciale, verifică tariful la operator.",
          },
        ],
      },
      {
        id: "mesageria",
        titlu: "Mesageria vocală e tot o redirecționare",
        blocuri: [
          {
            tip: "p",
            text: "Când apelantul ajunge în căsuța vocală, de fapt apelul a fost redirecționat „când nu răspunzi” către numărul mesageriei. Dacă vrei să trimiți apelurile în altă parte, anulezi întâi mesageria (cu ##002# sau din setări) și activezi noua redirecționare.",
          },
          {
            tip: "p",
            text: "Problema mesageriei la o firmă: puțini clienți lasă mesaj. Cine are o urgență sau vrea o programare sună la următorul număr din listă.",
          },
        ],
      },
      {
        id: "nu-functioneaza",
        titlu: "Dacă nu funcționează",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Verifică dacă e deja activă altă redirecționare, cu *#21#, *#61#, *#62#, *#67#.",
              "Anulează tot cu ##002# și activează din nou.",
              "Scrie numărul destinație cu prefix internațional (+40).",
              "Dacă ai cartelă prepaid, verifică să ai credit: unele oferte nu permit redirecționarea fără credit.",
              "Dacă tot nu merge, sună la serviciul clienți al operatorului: uneori serviciul trebuie activat pe abonament.",
            ],
          },
        ],
      },
      {
        id: "firma",
        titlu: "Pentru telefonul unei firme: către cine redirecționezi",
        blocuri: [
          {
            tip: "p",
            text: "La o afacere locală, redirecționarea rezolvă doar jumătate din problemă: apelul nu se mai pierde, dar trebuie să-l preia cineva. Variantele obișnuite sunt un coleg, un dispecerat sau un [recepționer virtual AI](/receptioner-virtual).",
          },
          {
            tip: "p",
            text: "Cu un recepționer AI, redirecționarea condiționată (**004*) face ca tu să răspunzi primul, iar apelurile pe care nu le poți prelua să ajungă la asistent. El vorbește cu clientul în română, face programarea în calendar, îi trimite un SMS de confirmare și îți trimite un rezumat al apelului. Elevio AI lucrează exact așa, pe numărul existent al firmei. Vezi [cum funcționează](/agent-vocal-ai) și [prețurile](/preturi).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Care e codul pentru redirecționarea tuturor apelurilor?",
        a: "**21*număr# și apoi tasta de apel. Se anulează cu ##21# sau, împreună cu toate celelalte, cu ##002#.",
      },
      {
        q: "Cum anulez redirecționarea apelurilor?",
        a: "Tastezi ##002# și apeși tasta de apel. Codul anulează toate redirecționările active, inclusiv mesageria vocală.",
      },
      {
        q: "Cum verific dacă am redirecționarea activă?",
        a: "Cu *#21# pentru toate apelurile, *#61# pentru „nu răspund”, *#62# pentru „fără semnal” și *#67# pentru „ocupat”. Telefonul îți arată numărul către care se trimit apelurile.",
      },
      {
        q: "Codurile sunt aceleași la Orange, Vodafone și Digi?",
        a: "Da, sunt coduri GSM standard. Diferă doar tarifarea apelurilor redirecționate, după abonament.",
      },
      {
        q: "Pot redirecționa apelurile către un recepționer AI?",
        a: "Da. Activezi redirecționarea către numărul asistentului, de obicei doar pentru apelurile la care nu răspunzi (**004*), ca tu să rămâi primul care răspunde.",
      },
    ],
    legate: [LINK_RECEPTIONER, LINK_AGENT, LINK_COST],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "centrala-telefonica-virtuala-vs-receptioner-ai",
    titlu: "Centrală telefonică virtuală sau recepționer AI: ce alegi pentru o afacere locală",
    metaTitle: "Centrală telefonică virtuală sau recepționer AI?",
    metaDescription:
      "Ce face o centrală telefonică virtuală (meniuri, cozi, interioare), ce face un recepționer AI (răspunde, programează, transferă) și când merită fiecare.",
    interogare: "centrală telefonică virtuală",
    variante: [
      "centrală telefonică virtuală pentru firme",
      "centrală telefonică virtuală vs recepționer AI",
      "PBX virtual",
    ],
    eyebrow: "Comparație",
    rezumat:
      "O centrală telefonică virtuală împarte apelurile între oameni: meniuri, cozi, interioare. Un recepționer AI vorbește el cu clientul: răspunde la întrebări, face programări și transferă doar ce are nevoie de un om. Multe firme le folosesc împreună.",
    descriereCard:
      "Ce face fiecare, comparația pe nevoi concrete și când are sens să le legi una de alta.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    sectiuni: [
      {
        id: "centrala",
        titlu: "Ce face o centrală telefonică virtuală",
        blocuri: [
          {
            tip: "p",
            text: "O centrală telefonică virtuală (PBX în cloud) e varianta modernă a centralei din birou. Nu mai ai un aparat în dulap: totul rulează la furnizor, iar colegii răspund din aplicație, de pe telefon sau de pe calculator.",
          },
          {
            tip: "lista",
            items: [
              "**Meniu vocal (IVR):** „pentru programări apăsați 1, pentru contabilitate apăsați 2”.",
              "**Cozi de apeluri:** apelanții așteaptă cu muzică până se eliberează cineva.",
              "**Interioare:** fiecare coleg are numărul lui scurt, iar apelurile se transferă între ei.",
              "**Program de lucru:** în afara programului, un mesaj înregistrat sau mesageria.",
              "**Rapoarte:** câte apeluri au intrat, câte au fost preluate, câte s-au pierdut.",
            ],
          },
          {
            tip: "p",
            text: "Ce nu face: nu vorbește cu clientul. Dacă nu e niciun om liber, apelul rămâne în coadă, ajunge la mesagerie sau se pierde.",
          },
        ],
      },
      {
        id: "receptioner",
        titlu: "Ce face un recepționer AI",
        blocuri: [
          {
            tip: "p",
            text: "Un [recepționer AI](/receptioner-virtual) e un asistent vocal care poartă conversația în locul unui om. Clientul vorbește normal, fără taste.",
          },
          {
            tip: "lista",
            items: [
              "Răspunde la întrebările care se repetă: program, adresă, servicii, ce acte trebuie aduse.",
              "Face programări direct în calendar și trimite confirmarea prin SMS.",
              "Transferă apelul la un om când clientul are nevoie sau când nu are un răspuns sigur.",
              "Preia mai multe apeluri deodată, deci nu există coadă.",
              "După fiecare apel trimite un rezumat și transcrierea.",
            ],
          },
        ],
      },
      {
        id: "comparatie",
        titlu: "Comparația, pe nevoi",
        blocuri: [
          {
            tip: "tabel",
            cap: ["Nevoia", "Centrală virtuală", "Recepționer AI"],
            randuri: [
              ["Împart apelurile între 5+ colegi", "Da, e făcută pentru asta", "Poate transfera, dar nu e rolul principal"],
              ["Nu pierd apelurile după program", "Doar mesaj sau mesagerie", "Da, vorbește cu clientul 24/7"],
              ["Fac programări prin telefon fără un om", "Nu", "Da, în calendar"],
              ["Răspund la aceleași întrebări de 20 de ori pe zi", "Nu", "Da"],
              ["Vârfuri de apeluri (campanii, sezon)", "Coadă de așteptare", "Preia mai multe apeluri deodată"],
              ["Clientul vorbește liber, fără taste", "Nu, meniu cu taste", "Da"],
            ],
          },
        ],
      },
      {
        id: "cand",
        titlu: "Când alegi una, când pe cealaltă",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Ai o echipă mare care răspunde toată ziua:** centrala virtuală e baza. Un recepționer AI poate prelua apelurile din afara programului.",
              "**Ai o afacere locală, cu 1–3 oameni care fac și altceva decât să răspundă la telefon:** recepționerul AI rezolvă direct problema apelurilor pierdute.",
              "**Primești mai ales cereri de programare:** recepționerul AI, pentru că termină treaba singur, nu doar direcționează apelul.",
            ],
          },
        ],
      },
      {
        id: "impreuna",
        titlu: "Cum le folosești împreună",
        blocuri: [
          {
            tip: "p",
            text: "Cele mai multe centrale virtuale pot trimite apelul către un număr extern: în afara programului, când coada e plină sau când nu răspunde nimeni într-un anumit timp. Numărul acela poate fi recepționerul AI. Pe un singur telefon mobil, același efect îl obții cu [redirecționarea condiționată](/ghid/redirectionare-apeluri).",
          },
          {
            tip: "p",
            text: "Elevio AI lucrează pe numărul existent al firmei, în două moduri: preia toate apelurile sau doar pe cele la care nu răspunde nimeni. Vezi [prețurile](/preturi) sau ascultă cum sună la [demo](/demo).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Ce este o centrală telefonică virtuală?",
        a: "Un sistem de telefonie în cloud care împarte apelurile firmei între colegi, cu meniuri, cozi și interioare, fără echipament în birou.",
      },
      {
        q: "Un recepționer AI înlocuiește centrala telefonică?",
        a: "Nu neapărat. Centrala împarte apelurile între oameni, recepționerul AI vorbește cu clientul. La o afacere locală mică, recepționerul AI poate fi suficient. La o echipă mare, cele două se completează.",
      },
      {
        q: "Pot păstra numărul de telefon actual?",
        a: "Da, la ambele variante. Recepționerul AI preia apelurile prin redirecționare sau prin centrala pe care o ai deja.",
      },
      {
        q: "Ce e mai bun pentru programări?",
        a: "Recepționerul AI, pentru că face programarea singur, în calendar. Centrala doar duce apelul la un om care o face.",
      },
    ],
    legate: [LINK_ROBOT, LINK_RECEPTIONER, LINK_CE_ESTE],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "apeluri-pierdute-firma",
    titlu: "Apeluri pierdute la firmă: de ce se întâmplă și cum le recuperezi",
    metaTitle: "Apeluri pierdute la firmă: cauze și soluții concrete",
    metaDescription:
      "De ce pierde o afacere locală apeluri, cum afli câte pierzi, cât te costă și 6 soluții, de la apel înapoi și SMS automat la redirecționare și recepționer AI.",
    interogare: "apeluri pierdute firmă",
    variante: [
      "apeluri ratate clienți",
      "cum nu mai pierd apeluri",
      "clienți care nu răspund la telefon firma",
    ],
    eyebrow: "Ghid practic",
    rezumat:
      "O afacere locală pierde apeluri mai ales după program, în pauze și când cineva e deja la telefon. Primul pas e să le numeri. Apoi alegi soluția după volum: apel înapoi rapid, SMS automat, redirecționare sau un recepționer AI care preia apelurile pe care nu le poți prelua tu.",
    descriereCard:
      "Când se pierd apelurile, cum le numeri, un exemplu de calcul al costului și ce soluții există, de la cele gratuite la recepționerul AI.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    sectiuni: [
      {
        id: "cand",
        titlu: "Când se pierd apelurile",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**După program și în weekend.** Clienții sună când au ei timp: seara, după serviciu, sau sâmbătă.",
              "**Când cineva e deja la telefon.** Al doilea client primește „ocupat” sau ajunge la mesagerie.",
              "**Când omul de la telefon face altceva:** e cu un pacient, e pe o lucrare, servește la masă.",
              "**În pauze și la schimbul de tură.**",
              "**În vârfuri:** luni dimineață, înainte de sărbători, în sezon.",
            ],
          },
        ],
      },
      {
        id: "numara",
        titlu: "Cum afli câte apeluri pierzi",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "**Lista de apeluri ratate din telefon.** Notează timp de o săptămână câte apeluri nepreluate ai și la ce oră.",
              "**Raportul operatorului sau al centralei.** Multe centrale virtuale arată apelurile pierdute și durata de așteptare.",
              "**Întreabă clienții noi** cum te-au găsit și dacă au mai încercat să sune.",
            ],
          },
          {
            tip: "nota",
            ton: "info",
            text: "Uită-te mai ales la ore. Dacă apelurile pierdute se adună seara sau la prânz, soluția e alta decât dacă se pierd pentru că ai prea multe deodată.",
          },
        ],
      },
      {
        id: "cost",
        titlu: "Cât te costă un apel pierdut",
        blocuri: [
          {
            tip: "p",
            text: "Formula e simplă: apeluri pierdute pe lună × cât îți aduce în medie un client care sună × cât de des un apel devine client.",
          },
          {
            tip: "nota",
            ton: "exemplu",
            titlu: "Exemplu de calcul (cifre inventate, doar pentru ilustrare)",
            text: "2 apeluri pierdute pe zi lucrătoare înseamnă aproximativ 44 pe lună. Dacă unul din patru ar fi devenit o programare de 300 de lei, pierderea e de aproximativ 11 programări, adică 3.300 de lei pe lună. Pune cifrele tale în locul acestora.",
          },
          {
            tip: "p",
            text: "Calculul complet, cu varianta de recepționer AI, îl găsești în ghidul [cât costă un recepționer AI](/ghid/cat-costa-receptioner-ai-2027).",
          },
        ],
      },
      {
        id: "solutii",
        titlu: "6 soluții, de la cele gratuite la cele automate",
        blocuri: [
          {
            tip: "tabel",
            cap: ["Soluția", "Cost", "Ce rezolvă", "Ce nu rezolvă"],
            randuri: [
              ["Suni înapoi repede", "Gratuit", "Clienții răbdători", "Seara și urgențele: până suni, clientul a ales pe altcineva"],
              ["SMS automat la apel ratat", "Mic (aplicație sau centrală)", "Clientul știe că ai văzut apelul", "Nu face programarea"],
              ["Mesageria vocală", "Gratuit", "Puțin: mulți închid fără mesaj", "Aproape tot"],
              ["Redirecționare către un coleg", "Timpul colegului", "Apelurile din program", "Seara, weekendul, vârfurile"],
              ["Programare online pe site", "Mic", "Clienții care preferă să scrie", "Clienții care sună"],
              ["Recepționer AI", "Abonament lunar", "Seara, weekendul, vârfurile: vorbește cu clientul și face programarea", "Situațiile care cer un om (le transferă)"],
            ],
          },
          {
            tip: "p",
            text: "Pentru redirecționare ai codurile în ghidul [redirecționare apeluri](/ghid/redirectionare-apeluri). Pentru varianta automată, vezi ce face un [recepționer virtual AI](/receptioner-virtual).",
          },
        ],
      },
      {
        id: "plan",
        titlu: "Un plan simplu pentru următoarea lună",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Săptămâna 1: numără apelurile pierdute și notează orele.",
              "Săptămâna 2: activează redirecționarea condiționată către cine poate răspunde și un SMS automat la apel ratat.",
              "Săptămâna 3: dacă tot pierzi apeluri seara sau în vârfuri, testează un recepționer AI doar pe apelurile pe care nu le preiei.",
              "Săptămâna 4: compară numărul de programări cu luna dinainte.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Care e cea mai ieftină soluție pentru apeluri pierdute?",
        a: "Apelul înapoi rapid și redirecționarea condiționată către un coleg. Sunt gratuite, dar nu acoperă seara, weekendul și momentele în care toată lumea e ocupată.",
      },
      {
        q: "Merită un recepționer AI pentru o firmă mică?",
        a: "Merită dacă pierzi constant apeluri pe care nu le poți prelua și un client nou îți aduce mai mult decât costul lunar. Fă întâi calculul de mai sus cu cifrele tale.",
      },
      {
        q: "Cum le spun clienților că a răspuns un asistent?",
        a: "Asistentul se prezintă singur ca asistent virtual, din prima frază. E și o cerință legală (AI Act). Detalii în ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
      },
    ],
    legate: [LINK_COST, LINK_RECEPTIONER, LINK_LEGAL],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "robot-telefonic-vs-ivr",
    titlu: "Robot telefonic AI vs IVR: care e diferența și ce alegi",
    metaTitle: "Robot telefonic AI vs IVR: diferențe și ce alegi",
    metaDescription:
      "IVR-ul te pune să apeși taste, robotul telefonic AI vorbește cu tine. Diferențele pe scurt, un tabel comparativ și când merită fiecare pentru o afacere locală.",
    interogare: "robot telefonic vs IVR",
    variante: [
      "ce este IVR",
      "IVR vs AI",
      "diferența robot telefonic IVR",
    ],
    eyebrow: "Comparație",
    rezumat:
      "Un IVR e un meniu înregistrat: clientul apasă taste ca să ajungă undeva. Un robot telefonic AI poartă o conversație: clientul spune ce vrea, iar robotul răspunde, face programarea sau transferă la un om.",
    descriereCard:
      "Ce e un IVR, ce e un robot telefonic AI, tabelul comparativ și când are sens fiecare.",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    sectiuni: [
      {
        id: "ivr",
        titlu: "Ce este un IVR",
        blocuri: [
          {
            tip: "p",
            text: "IVR vine de la „Interactive Voice Response”. E meniul pe care îl auzi la bancă sau la operator: „pentru informații apăsați 1, pentru reclamații apăsați 2”. Mesajele sunt înregistrate dinainte, iar sistemul înțelege doar tastele (uneori și câteva cuvinte-cheie).",
          },
          {
            tip: "p",
            text: "Rolul lui e să trimită apelul la departamentul potrivit. Nu rezolvă cererea: la capătul meniului tot un om trebuie să răspundă.",
          },
        ],
      },
      {
        id: "robot-ai",
        titlu: "Ce este un robot telefonic AI",
        blocuri: [
          {
            tip: "p",
            text: "Un [robot telefonic AI](/robot-telefonic-ai) (sau agent vocal AI) înțelege vorbirea liberă și răspunde cu voce naturală. Clientul spune „aș vrea o programare joi după-amiază”, iar robotul verifică calendarul, propune o oră și confirmă.",
          },
        ],
      },
      {
        id: "tabel",
        titlu: "Diferențele, pe scurt",
        blocuri: [
          {
            tip: "tabel",
            cap: ["", "IVR", "Robot telefonic AI"],
            randuri: [
              ["Cum vorbește clientul", "Apasă taste", "Vorbește liber, în română"],
              ["Ce face", "Direcționează apelul", "Rezolvă cererea: informații, programări, transfer"],
              ["Întrebări neprevăzute", "Nu le înțelege", "Răspunde din ce știe sau transferă"],
              ["După program", "Mesaj înregistrat", "Conversație completă, 24/7"],
              ["Mai multe apeluri deodată", "Coadă", "Le preia în paralel"],
              ["Configurare", "Înregistrări + arbore de taste", "Informațiile firmei + regulile de transfer"],
            ],
          },
        ],
      },
      {
        id: "cand",
        titlu: "Când merită fiecare",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**IVR:** firme mari, cu multe departamente și oameni care răspund toată ziua. Meniul doar împarte apelurile.",
              "**Robot telefonic AI:** afaceri locale unde nu e mereu cineva liber la telefon, iar apelurile sunt mai ales programări, rezervări și întrebări care se repetă.",
              "**Amândouă:** IVR-ul rămâne în față, iar opțiunea „programări” sau apelurile din afara programului merg la robotul AI.",
            ],
          },
          {
            tip: "nota",
            ton: "atentie",
            titlu: "Ce să verifici la un robot AI",
            text: "Să se prezinte ca asistent virtual, să transfere repede la un om când nu știe și să nu inventeze răspunsuri. Sună la demo și pune o întrebare la care nu se așteaptă.",
          },
          {
            tip: "p",
            text: "Elevio AI e un robot telefonic AI în română, pentru afaceri locale. Vezi [cum funcționează](/robot-telefonic-ai) și [prețurile](/preturi).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "IVR-ul e același lucru cu robotul telefonic?",
        a: "Nu. „Robot telefonic” se folosea pentru IVR, adică meniul cu taste. Un robot telefonic AI poartă însă o conversație și rezolvă cererea, nu doar o direcționează.",
      },
      {
        q: "Pot păstra IVR-ul și adăuga un robot AI?",
        a: "Da. O opțiune din meniu sau apelurile din afara programului se pot trimite către robotul AI.",
      },
      {
        q: "Clienților le place să vorbească cu un AI?",
        a: "Le place mai puțin să apese taste sau să nu răspundă nimeni. Contează ca asistentul să fie clar că e AI, să fie util și să transfere repede la un om când e nevoie.",
      },
    ],
    legate: [LINK_ROBOT, LINK_CE_ESTE, LINK_AGENT],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "secretariat-telefonic",
    titlu: "Secretariat telefonic: externalizat, virtual sau cu AI",
    metaTitle: "Secretariat telefonic: externalizat, virtual sau AI",
    metaDescription:
      "Ce face un secretariat telefonic, cum funcționează varianta externalizată, cea virtuală și cea cu AI, ce întrebi înainte și ce se potrivește unei firme mici.",
    interogare: "secretariat telefonic",
    variante: [
      "secretariat telefonic externalizat",
      "secretariat virtual",
      "secretariat telefonic automat",
      "preluare apeluri externalizată",
    ],
    eyebrow: "Ghid practic",
    rezumat:
      "Un secretariat telefonic răspunde la telefonul firmei în locul tău. Poate fi un om angajat, o firmă externă care preia apelurile pentru mai mulți clienți sau un asistent AI care vorbește singur cu clienții, 24/7.",
    descriereCard:
      "Cele trei variante de secretariat telefonic, ce face fiecare, ce întrebi furnizorul și cum alegi.",
    datePublished: "2026-11-11",
    dateModified: "2026-11-11",
    sectiuni: [
      {
        id: "ce-face",
        titlu: "Ce face un secretariat telefonic",
        blocuri: [
          {
            tip: "lista",
            items: [
              "Răspunde la telefon cu numele firmei.",
              "Dă informații de bază: program, adresă, servicii.",
              "Notează mesaje și cereri de ofertă.",
              "Face sau notează programări.",
              "Transferă apelurile importante la omul potrivit.",
            ],
          },
          {
            tip: "p",
            text: "Pentru o firmă de avocatură, un cabinet medical sau o afacere locală, rolul lui e același: niciun client să nu sune în gol.",
          },
        ],
      },
      {
        id: "variante",
        titlu: "Trei variante",
        blocuri: [
          {
            tip: "h3",
            text: "1. Secretară angajată",
          },
          {
            tip: "p",
            text: "Cunoaște firma cel mai bine și primește clienții la birou. Limitele: programul de lucru, concediile, pauzele și un singur apel deodată.",
          },
          {
            tip: "h3",
            text: "2. Secretariat telefonic externalizat",
          },
          {
            tip: "p",
            text: "O firmă specializată, cu operatori care răspund pentru mai mulți clienți, după un script primit de la tine. Avantaj: răspunde un om. Limite: operatorul nu e doar al tău, programul depinde de furnizor, iar tarifele se calculează de obicei pe apel, pe minut sau pe pachet.",
          },
          {
            tip: "h3",
            text: "3. Secretariat telefonic cu AI",
          },
          {
            tip: "p",
            text: "Un [recepționer virtual AI](/receptioner-virtual) care vorbește cu clientul în română, 24/7. Răspunde la întrebările care se repetă, face programări în calendar, trimite confirmări prin SMS și transferă la un om ce are nevoie de un om. Preia mai multe apeluri deodată și trimite un rezumat după fiecare apel.",
          },
        ],
      },
      {
        id: "comparatie",
        titlu: "Comparația, pe scurt",
        blocuri: [
          {
            tip: "tabel",
            cap: ["", "Secretară angajată", "Secretariat externalizat", "Secretariat cu AI"],
            randuri: [
              ["Program", "Programul firmei", "Programul furnizorului", "24/7"],
              ["Apeluri simultane", "Unul", "Depinde de furnizor", "Mai multe deodată"],
              ["Cunoaște firma", "Foarte bine", "Din script", "Din informațiile configurate"],
              ["Programări", "Da", "De obicei notează cererea", "Da, direct în calendar"],
              ["Situații delicate", "Le gestionează", "Le notează sau transferă", "Le transferă la tine"],
              ["Ce rămâne scris", "Ce notează", "Un mesaj sau un e-mail", "Transcript și rezumat pentru fiecare apel"],
            ],
          },
        ],
      },
      {
        id: "intrebari",
        titlu: "Ce întrebi un furnizor, înainte să semnezi",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Cine răspunde și în ce program? Ce se întâmplă noaptea și în weekend?",
              "Cum se calculează prețul: pe apel, pe minut sau abonament? Există cost de pornire?",
              "Pot păstra numărul de telefon actual?",
              "Cum ajung la mine mesajele și programările, și cât de repede?",
              "Ce se întâmplă cu urgențele?",
              "Unde se păstrează înregistrările și datele clienților, și cât timp (GDPR)?",
              "Pot asculta un apel de test înainte?",
            ],
          },
        ],
      },
      {
        id: "avocatura",
        titlu: "Exemplu: o firmă de avocatură",
        blocuri: [
          {
            tip: "p",
            text: "La un cabinet de avocatură, telefonul sună în timp ce avocatul e în instanță sau în ședință. Clienții noi vor o primă discuție, clienții existenți vor un termen sau o informație despre dosar. Un secretariat telefonic, uman sau AI, preia datele, programează consultația și îi spune clientului clar când va fi sunat înapoi. Informațiile despre dosare rămân la avocat: asistentul nu dă consultanță juridică.",
          },
          {
            tip: "p",
            text: "Elevio AI are o pagină dedicată pentru [avocați și notari](/industrii/avocati-notari). Pentru costuri, vezi [prețurile](/preturi).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Ce este un secretariat telefonic?",
        a: "Un serviciu care răspunde la telefonul firmei în locul tău: dă informații, notează mesaje, face programări și transferă apelurile importante.",
      },
      {
        q: "Care e diferența dintre secretariatul externalizat și cel cu AI?",
        a: "La cel externalizat răspunde un operator uman, care lucrează pentru mai mulți clienți. La cel cu AI răspunde un asistent vocal, 24/7, care poate prelua mai multe apeluri deodată și face programări direct în calendar.",
      },
      {
        q: "Clienții află că vorbesc cu un asistent AI?",
        a: "Da. Asistentul se prezintă ca asistent virtual. Vezi ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
      },
    ],
    legate: [LINK_RECEPTIONER, LINK_COST, LINK_LEGAL],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "mesaj-automat-apel-ratat",
    titlu: "Mesaj automat la apel ratat: SMS, WhatsApp sau recepționer AI",
    metaTitle: "Mesaj automat la apel ratat: cum îl setezi pentru firmă",
    metaDescription:
      "Cum trimiți automat un SMS sau un mesaj pe WhatsApp când pierzi un apel, ce să scrii în el, ce limite are și când e mai bine ca apelul să fie preluat direct.",
    interogare: "mesaj automat apel ratat",
    variante: [
      "SMS automat apel pierdut",
      "răspuns automat la apel ratat",
      "mesaj automat după program",
    ],
    eyebrow: "Ghid practic",
    rezumat:
      "Un mesaj automat la apel ratat îi spune clientului că i-ai văzut apelul și când revii. Se setează dintr-o aplicație, din centrala telefonică sau din WhatsApp Business. Ajută, dar nu face programarea: clientul tot trebuie să aștepte să-l suni.",
    descriereCard:
      "De unde setezi un mesaj automat la apel ratat, modele de text și când e mai bine ca apelul să fie preluat direct.",
    datePublished: "2026-11-11",
    dateModified: "2026-11-11",
    sectiuni: [
      {
        id: "unde",
        titlu: "De unde se setează",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Centrala telefonică virtuală.** Multe centrale pot trimite automat un SMS la apelurile nepreluate. E varianta cea mai curată, dacă ai deja centrală.",
              "**O aplicație pe telefonul firmei.** Pe Android există aplicații care trimit SMS la apel ratat. Verifică permisiunile cerute și unde ajung datele.",
              "**WhatsApp Business.** Are mesaj de bun venit și mesaj de absență, dar pentru mesajele scrise pe WhatsApp, nu pentru apelurile pe numărul obișnuit.",
              "**Respingerea cu mesaj.** Majoritatea telefoanelor îți dau un SMS rapid când respingi un apel („Te sun în 10 minute”). E manual, nu automat.",
            ],
          },
          {
            tip: "nota",
            ton: "info",
            text: "Pe iPhone nu există o setare care să trimită singură un SMS la orice apel ratat. Ai nevoie de o centrală sau de un serviciu extern.",
          },
        ],
      },
      {
        id: "modele",
        titlu: "Ce să scrii în mesaj",
        blocuri: [
          {
            tip: "p",
            text: "Scurt, cu numele firmei, cu ce urmează și, dacă ai, cu un link de programare online.",
          },
          {
            tip: "lista",
            items: [
              "„Bună ziua, ați sunat la [Firma]. Nu am putut răspunde acum. Vă sunăm înapoi în cel mult o oră, în programul de lucru.”",
              "„Bună ziua, ați sunat la [Firma], în afara programului (L–V, 9–18). Vă sunăm mâine dimineață. Pentru programări: [link].”",
              "„Am văzut apelul dumneavoastră. Dacă e o urgență, scrieți-ne aici și revenim imediat.”",
            ],
          },
        ],
      },
      {
        id: "limite",
        titlu: "Limitele mesajului automat",
        blocuri: [
          {
            tip: "lista",
            items: [
              "Clientul tot trebuie să aștepte. Cine are o urgență sună la următorul număr.",
              "Programarea nu se face până nu revii tu.",
              "Dacă nu suni înapoi cum ai promis, mesajul face mai mult rău decât bine.",
              "Ai nevoie de acordul clientului pentru mesaje de marketing. Un mesaj de serviciu („vă sunăm înapoi”) e altceva, dar nu adăuga oferte în el.",
            ],
          },
        ],
      },
      {
        id: "alternativa",
        titlu: "Alternativa: apelul preluat direct",
        blocuri: [
          {
            tip: "p",
            text: "Dacă pierzi multe apeluri, mai eficient e ca apelul să fie preluat pe loc. Un [recepționer virtual AI](/receptioner-virtual) vorbește cu clientul, face programarea în calendar și abia apoi îi trimite SMS-ul de confirmare. Cum îl pui doar pe apelurile la care nu răspunzi, vezi în ghidul [redirecționare apeluri](/ghid/redirectionare-apeluri).",
          },
          {
            tip: "p",
            text: "Un plan complet pentru apelurile pierdute găsești în ghidul [apeluri pierdute la firmă](/ghid/apeluri-pierdute-firma).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Pot trimite automat un SMS la fiecare apel ratat?",
        a: "Da, dintr-o centrală telefonică virtuală sau dintr-o aplicație pe Android. Pe iPhone ai nevoie de o centrală sau de un serviciu extern.",
      },
      {
        q: "WhatsApp Business trimite mesaj la apel ratat?",
        a: "Mesajele automate din WhatsApp Business (bun venit, absență) răspund la mesajele scrise pe WhatsApp, nu la apelurile pe numărul obișnuit.",
      },
      {
        q: "E mai bun un SMS automat sau un recepționer AI?",
        a: "SMS-ul automat e ieftin și îi spune clientului că revii. Recepționerul AI rezolvă cererea pe loc: răspunde, face programarea și trimite confirmarea. Dacă pierzi puține apeluri, SMS-ul ajunge. Dacă pierzi multe, merită apelul preluat direct.",
      },
    ],
    legate: [LINK_RECEPTIONER, LINK_COST, LINK_AGENT],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "receptioner-ai-cal-com-calendly",
    titlu: "Recepționer AI cu Cal.com sau Calendly: programări prin telefon, direct în calendar",
    metaTitle: "Recepționer AI cu Cal.com și Calendly: cum funcționează",
    metaDescription:
      "Cum face un recepționer AI programări prin telefon direct în Cal.com sau Calendly: disponibilitate în timp real, confirmare prin SMS, reprogramări și ce configurezi.",
    interogare: "recepționer AI Cal.com Calendly",
    variante: [
      "programări telefonice Calendly",
      "agent vocal AI Cal.com",
      "programări automate prin telefon în calendar",
    ],
    eyebrow: "Integrări",
    rezumat:
      "Un recepționer AI legat de Cal.com sau Calendly verifică în timpul apelului ce ore sunt libere, propune clientului variante și face programarea direct în calendar. Clientul primește confirmarea prin SMS, iar tu vezi programarea ca pe oricare alta.",
    descriereCard:
      "Cum arată o programare prin telefon făcută de un asistent AI direct în Cal.com sau Calendly și ce trebuie configurat.",
    datePublished: "2026-11-11",
    dateModified: "2026-11-11",
    sectiuni: [
      {
        id: "de-ce",
        titlu: "De ce contează legătura cu calendarul",
        blocuri: [
          {
            tip: "p",
            text: "Un asistent care doar notează „clientul vrea o programare joi” te lasă tot pe tine să suni înapoi. Legat de calendar, asistentul termină treaba în timpul apelului: vede ce e liber, propune o oră, confirmă și trimite SMS-ul. Clientul închide telefonul cu programarea făcută.",
          },
        ],
      },
      {
        id: "cum-arata",
        titlu: "Cum arată un apel",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "Clientul spune ce vrea: „O consultație joi după-amiază, dacă se poate.”",
              "Asistentul verifică în calendar orele libere pentru tipul acela de programare.",
              "Propune două-trei variante: „Am liber joi la 15:00 sau la 17:30.”",
              "Cere datele necesare: numele și numărul de telefon (sau ce ai stabilit tu).",
              "Face programarea în calendar și confirmă verbal.",
              "Clientul primește un SMS de confirmare, iar tu primești rezumatul apelului.",
            ],
          },
        ],
      },
      {
        id: "cal-com-calendly",
        titlu: "Cal.com sau Calendly",
        blocuri: [
          {
            tip: "p",
            text: "Amândouă sunt aplicații de programări online care se sincronizează cu Google Calendar sau Outlook. Diferențele de bază:",
          },
          {
            tip: "tabel",
            cap: ["", "Cal.com", "Calendly"],
            randuri: [
              ["Tip", "Open source, are și variantă găzduită", "Serviciu găzduit"],
              ["Tipuri de programări", "Da, cu durate și reguli diferite", "Da, cu durate și reguli diferite"],
              ["Sincronizare calendar", "Google, Outlook și altele", "Google, Outlook și altele"],
              ["Pagină de programare online", "Da", "Da"],
            ],
            nota: "Pentru detalii și prețuri actuale, verifică site-ul fiecărei aplicații.",
          },
          {
            tip: "p",
            text: "Dacă folosești deja una dintre ele pentru programări online, asistentul AI o folosește pe aceeași. Programările de la telefon și cele de pe site ajung în același loc, fără suprapuneri.",
          },
        ],
      },
      {
        id: "configurare",
        titlu: "Ce configurezi",
        blocuri: [
          {
            tip: "lista",
            items: [
              "**Tipurile de programări:** consultație, control, igienizare, ofertă, cu durata fiecăreia.",
              "**Programul:** zilele și orele în care se pot face programări, pauzele, zilele libere.",
              "**Cine lucrează:** dacă ai mai mulți medici sau specialiști, fiecare cu calendarul lui.",
              "**Ce date ceri:** de regulă numele și telefonul. Cere doar ce îți trebuie (GDPR).",
              "**Reprogramări și anulări:** dacă le poate face asistentul sau le trimite la tine.",
              "**Confirmarea:** textul SMS-ului.",
            ],
          },
        ],
      },
      {
        id: "elevio",
        titlu: "La Elevio AI",
        blocuri: [
          {
            tip: "p",
            text: "Elevio AI face programări în calendar (Cal.com, Calendly), cu verificarea disponibilității în timp real, reprogramări, anulări și confirmări prin SMS sau WhatsApp, de la planul PRO. Planul START preia cererea de programare cu toate detaliile și o trimite echipei spre confirmare. Detalii pe pagina de [prețuri](/preturi).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Poate un asistent AI să facă programări direct în Calendly?",
        a: "Da, dacă e legat de contul tău de Calendly. Verifică disponibilitatea în timpul apelului și creează programarea ca pe una făcută de pe pagina ta de programări.",
      },
      {
        q: "Ce se întâmplă dacă ora cerută e ocupată?",
        a: "Asistentul vede asta în calendar și propune alte ore libere, apropiate de ce a cerut clientul.",
      },
      {
        q: "Trebuie să renunț la programările online de pe site?",
        a: "Nu. Programările de la telefon și cele online ajung în același calendar.",
      },
      {
        q: "Merge cu Google Calendar?",
        a: "Cal.com și Calendly se sincronizează cu Google Calendar, deci programările făcute de asistent apar și acolo.",
      },
    ],
    legate: [LINK_AGENT, LINK_ROBOT, LINK_RECEPTIONER],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "cum-testezi-agent-vocal-ai-romana",
    titlu: "Cum testezi un agent vocal AI în română înainte să-l cumperi",
    metaTitle: "Cum testezi un agent vocal AI în română: 12 teste",
    metaDescription:
      "12 teste simple pe care le faci la telefon ca să vezi dacă un agent vocal AI vorbește bine românește: nume, cifre, întreruperi, diacritici, transfer la om.",
    interogare: "asistent vocal AI care vorbește bine românește",
    variante: [
      "agent vocal AI limba română",
      "test agent vocal AI",
      "AI care vorbește română la telefon",
    ],
    eyebrow: "Ghid practic",
    rezumat:
      "Cel mai sigur test e un apel adevărat. Sună la numărul demo al furnizorului și încearcă 12 situații: nume și adrese, cifre, întreruperi, o întrebare neprevăzută, un client nervos și cererea de a vorbi cu un om. Notează unde se încurcă.",
    descriereCard:
      "Lista de teste pe care le faci la telefon, ce urmărești la fiecare și ce întrebi furnizorul după.",
    datePublished: "2026-11-11",
    dateModified: "2026-11-11",
    sectiuni: [
      {
        id: "de-ce",
        titlu: "De ce nu e suficient un demo pe site",
        blocuri: [
          {
            tip: "p",
            text: "O mostră audio arată vocea în cel mai bun caz. Clienții tăi vorbesc repede, prescurtează, schimbă ideea la jumătate și sună din mașină. Ca să vezi cum se descurcă agentul, trebuie să-l pui în situațiile acestea.",
          },
        ],
      },
      {
        id: "teste",
        titlu: "12 teste la telefon",
        blocuri: [
          {
            tip: "lista",
            numerotata: true,
            items: [
              "**Un nume dificil:** „Ștefănescu-Pîrvulescu”. Îl repetă corect?",
              "**O adresă:** „Strada Mihai Eminescu 24, bloc C3, scara 2”.",
              "**Un număr de telefon** dictat în grupuri: „07… 23… 45…”.",
              "**O dată relativă:** „joia viitoare” sau „poimâine dimineață”.",
              "**O întrerupere:** vorbește peste el în mijlocul frazei. Se oprește și te ascultă?",
              "**O schimbare de idee:** „Joi la 10… de fapt, mai bine vineri.”",
              "**O întrebare la care nu are răspuns.** Inventează sau spune că nu știe?",
              "**Vorbește repede**, ca un client grăbit.",
              "**Vorbește cu zgomot în fundal** (geam deschis, mașină).",
              "**Un client nervos:** „Am sunat de trei ori și nu răspunde nimeni!”",
              "**Cere un om:** „Vreau să vorbesc cu cineva de la voi.” Cât de repede transferă?",
              "**Întreabă-l direct:** „Ești robot?” Răspunsul corect: da, e asistent virtual.",
            ],
          },
        ],
      },
      {
        id: "ce-urmaresti",
        titlu: "Ce urmărești",
        blocuri: [
          {
            tip: "tabel",
            cap: ["Ce", "Bine", "Semnal de alarmă"],
            randuri: [
              ["Pronunția", "Naturală, cu diacritici", "Accent străin, cuvinte „citite” greșit"],
              ["Pauzele", "Răspunde repede, fără tăceri lungi", "Tăceri de câteva secunde"],
              ["Întreruperile", "Se oprește și ascultă", "Continuă să vorbească"],
              ["Cifre și nume", "Le repetă ca să confirme", "Le notează greșit, fără confirmare"],
              ["Ce nu știe", "Spune că verifică sau transferă", "Inventează un răspuns"],
              ["Transferul", "În câteva secunde", "Nu poate sau te ține pe loc"],
            ],
          },
        ],
      },
      {
        id: "dupa",
        titlu: "Ce întrebi furnizorul după test",
        blocuri: [
          {
            tip: "lista",
            items: [
              "Ce primesc după fiecare apel: transcript, rezumat, înregistrare?",
              "Cum se configurează pe afacerea mea (program, servicii, prețuri, reguli de transfer) și cine o face?",
              "Câte apeluri preia în același timp?",
              "Merge pe numărul meu actual?",
              "Unde se păstrează datele și cât timp?",
            ],
          },
          {
            tip: "p",
            text: "Elevio AI poate fi testat exact așa: ceri un apel demo pe pagina de [demo](/demo) sau asculți mostra de pe pagina [agent vocal AI](/agent-vocal-ai). Comparația cu alți furnizori din România e în ghidul [cei mai buni agenți vocali AI în 2027](/ghid/cei-mai-buni-agenti-vocali-ai-romania-2027).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Care asistent vocal AI vorbește cel mai bine românește?",
        a: "Depinde de vocea și de modelul folosit, iar calitatea se schimbă de la o lună la alta. Cel mai sigur e să suni la numărul demo al fiecărui furnizor și să faci testele de mai sus.",
      },
      {
        q: "Cât ar trebui să dureze testul?",
        a: "5–10 minute pe furnizor. Fă aceleași teste la fiecare, ca să-i poți compara.",
      },
      {
        q: "E normal ca agentul să spună că e AI?",
        a: "Da, și e și obligatoriu: AI Act cere ca oamenii să știe că vorbesc cu un AI. Vezi ghidul despre [AI Act și GDPR](/ghid/ai-act-gdpr-receptioner-ai).",
      },
    ],
    legate: [LINK_COMPARATIE, LINK_AGENT, LINK_CE_ESTE],
  },
];

export function getGhid(slug: string): Ghid | undefined {
  return GHIDURI.find((g) => g.slug === slug);
}
