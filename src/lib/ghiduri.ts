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
              "**Ești o firmă mică și vrei programări, rezervări și comenzi pe numărul existent:** Elevio AI, de la 150 €/lună + TVA. Detalii pe pagina de [prețuri](/preturi).",
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
                "—",
                "Pe minut",
                `0,185–0,29 €/min. Sursa: [agentvocalai.ro](https://agentvocalai.ro), ${VERIFICAT}`,
              ],
              [
                "Agentul Vocal (agentulvocal.ro)",
                "—",
                "Abonament lunar",
                `299 / 399 / 499 €/lună. Sursa: [agentulvocal.ro](https://agentulvocal.ro), ${VERIFICAT}`,
              ],
              [
                "Automatizez.ro",
                "—",
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
                "Firme mici: programări, rezervări, comenzi",
                "Abonament lunar + implementare",
                `150 / 300 / 600 €/lună + TVA, plus taxa de implementare. Sursa: [elevio-agency.ro/preturi](/preturi), ${VERIFICAT}`,
              ],
              [
                "Estera (tryestera.com/ro)",
                "—",
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
                "—",
                "Pachete",
                `299 / 399 / 1.099 / 2.099 lei. Sursa: [aireceptionist.ro](https://aireceptionist.ro), ${VERIFICAT}`,
              ],
              [
                "Vocalyy (vocalyy.ro)",
                "—",
                "Abonament lunar",
                `599,99–3.359,99 lei/lună. Sursa: [vocalyy.ro](https://vocalyy.ro), ${VERIFICAT}`,
              ],
            ],
            nota: "„—” înseamnă că nu am evaluat încă pe ce domenii se concentrează furnizorul. Prețurile se schimbă: le-am verificat în noiembrie 2026 și actualizăm tabelul lunar. Nu am verificat pentru fiecare furnizor dacă prețul include TVA sau ce conține fiecare pachet (minute, apeluri, funcții).",
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
        a: "Depinde de ce ai nevoie. Pentru clinici, Callio e specializat pe clinici. Pentru vânzări și lead-uri, LeadVoz. Pentru volume mici, un tarif pe minut poate ieși mai ieftin. Pentru firme mici care vor programări, rezervări și comenzi pe numărul existent, Elevio AI e o opțiune de la 150 €/lună + TVA. Testează 2–3 furnizori la demo înainte să alegi.",
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
        titlu: "Când are sens pentru o firmă mică",
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
];

export function getGhid(slug: string): Ghid | undefined {
  return GHIDURI.find((g) => g.slug === slug);
}
