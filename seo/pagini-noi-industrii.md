# Pagini noi: industrii

Paginile pe domenii din `seo/PLAN-30-ZILE.md`, secțiunea 2.2. Codul: `src/lib/industrii.ts` (datele), `src/app/(site)/industrii/` (paginile), `src/components/industrii/` (componentele).

**Ce mai trebuie legat** (fișiere pe care nu le-am atins, ca să nu intrăm în conflict cu alte modificări):
- `src/app/sitemap.ts`: cele 25 de URL-uri de mai jos (hub + 24 de pagini).
- Navigația: link spre `/industrii` în `Header` și/sau `Footer`; eventual link din `Verticals` (homepage) spre paginile pe domenii.
- `/agent-vocal-ai`: paginile trimit deja spre ea din CTA. Până apare pagina, linkul dă 404.

Fiecare pagină are: `title`, `description`, `alternates.canonical`, `openGraph`, un singur H1, JSON-LD `FAQPage` + `BreadcrumbList` + `Service` (`serviceType` „Recepționer vocal AI pentru …”, `provider` Elevio AI, `areaServed` RO). Hubul are `BreadcrumbList` + `ItemList`. Slug-urile necunoscute dau 404 (`dynamicParams = false`).

## Hub

| URL | Title | Description | Interogarea principală |
|---|---|---|---|
| https://elevio-agency.ro/industrii | Agent vocal AI pe industrii: magazine, meserii, clinici | Elevio AI, recepționer vocal AI în română, 24/7, configurat pe domeniul tău: magazine online, meserii, clinici, saloane, service-uri auto și altele. | agent vocal AI pe industrii |

## Valul 1

| URL | Categorie | Title | Description | Interogarea principală |
|---|---|---|---|---|
| https://elevio-agency.ro/industrii/magazine-online | Comerț | Agent vocal AI pentru magazin online, în română, 24/7 | Agent vocal AI pentru magazinul tău online: preia comenzi la telefon și răspunde despre livrare, plată și retur, 24/7, în română. De la 150€/lună + TVA. | agent vocal AI magazin online |
| https://elevio-agency.ro/industrii/reparatii-acoperisuri | Meserii & casă | Robot telefonic pentru firme de acoperișuri, 24/7, în română | Robot telefonic pentru firma ta de acoperișuri: preia cereri de ofertă, programează evaluări și îți transferă infiltrațiile urgente, 24/7, în română. | robot telefonic firmă acoperișuri |
| https://elevio-agency.ro/industrii/instalatori | Meserii & casă | Robot telefonic pentru instalatori: urgențe și programări | Robot telefonic pentru instalatori: urgențele (țeavă spartă la 23:00) ajung la tine în câteva secunde, iar lucrările se programează în calendar, 24/7. | robot telefonic instalator |
| https://elevio-agency.ro/industrii/electricieni | Meserii & casă | Agent vocal AI pentru electricieni: urgențe și programări | Agent vocal AI pentru electricieni: programează intervenții și oferte în calendar, iar apelurile periculoase ajung la tine în câteva secunde. 24/7, în română. | agent vocal AI electrician |
| https://elevio-agency.ro/industrii/centrale-termice-climatizare | Meserii & casă | Programări revizie centrală prin telefon, 24/7 \| Elevio AI | Programări la revizia centralei și la montajul de aer condiționat, preluate la telefon 24/7. Defectele urgente ajung la tine în câteva secunde. | programări revizie centrală telefon |
| https://elevio-agency.ro/industrii/cabinete-stomatologice | Sănătate | Recepționer AI pentru cabinet stomatologic, 24/7, în română | Recepționer AI pentru cabinetul stomatologic: programează pacienții în calendar, răspunde despre prețuri și transferă urgențele dentare. 24/7, în română. | recepționer AI cabinet stomatologic |
| https://elevio-agency.ro/industrii/saloane-frizerii | Beauty & wellness | Recepționer AI pentru salon și frizerie: programări 24/7 | Recepționer AI pentru salonul sau frizeria ta: programări pe stilist și serviciu, cu durata corectă, direct în calendar și cu SMS de confirmare. 24/7. | recepționer AI salon |
| https://elevio-agency.ro/industrii/service-auto | Auto | Robot telefonic pentru service auto: programări, ITP, roți | Robot telefonic pentru service auto: programează revizii, ITP și schimburi de anvelope, notează mașina și problema și transferă urgențele. 24/7, în română. | robot telefonic service auto |

