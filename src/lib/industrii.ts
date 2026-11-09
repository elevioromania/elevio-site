// Paginile pe industrii (/industrii și /industrii/[slug]).
// Sursa: seo/PLAN-30-ZILE.md, secțiunea 2.2.
//
// Reguli de conținut (nu le încălca la editare):
// - Afirmăm doar ce face Elevio AI azi: recepționer vocal AI în română, 24/7,
//   pe numărul existent; preia programări, comenzi și cereri și le transmite
//   structurat; verifică disponibilitatea și programează în calendar
//   (Cal.com, Calendly); SMS de confirmare; transcript + rezumat la fiecare
//   apel; nu improvizează și transferă apelul în câteva secunde; configurare
//   în câteva zile, fără contract pe termen lung; de la 150€/lună + TVA.
// - Fără clienți, testimoniale, statistici sau integrări inventate.
// - Calculele sunt exemple și sunt marcate ca atare pe pagină.

export type Categorie =
  | "Comerț"
  | "Meserii & casă"
  | "Sănătate"
  | "Beauty & wellness"
  | "Auto"
  | "HoReCa & turism"
  | "Servicii profesionale";

export const CATEGORII: { nume: Categorie; descriere: string }[] = [
  {
    nume: "Comerț",
    descriere: "Comenzi telefonice și întrebări despre livrare și retur.",
  },
  {
    nume: "Meserii & casă",
    descriere:
      "Urgențe transferate în câteva secunde, cereri de ofertă și programări la evaluare.",
  },
  {
    nume: "Sănătate",
    descriere:
      "Programări pe medic, fără sfaturi medicale: urgențele ajung la un om.",
  },
  {
    nume: "Beauty & wellness",
    descriere: "Programări pe specialist și serviciu, cu durata corectă.",
  },
  {
    nume: "Auto",
    descriere: "Programări la service, înscrieri și rezervări de mașini.",
  },
  {
    nume: "HoReCa & turism",
    descriere: "Rezervări de mese și cereri de cazare, preluate și seara.",
  },
  {
    nume: "Servicii profesionale",
    descriere:
      "Consultații programate și clienți filtrați, fără sfaturi date la telefon.",
  },
];

/** Valoarea acceptată de formularul /demo (câmpul „tip”). */
export type TipDemo =
  | "restaurant"
  | "magazin"
  | "service_auto"
  | "medical"
  | "beauty"
  | "altul";

export type Replica = {
  /** „sistem” = notă de context în transcript (transfer, schimbare de apel). */
  cine: "client" | "elevio" | "sistem";
  text: string;
};

export type Industrie = {
  slug: string;
  /** Numele scurt, pentru breadcrumb și carduri: „Instalatori”. */
  nume: string;
  /** Continuarea lui „Recepționer vocal AI pentru …”: „instalatori”. */
  pentru: string;
  categorie: Categorie;
  /** Valul de publicare din plan (1 = cele mai importante). */
  val: 1 | 2 | 3;
  /** Interogarea principală din PLAN-30-ZILE.md, 2.2. */
  interogare: string;
  tipDemo: TipDemo;
  /** 50–60 de caractere, cuvântul cheie la început. */
  titluSEO: string;
  /** 140–160 de caractere. */
  descriere: string;
  h1: string;
  /** Răspunsul în primele două propoziții. */
  intro: string;
  /** O propoziție pentru cardul din hub. */
  scurt: string;
  deCeSunaClientii: { titlu: string; text: string }[];
  scenariu: {
    context: string;
    replici: Replica[];
    dupaApel: string;
  };
  ceFaceElevio: string[];
  exempluCalcul: {
    ipoteze: string[];
    rezultat: string;
  };
  faq: { q: string; a: string }[];
  industriiInrudite: string[];
};

