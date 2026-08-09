# Elevio — site

Recepționer vocal AI în română. Site Next.js (App Router, TypeScript, Tailwind v4) — cod în [`elevio/`](elevio/).

## Rulare locală

```bash
cd elevio
npm install
npm run dev
```

Deschide `http://localhost:3000`.

## Variabile de mediu

Copiază `elevio/.env.example` în `elevio/.env.local` și completează:

```
GMAIL_USER=elevioromania@gmail.com
GMAIL_APP_PASSWORD=<app password Gmail, nu parola normală de cont>
```

Folosite de [`elevio/src/lib/mailer.ts`](elevio/src/lib/mailer.ts) pentru trimiterea de email-uri (notificare lead + mostră audio) la trimiterea formularului de demo (`/demo`, `/contact`).

Opțional: pune un fișier audio la `elevio/public/audio/elevio-demo.mp3` — dacă există, e atașat automat la email-ul trimis lead-ului. Dacă lipsește, email-ul se trimite oricum, fără atașament.

## Structură

- `elevio/src/app/` — pagini (App Router): `/` (acasă), `/preturi`, `/demo`, `/despre`, `/contact`
- `elevio/src/app/api/lead/route.ts` — endpoint POST care salvează lead-ul (`elevio/data/leads.json`, local, negarantat pe deploy serverless — vezi mai jos) și trimite cele 2 email-uri
- `elevio/src/components/` — componente UI partajate
- `elevio/src/lib/` — helpers server-side (`leads.ts`, `mailer.ts`, `autocalls.ts`)

## Deploy

Aplicația are un endpoint server (`/api/lead`) care trimite email-uri — are nevoie de un host care rulează Node.js, nu de hosting static. Recomandat: **Vercel** (detectează automat Next.js, zero configurare) — conectezi repo-ul de GitHub, adaugi `GMAIL_USER` și `GMAIL_APP_PASSWORD` ca environment variables în dashboard, apoi legi domeniul cumpărat (CyberFolks) schimbând DNS-ul (A/CNAME) către Vercel, conform instrucțiunilor din dashboard-ul Vercel.

Notă: `elevio/src/lib/leads.ts` scrie lead-urile într-un fișier JSON local (`data/leads.json`). Pe hosting serverless (Vercel etc.) filesystem-ul nu e persistent între request-uri — lead-urile tot ajung pe email (funcționează garantat), dar `leads.json` nu se păstrează. Dacă vreți și o listă persistentă de lead-uri, înlocuiți `saveLead` cu o bază de date reală (ex: o tabelă Postgres/Supabase) înainte de a conta pe el în producție.

## Assistant Autocalls

Există un assistant outbound „Elevio - Demo Call (RO)" (id 18765) creat în contul Autocalls, neconectat momentan la site (formularul trimite email, nu declanșează apel automat — decizie explicită a clientului). Poate fi refolosit manual dacă se decide reactivarea apelului automat.