## Valul 2

| URL | Categorie | Title | Description | Interogarea principală |
|---|---|---|---|---|
| https://elevio-agency.ro/industrii/clinici-medicale | Sănătate | Recepționer AI pentru clinici medicale: programări 24/7 | Recepționer AI pentru clinica ta: programări pe medic și specialitate, răspunsuri despre analize și decontare. Fără sfaturi medicale. 24/7, în română. | recepționer AI clinică |
| https://elevio-agency.ro/industrii/clinici-veterinare | Sănătate | Programări la veterinar prin telefon, 24/7 \| Elevio AI | Programări la clinica veterinară, preluate la telefon 24/7: vaccinări, consultații, sterilizări. Urgențele ajung la medicul de gardă în câteva secunde. | programări veterinar telefon |
| https://elevio-agency.ro/industrii/kinetoterapie | Sănătate | Programări kinetoterapie prin telefon, 24/7 \| Elevio AI | Programări la kinetoterapie, preluate la telefon 24/7: evaluări inițiale, ședințe și întrebări despre abonamente. Terapeutul nu mai iese din sală să răspundă. | programări kinetoterapie |
| https://elevio-agency.ro/industrii/clinici-estetice | Beauty & wellness | Programări clinică estetică prin telefon, 24/7 \| Elevio AI | Programări pentru clinica estetică sau de dermatologie, preluate la telefon 24/7: consultații, proceduri, prețuri de pornire. Fără promisiuni de rezultat. | programări clinică estetică |
| https://elevio-agency.ro/industrii/restaurante | HoReCa & turism | Rezervări restaurant prin telefon, automat, 24/7 \| Elevio AI | Rezervări la restaurant preluate automat la telefon, 24/7: număr de persoane, oră, cereri speciale, SMS de confirmare. Ospătarii rămân la mese. | rezervări restaurant telefon automat |
| https://elevio-agency.ro/industrii/hoteluri-pensiuni | HoReCa & turism | Recepție virtuală pentru pensiuni și hoteluri, 24/7 | Recepție virtuală pentru pensiunea sau hotelul tău: răspunde despre camere, prețuri și check-in și preia cererile de rezervare la telefon, 24/7, în română. | recepție virtuală pensiune |
| https://elevio-agency.ro/industrii/imobiliare | Servicii profesionale | Agent vocal AI pentru imobiliare: lead-uri și vizionări | Agent vocal AI pentru agenții imobiliare: răspunde la apelurile de pe anunțuri, află bugetul și zona și programează vizionări în calendar, 24/7, în română. | agent vocal AI imobiliare |
| https://elevio-agency.ro/industrii/curatenie-mutari | Meserii & casă | Programări pentru firme de curățenie și mutări \| Elevio AI | Programări pentru firma ta de curățenie sau mutări, preluate la telefon 24/7: suprafață, adresă, etaj, data dorită, totul notat pentru ofertă. | programări firmă curățenie |
| https://elevio-agency.ro/industrii/constructii-renovari | Meserii & casă | Robot telefonic pentru firme de construcții și renovări | Robot telefonic pentru firma ta de construcții: preia cererile de ofertă cu suprafața, localitatea și termenul și programează evaluarea, 24/7, în română. | robot telefonic firmă construcții |

## Valul 3

