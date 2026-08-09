# Elevio — site

Recepționer vocal AI în română. Site Next.js (App Router, TypeScript, Tailwind v4).

## Rulare locală

```bash
npm install
npm run dev
```

Deschide `http://localhost:3000`.

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează:

```
GMAIL_USER=elevioromania@gmail.com
GMAIL_APP_PASSWORD=<app password Gmail, nu parola normală de cont>
```

Folosite de [`src/lib/mailer.ts`](src/lib/mailer.ts) pentru trimiterea de email-uri (notificare lead + mostră audio) la trimiterea formularului de demo (`/demo`, `/contact`).

Opțional: pune un fișier audio la `public/audio/elevio-demo.mp3` — dacă există, e atașat automat la email-ul trimis lead-ului. Dacă lipsește, email-ul se trimite oricum, fără atașament.

## Structură

- `src/app/` — pagini (App Router): `/` (acasă), `/preturi`, `/demo`, `/despre`, `/contact`
- `src/app/api/lead/route.ts` — endpoint POST care salvează lead-ul (`data/leads.json`, local, negarantat pe deploy serverless — vezi mai jos) și trimite cele 2 email-uri
- `src/components/` — componente UI partajate
- `src/lib/` — helpers server-side (`leads.ts`, `mailer.ts`, `autocalls.ts`)

## Deploy

Aplicația are un endpoint server (`/api/lead`) care trimite email-uri — are nevoie de un host care rulează Node.js, nu de hosting static. Deployat pe **Netlify** (repo-ul conectat direct la GitHub, fără subfolder — Base directory = rădăcina repo-ului). Variabilele `GMAIL_USER` și `GMAIL_APP_PASSWORD` sunt setate ca environment variables în dashboard-ul Netlify. Domeniul cumpărat separat (CyberFolks) se leagă din Netlify → Domain management, schimbând DNS-ul (A/CNAME) conform instrucțiunilor afișate acolo.

Notă: `src/lib/leads.ts` scrie lead-urile într-un fișier JSON local (`data/leads.json`). Pe hosting serverless (Netlify etc.) filesystem-ul nu e persistent între request-uri — lead-urile tot ajung pe email (funcționează garantat), dar `leads.json` nu se păstrează. Dacă vreți și o listă persistentă de lead-uri, înlocuiți `saveLead` cu o bază de date reală (ex: o tabelă Postgres/Supabase) înainte de a conta pe el în producție.

## Assistant Autocalls

Există un assistant outbound „Elevio - Demo Call (RO)" (id 18765) creat în contul Autocalls, neconectat momentan la site (formularul trimite email, nu declanșează apel automat — decizie explicită a clientului). Poate fi refolosit manual dacă se decide reactivarea apelului automat.