const VAL_1: Industrie[] = [
  // ───────────────────────────── Magazine online
  {
    slug: "magazine-online",
    nume: "Magazine online",
    pentru: "magazine online",
    categorie: "Comerț",
    val: 1,
    interogare: "agent vocal AI magazin online",
    tipDemo: "magazin",
    titluSEO: "Agent vocal AI pentru magazin online, în română, 24/7",
    descriere:
      "Agent vocal AI pentru magazinul tău online: preia comenzi la telefon și răspunde despre livrare, plată și retur, 24/7, în română. De la 150€/lună + TVA.",
    h1: "Agent vocal AI pentru magazinul tău online",
    intro:
      "Elevio AI răspunde la telefonul magazinului tău online 24/7, în română: preia comenzi telefonice, răspunde la întrebările despre livrare, plată și retur și îți transmite tot ce cere o verificare. Nu se conectează la platforma magazinului, așa că nu inventează statusuri de colet: notează numărul comenzii și cererea, iar omul tău revine cu răspunsul.",
    scurt:
      "Comenzi telefonice, întrebări despre livrare și retur, cereri transmise echipei.",
    deCeSunaClientii: [
      {
        titlu: "Vor să comande la telefon",
        text: "Unii clienți preferă să dicteze comanda decât să completeze un formular. Au nevoie de cineva care notează produsul, varianta, cantitatea, adresa și metoda de plată.",
      },
      {
        titlu: "Întreabă de livrare înainte să comande",
        text: "Cât costă transportul, în câte zile ajunge coletul, dacă se poate plăti ramburs. Sunt întrebări cu răspuns fix, pe care le auzi de zeci de ori.",
      },
      {
        titlu: "Vor să returneze sau să schimbe ceva",
        text: "Mărimea nu se potrivește, produsul a ajuns deteriorat. Clientul vrea să afle pașii și să-și lase cererea undeva unde n-o pierde nimeni.",
      },
      {
        titlu: "Întreabă unde e coletul",
        text: "Cea mai frecventă întrebare după cumpărare. Elevio AI nu vede statusul din platformă, dar preia numărul comenzii și telefonul, ca echipa să verifice și să revină.",
      },
      {
        titlu: "Au întrebări despre un produs",
        text: "Dimensiuni, compatibilitate, garanție, materiale. Elevio AI răspunde din informațiile pe care i le dai; ce nu știe, notează și transmite.",
      },
      {
        titlu: "Sună seara și în weekend",
        text: "Mulți cumpără după program. Dacă nu răspunde nimeni, comanda pleacă la magazinul care răspunde.",
      },
    ],
    scenariu: {
      context:
        "Sâmbătă, 21:15. Depozitul e închis, iar un client vrea să comande la telefon și mai are o întrebare despre o comandă veche.",
      replici: [
        {
          cine: "client",
          text: "Bună seara. Aș vrea să comand două seturi de lenjerie din cele gri, pentru pat dublu.",
        },
        {
          cine: "elevio",
          text: "Bună seara! Sigur, notez comanda. Pe ce nume să fie și la ce adresă o livrăm?",
        },
        {
          cine: "client",
          text: "Maria Ionescu, strada Florilor 12, Brașov. În cât timp ajunge?",
        },
        {
          cine: "elevio",
          text: "Livrarea prin curier durează de obicei 1–2 zile lucrătoare. Plata se poate face ramburs sau cu cardul, la livrare. Cum preferați?",
        },
        {
          cine: "client",
          text: "Ramburs. Și dacă nu-mi place culoarea, o pot returna?",
        },
        {
          cine: "elevio",
          text: "Da, aveți 14 zile de la primirea coletului ca să-l returnați. Colegii vă explică pașii când vă confirmă comanda.",
        },
        {
          cine: "client",
          text: "Bine. Mai am o comandă de săptămâna trecută, numărul 10482, care n-a ajuns.",
        },
        {
          cine: "elevio",
          text: "Îmi pare rău pentru întârziere. Eu nu văd statusul coletelor, dar am notat comanda 10482 și numărul dumneavoastră. Colegii verifică luni dimineață și vă sună.",
        },
        {
          cine: "elevio",
          text: "Am înregistrat comanda nouă: două seturi de lenjerie gri, pat dublu, plată ramburs, livrare în Brașov. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Luni dimineață, echipa găsește în rezumat comanda nouă (produse, adresă, plată) și o cerere separată: „verificare livrare, comanda 10482”, cu telefonul clientei. Nimeni nu a primit o informație inventată despre colet.",
    },
    ceFaceElevio: [
      "Preia comenzi telefonice complete: produs, variantă, cantitate, nume, adresă, telefon, metodă de plată și observații.",
      "Răspunde la întrebările despre livrare, costuri de transport, plată și retur exact cum le-ai scris tu.",
      "Notează cererile care cer o verificare (unde e coletul, produs deteriorat, schimb de mărime) și le transmite echipei structurat, cu numărul comenzii.",
      "Transferă apelul pe telefonul tău în câteva secunde când clientul e nemulțumit sau întrebarea iese din ce știe.",
      "Trimite clientului SMS de confirmare, iar ție transcriptul și rezumatul fiecărui apel.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Magazinul primește 10 apeluri pe săptămână în afara programului.",
        "Presupunem că 3 dintre ele sunt clienți gata să comande.",
        "Valoarea medie a unei comenzi: 200 lei.",
      ],
      rezultat:
        "3 comenzi × 200 lei × 4 săptămâni = 2.400 lei pe lună în vânzări care pot pleca la concurență, doar din apelurile de seară și de weekend.",
    },
    faq: [
      {
        q: "Poate Elevio AI să spună clientului unde e coletul?",
        a: "Nu. Elevio AI nu se conectează la platforma magazinului sau la curier, deci nu vede statusul comenzilor. Preia numărul comenzii și datele clientului, îi spune că un coleg revine și îți transmite cererea. Așa nu primește nimeni o informație greșită.",
      },
      {
        q: "Se integrează cu Shopify, WooCommerce sau Gomag?",
        a: "Nu oferim integrare directă cu platformele de magazin online. Comenzile telefonice și cererile ajung la tine structurat, cu transcriptul și rezumatul apelului, iar echipa le procesează cum lucrează deja.",
      },
      {
        q: "De unde știe politica de retur și costurile de livrare?",
        a: "Le primește de la tine la configurare: costuri de transport, termene, metode de plată, politica de retur, garanții. Răspunde doar din ele. Când schimbi ceva, ne spui și actualizăm.",
      },
      {
        q: "Poate spune dacă un produs e pe stoc?",
        a: "Nu vede stocul în timp real. Poate spune ce produse aveți în ofertă, dacă i le dai, iar pentru disponibilitatea exactă notează cererea și echipa confirmă.",
      },
      {
        q: "Ce face cu un client nervos, care vrea banii înapoi acum?",
        a: "Nu negociază și nu promite rambursări. Dacă ai setat așa, transferă apelul pe telefonul tău în câteva secunde. Dacă nu poți răspunde, notează reclamația cu toate detaliile și îi spune clientului că revine un om.",
      },
      {
        q: "Trebuie să schimb numărul de telefon de pe site?",
        a: "Nu. Elevio AI preia apelurile pe numărul pe care îl ai deja. Clienții sună ca până acum.",
      },
      {
        q: "Merită pentru un magazin mic, cu câteva apeluri pe zi?",
        a: "Depinde câte comenzi pierzi când nu răspunzi. Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung, deci poți încerca o perioadă și vezi în transcripturi ce apeluri primești de fapt.",
      },
    ],
    industriiInrudite: ["restaurante", "tamplarie-pvc", "rent-a-car"],
  },

  // ───────────────────────────── Reparații acoperișuri
  {
    slug: "reparatii-acoperisuri",
    nume: "Reparații acoperișuri",
    pentru: "firme de reparații acoperișuri",
    categorie: "Meserii & casă",
    val: 1,
    interogare: "robot telefonic firmă acoperișuri",
    tipDemo: "altul",
    titluSEO: "Robot telefonic pentru firme de acoperișuri, 24/7, în română",
    descriere:
      "Robot telefonic pentru firma ta de acoperișuri: preia cereri de ofertă, programează evaluări și îți transferă infiltrațiile urgente, 24/7, în română.",
    h1: "Robot telefonic pentru firma ta de acoperișuri",
    intro:
      "Elevio AI răspunde la telefon pentru firma ta de acoperișuri 24/7, în română, cât timp tu ești pe acoperiș. Preia cererile de ofertă cu adresa, tipul acoperișului și problema, programează evaluarea în calendar și îți transferă imediat apelurile urgente, cum ar fi o infiltrație în timpul ploii.",
    scurt:
      "Infiltrații urgente, cereri de ofertă și evaluări programate cât ești pe acoperiș.",
    deCeSunaClientii: [
      {
        titlu: "Plouă în casă",
        text: "Infiltrațiile apar în timpul ploii sau după furtună, adesea seara. Omul e speriat și sună pe rând la toate firmele până răspunde cineva.",
      },
      {
        titlu: "Vor o ofertă pentru acoperiș nou",
        text: "Înlocuire de țiglă, tablă sau șindrilă. Trebuie notate suprafața aproximativă, tipul acoperișului și localitatea.",
      },
      {
        titlu: "Vor o evaluare la fața locului",
        text: "Nu poți da un preț fără să urci pe acoperiș. Clientul vrea o zi și o oră pentru vizită.",
      },
      {
        titlu: "Țigle luate de vânt",
        text: "După o furtună sună mulți deodată, iar tu ești deja pe acoperișul altcuiva și nu poți răspunde.",
      },
      {
        titlu: "Jgheaburi, burlane, mansardări",
        text: "Lucrări pe care le faci sau nu. Clientul vrea să afle repede dacă a sunat unde trebuie.",
      },
      {
        titlu: "Zona și termenul",
        text: "„Veniți și în comuna mea? Când puteți începe?” Răspunsuri simple, dacă le știe cineva la telefon.",
      },
    ],
    scenariu: {
      context:
        "Marți, 19:40, plouă torențial. Patronul e pe drum spre casă, iar unui client îi intră apă prin tavan.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, îmi intră apă prin tavan în camera de la etaj. Cred că a luat vântul niște țigle. Puteți veni?",
        },
        {
          cine: "elevio",
          text: "Bună seara. Îmi pare rău, sună urgent. Spuneți-mi, vă rog, adresa și dacă apa curge chiar acum.",
        },
        {
          cine: "client",
          text: "Strada Morilor 8, în Sânpetru, lângă Brașov. Da, curge, am pus o găleată.",
        },
        {
          cine: "elevio",
          text: "Am notat. Ce fel de acoperiș aveți: țiglă, tablă sau altceva?",
        },
        { cine: "client", text: "Țiglă ceramică, casa e din 2005." },
        {
          cine: "elevio",
          text: "Mulțumesc. Pentru infiltrațiile active vă pun direct în legătură cu responsabilul de urgențe. Rămâneți pe linie câteva secunde.",
        },
        {
          cine: "sistem",
          text: "Apelul e transferat pe telefonul patronului în câteva secunde. După convorbire, primește transcriptul și rezumatul cu adresa, tipul acoperișului și problema.",
        },
      ],
      dupaApel:
        "Patronul vorbește direct cu clientul și stabilește ce se poate face în seara asta. Dacă se programează o evaluare pentru a doua zi, ea intră în calendar, iar clientul primește SMS de confirmare.",
    },
    ceFaceElevio: [
      "Răspunde la orice oră, inclusiv seara și în weekend, pe numărul firmei, cât tu lucrezi la înălțime și nu poți scoate telefonul.",
      "La cererile de ofertă notează localitatea, tipul acoperișului (țiglă, tablă, șindrilă), suprafața aproximativă și ce trebuie făcut.",
      "Verifică în calendar (Cal.com, Calendly) zilele libere pentru evaluare și programează vizita; clientul primește SMS de confirmare.",
      "Infiltrațiile active și alte urgențe le transferă pe telefonul tău în câteva secunde, după regulile tale.",
      "Îți lasă transcriptul și rezumatul fiecărui apel, ca să suni înapoi știind deja despre ce e vorba.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Ratezi 4 apeluri pe săptămână cât ești pe acoperiș.",
        "Presupunem că unul dintre ele ar fi devenit o lucrare.",
        "O reparație medie de acoperiș: 3.000 lei (un acoperiș nou costă mult mai mult).",
      ],
      rezultat:
        "1 lucrare × 3.000 lei × 4 săptămâni = 12.000 lei pe lună în lucrări care ajung la alt meșter.",
    },
    faq: [
      {
        q: "Ce face Elevio AI când sună cineva cu apă în casă?",
        a: "Notează adresa și ce se întâmplă, apoi transferă apelul pe telefonul tău în câteva secunde. Tu decizi la configurare ce înseamnă urgență și la ce număr ajunge. Dacă nu poți răspunde, cererea rămâne notată complet, cu telefonul clientului, ca să suni înapoi.",
      },
      {
        q: "Poate da un preț pentru acoperiș la telefon?",
        a: "Nu inventează prețuri. Dacă vrei, spune prețurile orientative pe care i le dai tu, de exemplu costul deplasării la evaluare. Prețul final rămâne după ce vezi acoperișul.",
      },
      {
        q: "Cum programează evaluările dacă eu sunt mereu pe teren?",
        a: "Elevio AI vede în calendarul tău (Cal.com sau Calendly) intervalele pe care le-ai lăsat libere pentru evaluări și pune vizita acolo. Clientul primește SMS de confirmare, iar tu vezi programarea în calendar.",
      },
      {
        q: "Știe în ce localități lucrez?",
        a: "Da, dacă îi dai lista de localități sau raza în care vă deplasați. Când sună cineva din afara zonei, îi spune politicos și notează totuși cererea, în caz că vrei să faci o excepție.",
      },
      {
        q: "După o furtună sună mulți oameni deodată. Ce se întâmplă?",
        a: "Fiecare apel primit ajunge în lista ta cu adresa și problema, ca să decizi pe cine suni întâi. Elevio AI preia mai multe apeluri în același timp (de la 2 la 10 simultan, în funcție de plan), deci nimeni nu dă de ton ocupat nici când sună mai mulți deodată.",
      },
      {
        q: "Clienții mei sunt mai în vârstă. Se descurcă?",
        a: "Elevio AI vorbește natural, în română, și pune întrebările pe rând, simplu. Dacă cineva vrea neapărat să vorbească cu un om, apelul poate fi transferat la tine.",
      },
      {
        q: "Trebuie să semnez un contract pe un an?",
        a: "Nu. Nu există contract pe termen lung. Configurarea durează câteva zile, iar planurile pornesc de la 150€ pe lună + TVA.",
      },
    ],
    industriiInrudite: ["constructii-renovari", "tamplarie-pvc", "instalatori"],
  },

  // ───────────────────────────── Instalatori
  {
    slug: "instalatori",
    nume: "Instalatori",
    pentru: "instalatori",
    categorie: "Meserii & casă",
    val: 1,
    interogare: "robot telefonic instalator",
    tipDemo: "altul",
    titluSEO: "Robot telefonic pentru instalatori: urgențe și programări",
    descriere:
      "Robot telefonic pentru instalatori: urgențele (țeavă spartă la 23:00) ajung la tine în câteva secunde, iar lucrările se programează în calendar, 24/7.",
    h1: "Robot telefonic pentru instalatori, care răspunde și la 23:00",
    intro:
      "Elevio AI răspunde la telefon pentru tine 24/7, în română, cât ești cu mâinile sub o chiuvetă sau într-un boiler. Separă urgențele (o țeavă spartă la 23:00) de lucrările care pot aștepta: urgențele ți le transferă în câteva secunde, iar restul le notează și le programează în calendar.",
    scurt:
      "Țevi sparte transferate pe loc, montaje și lucrări programate în calendar.",
    deCeSunaClientii: [
      {
        titlu: "Țeavă spartă, apă pe jos",
        text: "Urgența clasică, de obicei seara sau noaptea. Omul vrea să știe dacă vine cineva acum și cum oprește apa până atunci.",
      },
      {
        titlu: "WC sau scurgere înfundată",
        text: "Neplăcut, dar nu inundă casa. Se poate programa pentru a doua zi, dacă cineva îi dă clientului o oră clară.",
      },
      {
        titlu: "Montaj de obiecte sanitare",
        text: "Baterii, chiuvete, cabine de duș, boilere. Lucrări planificate, la care clientul vrea o zi și un preț orientativ.",
      },
      {
        titlu: "Instalație nouă la renovare",
        text: "Țevi noi la baie sau la bucătărie. Cerere de ofertă, cu o vizită înainte.",
      },
      {
        titlu: "„Veniți și la mine?”",
        text: "Clientul vrea să afle repede dacă lucrezi în zona lui și cât costă deplasarea.",
      },
      {
        titlu: "Cât costă o intervenție?",
        text: "Tariful de deplasare, ora de manoperă, tariful de noapte, dacă le ai fixe.",
      },
    ],
    scenariu: {
      context:
        "Joi, 23:10. Instalatorul e acasă, iar unui client i s-a spart o țeavă. A doua zi dimineață sună altcineva pentru o lucrare care poate aștepta.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, s-a spart țeava de sub chiuvetă și curge apa pe jos!",
        },
        {
          cine: "elevio",
          text: "Bună seara. Înțeleg că e urgent. Îmi spuneți adresa, ca s-o notez înainte să vă transfer?",
        },
        {
          cine: "client",
          text: "Strada Lalelelor 14, blocul C2, apartamentul 9, în Cluj.",
        },
        {
          cine: "elevio",
          text: "Am notat. Vă transfer acum pe telefonul instalatorului. El vă spune și cum opriți apa până ajunge.",
        },
        {
          cine: "sistem",
          text: "Apel transferat în câteva secunde. Adresa și problema intră în rezumatul apelului.",
        },
        { cine: "sistem", text: "Vineri, 8:15, alt client:" },
        {
          cine: "client",
          text: "Bună ziua, aș vrea să-mi montați o baterie nouă la baie. Nu e urgent.",
        },
        {
          cine: "elevio",
          text: "Sigur. Instalatorul are liber luni la 10:00 sau marți la 14:00. Ce vă convine?",
        },
        { cine: "client", text: "Luni la 10. Sunt Dan Mureșan." },
        {
          cine: "elevio",
          text: "Gata, domnule Mureșan: luni la 10:00, montaj baterie la baie. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Urgența a ajuns la instalator în câteva secunde, cu adresa deja notată. Montajul a intrat în calendar fără ca el să ridice telefonul. Dimineața are ambele apeluri în rezumate.",
    },
    ceFaceElevio: [
      "Pune întrebările care contează pentru tine: curge apa acum, e afectat vecinul de jos, e o lucrare care poate aștepta?",
      "Urgențele reale (inundație, țeavă spartă) le transferă pe telefonul tău în câteva secunde, după ce notează adresa.",
      "Lucrările planificate (montaj baterie, boiler, obiecte sanitare) le programează în calendar, în intervalele libere, cu SMS de confirmare.",
      "Spune clientului în ce zonă te deplasezi și cât costă deplasarea, dacă îi dai aceste informații.",
      "Îți trimite transcriptul și rezumatul fiecărui apel, ca să știi ce te așteaptă înainte să suni înapoi.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Ratezi 3 urgențe pe săptămână, seara sau cât lucrezi.",
        "O intervenție de urgență: în medie 300 lei.",
      ],
      rezultat:
        "3 intervenții × 300 lei × 4 săptămâni = 3.600 lei pe lună. Fără să socotim clienții care te-ar fi chemat apoi și pentru lucrări mai mari.",
    },
    faq: [
      {
        q: "Cum știe Elevio AI ce e urgență și ce nu?",
        a: "Din regulile pe care i le dai la configurare. De exemplu: apă care curge acum, inundație, lipsă totală de apă înseamnă urgență și se transferă. Robinet care picură, montaj, ofertă se programează. Dacă nu e sigur, nu ghicește: transferă apelul.",
      },
      {
        q: "O să mă sune noaptea pentru orice?",
        a: "Nu. Tu alegi orele în care vrei transfer pentru urgențe și ce se întâmplă în rest. Dacă nu vrei apeluri după ora 22:00, Elevio AI notează urgența cu adresa și telefonul clientului și îi spune ce ai stabilit tu, de exemplu că suni la prima oră.",
      },
      {
        q: "Îi poate da clientului sfaturi până ajung?",
        a: "Nu dă sfaturi tehnice de la el. Dacă vrei, spune un mesaj fix stabilit de tine. Altfel, transferă apelul, iar sfatul îl dai tu.",
      },
      {
        q: "Poate spune cât costă intervenția?",
        a: "Doar dacă îi dai tarifele: deplasare, ora de manoperă, tarif de noapte. Nu inventează și nu face estimări pentru lucrări pe care nu le-a văzut nimeni.",
      },
      {
        q: "Lucrez singur. Cum merg programările?",
        a: "Ții un calendar (Cal.com sau Calendly) cu orele în care poți lua lucrări. Elevio AI vede în timp real ce e liber și pune programarea acolo, așa că nu te trezești cu două lucrări la aceeași oră.",
      },
      {
        q: "Ce primesc după fiecare apel?",
        a: "Transcriptul complet și un rezumat: nume, adresă, problema, cât de urgent e și ce s-a stabilit. Suni înapoi știind tot.",
      },
      {
        q: "Pot păstra numărul meu de telefon?",
        a: "Da. Elevio AI lucrează pe numărul pe care îl ai deja pe mașină, pe flyere și pe Google. Nu schimbi nimic.",
      },
    ],
    industriiInrudite: [
      "centrale-termice-climatizare",
      "electricieni",
      "constructii-renovari",
    ],
  },

  // ───────────────────────────── Electricieni
  {
    slug: "electricieni",
    nume: "Electricieni",
    pentru: "electricieni",
    categorie: "Meserii & casă",
    val: 1,
    interogare: "agent vocal AI electrician",
    tipDemo: "altul",
    titluSEO: "Agent vocal AI pentru electricieni: urgențe și programări",
    descriere:
      "Agent vocal AI pentru electricieni: programează intervenții și oferte în calendar, iar apelurile periculoase ajung la tine în câteva secunde. 24/7, în română.",
    h1: "Agent vocal AI pentru electricieni",
    intro:
      "Elevio AI preia apelurile pentru afacerea ta de electrician 24/7, în română: notează problema, programează intervențiile și vizitele pentru ofertă în calendar și îți transferă urgențele în câteva secunde. Când ești pe scară cu mâinile în tablou, nu mai pierzi clientul care sună.",
    scurt:
      "Pene de curent, lucrări și oferte programate; miros de ars transferat pe loc.",
    deCeSunaClientii: [
      {
        titlu: "„Nu mai am curent”",
        text: "Siguranța sare și nu mai urcă, o priză a făcut scântei. Clientul vrea pe cineva azi.",
      },
      {
        titlu: "Miroase a ars",
        text: "Situație periculoasă. Clientul are nevoie de un om imediat, nu de o programare peste trei zile.",
      },
      {
        titlu: "Instalație nouă sau refăcută",
        text: "Renovări, apartamente vechi cu fire de aluminiu, case noi. Cerere de ofertă, cu vizită înainte.",
      },
      {
        titlu: "Prize, corpuri de iluminat, tablou",
        text: "Lucrări mici, ușor de programat dacă cineva le notează corect: ce, câte, în ce camere.",
      },
      {
        titlu: "Măsurători și acte",
        text: "Unii clienți au nevoie de măsurători PRAM sau de acte pentru furnizorul de energie. Vor să afle dacă le faci și cât durează.",
      },
      {
        titlu: "Stație de încărcare pentru mașină",
        text: "Cerere tot mai des întâlnită, care începe cu întrebări despre tabloul și puterea existente.",
      },
    ],
    scenariu: {
      context:
        "Duminică, 18:30. Electricianul e la masă cu familia. Unui client îi sare siguranța din bucătărie de la prânz.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, îmi sare siguranța mereu, de la prânz. Acum nu mai vrea deloc să urce.",
        },
        {
          cine: "elevio",
          text: "Bună ziua. Vă întreb ceva important: simțiți miros de ars sau vedeți fum la vreo priză sau la tablou?",
        },
        {
          cine: "client",
          text: "Nu, nimic de genul ăsta. Doar nu am curent în bucătărie.",
        },
        {
          cine: "elevio",
          text: "Bine. Vă pot programa o intervenție. Electricianul are liber mâine la 8:30 sau la 13:00.",
        },
        {
          cine: "client",
          text: "La 8:30, vă rog. Sunt pe Bulevardul Independenței 20, în Iași.",
        },
        { cine: "elevio", text: "Am notat adresa. Pe ce nume vă programez?" },
        { cine: "client", text: "Radu Matei." },
        {
          cine: "elevio",
          text: "Gata, domnule Matei: mâine la 8:30, siguranța care sare în bucătărie. Primiți acum un SMS de confirmare. Dacă apare miros de ars sau fum, sunați din nou și vă transfer imediat.",
        },
      ],
      dupaApel:
        "Electricianul vede programarea în calendar, cu nota „siguranță care sare, bucătărie, fără miros de ars”. Dacă clientul ar fi spus că miroase a ars, apelul ar fi fost transferat pe loc.",
    },
    ceFaceElevio: [
      "Pune întrebările de siguranță pe care i le dai tu (miros de ars, fum, fire căzute, apă lângă instalație) și transferă imediat apelurile periculoase.",
      "Programează intervențiile și lucrările mici în calendar, în timp real, cu SMS de confirmare pentru client.",
      "La cererile de ofertă notează tipul lucrării, numărul de camere, vechimea instalației și localitatea.",
      "Răspunde la întrebările frecvente: ce lucrări faci, în ce zonă, cât costă deplasarea, dacă te ocupi de acte.",
      "Îți trimite transcriptul și rezumatul fiecărui apel.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Ratezi 5 apeluri pe săptămână cât lucrezi.",
        "Presupunem că 2 dintre ele ar fi devenit intervenții de câte 250 lei.",
      ],
      rezultat:
        "2 intervenții × 250 lei × 4 săptămâni = 2.000 lei pe lună. O singură cerere ratată pentru o instalație completă poate valora, în plus, câteva mii de lei.",
    },
    faq: [
      {
        q: "Ce face Elevio AI dacă cineva spune că miroase a ars?",
        a: "Nu dă sfaturi tehnice. Transferă apelul imediat pe telefonul tău. Ce i se spune clientului în situațiile periculoase (de exemplu, să sune la 112 dacă vede foc) stabilești tu la configurare, iar Elevio AI spune exact acel mesaj.",
      },
      {
        q: "Poate afla la telefon care e problema?",
        a: "Nu pune diagnostice. Notează simptomele cum le descrie clientul (ce sare, când, în ce cameră), ca să ajungi pregătit. Diagnosticul îl pui tu.",
      },
      {
        q: "Pot să-i spun ce lucrări nu fac?",
        a: "Da. Dacă nu faci, de exemplu, măsurători PRAM sau stații de încărcare, Elevio AI îi spune asta politicos clientului și nu programează lucrarea.",
      },
      {
        q: "Pot programa ofertele separat de intervenții?",
        a: "Da. Poți avea în calendar tipuri diferite de programări, cu durate diferite: o intervenție de o oră, o vizită pentru ofertă de 30 de minute. Elevio AI alege tipul potrivit după ce îi spune clientul.",
      },
      {
        q: "Lucrez cu încă doi electricieni. Pot primi toți urgențele?",
        a: "Transferul merge pe numărul pe care îl alegi tu. Spune-ne la demo cum vă organizați turele și vedem împreună configurarea potrivită.",
      },
      {
        q: "Cât durează să pornesc?",
        a: "Câteva zile. Ne spui ce lucrări faci, zona, programul și regulile de urgență, noi configurăm, tu testezi, apoi pornești pe numărul tău, fără contract pe termen lung.",
      },
    ],
    industriiInrudite: [
      "instalatori",
      "centrale-termice-climatizare",
      "constructii-renovari",
    ],
  },

  // ───────────────────────────── Centrale termice & climatizare
  {
    slug: "centrale-termice-climatizare",
    nume: "Centrale termice & climatizare",
    pentru: "firme de centrale termice și climatizare",
    categorie: "Meserii & casă",
    val: 1,
    interogare: "programări revizie centrală telefon",
    tipDemo: "altul",
    titluSEO: "Programări revizie centrală prin telefon, 24/7 | Elevio AI",
    descriere:
      "Programări la revizia centralei și la montajul de aer condiționat, preluate la telefon 24/7. Defectele urgente ajung la tine în câteva secunde.",
    h1: "Programări la revizia centralei, preluate la telefon 24/7",
    intro:
      "Elevio AI preia la telefon programările pentru revizia centralei, defectele și montajul de aer condiționat, 24/7, în română. Toamna, când toată lumea vrea revizia în aceeași săptămână, verifică locurile libere din calendar, programează clientul și îi trimite SMS de confirmare, iar o centrală oprită în ger sau un miros de gaz ajung la tine în câteva secunde.",
    scurt:
      "Revizii în sezonul de vârf, defecte cu cod de eroare, montaj de aer condiționat.",
    deCeSunaClientii: [
      {
        titlu: "Revizia anuală",
        text: "Toamna vine valul. Clientul vrea o zi, o oră și să afle cât costă revizia.",
      },
      {
        titlu: "Centrala nu pornește",
        text: "Fără căldură și fără apă caldă, de obicei exact în prima zi de frig. Clientul vrea un tehnician azi.",
      },
      {
        titlu: "Cod de eroare pe afișaj",
        text: "Clientul citește un cod și vrea să știe ce înseamnă. Elevio AI nu ghicește, dar notează codul, marca și modelul, ca tehnicianul să vină pregătit.",
      },
      {
        titlu: "Montaj de aer condiționat",
        text: "Primăvara și începutul verii. Cerere de ofertă: câte camere, ce suprafață, unde se pune unitatea exterioară.",
      },
      {
        titlu: "Igienizare AC",
        text: "Lucrare scurtă și repetitivă, ușor de programat în serie, dacă cineva preia apelurile.",
      },
      {
        titlu: "Miros de gaz",
        text: "Situație de urgență, cu reguli stricte: clientul trebuie să primească imediat mesajul de siguranță stabilit de tine.",
      },
    ],
    scenariu: {
      context:
        "Luni, 7:50, prima dimineață cu minus 5 grade. Tehnicienii sunt deja la clienți.",
      replici: [
        {
          cine: "client",
          text: "Bună dimineața, centrala nu mai pornește și pe ecran scrie F28. N-avem apă caldă deloc.",
        },
        {
          cine: "elevio",
          text: "Bună dimineața. Notez codul F28. Ce marcă are centrala și cam câți ani are?",
        },
        { cine: "client", text: "E o Vaillant, are vreo opt ani." },
        {
          cine: "elevio",
          text: "Mulțumesc. Simțiți cumva miros de gaz în casă?",
        },
        { cine: "client", text: "Nu, nu miroase." },
        {
          cine: "elevio",
          text: "Bine. Avem un tehnician liber azi între 14:00 și 16:00 sau mâine la 9:00. Ce preferați?",
        },
        { cine: "client", text: "Azi, cât mai repede." },
        {
          cine: "elevio",
          text: "V-am rezervat azi, între 14:00 și 16:00. Pe ce nume și la ce adresă?",
        },
        { cine: "client", text: "Elena Dobre, strada Zorilor 3, Ploiești." },
        {
          cine: "elevio",
          text: "Gata, doamna Dobre. Primiți acum un SMS de confirmare. Tehnicianul vine știind marca centralei și codul de eroare.",
        },
      ],
      dupaApel:
        "În calendar apare intervenția, iar în rezumat marca centralei și codul F28. Dacă clienta ar fi spus că simte miros de gaz, ar fi auzit imediat mesajul de siguranță stabilit de tine, iar apelul ar fi fost transferat.",
    },
    ceFaceElevio: [
      "Programează reviziile în calendar în timp real, chiar și în săptămânile în care sună toată lumea, cu SMS de confirmare.",
      "Notează marca, vechimea centralei și codul de eroare, ca tehnicianul să plece pregătit.",
      "La miros de gaz sau alte situații periculoase spune mesajul de siguranță stabilit de tine și transferă apelul în câteva secunde.",
      "Preia cererile de ofertă pentru aer condiționat: număr de camere, suprafață, etaj, unde se montează unitatea exterioară.",
      "Răspunde la întrebările despre prețul reviziei, zonă și program, din informațiile pe care i le dai.",
    ],
    exempluCalcul: {
      ipoteze: [
        "În sezonul de revizii primești 15 apeluri pe zi și ratezi 5 cât ești la clienți.",
        "Presupunem că jumătate dintre cei care nu te prind sună la altă firmă.",
        "O revizie: 250 lei.",
      ],
      rezultat:
        "2,5 revizii pe zi × 250 lei × 20 de zile lucrătoare = aproximativ 12.500 lei într-o lună de sezon. Iar clientul care își face revizia la alții îi sună tot pe ei la primul defect.",
    },
    faq: [
      {
        q: "Îi poate spune clientului ce înseamnă un cod de eroare?",
        a: "Nu. Codurile diferă de la o marcă la alta, iar un sfat greșit la o centrală pe gaz e periculos. Elevio AI notează codul, marca și modelul și programează intervenția sau transferă apelul.",
      },
      {
        q: "Ce se întâmplă dacă un client spune că miroase a gaz?",
        a: "Elevio AI spune mesajul de siguranță pe care l-ai stabilit (de obicei: nu aprindeți nimic, nu acționați întrerupătoare, ieșiți din casă și sunați la 112 sau la urgențele distribuitorului de gaz), apoi transferă apelul pe telefonul tău. Nu improvizează alte sfaturi.",
      },
      {
        q: "Pot grupa programările pe zone, ca să nu traversez orașul?",
        a: "Elevio AI întreabă adresa înainte de fiecare programare, iar în rezumat o vezi imediat. Dacă vrei programări grupate pe zile și cartiere, discutăm la demo cum îți organizezi calendarul.",
      },
      {
        q: "Merge și pentru aer condiționat, vara?",
        a: "Da. Același număr preia vara cererile de montaj și igienizare AC, iar iarna reviziile și defectele la centrale. Îi spui ce întrebări să pună pentru fiecare.",
      },
      {
        q: "Știe care clienți au contract de service cu mine?",
        a: "Nu are acces la baza ta de clienți. Poate întreba clientul dacă are contract de service cu voi și notează răspunsul, iar tu verifici.",
      },
      {
        q: "Ce primesc după fiecare apel?",
        a: "Transcriptul și un rezumat cu numele, adresa, marca centralei, problema și programarea făcută.",
      },
      {
        q: "Sezonul e scurt. Pot opri serviciul vara?",
        a: "Nu există contract pe termen lung, deci decizi lună de lună. Dacă faci și aer condiționat, vara telefonul sună la fel de des.",
      },
    ],
    industriiInrudite: ["instalatori", "electricieni", "constructii-renovari"],
  },

  // ───────────────────────────── Cabinete stomatologice
  {
    slug: "cabinete-stomatologice",
    nume: "Cabinete stomatologice",
    pentru: "cabinete stomatologice",
    categorie: "Sănătate",
    val: 1,
    interogare: "recepționer AI cabinet stomatologic",
    tipDemo: "medical",
    titluSEO: "Recepționer AI pentru cabinet stomatologic, 24/7, în română",
    descriere:
      "Recepționer AI pentru cabinetul stomatologic: programează pacienții în calendar, răspunde despre prețuri și transferă urgențele dentare. 24/7, în română.",
    h1: "Recepționer AI pentru cabinetul tău stomatologic",
    intro:
      "Elevio AI răspunde la telefonul cabinetului stomatologic 24/7, în română: programează pacienții în calendar, preia cererile de reprogramare și răspunde la întrebările despre prețuri și program. Când un pacient sună cu durere puternică sau o urgență, apelul ajunge la tine sau la recepție în câteva secunde.",
    scurt:
      "Programări pe medic, întrebări despre prețuri și urgențe dentare transferate.",
    deCeSunaClientii: [
      {
        titlu: "Programare la control sau la igienizare",
        text: "Cele mai multe apeluri. Pacientul vrea o zi, o oră și, dacă se poate, același medic ca data trecută.",
      },
      {
        titlu: "Durere de dinte",
        text: "Pacientul vrea să fie văzut azi. Trebuie să afle repede dacă e loc sau ce are de făcut.",
      },
      {
        titlu: "Reprogramări și anulări",
        text: "Un loc eliberat despre care află cineva prea târziu e o oră pierdută din scaunul stomatologic.",
      },
      {
        titlu: "Cât costă un implant sau o coroană?",
        text: "Întrebare grea la telefon. Pacientul vrea măcar un preț de pornire și o consultație.",
      },
      {
        titlu: "Copii și prima vizită",
        text: "Părinții întreabă dacă lucrați cu copii, de la ce vârstă și cum decurge prima vizită.",
      },
      {
        titlu: "Medicul e la scaun",
        text: "Asistenta nu poate lăsa pacientul ca să răspundă. Telefonul sună în gol exact în orele de vârf.",
      },
    ],
    scenariu: {
      context:
        "Miercuri, 13:20. Medicul și asistenta lucrează cu un pacient, iar telefonul sună.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, aș vrea o programare pentru detartraj. Am mai fost la dumneavoastră, la doamna doctor Popa.",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Verific la doamna doctor Popa… Are liber joi la 10:30 sau luni la 16:00.",
        },
        {
          cine: "client",
          text: "Luni la 16:00 e bine. Cât costă detartrajul?",
        },
        {
          cine: "elevio",
          text: "Conform listei de prețuri a cabinetului, detartrajul cu periaj profesional costă 250 de lei. Pe ce nume vă programez?",
        },
        {
          cine: "client",
          text: "Andreea Stan. A, și de ieri mă doare destul de tare o măsea.",
        },
        {
          cine: "elevio",
          text: "Îmi pare rău. Aveți umflătură sau durerea vă împiedică să dormiți?",
        },
        { cine: "client", text: "Da, s-a umflat puțin obrazul." },
        {
          cine: "elevio",
          text: "Atunci vă pun acum în legătură cu cabinetul, să vadă dacă vă pot primi azi. Programarea de luni la 16:00 rămâne. Rămâneți pe linie câteva secunde.",
        },
        {
          cine: "sistem",
          text: "Apel transferat la recepție. Pacienta primește SMS de confirmare pentru programarea de luni.",
        },
      ],
      dupaApel:
        "Detartrajul e în calendarul doamnei doctor Popa. Recepția a vorbit direct cu pacienta despre durere, iar rezumatul apelului păstrează amândouă cererile.",
    },
    ceFaceElevio: [
      "Programează pacienții în calendar pe medic și pe tip de tratament, verificând în timp real orele libere (Cal.com, Calendly).",
      "Preia cererile de reprogramare și anulare, cu numele și data programării, și le transmite structurat, ca locul eliberat să poată fi ocupat.",
      "Răspunde la întrebările despre prețuri, program, adresă și parcare, din lista ta, fără să inventeze.",
      "Pacienții cu durere puternică, umflătură sau traumatism ajung la tine sau la recepție în câteva secunde, după criteriile stabilite de cabinet.",
      "Trimite SMS de confirmare pacientului și îți lasă transcriptul și rezumatul fiecărui apel.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Cabinetul ratează 6 apeluri pe săptămână cât medicul și asistenta lucrează.",
        "Presupunem că 2 dintre ele erau pacienți noi.",
        "Primul plan de tratament al unui pacient nou: 1.000 lei.",
      ],
      rezultat:
        "2 pacienți × 1.000 lei × 4 săptămâni = 8.000 lei pe lună în tratamente care încep la alt cabinet.",
    },
    faq: [
      {
        q: "Poate da sfaturi medicale pacienților?",
        a: "Nu. Nu pune diagnostice și nu recomandă medicamente. Pune doar întrebările de triaj pe care le stabilești tu (durere, umflătură, sângerare, traumatism) și, după răspuns, programează sau transferă apelul.",
      },
      {
        q: "Folosesc un program de gestiune a cabinetului, nu Cal.com. Merge?",
        a: "Programarea automată merge cu Cal.com și Calendly. Dacă folosești alt program, Elevio AI preia cererea de programare cu toate detaliile (nume, telefon, tratament, intervalul dorit) și o transmite recepției, care o confirmă.",
      },
      {
        q: "Cum vorbește despre prețurile tratamentelor complexe?",
        a: "Spune doar prețurile pe care i le dai, cu formularea ta, de exemplu „de la… lei, prețul final după consultație”. Pentru implanturi sau lucrări protetice programează o consultație, nu dă estimări.",
      },
      {
        q: "Ce face cu un pacient care sună noaptea cu durere?",
        a: "Îi spune ce ai stabilit pentru urgențele din afara programului: un număr de gardă, transfer pe telefonul tău sau primul loc liber de a doua zi. Dacă ai un număr pentru urgențe, apelul ajunge acolo în câteva secunde.",
      },
      {
        q: "Poate programa la medici diferiți?",
        a: "Da, dacă fiecare medic are calendarul lui. Pacientul poate cere un medic anume sau primul loc liber.",
      },
      {
        q: "Ce date ale pacienților notează?",
        a: "Doar ce e nevoie pentru programare: nume, telefon, motivul vizitei. La demo stabilim exact ce vrei să fie notat, iar detaliile despre prelucrarea datelor sunt în politica de confidențialitate.",
      },
      {
        q: "Pacienții mai în vârstă se vor descurca?",
        a: "Vocea e naturală, în română, iar întrebările vin pe rând, simplu. Dacă un pacient insistă să vorbească cu cineva de la cabinet, apelul poate fi transferat.",
      },
    ],
    industriiInrudite: ["clinici-medicale", "clinici-estetice", "kinetoterapie"],
  },

  // ───────────────────────────── Saloane & frizerii
  {
    slug: "saloane-frizerii",
    nume: "Saloane & frizerii",
    pentru: "saloane și frizerii",
    categorie: "Beauty & wellness",
    val: 1,
    interogare: "recepționer AI salon",
    tipDemo: "beauty",
    titluSEO: "Recepționer AI pentru salon și frizerie: programări 24/7",
    descriere:
      "Recepționer AI pentru salonul sau frizeria ta: programări pe stilist și serviciu, cu durata corectă, direct în calendar și cu SMS de confirmare. 24/7.",
    h1: "Recepționer AI pentru salon și frizerie",
    intro:
      "Elevio AI preia programările salonului tău la telefon 24/7, în română, pe stilistul și serviciul cerute: tuns, vopsit, manichiură, barbă. Verifică în calendar cine e liber și cât durează serviciul, face programarea și trimite SMS de confirmare, cât tu ai mâinile în părul unei cliente.",
    scurt:
      "Programări pe stilist și serviciu, cu durata corectă și SMS de confirmare.",
    deCeSunaClientii: [
      {
        titlu: "Programare la un anumit stilist",
        text: "Clienta nu vrea „pe oricine”, o vrea pe Ioana. Programarea trebuie pusă în calendarul ei, nu în primul loc liber.",
      },
      {
        titlu: "Servicii cu durate diferite",
        text: "Un tuns bărbătesc durează 30 de minute, un balayage trei ore. Dacă durata e greșită, ziua se dă peste cap.",
      },
      {
        titlu: "Cât costă?",
        text: "Vopsit pe păr lung, tuns cu spălat, pachet de mireasă. Clienta vrea prețul înainte să vină.",
      },
      {
        titlu: "Anulări în ultima clipă",
        text: "Cineva nu mai poate veni mâine la 11. Dacă afli din timp, poți da locul altcuiva.",
      },
      {
        titlu: "Vineri seara și sâmbăta",
        text: "Clienții sună când salonul e plin sau deja închis.",
      },
      {
        titlu: "Nunți și evenimente",
        text: "Coafuri și machiaj pentru nuntă, programate cu luni înainte, cu multe detalii de notat.",
      },
    ],
    scenariu: {
      context:
        "Vineri, 18:45. Toți stiliștii lucrează, iar telefonul sună a treia oară în zece minute.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, aș vrea o programare la Ioana pentru vopsit și tuns, săptămâna viitoare.",
        },
        {
          cine: "elevio",
          text: "Bună seara! Vopsitul cu tuns la Ioana durează cam două ore și jumătate. Are liber marți la 10:00 sau joi la 15:00.",
        },
        {
          cine: "client",
          text: "Joi la 15:00. Cât costă? Am părul lung.",
        },
        {
          cine: "elevio",
          text: "Pentru păr lung, vopsitul cu tuns pornește de la 350 de lei; prețul final depinde de cantitatea de vopsea. Vă programez joi la 15:00?",
        },
        { cine: "client", text: "Da. Pe numele Diana Pop." },
        {
          cine: "elevio",
          text: "Gata, Diana: joi la 15:00, vopsit și tuns la Ioana. Aveți vreo preferință de culoare pe care s-o notez pentru ea?",
        },
        { cine: "client", text: "Vreau ceva mai deschis, caramel." },
        {
          cine: "elevio",
          text: "Am notat „caramel, mai deschis”. Primiți acum un SMS de confirmare. O seară frumoasă!",
        },
      ],
      dupaApel:
        "Ioana vede programarea în calendarul ei, cu durata corectă și nota „caramel, mai deschis”. Nimeni din salon nu a lăsat clienta de pe scaun ca să răspundă.",
    },
    ceFaceElevio: [
      "Programează pe stilist și pe serviciu, cu durata corectă pentru fiecare, verificând calendarul în timp real (Cal.com, Calendly).",
      "Notează cererile speciale (culoarea dorită, lungimea, alergii la produse, coafura pentru un eveniment) ca stilistul să le vadă înainte.",
      "Spune prețurile din lista ta, inclusiv formulările „de la…”, fără să promită altceva.",
      "Preia anulările și cererile de mutare, ca să afli din timp că s-a eliberat un loc.",
      "Trimite SMS de confirmare clientei și îți lasă rezumatul fiecărui apel.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Salonul ratează 8 apeluri pe săptămână în orele aglomerate.",
        "Presupunem că jumătate erau programări.",
        "Valoarea medie a unei programări: 150 lei.",
      ],
      rezultat:
        "4 programări × 150 lei × 4 săptămâni = 2.400 lei pe lună. Iar clienta care nu te prinde la telefon își poate face obiceiul la alt salon.",
    },
    faq: [
      {
        q: "Poate programa la un anumit stilist?",
        a: "Da. Fiecare stilist are calendarul lui, iar Elevio AI pune programarea la cel cerut. Dacă clienta nu are preferințe, îi oferă primul stilist liber pentru serviciul dorit.",
      },
      {
        q: "De unde știe cât durează fiecare serviciu?",
        a: "Din lista pe care o facem la configurare: tuns 30 de minute, vopsit două ore, manichiură semipermanentă o oră și așa mai departe. Programarea ocupă exact cât trebuie.",
      },
      {
        q: "Ce face dacă o clientă întreabă de o culoare sau un tratament?",
        a: "Nu dă sfaturi de culoare și nu improvizează. Notează întrebarea pentru stilist sau transferă apelul, dacă ai setat asta.",
      },
      {
        q: "Folosesc o aplicație de programări pentru saloane. Se poate conecta?",
        a: "Programarea automată funcționează cu Cal.com și Calendly. Dacă folosești altă aplicație, Elevio AI preia cererea completă (cine, ce serviciu, ce zi) și ți-o transmite ca s-o confirmi tu.",
      },
      {
        q: "Ce se întâmplă cu anulările?",
        a: "Clienta poate suna oricând, inclusiv seara, ca să anuleze. Elevio AI notează anularea și ți-o transmite, ca să poți oferi locul altcuiva.",
      },
      {
        q: "Clientele mai vechi vor vorbi cu un asistent AI?",
        a: "Elevio AI vorbește natural, în română, și se ocupă de partea de programare. Pentru orice altceva, apelul poate ajunge la tine.",
      },
      {
        q: "Merită pentru o frizerie cu un singur frizer?",
        a: "Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung. Pentru un frizer care lucrează singur, câștigul principal e că nu mai răspunde la telefon cu foarfeca în mână.",
      },
    ],
    industriiInrudite: ["clinici-estetice", "sali-fitness", "cabinete-stomatologice"],
  },

  // ───────────────────────────── Service auto
  {
    slug: "service-auto",
    nume: "Service auto",
    pentru: "service-uri auto",
    categorie: "Auto",
    val: 1,
    interogare: "robot telefonic service auto",
    tipDemo: "service_auto",
    titluSEO: "Robot telefonic pentru service auto: programări, ITP, roți",
    descriere:
      "Robot telefonic pentru service auto: programează revizii, ITP și schimburi de anvelope, notează mașina și problema și transferă urgențele. 24/7, în română.",
    h1: "Robot telefonic pentru service auto",
    intro:
      "Elevio AI răspunde la telefonul service-ului tău auto 24/7, în română: programează reviziile, ITP-ul și schimbul de anvelope în calendar și notează marca, modelul și problema mașinii. Când un client a rămas în pană pe drum sau cere ceva ce nu știe, apelul ajunge la tine în câteva secunde.",
    scurt:
      "Revizii, ITP și anvelope programate, cu mașina și problema notate.",
    deCeSunaClientii: [
      {
        titlu: "Programare la revizie",
        text: "Ulei, filtre, plăcuțe. Clientul vrea o zi și să afle cât stă mașina în service.",
      },
      {
        titlu: "ITP",
        text: "Îi expiră ITP-ul săptămâna viitoare și caută un loc rapid.",
      },
      {
        titlu: "Schimb de anvelope",
        text: "Toamna și primăvara toată lumea vrea în aceeași săptămână, iar telefonul nu se mai oprește.",
      },
      {
        titlu: "Un martor aprins în bord",
        text: "Clientul descrie un zgomot sau un bec aprins și vrea să afle dacă poate circula. Asta trebuie s-o audă un mecanic.",
      },
      {
        titlu: "„E gata mașina?”",
        text: "Elevio AI nu vede stadiul lucrărilor, dar notează cererea cu numărul de înmatriculare, ca să sune cineva înapoi.",
      },
      {
        titlu: "Cât costă?",
        text: "Pentru lucrările cu preț fix răspunde; pentru reparații programează o constatare.",
      },
    ],
    scenariu: {
      context:
        "Luni, 10:15. Mecanicii sunt sub mașini, iar telefonul sună pentru schimbul de anvelope.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, aș vrea să-mi schimbați cauciucurile pe cele de iarnă. Am o Dacia Logan.",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Anvelopele de iarnă sunt la dumneavoastră și sunt deja pe jante?",
        },
        { cine: "client", text: "Da, le am în portbagaj, pe jante." },
        {
          cine: "elevio",
          text: "Perfect, atunci e schimbul cu echilibrare. Am liber mâine la 8:00 sau miercuri la 12:30.",
        },
        {
          cine: "client",
          text: "Mâine la 8. Și încă ceva: când frânez, se aude un scârțâit în față.",
        },
        {
          cine: "elevio",
          text: "Am notat „scârțâit la frânare, în față”, ca mecanicul să se uite și la frâne când e mașina sus. Ce număr de înmatriculare are?",
        },
        {
          cine: "client",
          text: "B 123 ABC, pe numele Mihai Georgescu.",
        },
        {
          cine: "elevio",
          text: "Gata: mâine la 8:00, schimb de anvelope pe jante pentru Dacia Logan B 123 ABC, cu verificarea scârțâitului la frâne. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Mecanicul vede dimineața în rezumat mașina, numărul de înmatriculare și problema cu frânele. Dacă clientul ar fi sunat de pe marginea drumului, cu mașina oprită, apelul ar fi ajuns direct la tine.",
    },
    ceFaceElevio: [
      "Programează revizii, ITP, schimburi de anvelope și constatări în calendar, cu durata potrivită fiecărei lucrări și SMS de confirmare.",
      "Notează marca, modelul, numărul de înmatriculare și simptomele descrise de client, ca mecanicul să știe ce îl așteaptă.",
      "Răspunde la întrebările cu răspuns fix: program, adresă, prețul ITP-ului, tariful pentru schimbul de anvelope, actele necesare.",
      "Transferă în câteva secunde apelurile urgente (mașină rămasă pe drum, frâne care nu mai țin) sau pe cele care au nevoie de un mecanic.",
      "Preia întrebările „e gata mașina?” cu numărul de înmatriculare și le transmite atelierului.",
    ],
    exempluCalcul: {
      ipoteze: [
        "În sezonul de anvelope, service-ul ratează 10 apeluri pe zi.",
        "Presupunem că 4 dintre ele sunt clienți care sună apoi la alt service.",
        "Schimb de anvelope cu echilibrare: 150 lei.",
      ],
      rezultat:
        "4 clienți × 150 lei × 20 de zile lucrătoare = 12.000 lei într-o lună de sezon. Clientul care și-a schimbat roțile în altă parte își poate face acolo și revizia.",
    },
    faq: [
      {
        q: "Poate spune clientului dacă mașina e gata?",
        a: "Nu, pentru că nu are acces la programul atelierului. Notează numărul de înmatriculare și cererea, iar cineva din atelier sună înapoi. Așa clientul nu primește o informație greșită.",
      },
      {
        q: "Poate da estimări de preț pentru reparații?",
        a: "Doar pentru lucrările cu preț fix pe care i le dai (ITP, schimb de anvelope, revizie de bază). Pentru reparații programează o constatare, pentru că prețul depinde de ce găsește mecanicul.",
      },
      {
        q: "Ce face dacă un client a rămas cu mașina pe drum?",
        a: "Notează unde se află și ce s-a întâmplat și transferă imediat apelul pe telefonul tău. Dacă ai un număr de tractare pe care vrei să-l dea, îl spune.",
      },
      {
        q: "Pot avea durate diferite pentru ITP și pentru revizie?",
        a: "Da. Fiecare tip de lucrare are durata lui în calendar, așa că un ITP de 30 de minute nu blochează o rampă o zi întreagă.",
      },
      {
        q: "Avem și vulcanizare. Merge pe același număr?",
        a: "Da. Pe același număr, Elevio AI întreabă de ce are nevoie clientul și pune programarea în calendarul potrivit: vulcanizare, mecanică sau ITP.",
      },
      {
        q: "Ce primesc după fiecare apel?",
        a: "Transcriptul și un rezumat: client, telefon, mașină, număr de înmatriculare, problema și programarea făcută.",
      },
      {
        q: "Cât costă și cât durează să pornesc?",
        a: "Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung. Configurarea durează câteva zile, iar numărul service-ului rămâne același.",
      },
    ],
    industriiInrudite: ["rent-a-car", "scoli-soferi", "electricieni"],
  },
];

