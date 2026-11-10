# Agenda iStoma pentru agentul vocal: pașii de configurare

Ghidul ăsta e pentru tine, David. Îl urmezi o dată pentru fiecare clinică nouă. Durează cam 30 de minute, din care 15 împreună cu recepția clinicii.

## Cum funcționează

1. **iStoma trimite singur programările fiecărui medic într-un Google Calendar.** E o funcție din iStoma (Setări > Utilizatori > medic > Calendarul google), nu are nevoie de cheia lor API.
2. **Site-ul Elevio citește calendarele** (prin adresa secretă iCal a fiecăruia), adaugă programul de lucru al medicului și calculează orele libere.
3. **Agentul din Autocalls are două tool-uri:**
   - `verifica_disponibilitate`: primește 2-3 ore libere, răsfirate, de propus pacientului;
   - `trimite_cerere_programare`: verifică ora încă o dată și trimite mail recepției.
4. **Recepționista trece programarea de mână în iStoma** și îl confirmă pacientului. Programarea apare apoi în Google Calendar, iar agentul nu o mai oferă.

Ce face sistemul ca să nu greșească:

- **Orele spuse unui pacient se țin 15 minute**, ca agentul să nu le dea și altui apelant în același timp.
- **Ora aleasă se ține până o trece recepția în iStoma** (cel mult 18 ore).
- **Ora se verifică încă o dată în calendar chiar înainte să plece mailul.** Dacă s-a ocupat între timp, agentul primește alte variante.
- **Clinica e închisă automat în zilele de sărbătoare legală** (1 Decembrie, Crăciun, Paște etc.). Se poate opri, pentru clinicile care lucrează atunci.
- **Agentul înțelege „mâine”, „joi”, „joia viitoare”, „12 noiembrie”.** Nu trebuie să calculeze el data.
- **Dacă un calendar nu se poate citi**, agentul nu propune ore la medicul respectiv. Ia totuși cererea și o trimite recepției. Tu primești un mail de alertă, cel mult unul pe oră.

---

## 1. La clinică, în iStoma (cu recepția)

Ai nevoie de un cont Google al clinicii (un Gmail, de exemplu `clinica.nume@gmail.com`). Dacă nu au unul, își fac.

Pentru **fiecare medic**, în iStoma:

1. **Setări > Utilizatori**, alegi medicul, tab-ul **Calendarul google**.
2. Bifezi **Sincronizare agendă**.
3. La **Cont Google** pui contul clinicii.
4. La **Calendar** apeși **Creează un calendar**. iStoma creează în contul Google un calendar cu numele medicului.

Apoi, o singură dată, în **Setări > Comportament iStoma** (secțiunea Google Calendar):

- bifezi **Ascunde programările anulate**, ca o programare anulată să nu apară ca ocupată;
- bifezi **Nu transmite informațiile de contact către Google**, **Nu transmite tipul pacientului**, **Nu transmite starea pacientului** și **Nu transmite observații programare**. Așa în Google ajung doar orele, aproape fără date despre pacienți (GDPR);
- bifezi **Nu se acceptă modificări din calendarul google**, ca nimic din Google să nu modifice agenda iStoma;
- la **Voi decide manual pentru fiecare calculator** bifezi **Acest calculator comunică cu calendarul google** **pe calculatorul de la recepție**, cel deschis toată ziua.

> Sincronizarea o face programul iStoma de pe calculator. Dacă e închis la toate calculatoarele, calendarul nu se mai actualizează. Agentul vede atunci agenda de la ultima sincronizare, iar recepția prinde eventualele suprapuneri când confirmă.

## 2. Adresa secretă a fiecărui calendar (în Google Calendar)