| URL | Categorie | Title | Description | Interogarea principală |
|---|---|---|---|---|
| https://elevio-agency.ro/industrii/avocati-notari | Servicii profesionale | Recepționer virtual pentru cabinet de avocatură și notariat | Recepționer virtual pentru cabinetul de avocatură sau biroul notarial: programează consultații, filtrează cazurile și nu dă sfaturi juridice. 24/7. | recepționer virtual cabinet avocatură |
| https://elevio-agency.ro/industrii/contabilitate | Servicii profesionale | Asistent telefonic pentru firme de contabilitate, 24/7 | Asistent telefonic pentru firma ta de contabilitate: răspunde la întrebările care se repetă, programează clienții noi și notează cererile pentru contabil. | asistent telefonic firmă contabilitate |
| https://elevio-agency.ro/industrii/scoli-soferi | Auto | Programări școală de șoferi prin telefon, 24/7 \| Elevio AI | Programări pentru școala de șoferi, preluate la telefon 24/7: înscrieri, prețuri, acte necesare și ore de condus. Instructorii nu mai răspund de la volan. | programări școală de șoferi |
| https://elevio-agency.ro/industrii/sali-fitness | Beauty & wellness | Recepție telefonică pentru sală de fitness, 24/7 \| Elevio AI | Recepție telefonică pentru sala ta de fitness: răspunde despre abonamente, program și clase și programează vizitele de probă și ședințele cu antrenorul. | recepție telefonică sală fitness |
| https://elevio-agency.ro/industrii/rent-a-car | Auto | Rezervări rent a car prin telefon, 24/7 \| Elevio AI | Rezervări rent a car preluate la telefon 24/7: perioadă, loc de predare, categorie de mașină, condiții. Clienții cu probleme pe drum ajung la tine imediat. | rezervări rent a car telefon |
| https://elevio-agency.ro/industrii/asigurari-credite | Servicii profesionale | Agent vocal AI pentru asigurări și credite, 24/7, în română | Agent vocal AI pentru asigurări și credite: află ce îl interesează pe client și programează discuția cu consultantul. Nu dă oferte și nu promite aprobări. | agent vocal AI asigurări |
| https://elevio-agency.ro/industrii/tamplarie-pvc | Meserii & casă | Robot telefonic pentru firme de termopane și tâmplărie PVC | Robot telefonic pentru firma ta de termopane: preia cererile de ofertă cu numărul de ferestre și localitatea și programează măsurătorile, 24/7, în română. | robot telefonic firmă termopane |

## Grupare în hub

- **Comerț**: `/industrii/magazine-online`
- **Meserii & casă**: `/industrii/reparatii-acoperisuri`, `/industrii/instalatori`, `/industrii/electricieni`, `/industrii/centrale-termice-climatizare`, `/industrii/curatenie-mutari`, `/industrii/constructii-renovari`, `/industrii/tamplarie-pvc`
- **Sănătate**: `/industrii/cabinete-stomatologice`, `/industrii/clinici-medicale`, `/industrii/clinici-veterinare`, `/industrii/kinetoterapie`
- **Beauty & wellness**: `/industrii/saloane-frizerii`, `/industrii/clinici-estetice`, `/industrii/sali-fitness`
- **Auto**: `/industrii/service-auto`, `/industrii/scoli-soferi`, `/industrii/rent-a-car`
- **HoReCa & turism**: `/industrii/restaurante`, `/industrii/hoteluri-pensiuni`
- **Servicii profesionale**: `/industrii/imobiliare`, `/industrii/avocati-notari`, `/industrii/contabilitate`, `/industrii/asigurari-credite`

## Intrări gata de pus în `src/app/sitemap.ts`

```ts
{ url: `${BASE_URL}/industrii`, lastModified, changeFrequency: "monthly", priority: 0.8 },
...INDUSTRII.map((i) => ({
  url: `${BASE_URL}/industrii/${i.slug}`,
  lastModified,
  changeFrequency: "monthly" as const,
  priority: i.val === 1 ? 0.8 : 0.7,
})),
```

(cu `import { INDUSTRII } from "@/lib/industrii";`)

## De verificat înainte de publicare
- Prețurile, numele și adresele din conversațiile-exemplu sunt ilustrative și marcate „Exemplu” pe pagină.
- Calculele de cost sunt marcate „Exemplu ilustrativ”; cifrele sunt presupuneri, nu medii de piață.
- Magazine online: pagina spune explicit că Elevio AI **nu** vede statusul comenzilor și **nu** are integrare cu Shopify, WooCommerce sau Gomag.
- Hoteluri, rent-a-car: fără integrare cu Booking, channel managere sau programe de flotă; Elevio AI preia cererea, echipa confirmă. La limbi străine, pagina trimite la demo și la prețuri, fără să promită engleză.
- Sănătate, juridic, contabilitate, asigurări: fără sfaturi medicale, juridice, fiscale sau financiare; urgențele și întrebările de fond se transferă.
