# Platforma echipei Elevio: pașii de configurare

Ghidul ăsta e pentru tine, David. Nu trebuie să fii programator. Urmezi pașii în ordine, o singură dată. Durează cam 30-45 de minute.

Platforma stă pe site, la adresa **elevio-agency.ro/echipa**. Nu apare în meniu, nu apare în Google și are un singur link discret, „Echipa”, jos în pagina „Despre noi”.

Totul e gratuit: hostingul rămâne pe Netlify, iar baza de date și conturile stau pe **Supabase** (planul Free).

---

## Pe scurt: ce faci

1. Creezi proiectul Supabase.
2. Rulezi cele 4 fișiere SQL (creează tabelele și regulile de securitate).
3. Publici cele 2 funcții de server și setezi codul de invitație.
4. Oprești înscrierea publică din Supabase.
5. Setezi adresele site-ului în Supabase.
6. Pui 2 chei în Netlify.
7. Publici branch-ul `platforma-vanzari` pe site.
8. Îți faci cont și te faci admin.

---

## 1. Creezi proiectul Supabase

1. Intră pe [supabase.com](https://supabase.com) și fă-ți cont (merge cu contul de GitHub sau cu e-mailul).
2. Apasă **New project**.
3. Completează:
   - **Name:** `elevio-echipa`
   - **Database Password:** apasă „Generate a password” și salvează parola undeva sigur (în managerul de parole). Nu o pui nicăieri în site.
   - **Region:** `Central EU (Frankfurt)`, ca datele să stea în Uniunea Europeană.
   - **Plan:** Free.
4. Apasă **Create new project** și așteaptă 1-2 minute.

## 2. Rulezi fișierele SQL

Fișierele sunt în repo, în folderul `supabase/migrations`. Le rulezi **în ordinea asta**, câte unul:

1. `20261014000001_schema.sql` (tabelele)
2. `20261014000002_functii.sql` (funcțiile și automatizările)
3. `20261014000003_rls.sql` (regulile de securitate: cine ce vede)
4. `20261014000004_date_initiale.sql` (sumele implicite ale bonusurilor)

Pentru fiecare:

1. În Supabase, în meniul din stânga, intră la **SQL Editor**.
2. Apasă **New query**.
3. Deschide fișierul pe GitHub (în branch-ul `platforma-vanzari`), apasă butonul „Copy raw file” și lipește tot textul în editor.
4. Apasă **Run**. Trebuie să apară „Success. No rows returned”.

Dacă apare o eroare, nu trece mai departe. Trimite-mi captura de ecran.

## 3. Publici funcțiile de server și setezi codul de invitație

Sunt două funcții mici, în `supabase/functions`:

- `inscriere`: verifică codul de invitație și creează contul vânzătorului;
- `admin-utilizatori`: dezactivează sau reactivează un cont.

### 3.1 Codul de invitație (secret)

1. În Supabase, intră la **Edge Functions**, apoi la **Secrets**.
2. Adaugă un secret nou:
   - **Name:** `INVITE_CODE`
   - **Value:** `Elevio20`
3. Apasă **Save**.

Codul stă doar aici. Nu e în site și nu e în GitHub.

### 3.2 Funcția `inscriere`

1. Tot la **Edge Functions**, apasă **Deploy a new function**, apoi **Via Editor**.
2. Numele funcției: exact `inscriere`.
3. Șterge codul de exemplu și lipește tot conținutul fișierului `supabase/functions/inscriere/index.ts`.
4. Apasă **Deploy function**.
5. După publicare, intră în funcție, la **Details** (sau **Settings**), și **dezactivează „Enforce JWT verification”** (Verify JWT). Salvează. E necesar pentru că cine se înscrie nu are încă un cont. Funcția verifică singură codul.

### 3.3 Funcția `admin-utilizatori`

La fel ca mai sus, cu numele exact `admin-utilizatori` și conținutul fișierului `supabase/functions/admin-utilizatori/index.ts`. Și aici dezactivezi „Enforce JWT verification”: funcția verifică singură că cel care o apelează e admin.

> Varianta pentru programatori, din terminal, cu Supabase CLI:
> `supabase functions deploy inscriere --no-verify-jwt` și `supabase functions deploy admin-utilizatori --no-verify-jwt`, apoi `supabase secrets set INVITE_CODE=Elevio20`.

## 4. Oprești înscrierea publică

Fără pasul ăsta, cineva ar putea să-și facă cont direct prin Supabase, ocolind codul.

1. În Supabase: **Authentication**, apoi **Sign In / Providers** (în unele versiuni: **Providers** sau **Settings**).
2. Dezactivează **Allow new users to sign up**.
3. Salvează.

Înscrierea cu cod merge în continuare, pentru că funcția `inscriere` creează conturile pe server.

## 5. Setezi adresele site-ului

Ca linkul de „Am uitat parola” să ducă înapoi pe site:

1. **Authentication**, apoi **URL Configuration**.
2. **Site URL:** `https://elevio-agency.ro`
3. La **Redirect URLs**, adaugă:
   - `https://elevio-agency.ro/echipa/parola-noua`
   - `https://*--elevio-agency.netlify.app/**` (pentru testele pe deploy preview; înlocuiește `elevio-agency` cu numele site-ului tău din Netlify, dacă e altul)
4. Salvează.

## 6. Pui cheile în Netlify

1. În Supabase: **Project Settings**, apoi **API** (sau **API Keys**). Copiază:
   - **Project URL** (arată ca `https://abcdefgh.supabase.co`);
   - cheia **anon public** (sau „publishable key”). E o cheie publică prin design: securitatea vine din regulile din baza de date.
2. **Nu copia** cheia `service_role` (sau „secret key”). Ea nu se pune niciodată în Netlify sau în site.
3. În Netlify: site-ul tău, apoi **Site configuration**, **Environment variables**, **Add a variable**. Adaugă:

| Nume | Valoare |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL de la Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cheia anon public |
| `NEXT_PUBLIC_CALENDAR_URL` | linkul calendarului tău (opțional, vezi mai jos) |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | linkul grupului de WhatsApp al echipei (opțional) |
| `NEXT_PUBLIC_DISCORD_URL` | linkul serverului de Discord (opțional) |

**Calendarul:** pune linkul public de rezervare din Cal.com (de exemplu `https://cal.com/numele-tau/intalnire`). Apare încorporat în pagina „Programează cu David”. Unele calendare Google nu se pot încorpora în alte site-uri; atunci rămâne butonul „Deschide calendarul într-o fereastră nouă”, care merge mereu.

După ce schimbi o variabilă în Netlify, ea se aplică abia la următorul deploy.

## 7. Publici platforma pe site

Codul e pe branch-ul `platforma-vanzari`, separat de site-ul live.

1. **Test înainte (recomandat):** pe GitHub, deschide un Pull Request din `platforma-vanzari` în `main`. Netlify face automat un **deploy preview** (o copie de test a site-ului, cu link separat). Verifici acolo platforma, fără să atingi site-ul live.
2. Când totul e în regulă, apeși **Merge** pe Pull Request. Netlify publică site-ul cu platforma inclusă.

Site-ul public rămâne exact cum era. Singura schimbare vizibilă e cuvântul mic „Echipa”, jos în pagina „Despre noi”.

## 8. Îți faci cont și te faci admin

1. Intră pe `https://elevio-agency.ro/echipa/inscriere`.
2. Completează datele tale și codul `Elevio20`.
3. În Supabase, **SQL Editor**, **New query**, lipește comanda de mai jos (cu e-mailul tău) și apasă **Run**:

```sql
update public.profiles
set rol = 'admin', titlu = 'Fondator'
where email = 'elevioromania@gmail.com';
```

4. Reîncarcă platforma. În meniu apare **Admin**.

Pentru trainer (omul cu experiență în B2B), după ce își face cont, schimbi rolul din **Admin, Utilizatori**, în „Trainer”.

---

## Lucruri pe care le faci des

### Schimbi codul de invitație

Supabase, **Edge Functions**, **Secrets**, editezi `INVITE_CODE` și salvezi. Noul cod merge imediat. Conturile existente nu sunt afectate.

### Imporți lead-uri din CSV

1. Platforma, **Admin**, **Import CSV**.
2. Alegi fișierul. Formatul recomandat, pe prima linie:

```
afacere,nisa,oras,adresa,telefon_afacere,site,google_maps,decident_nume,decident_functie,decident_telefon,decident_email,note
```

Un exemplu complet e în `exemplu-import-leaduri.csv`. Dacă fișierul are alte nume de coloane, le potrivești manual pe ecran.

3. Alegi vânzătorul (sau „Nealocat”).
4. Apeși **Verifică duplicatele**. Lead-urile care există deja (același telefon sau același nume plus oraș) sunt arătate și nu se importă.
5. Apeși **Importă**.

Nișa se recunoaște și din cuvinte ca „dentist”, „coafor”, „pensiune”, „service”. Ce nu se recunoaște intră la „Altele”.

### Realoci lead-uri

**Admin, Toate lead-urile**: bifezi lead-urile (sau „Alege toate” după ce filtrezi), alegi vânzătorul la „Mută la...” și apeși **Realocă**. Mutarea apare în istoricul fiecărui lead.

### Dezactivezi un cont

**Admin, Utilizatori**, butonul **Dezactivează**. Omul nu mai poate intra și nu mai vede nimic. Lead-urile lui rămân și le poți realoca. Butonul **Reactivează** îl readuce.

### Marchezi rezultatul unei întâlniri

**Admin, Întâlniri predate**: alegi rezultatul. La „Client închis” completezi pachetul și prețul lunar. Comisionul vânzătorului se calculează automat (taxa de instalare setată la el, plus 50% din prima lună).

### Actualizezi ghidul de vânzări

Textul ghidului stă în fișiere Markdown, în folderul `content/echipa`, câte un fișier pe secțiune (`01-bine-ai-venit.md`, `02-ce-este-elevio.md` etc.).

- **Modifici un text:** deschizi fișierul și schimbi textul. Cel mai simplu: îi spui lui Claude Code ce vrei schimbat.
- **Reguli de scriere:**
  - `> **Tu:** „...”` devine o replică într-un card cu bară albastră;
  - `> _[indicație]_` devine o indicație scenică, gri și italic;
  - `#### Titlu` devine un subtitlu;
  - tabelele Markdown devin carduri pe telefon.
- **Adaugi o secțiune nouă** (de exemplu scripturi pentru LinkedIn): creezi un fișier nou, de exemplu `21-scripturi-linkedin.md`, care începe așa:

```
---
numar: 21
parte: 3
titlu: Scripturi pentru LinkedIn
---
```

Dacă vrei o parte nouă (Partea 3), adaugi și `content/echipa/parti/partea-3.md` cu `parte: 3` și `titlu: ...`. Nu e nevoie de cod nou.

- Obiecțiile (secțiunea 16) și întrebările frecvente (secțiunea 17) apar automat și în paginile separate „Obiecții” și „Întrebări frecvente”. Păstrează formatul: fiecare obiecție sub un titlu `####`, întrebările în tabel.

Modificările apar pe site după următorul deploy.

### Schimbi numere, linkuri, nișe sau culori

Toate stau într-un singur fișier: `src/echipa/config.ts` (numărul de demo, WhatsApp-ul tău, nișele cu exemplele lor, statusurile cu culorile, obiecțiile, insignele, parametrii calculatorului). Dacă vrei un număr de demo separat pentru hoteluri, îl adaugi la `DEMO_NUMERE_PE_NISA`.

---

## Limitele planurilor gratuite

- **Supabase pune proiectul pe pauză după aproximativ o săptămână fără activitate.** Dacă echipa nu folosește platforma 7 zile, platforma nu mai merge până o repornești: intri în Supabase, pe proiect, și apeși **Restore project**. Datele nu se pierd. Cât timp vânzătorii intră zilnic, nu se întâmplă.
- **Supabase Free:** 500 MB de bază de date (ajunge pentru zeci de mii de lead-uri) și 50.000 de utilizatori activi pe lună.
- **E-mailurile de resetare a parolei** sunt trimise de Supabase, cu o limită mică pe oră. Pentru o echipă de 20 de oameni e suficient. Dacă cineva nu primește e-mailul, mai încearcă peste o oră.
- **Netlify Free funcționează pe credite lunare.** Fiecare deploy în producție (fiecare merge în `main`) consumă credite. Strânge mai multe modificări și publică-le odată. Pentru teste folosește deploy preview (Pull Request), care nu atinge site-ul live.
- Paginile platformei rulează pe server la fiecare deschidere (ca să verifice cine e logat). Pentru 20 de oameni, consumul e mic.

---

## Securitate, pe scurt

- Fiecare vânzător vede **doar lead-urile lui**. Regula e în baza de date (Row Level Security), nu doar în interfață: nici prin apeluri directe la API nu poate vedea datele altuia.
- Un cont dezactivat nu vede nimic.
- Vânzătorul nu își poate schimba singur rolul, titlul, comisionul sau nivelul.
- Verificarea de duplicate răspunde doar „există” sau „nu există”, fără să spună al cui e lead-ul.
- Codul de invitație și cheia `service_role` stau doar în Supabase, niciodată în site sau în GitHub.
- Platforma are `noindex` (nu apare în Google) și nu folosește trackere.

## Teste

În `supabase/tests` e un test al regulilor de securitate. Rulează pe un Postgres local, nu pe proiectul tău. Instrucțiunile sunt la începutul fișierului `test_rls.sql`.