Intri pe [calendar.google.com](https://calendar.google.com) cu contul Google al clinicii. Pentru fiecare calendar creat de iStoma:

1. Roata din dreapta sus > **Setări**.
2. În stânga, sub **Setări pentru calendarele mele**, alegi calendarul medicului.
3. Derulezi la **Integrează calendarul** și copiezi **Adresa secretă în format iCal** (se termină în `basic.ics`).

Notezi adresele, câte una pentru fiecare medic. Sunt secrete: oricine are adresa vede calendarul. Nu le trimite pe WhatsApp sau pe mail.

## 3. Programul de lucru al medicilor

Îl iei din iStoma: **Setări > Utilizatori > medic > Program de lucru**. iStoma îl ține pe cabinete și pe săptămâni pare/impare. Pentru agentul vocal contează doar orele în care medicul are pacienți.

Îl scrii așa (1 = luni ... 7 = duminică):

```json
{"1": [["09:00","17:00"]], "3": [["14:00","21:00"]], "6": [["09:00","14:30"]]}
```

Cu pauză la prânz: `"2": [["09:00","13:00"], ["14:00","18:00"]]`.

Dacă programul diferă pe săptămâni pare și impare:

```json
{"para": {"2": [["14:00","21:00"]]}, "impara": {"1": [["09:00","15:00"]]}}
```

## 4. Adaugi clinica în baza de date

Pe calculatorul tău, în folderul site-ului:

```bash
node scripts/agenda-clinica-noua.mjs "Clinica Zâmbet" receptie@clinica-zambet.ro
```

Scriptul afișează:

- **cheia clinicii**: o salvezi în managerul de parole; o pui la pasul 5 în Autocalls;
- **SQL-ul** de rulat în Supabase (proiectul **Elevio**) > **SQL Editor**. Înlocuiești medicii-exemplu cu medicii reali: nume, specialitate, adresa iCal de la pasul 2 și programul de la pasul 3. Apoi apeși **Run**.

Setări pe clinică (au valori implicite bune; le schimbi în tabelul `agenda_clinici` doar dacă e nevoie):

| Coloană | Implicit | Ce înseamnă |
|---|---|---|
| `durata_minute` | 30 | Cât durează o programare propusă de agent |
| `pas_minute` | 30 | Din cât în cât încep orele propuse (09:00, 09:30...) |
| `preaviz_minute` | 120 | Cel mai devreme peste cât timp poate fi o programare |
| `zile_inainte` | 21 | Cât de departe în viitor caută |
| `inchis_de_sarbatori` | da | Nu propune ore în zilele de sărbătoare legală |
| `activa` | da | Oprești agenda clinicii fără să ștergi nimic |

## 5. Tool-urile în Autocalls

Pentru asistentul clinicii creezi două **mid-call tools** de tip **direct HTTP**, cu metoda **POST** și corp **JSON**. La amândouă pui în **Headers**:

```
x-agenda-cheie: <cheia clinicii de la pasul 4>
```

### `verifica_disponibilitate`

- **Endpoint:** `https://elevio-agency.ro/api/agenda/disponibilitate`
- **Descriere:** „Caută orele libere la clinică. Folosește-l înainte să propui orice oră pacientului. Întoarce 2-3 variante de propus și instrucțiuni.”
- **Static fields:** `call_id` = `{{call_id}}`
- **Parametri (toți opționali):**
  - `medic`: medicul cerut de pacient, cum l-a spus („doamna doctor Ionescu”) sau specialitatea („ortodont”). Gol dacă nu contează.
  - `data`: ziua dorită, cum a spus-o pacientul („mâine”, „joi”, „joia viitoare”, „12 noiembrie”). Gol dacă nu contează.
  - `interval`: `dimineata`, `dupa-amiaza` sau `oricand`.

### `trimite_cerere_programare`

- **Endpoint:** `https://elevio-agency.ro/api/agenda/programare`
- **Descriere:** „Trimite recepției cererea de programare după ce pacientul a ales o variantă și ai confirmat datele cu el. Se apelează o singură dată.”
- **Static fields:** `call_id` = `{{call_id}}`, `telefon_apelant` = `{{customer_phone}}`
- **Parametri:**
  - `nume` (obligatoriu): numele pacientului;
  - `telefon`: doar dacă pacientul vrea să fie sunat la alt număr decât cel de pe care sună;
  - `motiv`: motivul vizitei, pe scurt;
  - `medic`, `data`, `ora`: exact ca în varianta aleasă din `verifica_disponibilitate`. Goale dacă pacientul vrea doar să fie sunat;
  - `observatii`: orice altceva util recepției (preferințe de zi și oră, urgență, pacient nou).

### Ce adaugi în promptul asistentului

```
# Programări
- Nu inventa niciodată ore libere. Înainte să propui o oră, apelează verifica_disponibilitate.
- Propune variantele primite pe rând, cu ziua, data și ora, și întreabă care îi convine.
- Dacă nu îi convine niciuna, întreabă ce zi sau ce parte a zilei preferă și apelează din nou.
- După ce alege: confirmă numele, motivul și, dacă vrea, alt număr de telefon.
  Recitește-i pe scurt ora și medicul, apoi apelează trimite_cerere_programare o singură dată.
- Nu spune niciodată că programarea e confirmată. Spune că ai notat-o și că o colegă de la recepție
  îi confirmă în cel mai scurt timp.
- Dacă un tool îți răspunde cu un „mesaj”, urmează instrucțiunile din el.
- Apelează tool-urile fără să anunți că „verifici în sistem” de fiecare dată; spune cel mult o dată „o secundă”.
```

## 6. Testul de la final

1. Suni agentul și ceri o programare „mâine dimineață”. Agentul trebuie să-ți propună ore care sunt libere și în iStoma.
2. Alegi una. În câteva secunde, recepția trebuie să primească mailul „Programare de confirmat”.
3. Recepția trece programarea în iStoma. După 1-2 minute, suni din nou și ceri aceeași zi: ora aceea nu mai trebuie să apară.

## Când ceva nu merge

- **Ți-a venit mailul „Agenda ...: calendarul nu se poate citi”**: verifică în iStoma că sincronizarea e pornită pentru medicul respectiv. Apoi verifică dacă adresa iCal s-a schimbat (Google o schimbă dacă cineva apasă „Resetează”). Adresa nouă o pui în `agenda_medici.calendar_ics`.
- **Agentul oferă ore deja ocupate în iStoma**: calculatorul de la recepție nu sincronizează. Fie iStoma e închis, fie nu e bifat „Acest calculator comunică cu calendarul google”.
- **Mailurile către recepție nu ajung**: pleacă de pe contul Gmail al site-ului (`GMAIL_USER` și `GMAIL_APP_PASSWORD` în Netlify). În `agenda_rezervari`, coloana `email_trimis` arată dacă mailul a plecat, iar `eroare_email` arată de ce nu. Dacă a plecat, spune-le să caute și în Spam și să marcheze adresa ca sigură.
- **Toate cererile din baza de date**: tabelul `agenda_rezervari` din Supabase (`tip = 'cerere'`).
