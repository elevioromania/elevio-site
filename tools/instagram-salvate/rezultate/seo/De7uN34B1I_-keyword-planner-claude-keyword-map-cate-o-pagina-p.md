# Keyword Planner + Claude → keyword map → câte o pagină pe fiecare căutare reală

- **Postare:** https://www.instagram.com/reel/De7uN34B1I_/
- **Autor:** @kenvanvorhis
- **Categorie:** seo › Keyword research + structura site-ului
- **Relevanță:** ★★★★★

## Pe scurt
Pentru o firmă nouă (închirieri de mașini exotice): Claude are acces la Google Ads Keyword Planner și testează 100.000 de cuvinte cheie, face o hartă doar cu cele care au volum real, propune o structură de pagini care le acoperă pe toate (șabloane CMS cu câmpuri pentru cuvinte cheie), adaugă schema markup și scrie copy pe fiecare secțiune. Autorul spune că apare deja în ChatGPT, Gemini, Copilot și Meta AI.

## Idei cheie
- Structura site-ului pornește din keyword map, nu invers
- Șabloane de pagină repetabile pentru fiecare grup de cuvinte cheie
- Schema markup ajută AI-ul să citească site-ul

## Pași de aplicat
1. Fă un cont Google Ads (gratuit) ca să ai acces la Keyword Planner
2. Extrage volumele pentru toate variantele de cuvinte cheie
3. Fă harta: cuvânt cheie → pagină
4. Construiește paginile din șabloane (la noi: rute Next.js generate dintr-un fișier de date)
5. Adaugă schema pe fiecare pagină

## Resurse menționate
| Resursă | Tip | Link | La ce folosește |
|---|---|---|---|
| Google Ads Keyword Planner | unealta | https://ads.google.com/home/tools/keyword-planner/ | Volume reale de căutare |
| Webflow CMS | unealta | https://webflow.com | Șabloane de pagină (la noi: Next.js) |

## Cifre și afirmații
- „100.000 de cuvinte cheie testate”

## Cum aplicăm la Elevio
Exact abordarea pentru paginile de nișă Elevio: Keyword Planner pe RO pentru toate variantele (agent vocal, recepționer AI, robot telefonic...), apoi rute generate din `src/lib/nise.ts`.

## ⚠️ Atenție
„Copy încărcat cu cuvinte cheie” poate deveni keyword stuffing; textul trebuie să rămână natural.

<details><summary>Transcriere completă</summary>

Here's how I use Claude to build a website that will rank number one on Google. I created a Google Ads account and gave Claude access to the keyword planner. I then had it test out 100,000 keywords to see what people are searching for when they rent exotic cars. I then had it make a keyword map of all the search terms that had real volume. I had Claude apply that map to my website and create a page structure that targets all those keywords. I used Webflow's CMS feature to create collections tied to page templates that implement that structure. I created custom fields for each page template to better structure how keywords are displayed on the page. I also added Schema markup to make it really easy for AIs to read my website. And for the last hour and a half, Claude has been writing keyword-loaded copy onto every section of my website using the keyword map I mentioned earlier. Now, we're not even close to done, but we're already showing up on ChatGBT for certain keywords. And Google Gemini and Microsoft Co-Pilot and even Meta's new AI Muse. If you wanna learn how to use AI to out-compete in any industry, drop a follow to watch how I build my exotic rental car company with it day by day.

</details>

<details><summary>Descrierea originală</summary>

I’m building an exotic rental car company, Prometheus Exotics, from the ground up using entirely AI. I’m documenting the build day by day.

</details>