const VAL_2: Industrie[] = [
  // ───────────────────────────── Clinici medicale
  {
    slug: "clinici-medicale",
    nume: "Clinici medicale",
    pentru: "clinici medicale",
    categorie: "Sănătate",
    val: 2,
    interogare: "recepționer AI clinică",
    tipDemo: "medical",
    titluSEO: "Recepționer AI pentru clinici medicale: programări 24/7",
    descriere:
      "Recepționer AI pentru clinica ta: programări pe medic și specialitate, răspunsuri despre analize și decontare. Fără sfaturi medicale. 24/7, în română.",
    h1: "Recepționer AI pentru clinica ta medicală",
    intro:
      "Elevio AI preia telefonul clinicii 24/7, în română: programează pacienții la medicul și specialitatea potrivite, răspunde la întrebările despre analize, prețuri și decontare și notează cererile care au nevoie de un om. Nu dă sfaturi medicale: apelurile urgente sau neclare ajung la recepție în câteva secunde.",
    scurt:
      "Programări pe medic și specialitate, întrebări despre analize și decontare.",
    deCeSunaClientii: [
      {
        titlu: "Programare la un specialist",
        text: "Cardiologie, dermatologie, ORL. Pacientul vrea primul loc liber sau un medic anume.",
      },
      {
        titlu: "Analize de sânge",
        text: "Trebuie să vin nemâncat? De la ce oră se recoltează? Când primesc rezultatele?",
      },
      {
        titlu: "Decontare prin CAS",
        text: "Pacientul vrea să știe dacă are nevoie de bilet de trimitere și ce acte aduce.",
      },
      {
        titlu: "Rezultate și scrisori medicale",
        text: "Elevio AI nu are acces la dosarele pacienților, dar notează cererea, ca recepția să revină.",
      },
      {
        titlu: "Simptome îngrijorătoare",
        text: "Când pacientul descrie ceva grav, are nevoie imediat de un om sau de 112, nu de o programare.",
      },
    ],
    scenariu: {
      context: "Marți, 7:40, înainte să se deschidă recepția.",
      replici: [
        {
          cine: "client",
          text: "Bună dimineața, aș vrea o programare la cardiolog. Am bilet de trimitere de la medicul de familie.",
        },
        {
          cine: "elevio",
          text: "Bună dimineața. Pentru consultațiile cu bilet de trimitere, primul loc liber la cardiologie e joi la 11:20. Vă convine?",
        },
        { cine: "client", text: "Da. Trebuie să aduc ceva?" },
        {
          cine: "elevio",
          text: "Biletul de trimitere, actul de identitate și, dacă aveți, analizele recente. Pe ce nume vă programez?",
        },
        {
          cine: "client",
          text: "Ion Vasile. Și să știți că de câteva zile am palpitații.",
        },
        {
          cine: "elevio",
          text: "Am notat. Dacă aveți acum dureri în piept sau vă e greu să respirați, sunați imediat la 112. Vreți să vă transfer la recepție pentru o întrebare medicală?",
        },
        { cine: "client", text: "Nu, acum sunt bine, aștept joi." },
        {
          cine: "elevio",
          text: "V-am programat joi la 11:20 la cardiologie, cu bilet de trimitere. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Recepția găsește programarea în calendarul cardiologului și, în rezumat, mențiunea „palpitații de câteva zile”, ca medicul s-o vadă înainte de consultație.",
    },
    ceFaceElevio: [
      "Programează pe medic și pe specialitate, verificând în timp real orele libere din calendar.",
      "Răspunde la întrebările despre analize, pregătirea pentru investigații, acte și decontare, exact cum le-ai scris.",
      "Spune mesajul de urgență stabilit de clinică și transferă în câteva secunde apelurile cu simptome grave sau întrebări medicale.",
      "Trimite SMS de confirmare pacientului și lasă recepției transcriptul și rezumatul fiecărui apel.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Recepția ratează 15 apeluri pe săptămână la orele de vârf.",
        "Presupunem că 5 dintre ele erau programări cu plată.",
        "O consultație: 250 lei.",
      ],
      rezultat:
        "5 consultații × 250 lei × 4 săptămâni = 5.000 lei pe lună, fără analizele și investigațiile care ar fi urmat.",
    },
    faq: [
      {
        q: "Poate răspunde la întrebări despre rezultatele analizelor?",
        a: "Nu. Elevio AI nu vede rezultatele și nu le interpretează. Notează cererea pacientului și o transmite recepției sau medicului.",
      },
      {
        q: "Știe câte locuri decontate mai sunt luna asta?",
        a: "Doar dacă locurile decontate sunt marcate separat în calendar. Altfel notează cererea, iar recepția confirmă. Regulile de decontare (bilet de trimitere, acte) le spune exact cum i le dai.",
      },
      {
        q: "Cum programează la mai mulți medici?",
        a: "Fiecare medic sau specialitate are calendarul lui. Elevio AI întreabă ce specialitate caută pacientul și oferă orele libere de acolo.",
      },
      {
        q: "Ce face dacă un pacient descrie o urgență?",
        a: "Spune mesajul stabilit de clinică (de exemplu, să sune la 112) și transferă apelul în câteva secunde. Nu face triaj medical și nu dă sfaturi.",
      },
      {
        q: "Folosim un soft medical pentru programări. Se poate?",
        a: "Programarea automată merge cu Cal.com și Calendly. Cu alt soft, Elevio AI preia cererea completă și o transmite recepției pentru confirmare.",
      },
    ],
    industriiInrudite: [
      "cabinete-stomatologice",
      "kinetoterapie",
      "clinici-estetice",
    ],
  },

  // ───────────────────────────── Clinici veterinare
  {
    slug: "clinici-veterinare",
    nume: "Clinici veterinare",
    pentru: "clinici veterinare",
    categorie: "Sănătate",
    val: 2,
    interogare: "programări veterinar telefon",
    tipDemo: "medical",
    titluSEO: "Programări la veterinar prin telefon, 24/7 | Elevio AI",
    descriere:
      "Programări la clinica veterinară, preluate la telefon 24/7: vaccinări, consultații, sterilizări. Urgențele ajung la medicul de gardă în câteva secunde.",
    h1: "Programări la clinica veterinară, preluate la telefon 24/7",
    intro:
      "Elevio AI preia telefonul clinicii veterinare 24/7, în română: programează vaccinările, consultațiile și sterilizările și notează specia, rasa și vârsta animalului. Când un stăpân sună cu un câine care a înghițit ceva periculos, apelul ajunge la medic în câteva secunde.",
    scurt:
      "Vaccinări și consultații programate, urgențe transferate la medicul de gardă.",
    deCeSunaClientii: [
      {
        titlu: "Vaccinări și deparazitări",
        text: "Programări de rutină, de care stăpânii își amintesc abia în ultima zi.",
      },
      {
        titlu: "Urgențe",
        text: "Câine lovit de mașină, pisică intoxicată, animal care a înghițit un obiect. Fiecare minut contează.",
      },
      {
        titlu: "Sterilizări și operații",
        text: "Stăpânul vrea să afle cât costă, ce face înainte și când poate lua animalul acasă.",
      },
      {
        titlu: "Program și gardă",
        text: "Sunteți deschiși duminică? Aveți medic de gardă noaptea?",
      },
      {
        titlu: "Toaletaj sau pensiune",
        text: "Dacă le oferi, sunt întrebări cu răspuns simplu, care nu au nevoie de medic.",
      },
    ],
    scenariu: {
      context:
        "Sâmbătă, 22:30. Clinica e închisă, medicul de gardă e acasă. Luni dimineață sună alt stăpân, pentru un vaccin.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, câinele meu a mâncat ciocolată, o tabletă întreagă! Ce fac?",
        },
        {
          cine: "elevio",
          text: "Bună seara. Vă pun imediat în legătură cu medicul de gardă. Spuneți-mi repede ce rasă e și cât cântărește, aproximativ.",
        },
        { cine: "client", text: "E un beagle, are vreo 12 kilograme." },
        {
          cine: "elevio",
          text: "Am notat: beagle, 12 kilograme, o tabletă de ciocolată. Vă transfer acum, rămâneți pe linie.",
        },
        {
          cine: "sistem",
          text: "Apel transferat pe telefonul medicului de gardă în câteva secunde.",
        },
        { cine: "sistem", text: "Luni, 9:05, alt stăpân:" },
        {
          cine: "client",
          text: "Bună ziua, aș vrea să-i fac pisicii vaccinul anual.",
        },
        {
          cine: "elevio",
          text: "Sigur. Avem liber marți la 17:00 sau miercuri la 10:00. Cum se numește pisica și câți ani are?",
        },
        { cine: "client", text: "Miți, are trei ani. Marți la 17." },
        {
          cine: "elevio",
          text: "Gata: marți la 17:00, vaccinul anual pentru Miți. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Medicul de gardă a preluat urgența știind deja rasa, greutatea și ce a mâncat câinele. Vaccinul lui Miți e în calendar, fără ca recepția să fi ridicat telefonul.",
    },
    ceFaceElevio: [
      "Transferă urgențele pe telefonul medicului de gardă în câteva secunde, după ce notează specia, greutatea și ce s-a întâmplat.",
      "Programează vaccinări, deparazitări, consultații și operații, cu durata potrivită, și trimite SMS de confirmare.",
      "Notează numele animalului, specia, rasa, vârsta și motivul vizitei.",
      "Răspunde la întrebările despre program, prețuri și pregătirea pentru operații, din informațiile clinicii.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Clinica ratează 2 urgențe pe săptămână în afara programului.",
        "O urgență cu investigații: 400 lei.",
      ],
      rezultat:
        "2 urgențe × 400 lei × 4 săptămâni = 3.200 lei pe lună. Stăpânul care a găsit altă clinică la urgență poate rămâne acolo și pentru vaccinuri.",
    },
    faq: [
      {
        q: "Poate da sfaturi stăpânului până ajunge la clinică?",
        a: "Nu. Orice sfat medical vine de la medic. Elevio AI notează repede ce s-a întâmplat și transferă apelul. Dacă vrei, poate spune un mesaj fix stabilit de tine, de exemplu adresa clinicii.",
      },
      {
        q: "Ce se întâmplă dacă medicul de gardă nu răspunde?",
        a: "Elevio AI îi spune stăpânului ce ai stabilit pentru situația asta (de exemplu, adresa unei clinici deschise non-stop) și îți lasă cererea notată complet, cu telefonul lui.",
      },
      {
        q: "Poate programa diferit câinii, pisicile sau animalele exotice?",
        a: "Da. Elevio AI întreabă specia înainte de programare, iar dacă exoticele merg doar la un anumit medic, programarea se pune în calendarul lui.",
      },
      {
        q: "Le amintește stăpânilor de rapelul vaccinului?",
        a: "Nu. Elevio AI preia apelurile primite; nu sună el stăpânii. Când programează un vaccin, stăpânul primește SMS de confirmare pentru acea programare.",
      },
      {
        q: "Pot păstra numărul clinicii?",
        a: "Da. Elevio AI lucrează pe numărul existent, pe care stăpânii îl știu deja.",
      },
    ],
    industriiInrudite: [
      "clinici-medicale",
      "cabinete-stomatologice",
      "kinetoterapie",
    ],
  },

  // ───────────────────────────── Kinetoterapie
  {
    slug: "kinetoterapie",
    nume: "Kinetoterapie",
    pentru: "cabinete de kinetoterapie și fizioterapie",
    categorie: "Sănătate",
    val: 2,
    interogare: "programări kinetoterapie",
    tipDemo: "medical",
    titluSEO: "Programări kinetoterapie prin telefon, 24/7 | Elevio AI",
    descriere:
      "Programări la kinetoterapie, preluate la telefon 24/7: evaluări inițiale, ședințe și întrebări despre abonamente. Terapeutul nu mai iese din sală să răspundă.",
    h1: "Programări la kinetoterapie, preluate la telefon",
    intro:
      "Elevio AI răspunde la telefonul cabinetului de kinetoterapie sau fizioterapie 24/7, în română: programează evaluările inițiale și ședințele, răspunde la întrebările despre abonamente și prețuri și notează motivul pentru care vine pacientul. Kinetoterapeutul nu mai iese din sală ca să răspundă.",
    scurt: "Evaluări inițiale, ședințe și întrebări despre abonamente.",
    deCeSunaClientii: [
      {
        titlu: "Prima evaluare",
        text: "Pacientul vine după o operație, o entorsă sau cu dureri de spate și vrea să înceapă repede.",
      },
      {
        titlu: "Seria de ședințe",
        text: "Zece ședințe, de două ori pe săptămână, la aceeași oră, dacă se poate.",
      },
      {
        titlu: "Abonamente și prețuri",
        text: "Cât costă o ședință, cât costă pachetul, se decontează?",
      },
      {
        titlu: "Mutarea unei ședințe",
        text: "Pacientul nu poate veni joi și vrea altă zi în aceeași săptămână.",
      },
      {
        titlu: "Recomandarea medicului",
        text: "Am nevoie de recomandare? Ce documente aduc la prima ședință?",
      },
    ],
    scenariu: {
      context: "Joi, 12:00. Kinetoterapeutul lucrează cu un pacient.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, am făcut operație la genunchi acum trei săptămâni și medicul mi-a recomandat recuperare.",
        },
        {
          cine: "elevio",
          text: "Bună ziua. Începem cu o evaluare inițială, de 60 de minute. Avem liber luni la 9:00 sau marți la 17:30.",
        },
        { cine: "client", text: "Marți la 17:30. Cât costă și ce aduc?" },
        {
          cine: "elevio",
          text: "Evaluarea costă 150 de lei. Aduceți scrisoarea medicală de la operație, imagistica, dacă o aveți, și haine comode.",
        },
        {
          cine: "client",
          text: "Bine. După aceea se pot face ședințele tot seara?",
        },
        {
          cine: "elevio",
          text: "Am notat că preferați după ora 17:00. Planul și orele le stabilește kinetoterapeutul la evaluare. Pe ce nume vă programez?",
        },
        { cine: "client", text: "Cristina Marin." },
        {
          cine: "elevio",
          text: "Gata, doamna Marin: marți la 17:30, evaluare inițială după operația la genunchi. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Terapeutul știe dinainte că vine o pacientă la trei săptămâni după operația la genunchi, care preferă ședințele seara.",
    },
    ceFaceElevio: [
      "Programează evaluări și ședințe în calendar, cu durata corectă, verificând în timp real orele libere.",
      "Notează motivul (operație, accidentare, durere cronică), data intervenției și preferințele de orar.",
      "Răspunde la întrebările despre prețuri, abonamente, acte și ce trebuie să aducă pacientul.",
      "Transferă la terapeut întrebările medicale și pacienții care descriu o durere nouă, puternică.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Cabinetul ratează 5 apeluri pe săptămână în timpul ședințelor.",
        "Presupunem că unul pe săptămână e un pacient nou, care ar fi făcut un pachet de 10 ședințe.",
        "O ședință: 120 lei, deci 1.200 lei pe pachet.",
      ],
      rezultat:
        "1 pacient × 1.200 lei × 4 săptămâni = 4.800 lei pe lună în pachete care se fac la alt cabinet.",
    },
    faq: [
      {
        q: "Poate recomanda exerciții sau numărul de ședințe?",
        a: "Nu. Planul de recuperare îl face kinetoterapeutul la evaluare. Elevio AI programează evaluarea și notează motivul.",
      },
      {
        q: "Poate programa o serie întreagă de ședințe?",
        a: "Elevio AI programează câte o ședință pe un loc liber din calendar. Pentru o serie întreagă notează zilele și ora preferate de pacient și le transmite terapeutului, care confirmă.",
      },
      {
        q: "Ce spune despre decontare?",
        a: "Exact ce îi spui tu: dacă aveți contract cu casa de asigurări și ce acte trebuie. Ce nu știe, notează și transmite.",
      },
      {
        q: "Avem doi terapeuți. Merge?",
        a: "Da, fiecare cu calendarul lui. Pacientul poate cere un terapeut anume sau primul loc liber.",
      },
      {
        q: "Cât costă?",
        a: "Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung. Detaliile sunt pe pagina de prețuri.",
      },
    ],
    industriiInrudite: [
      "clinici-medicale",
      "sali-fitness",
      "cabinete-stomatologice",
    ],
  },

  // ───────────────────────────── Clinici estetice
  {
    slug: "clinici-estetice",
    nume: "Clinici estetice & dermatologie",
    pentru: "clinici estetice și cabinete de dermatologie",
    categorie: "Beauty & wellness",
    val: 2,
    interogare: "programări clinică estetică",
    tipDemo: "beauty",
    titluSEO: "Programări clinică estetică prin telefon, 24/7 | Elevio AI",
    descriere:
      "Programări pentru clinica estetică sau de dermatologie, preluate la telefon 24/7: consultații, proceduri, prețuri de pornire. Fără promisiuni de rezultat.",
    h1: "Programări pentru clinica estetică, preluate la telefon 24/7",
    intro:
      "Elevio AI preia telefonul clinicii tale estetice sau de dermatologie 24/7, în română: programează consultațiile și procedurile, spune prețurile de pornire pe care i le dai și notează ce își dorește pacienta. Nu promite rezultate și nu recomandă proceduri: asta rămâne pentru consultație.",
    scurt:
      "Consultații și proceduri programate, întrebările medicale lăsate medicului.",
    deCeSunaClientii: [
      {
        titlu: "Cât costă procedura?",
        text: "Toxină botulinică, acid hialuronic, laser, peeling. Întrebarea numărul unu, de obicei seara, după program.",
      },
      {
        titlu: "Consultație de dermatologie",
        text: "Alunițe de verificat, acnee, probleme de piele care nu trec.",
      },
      {
        titlu: "Pachete cu mai multe ședințe",
        text: "Epilare definitivă în șase ședințe: când e următoarea?",
      },
      {
        titlu: "Contraindicații",
        text: "„Pot face procedura dacă alăptez? Iau un tratament.” Întrebări pentru medic, nu pentru telefon.",
      },
      {
        titlu: "Reacție după procedură",
        text: "Umflătură sau roșeață care nu trece. Pacienta are nevoie de un medic, repede.",
      },
    ],
    scenariu: {
      context: "Miercuri, 21:10. Clinica e închisă.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, cât costă o procedură cu acid hialuronic la buze?",
        },
        {
          cine: "elevio",
          text: "Bună seara. Procedura pornește de la 1.200 de lei; prețul exact îl stabilește medicul la consultație. Vreți să vă programez la o consultație?",
        },
        {
          cine: "client",
          text: "Da. Dar am o întrebare: alăptez, se poate face?",
        },
        {
          cine: "elevio",
          text: "E o întrebare pentru medic și nu vă pot răspunde eu. O notez, ca s-o discutați la consultație.",
        },
        { cine: "client", text: "Bine, notați-o. Când aveți loc?" },
        {
          cine: "elevio",
          text: "Doamna doctor are liber vineri la 15:00 sau luni la 11:00.",
        },
        { cine: "client", text: "Vineri la 15. Andra Neagu." },
        {
          cine: "elevio",
          text: "Gata: vineri la 15:00, consultație pentru buze, cu întrebarea despre alăptare notată pentru medic. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Medicul vede întrebarea despre alăptare înainte de consultație. Pacienta nu a primit niciun răspuns medical la telefon.",
    },
    ceFaceElevio: [
      "Programează consultații și proceduri pe medic, cu verificarea în timp real a calendarului și SMS de confirmare.",
      "Spune prețurile de pornire exact cum le formulezi tu, fără reduceri sau promisiuni inventate.",
      "Notează pentru medic întrebările despre sarcină, alăptare, tratamente sau alergii, fără să le răspundă.",
      "Transferă în câteva secunde apelurile despre reacții după procedură.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Clinica ratează 4 apeluri pe săptămână, seara.",
        "Presupunem că unul dintre ele ar fi devenit o procedură de 1.200 lei.",
      ],
      rezultat: "1 procedură × 1.200 lei × 4 săptămâni = 4.800 lei pe lună.",
    },
    faq: [
      {
        q: "Poate recomanda pacientei o procedură potrivită?",
        a: "Nu. Elevio AI spune ce proceduri faceți și prețurile de pornire, dar recomandarea vine de la medic, la consultație.",
      },
      {
        q: "Cum tratează întrebările despre contraindicații?",
        a: "Nu le răspunde. Le notează pentru medic sau transferă apelul, după cum stabilești.",
      },
      {
        q: "Ce face dacă o pacientă sună cu o reacție după procedură?",
        a: "Transferă apelul pe telefonul stabilit de clinică în câteva secunde. Dacă nu răspunde nimeni, spune mesajul tău pentru astfel de situații și lasă cererea notată complet.",
      },
      {
        q: "Poate vorbi despre promoții?",
        a: "Doar despre cele pe care i le dai, cu perioada și condițiile lor. Când promoția se termină, o scoatem.",
      },
      {
        q: "Ce date ale pacientelor notează?",
        a: "Doar ce e nevoie pentru programare și întrebările pentru medic. Detaliile despre prelucrarea datelor sunt în politica de confidențialitate.",
      },
    ],
    industriiInrudite: [
      "saloane-frizerii",
      "cabinete-stomatologice",
      "clinici-medicale",
    ],
  },

  // ───────────────────────────── Restaurante
  {
    slug: "restaurante",
    nume: "Restaurante",
    pentru: "restaurante",
    categorie: "HoReCa & turism",
    val: 2,
    interogare: "rezervări restaurant telefon automat",
    tipDemo: "restaurant",
    titluSEO: "Rezervări restaurant prin telefon, automat, 24/7 | Elevio AI",
    descriere:
      "Rezervări la restaurant preluate automat la telefon, 24/7: număr de persoane, oră, cereri speciale, SMS de confirmare. Ospătarii rămân la mese.",
    h1: "Rezervări la restaurant prin telefon, preluate automat",
    intro:
      "Elevio AI preia rezervările restaurantului tău la telefon 24/7, în română: verifică în calendar dacă mai e loc și notează numărul de persoane, ora, numele și cererile speciale. Ospătarii nu mai lasă sala ca să răspundă vineri seara, iar întrebările despre program, meniu și evenimente primesc răspuns imediat.",
    scurt:
      "Rezervări de mese, cereri speciale și întrebări despre program și meniu.",
    deCeSunaClientii: [
      {
        titlu: "Rezervare de masă",
        text: "Vineri seara, sâmbătă la prânz: exact când sala e plină și nimeni nu poate răspunde.",
      },
      {
        titlu: "Grupuri și aniversări",
        text: "Masă de 12 persoane, tort adus de acasă, scaun pentru copil.",
      },
      {
        titlu: "Program și meniu",
        text: "Sunteți deschiși luni? Aveți meniu vegetarian? Unde parchez?",
      },
      {
        titlu: "Evenimente private",
        text: "Botez, cină de firmă: cerere de ofertă cu dată, număr de invitați și buget.",
      },
      {
        titlu: "Comenzi la pachet",
        text: "Dacă le iei la telefon: produse, nume, ora la care vine clientul.",
      },
    ],
    scenariu: {
      context: "Vineri, 20:40. Sala e plină, ospătarii aleargă între mese.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, aveți o masă pentru 6 persoane mâine la 19:30?",
        },
        {
          cine: "elevio",
          text: "Bună seara! Verific… La 19:30 mai avem o masă pentru 6 persoane. Vă convine?",
        },
        {
          cine: "client",
          text: "Da. E ziua mamei, putem aduce tortul nostru?",
        },
        {
          cine: "elevio",
          text: "Da, puteți aduce tortul. Notez că e o aniversare. Mai e ceva de știut, de exemplu alergii sau un scaun pentru copil?",
        },
        { cine: "client", text: "Un scaun pentru copil, da." },
        {
          cine: "elevio",
          text: "Gata: mâine la 19:30, 6 persoane, aniversare cu tort propriu și un scaun pentru copil. Pe ce nume?",
        },
        { cine: "client", text: "Familia Dinu." },
        {
          cine: "elevio",
          text: "Mulțumesc! Primiți acum un SMS de confirmare. Vă așteptăm!",
        },
      ],
      dupaApel:
        "Rezervarea e în calendar, iar ospătarul de sâmbătă știe de tort și de scaunul pentru copil înainte să vină familia.",
    },
    ceFaceElevio: [
      "Verifică în timp real dacă mai e loc și face rezervarea, cu SMS de confirmare pentru client.",
      "Notează cererile speciale: aniversare, alergii, scaun pentru copil, masă la geam.",
      "Răspunde la întrebările despre program, meniu, parcare și evenimente, din informațiile tale.",
      "Preia cererile pentru evenimente private (dată, număr de invitați, tipul evenimentului) și ți le transmite.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Restaurantul ratează 10 apeluri vineri și sâmbătă seara.",
        "Presupunem că 4 dintre ele erau rezervări de câte 4 persoane.",
        "Nota medie: 100 lei de persoană.",
      ],
      rezultat:
        "4 rezervări × 4 persoane × 100 lei × 4 weekenduri = 6.400 lei pe lună.",
    },
    faq: [
      {
        q: "Cum știe Elevio AI dacă mai e loc?",
        a: "Verifică în calendarul de rezervări (Cal.com sau Calendly) intervalele și locurile pe care le-ai setat. Dacă folosești alt sistem de rezervări, preia cererea și o transmite echipei pentru confirmare.",
      },
      {
        q: "Poate prelua comenzi la pachet?",
        a: "Da. Notează produsele din meniul pe care i-l dai, cantitățile, numele, telefonul și ora de ridicare, apoi transmite comanda structurat. Nu încasează plăți.",
      },
      {
        q: "Ce face cu cererile pentru botezuri sau cine de firmă?",
        a: "Notează data, numărul de invitați și ce își dorește clientul și îți transmite cererea. Oferta o faci tu.",
      },
      {
        q: "Știe ce alergeni are fiecare preparat?",
        a: "Doar dacă îi dai informațiile. La întrebări despre alergii severe, recomandăm transferul apelului la restaurant, pentru că un răspuns greșit poate fi periculos.",
      },
      {
        q: "Pot păstra numărul restaurantului?",
        a: "Da. Elevio AI răspunde pe numărul existent, cel de pe Google și de pe site.",
      },
    ],
    industriiInrudite: ["hoteluri-pensiuni", "magazine-online", "rent-a-car"],
  },

  // ───────────────────────────── Hoteluri & pensiuni
  {
    slug: "hoteluri-pensiuni",
    nume: "Hoteluri & pensiuni",
    pentru: "hoteluri și pensiuni",
    categorie: "HoReCa & turism",
    val: 2,
    interogare: "recepție virtuală pensiune",
    tipDemo: "altul",
    titluSEO: "Recepție virtuală pentru pensiuni și hoteluri, 24/7",
    descriere:
      "Recepție virtuală pentru pensiunea sau hotelul tău: răspunde despre camere, prețuri și check-in și preia cererile de rezervare la telefon, 24/7, în română.",
    h1: "Recepție virtuală pentru pensiunea sau hotelul tău",
    intro:
      "Elevio AI este recepția virtuală a pensiunii sau a hotelului tău: răspunde la telefon 24/7, în română, la întrebările despre camere, prețuri, check-in și facilități. Preia cererile de rezervare cu datele, numărul de persoane și cererile speciale, iar tu le confirmi, fără să mai răspunzi la telefon din bucătărie sau de la cumpărături.",
    scurt:
      "Întrebări despre camere și prețuri, cereri de rezervare, oaspeți cazați.",
    deCeSunaClientii: [
      {
        titlu: "Aveți camere libere?",
        text: "Minivacanța de 1 Mai, Revelionul. Toată lumea sună în aceeași săptămână.",
      },
      {
        titlu: "Cât costă?",
        text: "Prețul pe noapte, cu sau fără mic-dejun, reducerea pentru copii.",
      },
      {
        titlu: "Check-in și acces",
        text: "Ajungem după miezul nopții, ce facem? Unde parcăm? Drumul e asfaltat?",
      },
      {
        titlu: "Facilități",
        text: "Acceptați animale? Aveți ciubăr, piscină, loc de joacă?",
      },
      {
        titlu: "Grupuri și evenimente",
        text: "Teambuilding, nuntă mică, grup de 20 de persoane.",
      },
    ],
    scenariu: {
      context:
        "Duminică, 22:00. Proprietarul e în bucătărie și pregătește micul-dejun pentru a doua zi.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, aveți o cameră dublă pentru 14–16 februarie? Suntem doi adulți și un câine mic.",
        },
        {
          cine: "elevio",
          text: "Bună seara! Acceptăm câini de talie mică, cu o taxă de 50 de lei pe sejur. Camera dublă cu mic-dejun costă 400 de lei pe noapte. Notez cererea pentru 14–16 februarie?",
        },
        {
          cine: "client",
          text: "Da. Ajungem pe la 23:00, e vreo problemă?",
        },
        {
          cine: "elevio",
          text: "Nu e nicio problemă. Pentru sosirile după ora 22:00, gazda vă trimite din timp instrucțiunile de acces. Pe ce nume fac cererea?",
        },
        { cine: "client", text: "Ana Rusu, pe numărul ăsta de telefon." },
        {
          cine: "elevio",
          text: "Am notat: 14–16 februarie, cameră dublă, doi adulți și un câine mic, sosire pe la 23:00. Gazda confirmă disponibilitatea și vă sună mâine dimineață.",
        },
      ],
      dupaApel:
        "Dimineața, proprietarul găsește cererea completă în rezumat, verifică în sistemul lui de rezervări și o sună pe Ana Rusu ca s-o confirme.",
    },
    ceFaceElevio: [
      "Răspunde la întrebările despre camere, prețuri, mic-dejun, animale, parcare și acces, din informațiile tale.",
      "Preia cererile de rezervare cu datele, numărul de adulți și copii, tipul camerei și ora sosirii și ți le transmite structurat.",
      "Dacă ții disponibilitatea într-un calendar Cal.com sau Calendly, o verifică în timp real și face rezervarea, cu SMS de confirmare.",
      "Transferă la tine în câteva secunde apelurile oaspeților cazați care au o problemă.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Pensiunea ratează 5 apeluri pe săptămână, seara.",
        "Presupunem că unul dintre ele e o rezervare de 2 nopți, la 400 lei pe noapte.",
      ],
      rezultat: "1 rezervare × 800 lei × 4 săptămâni = 3.200 lei pe lună.",
    },
    faq: [
      {
        q: "Se conectează la Booking sau la un channel manager?",
        a: "Nu. Elevio AI nu are integrare cu Booking, Airbnb sau channel managere. Preia cererile primite la telefon și ți le transmite, iar tu confirmi disponibilitatea în sistemul tău.",
      },
      {
        q: "Poate cere avans sau datele cardului?",
        a: "Nu. Elevio AI nu preia plăți și nu cere date de card la telefon. Îi spune oaspetelui cum se face plata, exact cum i-ai explicat tu.",
      },
      {
        q: "Ce face când sună noaptea un oaspete cazat?",
        a: "Dacă e o problemă (nu merge căldura, nu se deschide ușa), apelul ajunge pe telefonul tău în câteva secunde. Dacă e o întrebare simplă (parola de Wi-Fi, ora micului-dejun), răspunde din informațiile tale.",
      },
      {
        q: "Vorbește și cu turiștii străini?",
        a: "Da. Elevio AI vorbește română și engleză (engleza e inclusă de la planul PRO), așa că poate prelua și rezervările oaspeților străini.",
      },
      {
        q: "Am doar 6 camere. Merită?",
        a: "Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung. Socoteala e simplă: câte rezervări pierzi pe lună pentru că nu răspunzi seara?",
      },
    ],
    industriiInrudite: ["restaurante", "rent-a-car", "curatenie-mutari"],
  },

  // ───────────────────────────── Imobiliare
  {
    slug: "imobiliare",
    nume: "Imobiliare",
    pentru: "agenții imobiliare",
    categorie: "Servicii profesionale",
    val: 2,
    interogare: "agent vocal AI imobiliare",
    tipDemo: "altul",
    titluSEO: "Agent vocal AI pentru imobiliare: lead-uri și vizionări",
    descriere:
      "Agent vocal AI pentru agenții imobiliare: răspunde la apelurile de pe anunțuri, află bugetul și zona și programează vizionări în calendar, 24/7, în română.",
    h1: "Agent vocal AI pentru agenții imobiliare",
    intro:
      "Elevio AI preia apelurile agenției imobiliare 24/7, în română: află ce caută clientul (zonă, buget, număr de camere, cumpărare sau închiriere) și programează vizionarea în calendarul agentului. Cât tu ești la o vizionare, cel care sună de pe un anunț nu mai ajunge la altă agenție.",
    scurt: "Apeluri de pe anunțuri, calificarea clienților, vizionări programate.",
    deCeSunaClientii: [
      {
        titlu: "Sună de pe un anunț",
        text: "Mai e disponibil apartamentul? Se poate negocia? Când îl pot vedea?",
      },
      {
        titlu: "„Vreau să vând”",
        text: "Proprietar care vrea o evaluare sau să lucreze cu voi. Lead valoros, care trebuie sunat repede.",
      },
      {
        titlu: "Caută de închiriat",
        text: "Buget, zonă, data mutării, animale de companie.",
      },
      {
        titlu: "Vizionări",
        text: "Toată lumea vrea sâmbătă la prânz, iar agentul e deja la altă vizionare.",
      },
      {
        titlu: "Credit și acte",
        text: "Întrebări pentru agent, nu pentru telefon: Elevio AI le notează și le transmite.",
      },
    ],
    scenariu: {
      context: "Sâmbătă, 11:30. Agentul e la o vizionare în alt cartier.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, sun pentru apartamentul de 2 camere din Gheorgheni, de pe anunț. Mai e disponibil?",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Din ce știu eu, anunțul e activ, iar agentul confirmă la programare. Îl căutați pentru cumpărare cu credit sau cu bani proprii?",
        },
        { cine: "client", text: "Cu credit, am deja preaprobarea." },
        {
          cine: "elevio",
          text: "Perfect. Agentul are liber pentru vizionări luni la 18:00 sau marți la 12:30.",
        },
        { cine: "client", text: "Luni la 18. Se poate negocia prețul?" },
        {
          cine: "elevio",
          text: "Despre preț discutați cu agentul la vizionare; notez întrebarea. Pe ce nume vă programez?",
        },
        { cine: "client", text: "Bogdan Ilie." },
        {
          cine: "elevio",
          text: "Gata: luni la 18:00, vizionare la apartamentul de 2 camere din Gheorgheni, cumpărare cu credit preaprobat. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Agentul vede vizionarea în calendar și știe dinainte că vine un cumpărător cu credit preaprobat, care vrea să negocieze.",
    },
    ceFaceElevio: [
      "Răspunde 24/7 la apelurile de pe anunțuri și notează pentru ce proprietate sună omul.",
      "Pune întrebările de calificare pe care le alegi tu: buget, zonă, cumpărare sau închiriere, credit sau bani proprii, termen.",
      "Programează vizionarea în calendarul agentului, în timp real, cu SMS de confirmare.",
      "Transferă la agent proprietarii care vor să vândă și orice apel pe care îl marchezi ca prioritar.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Agenția ratează 6 apeluri pe săptămână în timpul vizionărilor, deci cam 24 pe lună.",
        "Presupunem că unul din 20 de astfel de apeluri ar fi ajuns o tranzacție.",
        "Comisionul mediu: 3.000 €.",
      ],
      rezultat:
        "24 de apeluri ÷ 20 ≈ o tranzacție ratată pe lună, adică aproximativ 3.000 € comision care ajunge la altă agenție.",
    },
    faq: [
      {
        q: "Știe detaliile tuturor anunțurilor?",
        a: "Știe ce îi dai: lista de proprietăți cu detaliile principale. Când o proprietate se vinde, o scoatem. Pentru orice nu știe, notează întrebarea pentru agent.",
      },
      {
        q: "Negociază prețul?",
        a: "Nu. Elevio AI nu discută negocieri și nu face promisiuni. Notează întrebarea și o lasă agentului.",
      },
      {
        q: "Cum aleg ce întrebări de calificare pune?",
        a: "Le stabilim împreună la configurare. Poți cere, de exemplu, să afle mereu bugetul și dacă clientul are preaprobare de credit înainte de vizionare.",
      },
      {
        q: "Avem mai mulți agenți. Fiecare are calendarul lui?",
        a: "Da. Vizionarea se pune în calendarul agentului care se ocupă de proprietatea respectivă.",
      },
      {
        q: "Se integrează cu CRM-ul nostru imobiliar?",
        a: "Nu oferim integrare directă cu CRM-uri imobiliare. Primești rezumatul și transcriptul fiecărui apel, cu datele clientului, și le introduci unde lucrezi.",
      },
    ],
    industriiInrudite: [
      "asigurari-credite",
      "avocati-notari",
      "constructii-renovari",
    ],
  },

  // ───────────────────────────── Curățenie & mutări
  {
    slug: "curatenie-mutari",
    nume: "Curățenie & mutări",
    pentru: "firme de curățenie și mutări",
    categorie: "Meserii & casă",
    val: 2,
    interogare: "programări firmă curățenie",
    tipDemo: "altul",
    titluSEO: "Programări pentru firme de curățenie și mutări | Elevio AI",
    descriere:
      "Programări pentru firma ta de curățenie sau mutări, preluate la telefon 24/7: suprafață, adresă, etaj, data dorită, totul notat pentru ofertă.",
    h1: "Programări pentru firma ta de curățenie și mutări",
    intro:
      "Elevio AI preia apelurile firmei tale de curățenie sau mutări 24/7, în română: notează tipul lucrării, suprafața, adresa și data dorită și programează echipa în calendar. Clientul primește SMS de confirmare, iar tu primești o cerere completă, din care faci oferta fără să mai suni înapoi pentru detalii.",
    scurt: "Cereri de ofertă complete și programări pentru echipe.",
    deCeSunaClientii: [
      {
        titlu: "Curățenie generală",
        text: "Apartament de 3 camere înainte de sărbători: suprafață, etaj, dacă sunt animale în casă.",
      },
      {
        titlu: "Curățenie după constructor",
        text: "Praf peste tot și mult de muncă. Clientul vrea o ofertă rapidă.",
      },
      {
        titlu: "Curățenie periodică la birou",
        text: "Contract recurent: de câte ori pe săptămână, ce suprafață, în timpul programului sau după.",
      },
      {
        titlu: "Mutare",
        text: "De unde, unde, etaj, lift, câtă mobilă, dacă trebuie demontat ceva.",
      },
      {
        titlu: "Cât costă și când puteți?",
        text: "Preț pe metru pătrat și disponibilitatea din săptămâna asta.",
      },
    ],
    scenariu: {
      context: "Luni, 20:00. Echipele au terminat ziua, biroul e închis.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, vreau o ofertă pentru o mutare, din Drumul Taberei în Militari, la sfârșitul lunii.",
        },
        {
          cine: "elevio",
          text: "Bună seara! Vă pun câteva întrebări, ca oferta să fie corectă. Câte camere de mobilă sunt și la ce etaj, la plecare și la sosire?",
        },
        {
          cine: "client",
          text: "Trei camere. Plecăm de la etajul 4, cu lift, și ajungem la parter.",
        },
        {
          cine: "elevio",
          text: "Am notat. Trebuie demontat ceva, de exemplu dulapuri sau un pat?",
        },
        { cine: "client", text: "Un dulap mare și patul din dormitor." },
        {
          cine: "elevio",
          text: "Ce dată ați prefera? Echipa are liber pe 28 sau pe 30.",
        },
        { cine: "client", text: "Pe 30, dimineața. Mă numesc Lucian Toma." },
        {
          cine: "elevio",
          text: "Gata: pe 30, dimineața, mutare de 3 camere, de la etajul 4 cu lift la parter, cu demontarea unui dulap și a patului. Primiți acum un SMS de confirmare, iar oferta finală v-o trimite echipa.",
        },
      ],
      dupaApel:
        "Dimineața ai în rezumat tot ce îți trebuie pentru ofertă, iar ziua de 30 e deja blocată în calendarul echipei.",
    },
    ceFaceElevio: [
      "Pune întrebările de care ai nevoie pentru ofertă: suprafață, etaj, lift, tipul curățeniei, mobilă, demontări.",
      "Programează lucrarea sau vizita de evaluare în calendar, în timp real, cu SMS de confirmare.",
      "Spune prețurile orientative și zonele în care lucrați, din informațiile tale.",
      "Îți trimite cererea completă, cu transcriptul apelului, ca să faci oferta fără alte telefoane.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Firma ratează 6 apeluri pe săptămână cât echipa e pe teren.",
        "Presupunem că 2 dintre ele ar fi devenit lucrări de câte 600 lei.",
      ],
      rezultat: "2 lucrări × 600 lei × 4 săptămâni = 4.800 lei pe lună.",
    },
    faq: [
      {
        q: "Poate da prețul exact la telefon?",
        a: "Doar dacă ai prețuri fixe, de exemplu pe metru pătrat. Altfel spune prețul orientativ pe care i-l dai și notează detaliile pentru oferta finală.",
      },
      {
        q: "Cum știe când e liberă echipa?",
        a: "Din calendarul tău (Cal.com sau Calendly), în timp real. Dacă ai două echipe, fiecare poate avea calendarul ei.",
      },
      {
        q: "Poate primi poze de la client?",
        a: "Nu. Elevio AI vorbește la telefon și nu primește poze. Îi poate spune clientului unde să le trimită, de exemplu pe e-mailul firmei.",
      },
      {
        q: "Ce face cu reclamațiile după o lucrare?",
        a: "Notează reclamația cu toate detaliile și o transferă la tine sau ți-o transmite imediat, după regulile tale. Nu promite reveniri gratuite sau reduceri.",
      },
      {
        q: "Lucrăm doar în anumite zone. Știe asta?",
        a: "Da, dacă îi dai lista de zone. Când sună cineva din afara ei, îi spune politicos și, dacă vrei, notează totuși cererea.",
      },
    ],
    industriiInrudite: [
      "constructii-renovari",
      "hoteluri-pensiuni",
      "instalatori",
    ],
  },

  // ───────────────────────────── Construcții & renovări
  {
    slug: "constructii-renovari",
    nume: "Construcții & renovări",
    pentru: "firme de construcții și renovări",
    categorie: "Meserii & casă",
    val: 2,
    interogare: "robot telefonic firmă construcții",
    tipDemo: "altul",
    titluSEO: "Robot telefonic pentru firme de construcții și renovări",
    descriere:
      "Robot telefonic pentru firma ta de construcții: preia cererile de ofertă cu suprafața, localitatea și termenul și programează evaluarea, 24/7, în română.",
    h1: "Robot telefonic pentru firma ta de construcții și renovări",
    intro:
      "Elevio AI răspunde la telefonul firmei tale de construcții sau renovări 24/7, în română: preia cererile de ofertă cu tipul lucrării, suprafața, localitatea și termenul dorit și programează vizita de evaluare în calendar. Tu rămâi pe șantier, iar clientul serios nu mai sună la următoarea firmă de pe Google.",
    scurt:
      "Cereri de ofertă cu toate detaliile și vizite de evaluare programate.",
    deCeSunaClientii: [
      {
        titlu: "Renovare completă de apartament",
        text: "Clientul vrea să afle dacă vă ocupați, când puteți începe și cât ar costa, cu aproximație.",
      },
      {
        titlu: "Casă la roșu sau la cheie",
        text: "Lucrări mari, cu proiect. Merită o vizită repede.",
      },
      {
        titlu: "Lucrări punctuale",
        text: "Gresie și faianță în baie, glet și zugrăveli, rigips.",
      },
      {
        titlu: "Termene",
        text: "Puteți începe luna viitoare? Cât durează?",
      },
      {
        titlu: "Un client cu lucrare în curs",
        text: "Sună de pe șantier cu o problemă. Trebuie să ajungă la tine, nu într-o listă.",
      },
    ],
    scenariu: {
      context: "Miercuri, 14:00. Ești pe un șantier, cu flexul în mână.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, vreau să renovez baia complet. Faceți așa ceva?",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Da, facem renovări complete de băi. Ce suprafață are baia, aproximativ, și în ce localitate e?",
        },
        { cine: "client", text: "Vreo 5 metri pătrați, în Florești." },
        {
          cine: "elevio",
          text: "Am notat. Ce vreți să schimbați: gresia, faianța, obiectele sanitare, instalațiile?",
        },
        {
          cine: "client",
          text: "Tot, inclusiv țevile. Gresia am cumpărat-o deja.",
        },
        {
          cine: "elevio",
          text: "Pentru o ofertă corectă, șeful de echipă vine să vadă baia. Are liber joi la 17:00 sau sâmbătă la 10:00.",
        },
        { cine: "client", text: "Sâmbătă la 10. Sunt Paul Marinescu." },
        {
          cine: "elevio",
          text: "Gata: sâmbătă la 10:00, evaluare pentru renovarea completă a unei băi de 5 metri pătrați în Florești, cu gresia deja cumpărată. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Șeful de echipă merge sâmbătă știind ce lucrare e, ce suprafață are baia și că gresia e deja cumpărată.",
    },
    ceFaceElevio: [
      "Preia cererile de ofertă cu tipul lucrării, suprafața, localitatea, termenul și materialele pe care clientul le are deja.",
      "Programează vizitele de evaluare în calendar, în timp real, cu SMS de confirmare.",
      "Spune politicos ce lucrări nu faceți sau în ce zone nu ajungeți, după lista ta.",
      "Transferă la tine în câteva secunde clienții cu lucrări în curs și orice apel urgent.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Firma ratează 5 apeluri pe săptămână cât e pe șantier, deci cam 20 pe lună.",
        "Presupunem că unul din 20 de apeluri ar fi devenit o lucrare de 20.000 lei.",
      ],
      rezultat:
        "O lucrare ratată pe lună înseamnă 20.000 lei contractați de altă firmă.",
    },
    faq: [
      {
        q: "Poate estima costul unei renovări?",
        a: "Nu. O estimare greșită la telefon te leagă de un preț nerealist. Elevio AI strânge detaliile și programează evaluarea; prețul îl dai tu.",
      },
      {
        q: "Cum filtrez cererile mici pe care nu le iau?",
        a: "Îi spui ce lucrări faci și ce nu. Pentru ce nu faci, Elevio AI îi spune clientului politicos și nu programează vizita.",
      },
      {
        q: "Ce primesc după apel?",
        a: "Transcriptul și un rezumat cu datele clientului, lucrarea, suprafața, localitatea și programarea.",
      },
      {
        q: "Pot pune vizitele în calendarul șefului de echipă?",
        a: "Da. Programarea se pune în calendarul ales de tine, cu durata pe care o stabilești pentru o evaluare.",
      },
      {
        q: "Merge și cu numărul meu personal?",
        a: "Da. Elevio AI lucrează pe numărul pe care îl folosești deja.",
      },
    ],
    industriiInrudite: [
      "reparatii-acoperisuri",
      "tamplarie-pvc",
      "instalatori",
    ],
  },
];

const VAL_3: Industrie[] = [
  // ───────────────────────────── Avocați & notari
  {
    slug: "avocati-notari",
    nume: "Avocați & notari",
    pentru: "cabinete de avocatură și birouri notariale",
    categorie: "Servicii profesionale",
    val: 3,
    interogare: "recepționer virtual cabinet avocatură",
    tipDemo: "altul",
    titluSEO: "Recepționer virtual pentru cabinet de avocatură și notariat",
    descriere:
      "Recepționer virtual pentru cabinetul de avocatură sau biroul notarial: programează consultații, filtrează cazurile și nu dă sfaturi juridice. 24/7.",
    h1: "Recepționer virtual pentru cabinetul de avocatură sau notarial",
    intro:
      "Elevio AI este recepționerul virtual al cabinetului tău de avocatură sau al biroului notarial: răspunde la telefon 24/7, în română, află pe scurt despre ce e vorba și programează consultația în calendar. Nu dă sfaturi juridice și nu evaluează șansele unui caz: asta rămâne pentru tine.",
    scurt: "Consultații programate, cazuri filtrate, fără sfaturi juridice la telefon.",
    deCeSunaClientii: [
      {
        titlu: "Programare la consultație",
        text: "Divorț, moștenire, un litigiu cu vecinul. Clientul vrea să vină cât mai repede.",
      },
      {
        titlu: "Acte notariale",
        text: "Cât costă un contract de vânzare? Ce acte trebuie să aduc? Cât durează?",
      },
      {
        titlu: "Un termen apropiat",
        text: "„Am primit o citație, termenul e peste trei zile.” Are nevoie de avocat, repede.",
      },
      {
        titlu: "Cazuri pe care nu le luați",
        text: "Un cabinet de dreptul familiei nu vrea dosare penale. Filtrarea la telefon economisește timp tuturor.",
      },
      {
        titlu: "Clienți existenți",
        text: "Întreabă de dosarul lor: cererea trebuie notată și transmisă, nu discutată la telefon.",
      },
    ],
    scenariu: {
      context: "Luni, 8:15. Avocata pleacă spre instanță.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, am nevoie de un avocat pentru divorț. Soțul meu a depus deja cererea.",
        },
        {
          cine: "elevio",
          text: "Bună ziua. Vă pot programa la o consultație. Pe scurt: aveți copii minori sau bunuri de împărțit?",
        },
        { cine: "client", text: "Avem un copil de 8 ani și un apartament." },
        {
          cine: "elevio",
          text: "Am notat. Ați primit vreun termen de judecată?",
        },
        { cine: "client", text: "Da, peste trei săptămâni." },
        {
          cine: "elevio",
          text: "Mulțumesc. Doamna avocat are liber pentru consultații marți la 16:00 sau joi la 10:00. Consultația costă 300 de lei.",
        },
        { cine: "client", text: "Marți la 16. Mă numesc Irina Lazăr." },
        {
          cine: "elevio",
          text: "Gata: marți la 16:00, consultație pentru divorț, cu un copil minor, un apartament și termen peste trei săptămâni. Aduceți actele primite de la instanță. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Avocata intră la consultație știind deja situația și termenul, fără ca la telefon să se fi dat vreun sfat juridic.",
    },
    ceFaceElevio: [
      "Programează consultațiile în calendar, în timp real, cu SMS de confirmare.",
      "Pune întrebările de filtrare stabilite de tine (tipul cazului, termene, părți implicate) și notează răspunsurile.",
      "Spune ce domenii acoperiți, tariful consultației și actele de adus, din informațiile tale.",
      "Transferă la tine în câteva secunde apelurile cu termene foarte apropiate sau ale clienților existenți.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Cabinetul ratează 4 apeluri pe săptămână cât ești în instanță.",
        "Presupunem că, din ele, un client nou la două săptămâni ar fi semnat un contract de asistență de 3.000 lei.",
      ],
      rezultat: "2 contracte × 3.000 lei = 6.000 lei pe lună.",
    },
    faq: [
      {
        q: "Poate da sfaturi juridice?",
        a: "Nu. Elevio AI nu răspunde la întrebări de drept și nu îi spune clientului ce șanse are. Programează consultația și notează pe scurt situația.",
      },
      {
        q: "Ce face cu un client existent care întreabă de dosar?",
        a: "Nu discută dosarul. Notează cine a sunat și ce vrea și transferă apelul sau îți transmite cererea, după regulile tale.",
      },
      {
        q: "Cât de multe detalii despre caz notează?",
        a: "Cât stabilești tu. Dacă nu vrei detalii despre caz la telefon, Elevio AI pune doar întrebările generale necesare programării. Detaliile despre prelucrarea datelor sunt în politica de confidențialitate.",
      },
      {
        q: "Merge și pentru un birou notarial?",
        a: "Da. Pentru notari, Elevio AI răspunde la întrebările despre actele necesare și onorarii, din lista ta, și programează semnarea sau consultația.",
      },
      {
        q: "Poate refuza cazurile pe care nu le iau?",
        a: "Da, politicos. Îi spui ce domenii nu acoperi, iar Elevio AI îi explică asta clientului și nu programează consultația.",
      },
    ],
    industriiInrudite: ["contabilitate", "imobiliare", "asigurari-credite"],
  },

  // ───────────────────────────── Contabilitate
  {
    slug: "contabilitate",
    nume: "Contabilitate",
    pentru: "firme de contabilitate",
    categorie: "Servicii profesionale",
    val: 3,
    interogare: "asistent telefonic firmă contabilitate",
    tipDemo: "altul",
    titluSEO: "Asistent telefonic pentru firme de contabilitate, 24/7",
    descriere:
      "Asistent telefonic pentru firma ta de contabilitate: răspunde la întrebările care se repetă, programează clienții noi și notează cererile pentru contabil.",
    h1: "Asistent telefonic pentru firma ta de contabilitate",
    intro:
      "Elevio AI este asistentul telefonic al firmei tale de contabilitate: răspunde 24/7, în română, la întrebările care se repetă, programează întâlnirile cu potențialii clienți și notează cererile care trebuie să ajungă la contabil. În săptămânile cu termene, telefonul nu te mai scoate din declarații.",
    scurt: "Întrebări repetitive, clienți noi programați, cereri pentru contabil.",
    deCeSunaClientii: [
      {
        titlu: "Firmă nouă",
        text: "„Vreau să-mi deschid un SRL. Cât costă contabilitatea pe lună? Vă ocupați și de înființare?”",
      },
      {
        titlu: "Termene",
        text: "Clienții sună înainte de fiecare termen să întrebe până când trimit actele.",
      },
      {
        titlu: "Documente",
        text: "Ce trebuie să vă trimit luna asta și până când?",
      },
      {
        titlu: "Ofertă de preț",
        text: "Cât costă pentru un SRL cu 2 angajați și 30 de facturi pe lună?",
      },
      {
        titlu: "O scrisoare de la ANAF",
        text: "Trebuie să ajungă la contabil, nu să primească un răspuns pe loc.",
      },
    ],
    scenariu: {
      context: "Pe 24 ale lunii. Toată echipa lucrează la declarații.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, vreau să deschid un SRL și caut contabil. Cât costă la voi?",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Prețul depinde de numărul de documente și de angajați. Câte facturi estimați pe lună și veți avea angajați?",
        },
        { cine: "client", text: "Cam 20 de facturi, fără angajați la început." },
        {
          cine: "elevio",
          text: "Pentru un SRL fără angajați, cu până la 30 de documente pe lună, abonamentul pornește de la 400 de lei pe lună. Vreți o întâlnire cu contabilul, ca să discutați exact?",
        },
        { cine: "client", text: "Da, și m-ar interesa și înființarea." },
        {
          cine: "elevio",
          text: "Notez că vă interesează și înființarea. Contabilul are liber miercuri la 11:00 sau vineri la 14:00, online sau la birou.",
        },
        { cine: "client", text: "Vineri la 14, online. Sunt Alex Mocanu." },
        {
          cine: "elevio",
          text: "Gata: vineri la 14:00, întâlnire online pentru un SRL nou, cu înființare, aproximativ 20 de facturi pe lună, fără angajați. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Contabilul intră în întâlnire cu oferta aproape gata, pentru că știe volumul de documente și ce servicii vrea clientul.",
    },
    ceFaceElevio: [
      "Răspunde la întrebările care se repetă (ce documente trimit, până când, cum plătesc abonamentul), din informațiile tale.",
      "Programează întâlnirile cu clienții noi în calendar, cu SMS de confirmare.",
      "Strânge datele pentru ofertă: tipul firmei, numărul de documente, angajați, activitate.",
      "Notează cererile clienților existenți și pe cele legate de scrisori oficiale și le transmite contabilului responsabil.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Firma ratează 5 apeluri pe săptămână în perioadele cu termene.",
        "Presupunem că unul pe lună e un client nou, cu abonament de 500 lei pe lună.",
      ],
      rezultat:
        "Un client pierdut înseamnă 500 lei × 12 luni = 6.000 lei pe an, pentru fiecare lună în care se întâmplă.",
    },
    faq: [
      {
        q: "Poate răspunde la întrebări fiscale?",
        a: "Nu. Elevio AI nu dă consultanță fiscală. Spune informațiile generale pe care i le dai (de exemplu, până când vreți documentele), iar orice întrebare de fond o notează pentru contabil.",
      },
      {
        q: "Ce spune despre termenele de depunere?",
        a: "Doar ce îi dai tu, cu formularea ta. Termenele se mai schimbă, așa că le actualizăm când ne anunți.",
      },
      {
        q: "Poate filtra clienții noi?",
        a: "Da. Pune întrebările care îți arată dacă firma e potrivită pentru voi (activitate, volum de documente, angajați) și notează răspunsurile înainte de întâlnire.",
      },
      {
        q: "Clienții existenți vor să vorbească cu contabilul lor. Se poate?",
        a: "Da. Elevio AI transferă apelul la contabilul responsabil sau, dacă e ocupat, notează cererea și i-o transmite.",
      },
      {
        q: "Cât costă?",
        a: "Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung. Configurarea durează câteva zile.",
      },
    ],
    industriiInrudite: ["avocati-notari", "asigurari-credite", "imobiliare"],
  },

  // ───────────────────────────── Școli de șoferi
  {
    slug: "scoli-soferi",
    nume: "Școli de șoferi",
    pentru: "școli de șoferi",
    categorie: "Auto",
    val: 3,
    interogare: "programări școală de șoferi",
    tipDemo: "altul",
    titluSEO: "Programări școală de șoferi prin telefon, 24/7 | Elevio AI",
    descriere:
      "Programări pentru școala de șoferi, preluate la telefon 24/7: înscrieri, prețuri, acte necesare și ore de condus. Instructorii nu mai răspund de la volan.",
    h1: "Programări pentru școala de șoferi, preluate la telefon",
    intro:
      "Elevio AI răspunde la telefonul școlii de șoferi 24/7, în română: spune prețurile și actele necesare, programează înscrierile și preia cererile pentru orele de condus. Instructorii nu mai răspund la telefon în timp ce elevul e la volan.",
    scurt: "Înscrieri, prețuri, acte necesare și cereri pentru orele de condus.",
    deCeSunaClientii: [
      {
        titlu: "Înscriere",
        text: "Cât costă categoria B, când începe următoarea grupă, ce acte trebuie.",
      },
      {
        titlu: "Ore de condus",
        text: "Elevii vor să-și stabilească sau să-și mute orele.",
      },
      {
        titlu: "Fișa medicală și actele",
        text: "Unde se face fișa medicală, de unde iau cazierul, ce aduc la înscriere.",
      },
      {
        titlu: "Plata în rate",
        text: "Se poate plăti în rate? Cât e avansul?",
      },
      {
        titlu: "Examenul",
        text: "Când dau examenul? Ce se întâmplă dacă nu iau?",
      },
    ],
    scenariu: {
      context: "Duminică, 17:00. Secretariatul e închis.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, vreau să mă înscriu la categoria B. Cât costă?",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Cursul pentru categoria B costă 2.800 de lei și se poate plăti în două rate. Următoarea grupă începe pe 1 decembrie.",
        },
        { cine: "client", text: "Ce acte îmi trebuie?" },
        {
          cine: "elevio",
          text: "Actul de identitate, fișa medicală, avizul psihologic și cazierul judiciar. Vreți să vă programez la sediu pentru înscriere?",
        },
        { cine: "client", text: "Da, săptămâna asta, după ora 17." },
        {
          cine: "elevio",
          text: "Avem liber marți la 17:30 sau joi la 18:00.",
        },
        { cine: "client", text: "Joi la 18. Sunt Teodora Ene." },
        {
          cine: "elevio",
          text: "Gata: joi la 18:00, înscriere la categoria B. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Luni dimineață, secretariatul vede înscrierea în calendar. Teodora știe deja ce acte să aducă.",
    },
    ceFaceElevio: [
      "Spune prețurile, actele necesare și data următoarei grupe, din informațiile tale.",
      "Programează înscrierile la sediu în calendar, cu SMS de confirmare.",
      "Preia cererile elevilor pentru orele de condus; dacă fiecare instructor are calendarul lui, programează direct.",
      "Transferă la tine întrebările despre situații speciale (permis suspendat, reexaminare, categorii mai rare).",
    ],
    exempluCalcul: {
      ipoteze: [
        "Școala ratează 8 apeluri pe săptămână cât instructorii sunt în mașină.",
        "Presupunem că unul pe săptămână ar fi fost o înscriere.",
        "Cursul pentru categoria B: 2.800 lei.",
      ],
      rezultat:
        "1 înscriere × 2.800 lei × 4 săptămâni = 11.200 lei pe lună.",
    },
    faq: [
      {
        q: "Poate programa orele de condus direct?",
        a: "Da, dacă fiecare instructor are calendarul lui în Cal.com sau Calendly. Altfel preia cererea elevului și o transmite instructorului.",
      },
      {
        q: "Știe datele examenelor?",
        a: "Știe doar ce îi dai tu. Programările la examen nu depind de școală, așa că pentru întrebările precise notează cererea și revine cineva de la voi.",
      },
      {
        q: "Poate răspunde despre plata în rate?",
        a: "Da, exact cum ai stabilit: avansul, numărul de rate, termenele. Nu negociază alte condiții.",
      },
      {
        q: "Ce face dacă un elev vrea să se plângă de un instructor?",
        a: "Notează reclamația și o transferă la tine sau ți-o transmite, fără să o discute.",
      },
      {
        q: "Merge pentru o școală mică, cu trei instructori?",
        a: "Da. Planurile pornesc de la 150€ pe lună + TVA, fără contract pe termen lung, iar fiecare instructor poate avea calendarul lui.",
      },
    ],
    industriiInrudite: ["service-auto", "rent-a-car", "sali-fitness"],
  },

  // ───────────────────────────── Săli de fitness
  {
    slug: "sali-fitness",
    nume: "Săli de fitness",
    pentru: "săli de fitness",
    categorie: "Beauty & wellness",
    val: 3,
    interogare: "recepție telefonică sală fitness",
    tipDemo: "altul",
    titluSEO: "Recepție telefonică pentru sală de fitness, 24/7 | Elevio AI",
    descriere:
      "Recepție telefonică pentru sala ta de fitness: răspunde despre abonamente, program și clase și programează vizitele de probă și ședințele cu antrenorul.",
    h1: "Recepție telefonică pentru sala ta de fitness",
    intro:
      "Elevio AI preia telefonul sălii de fitness 24/7, în română: răspunde la întrebările despre abonamente, program și clase și programează vizitele de probă și ședințele cu antrenorul. Recepția se ocupă de oamenii din sală, nu de telefonul care sună la fiecare cinci minute.",
    scurt: "Abonamente, program și clase, vizite de probă și ședințe cu antrenorul.",
    deCeSunaClientii: [
      {
        titlu: "Cât costă abonamentul?",
        text: "Lunar, trimestrial, pentru studenți, cu sau fără clase.",
      },
      {
        titlu: "Program",
        text: "Sunteți deschiși de sărbători? De la ce oră dimineața?",
      },
      {
        titlu: "Clase de grup",
        text: "Mai sunt locuri la pilates joi seara?",
      },
      {
        titlu: "Antrenor personal",
        text: "Clientul vrea o primă ședință și prețul pachetului.",
      },
      {
        titlu: "Suspendarea abonamentului",
        text: "„Plec o lună în concediu, se poate suspenda?”",
      },
    ],
    scenariu: {
      context: "Luni, 18:30, ora de vârf. Recepția e plină de oameni care intră.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, cât costă un abonament lunar și aveți ședință de probă?",
        },
        {
          cine: "elevio",
          text: "Bună seara! Abonamentul lunar costă 180 de lei, cu acces nelimitat. Prima vizită e gratuită, cu un antrenor care vă arată sala. Vreți să vă programez?",
        },
        { cine: "client", text: "Da. Aveți și pilates?" },
        {
          cine: "elevio",
          text: "Avem pilates marțea și joia la 19:00, inclus în abonamentul cu clase, de 230 de lei. Pentru vizita de probă, antrenorul are liber miercuri la 18:00 sau sâmbătă la 11:00.",
        },
        { cine: "client", text: "Miercuri la 18. Sunt Mara Stoica." },
        {
          cine: "elevio",
          text: "Gata: miercuri la 18:00, vizită de probă cu antrenorul. Notez că vă interesează și pilates. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Antrenorul știe că vine o persoană nouă interesată de pilates și îi poate prezenta direct abonamentul cu clase.",
    },
    ceFaceElevio: [
      "Răspunde la întrebările despre abonamente, prețuri, program și clase, din informațiile tale.",
      "Programează vizitele de probă și ședințele cu antrenorii în calendar, cu SMS de confirmare.",
      "Preia cererile de suspendare sau anulare a abonamentului și le transmite recepției.",
      "Transferă la recepție apelurile despre accidentări sau reclamații.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Sala ratează 10 apeluri pe săptămână la orele de vârf.",
        "Presupunem că 2 dintre ele erau oameni care voiau să se înscrie.",
        "Abonament lunar: 180 lei, păstrat în medie 6 luni (presupunere).",
      ],
      rezultat:
        "2 × 4 săptămâni = 8 abonați pierduți × 180 lei × 6 luni = 8.640 lei, dintr-o singură lună de apeluri ratate.",
    },
    faq: [
      {
        q: "Știe câte locuri mai sunt la o clasă?",
        a: "Doar dacă clasele sunt gestionate într-un calendar Cal.com sau Calendly cu număr de locuri. Altfel spune orarul și notează cererea de rezervare.",
      },
      {
        q: "Poate vinde abonamente la telefon?",
        a: "Nu încasează plăți. Spune prețurile, notează cererea și programează vizita la care clientul semnează și plătește.",
      },
      {
        q: "Ce spune despre suspendarea abonamentului?",
        a: "Exact regulile tale. Cererea concretă o notează și o transmite recepției.",
      },
      {
        q: "Antrenorii au calendare diferite. Se poate?",
        a: "Da. Fiecare antrenor poate avea calendarul lui, iar clientul alege antrenorul sau primul loc liber.",
      },
      {
        q: "Avem recepție. Mai are rost?",
        a: "Da, dacă recepția nu poate răspunde mereu la telefon. Elevio AI preia apelurile pe același număr, iar recepția se ocupă de oamenii din sală.",
      },
    ],
    industriiInrudite: ["kinetoterapie", "saloane-frizerii", "scoli-soferi"],
  },

  // ───────────────────────────── Rent-a-car
  {
    slug: "rent-a-car",
    nume: "Rent-a-car",
    pentru: "firme de închirieri auto",
    categorie: "Auto",
    val: 3,
    interogare: "rezervări rent a car telefon",
    tipDemo: "altul",
    titluSEO: "Rezervări rent a car prin telefon, 24/7 | Elevio AI",
    descriere:
      "Rezervări rent a car preluate la telefon 24/7: perioadă, loc de predare, categorie de mașină, condiții. Clienții cu probleme pe drum ajung la tine imediat.",
    h1: "Rezervări rent a car prin telefon, preluate 24/7",
    intro:
      "Elevio AI răspunde la telefonul firmei tale de rent a car 24/7, în română: preia cererile de rezervare cu perioada, locul de predare și categoria de mașină și spune prețurile și condițiile de închiriere. Clientul care are deja mașina și sună cu o problemă ajunge la tine în câteva secunde.",
    scurt: "Cereri de rezervare, prețuri și condiții, clienți cu probleme pe drum.",
    deCeSunaClientii: [
      {
        titlu: "Aveți mașină liberă?",
        text: "Pentru 5 zile în august, cu predare la aeroport.",
      },
      {
        titlu: "Cât costă?",
        text: "Prețul pe zi, garanția, kilometrii incluși, asigurarea.",
      },
      {
        titlu: "Condiții",
        text: "Vârsta minimă, vechimea permisului, card pentru garanție.",
      },
      {
        titlu: "Predare și returnare",
        text: "La aeroport, la hotel, după program.",
      },
      {
        titlu: "Probleme pe drum",
        text: "Pană, accident, un martor aprins în bord: clientul are nevoie imediat de un om.",
      },
    ],
    scenariu: {
      context:
        "Vineri, 23:50. Un client care a rezervat deja aterizează mai devreme. A doua zi sună altcineva pentru o rezervare nouă.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, am rezervată o mașină pentru mâine dimineață la aeroport, dar zborul meu a aterizat acum. Mă puteți aștepta?",
        },
        {
          cine: "elevio",
          text: "Bună seara. Vă pun imediat în legătură cu colegul de serviciu, care se ocupă de predări. Pe ce nume e rezervarea?",
        },
        { cine: "client", text: "Victor Pavel." },
        {
          cine: "elevio",
          text: "Mulțumesc, domnule Pavel. Vă transfer acum, rămâneți pe linie câteva secunde.",
        },
        {
          cine: "sistem",
          text: "Apel transferat pe telefonul colegului de serviciu.",
        },
        { cine: "sistem", text: "Sâmbătă, 10:00, alt client:" },
        {
          cine: "client",
          text: "Bună ziua, vreau o mașină automată pentru 12–17 iulie, cu predare la Otopeni.",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Mașinile compacte automate pornesc de la 45 de euro pe zi, cu o garanție de 300 de euro. Notez cererea: 12–17 iulie, cutie automată, predare la Otopeni. Pe ce nume?",
        },
        { cine: "client", text: "Laura Iordache." },
        {
          cine: "elevio",
          text: "Gata, doamna Iordache. Colegii confirmă disponibilitatea și vă trimit detaliile rezervării. Primiți acum un SMS cu cererea înregistrată.",
        },
      ],
      dupaApel:
        "Clientul de la aeroport a vorbit cu un om în câteva secunde. Cererea pentru iulie așteaptă în rezumat, cu toate datele, ca echipa s-o confirme.",
    },
    ceFaceElevio: [
      "Preia cererile de rezervare cu perioada, locul de predare și returnare, categoria și tipul de cutie de viteze.",
      "Spune prețurile, garanția și condițiile de închiriere exact cum i le dai.",
      "Transferă în câteva secunde apelurile clienților care au deja mașina și au o problemă.",
      "Îți trimite transcriptul și rezumatul fiecărui apel; clientul primește SMS de confirmare.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Firma ratează 6 apeluri pe săptămână, seara și în weekend.",
        "Presupunem că 2 dintre ele erau rezervări de 5 zile, la 40 € pe zi.",
      ],
      rezultat: "2 rezervări × 200 € × 4 săptămâni = 1.600 € pe lună.",
    },
    faq: [
      {
        q: "Vede flota disponibilă în timp real?",
        a: "Nu se conectează la programul de gestiune a flotei. Dacă ții disponibilitatea în Cal.com sau Calendly, o poate verifica; altfel preia cererea, iar echipa confirmă.",
      },
      {
        q: "Poate cere datele cardului pentru garanție?",
        a: "Nu. Elevio AI nu preia plăți și nu cere date de card la telefon. Explică cum se face plata, după regulile tale.",
      },
      {
        q: "Vorbește și cu turiștii străini?",
        a: "Da. Elevio AI vorbește română și engleză (engleza e inclusă de la planul PRO), așa că poate prelua și cererile clienților străini.",
      },
      {
        q: "Ce face când un client sună după un accident?",
        a: "Transferă imediat apelul la numărul tău pentru urgențe. Dacă ai stabilit un mesaj (de exemplu, să sune la 112 dacă sunt răniți), îl spune înainte de transfer.",
      },
      {
        q: "Pot păstra numărul firmei?",
        a: "Da. Elevio AI răspunde pe numărul existent.",
      },
    ],
    industriiInrudite: ["service-auto", "hoteluri-pensiuni", "scoli-soferi"],
  },

  // ───────────────────────────── Asigurări & credite
  {
    slug: "asigurari-credite",
    nume: "Asigurări & credite",
    pentru: "agenții de asigurări și brokeri de credite",
    categorie: "Servicii profesionale",
    val: 3,
    interogare: "agent vocal AI asigurări",
    tipDemo: "altul",
    titluSEO: "Agent vocal AI pentru asigurări și credite, 24/7, în română",
    descriere:
      "Agent vocal AI pentru asigurări și credite: află ce îl interesează pe client și programează discuția cu consultantul. Nu dă oferte și nu promite aprobări.",
    h1: "Agent vocal AI pentru asigurări și credite",
    intro:
      "Elevio AI preia apelurile agenției tale de asigurări sau ale brokerului de credite 24/7, în română: află ce îl interesează pe client (RCA, CASCO, locuință, credit ipotecar), strânge datele de bază și programează discuția cu consultantul. Nu dă oferte, nu recomandă produse și nu promite aprobări.",
    scurt: "Clienți calificați și discuții programate cu consultantul, fără oferte la telefon.",
    deCeSunaClientii: [
      {
        titlu: "Cât costă un RCA?",
        text: "Cea mai frecventă întrebare. Prețul depinde de multe date, așa că e treaba unui consultant.",
      },
      {
        titlu: "Asigurarea locuinței",
        text: "Obligatorie sau facultativă, ce acoperă, cât costă.",
      },
      {
        titlu: "Credit ipotecar",
        text: "Cât pot lua, ce acte trebuie, cât durează. Clientul vrea o discuție cu un broker.",
      },
      {
        titlu: "Daune",
        text: "„Am avut un accident, ce fac?” Trebuie să ajungă la un om, repede.",
      },
      {
        titlu: "Reînnoiri",
        text: "„Îmi expiră polița luna viitoare, mă puteți suna?”",
      },
    ],
    scenariu: {
      context: "Joi, 19:30. Biroul e închis.",
      replici: [
        {
          cine: "client",
          text: "Bună seara, vreau să iau un credit pentru o casă și nu știu de unde să încep.",
        },
        {
          cine: "elevio",
          text: "Bună seara! Vă programez la o discuție cu un consultant de credite. Ca să se pregătească, vă pot pune două întrebări scurte?",
        },
        { cine: "client", text: "Da." },
        {
          cine: "elevio",
          text: "Aveți venit din salariu sau din altă sursă? Și aveți deja o proprietate în vedere?",
        },
        {
          cine: "client",
          text: "Salariu, de 4 ani la aceeași firmă. Încă n-am găsit casa.",
        },
        {
          cine: "elevio",
          text: "Mulțumesc. Consultantul are liber luni la 18:00 sau marți la 12:00, la telefon sau la birou.",
        },
        { cine: "client", text: "Luni la 18, la telefon. Sunt Sorin Badea." },
        {
          cine: "elevio",
          text: "Gata: luni la 18:00, discuție la telefon despre un credit ipotecar, venit din salariu, fără proprietate aleasă încă. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Consultantul sună luni știind ce vrea clientul și în ce stadiu e, fără ca la telefon să se fi promis vreo dobândă sau vreo aprobare.",
    },
    ceFaceElevio: [
      "Află ce produs îl interesează pe client și pune întrebările de bază stabilite de tine.",
      "Programează discuția cu consultantul în calendar, cu SMS de confirmare.",
      "Transferă imediat apelurile despre daune sau accidente.",
      "Îți trimite rezumatul și transcriptul fiecărui apel, ca să suni pregătit.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Agenția ratează 5 apeluri pe săptămână după program.",
        "Presupunem că 2 pe lună ar fi devenit clienți.",
        "Comisionul mediu: 500 lei.",
      ],
      rezultat:
        "2 clienți × 500 lei = 1.000 lei pe lună, fără reînnoirile din anii următori.",
    },
    faq: [
      {
        q: "Poate da prețul unei polițe?",
        a: "Nu. Elevio AI nu calculează oferte și nu spune prețuri pentru polițe sau dobânzi. Strânge datele de bază și programează discuția cu consultantul.",
      },
      {
        q: "Recomandă un produs sau o bancă?",
        a: "Nu. Recomandările vin doar de la consultant.",
      },
      {
        q: "Ce date personale cere?",
        a: "Doar ce stabilești tu la configurare și e necesar pentru programare. Recomandarea noastră e să nu ceară la telefon CNP sau date de card.",
      },
      {
        q: "Ce face cu un client care a avut un accident?",
        a: "Transferă apelul la tine în câteva secunde. Dacă nu răspunzi, notează ce s-a întâmplat și îi spune clientului ce ai stabilit, de exemplu numărul pentru daune al asigurătorului.",
      },
      {
        q: "Avem mai mulți consultanți. Se poate?",
        a: "Da. Fiecare poate avea calendarul lui, iar programarea se face la consultantul potrivit, de exemplu unul pentru credite și altul pentru asigurări.",
      },
    ],
    industriiInrudite: ["imobiliare", "contabilitate", "avocati-notari"],
  },

  // ───────────────────────────── Tâmplărie PVC
  {
    slug: "tamplarie-pvc",
    nume: "Termopane & tâmplărie PVC",
    pentru: "firme de termopane și tâmplărie PVC",
    categorie: "Meserii & casă",
    val: 3,
    interogare: "robot telefonic firmă termopane",
    tipDemo: "altul",
    titluSEO: "Robot telefonic pentru firme de termopane și tâmplărie PVC",
    descriere:
      "Robot telefonic pentru firma ta de termopane: preia cererile de ofertă cu numărul de ferestre și localitatea și programează măsurătorile, 24/7, în română.",
    h1: "Robot telefonic pentru firma ta de termopane",
    intro:
      "Elevio AI răspunde la telefonul firmei tale de termopane și tâmplărie PVC sau aluminiu 24/7, în română: preia cererile de ofertă cu numărul de ferestre, tipul locuinței și localitatea și programează măsurătorile în calendar. Echipa de montaj nu mai pierde clienți pentru că era pe schelă când a sunat telefonul.",
    scurt: "Cereri de ofertă pentru ferestre și măsurători programate.",
    deCeSunaClientii: [
      {
        titlu: "Ofertă pentru ferestre",
        text: "Câte ferestre, ce dimensiuni aproximative, apartament sau casă.",
      },
      {
        titlu: "Măsurători",
        text: "Clientul vrea să vină cineva să măsoare, nu un preț dat din ochi.",
      },
      {
        titlu: "Profil și geam",
        text: "Câte camere are profilul, ce geam, ce culoare. Întrebări de vânzare care se repetă.",
      },
      {
        titlu: "Uși, rulouri, plase de insecte",
        text: "Produse în plus și cereri mai mici, care merită și ele notate.",
      },
      {
        titlu: "Reglaje și service",
        text: "Fereastra nu se mai închide bine, garnitura s-a uzat. Clienți vechi, care trebuie programați.",
      },
    ],
    scenariu: {
      context: "Sâmbătă, 9:30. Echipa e la un montaj.",
      replici: [
        {
          cine: "client",
          text: "Bună ziua, vreau să schimb ferestrele la un apartament de 3 camere. Cât ar costa?",
        },
        {
          cine: "elevio",
          text: "Bună ziua! Prețul depinde de dimensiuni și de profil, de aceea facem întâi măsurătorile, gratuit. Câte ferestre și uși de balcon sunt, aproximativ?",
        },
        {
          cine: "client",
          text: "Patru ferestre și o ușă de balcon. Sunt la etajul 2.",
        },
        {
          cine: "elevio",
          text: "Am notat. Vă interesează o anumită culoare, de exemplu imitație de lemn?",
        },
        {
          cine: "client",
          text: "Albe, dar vreau geam bun, că e zgomot de la stradă.",
        },
        {
          cine: "elevio",
          text: "Notez „izolare fonică, prioritate”. Măsurătorile se pot face marți la 17:00 sau joi la 9:00. Ce preferați?",
        },
        {
          cine: "client",
          text: "Marți la 17. Sunt Gabriel Nistor, strada Primăverii 21, Bacău.",
        },
        {
          cine: "elevio",
          text: "Gata: marți la 17:00, măsurători pentru 4 ferestre și o ușă de balcon, albe, cu izolare fonică, pe strada Primăverii 21, Bacău. Primiți acum un SMS de confirmare.",
        },
      ],
      dupaApel:
        "Omul care merge la măsurători știe dinainte că pentru client contează zgomotul și poate veni cu mostrele de geam potrivite.",
    },
    ceFaceElevio: [
      "Preia cererile de ofertă cu numărul de ferestre și uși, tipul locuinței, etajul, culoarea și ce contează pentru client.",
      "Programează măsurătorile în calendar, în timp real, cu SMS de confirmare.",
      "Răspunde la întrebările despre profile, geamuri, termenul de execuție și garanție, din informațiile tale.",
      "Programează sau transmite cererile de reglaj și service de la clienții vechi.",
    ],
    exempluCalcul: {
      ipoteze: [
        "Firma ratează 5 apeluri pe săptămână în timpul montajelor, deci cam 20 pe lună.",
        "Presupunem că unul din 10 ar fi devenit o comandă de 8.000 lei.",
      ],
      rezultat: "2 comenzi × 8.000 lei = 16.000 lei pe lună în vânzări ratate.",
    },
    faq: [
      {
        q: "Poate da prețul pe metru pătrat la telefon?",
        a: "Doar dacă ai un preț orientativ pe care vrei să-l spună. De obicei e mai sigur să programeze măsurătorile, pentru că prețul final depinde de dimensiuni și de configurație.",
      },
      {
        q: "Poate răspunde la întrebări tehnice despre profile?",
        a: "La cele pe care i le dai: numărul de camere ale profilului, tipurile de geam, culorile, garanția. Pentru întrebări de detaliu notează și transmite sau transferă apelul la un consultant.",
      },
      {
        q: "Ce face cu un client nemulțumit de montaj?",
        a: "Notează reclamația cu toate detaliile și o transferă la tine sau ți-o transmite imediat. Nu promite reparații gratuite sau reduceri.",
      },
      {
        q: "Avem showroom. Poate programa vizite acolo?",
        a: "Da, ca pe orice programare din calendar: clientul alege ora, primește SMS de confirmare, iar tu vezi vizita în calendar.",
      },
      {
        q: "Cât durează să pornesc?",
        a: "Câteva zile. Ne dai produsele, zonele, programul și regulile, noi configurăm, iar tu testezi pe numărul tău.",
      },
    ],
    industriiInrudite: [
      "constructii-renovari",
      "reparatii-acoperisuri",
      "magazine-online",
    ],
  },
];

/** Toate paginile, în ordinea valurilor din plan. */
export const INDUSTRII: Industrie[] = [...VAL_1, ...VAL_2, ...VAL_3];

export function getIndustrie(slug: string): Industrie | undefined {
  return INDUSTRII.find((i) => i.slug === slug);
}

export function industriiPeCategorii(): {
  categorie: (typeof CATEGORII)[number];
  industrii: Industrie[];
}[] {
  return CATEGORII.map((categorie) => ({
    categorie,
    industrii: INDUSTRII.filter((i) => i.categorie === categorie.nume),
  })).filter((g) => g.industrii.length > 0);
}
