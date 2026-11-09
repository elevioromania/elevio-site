# Promptul open-source „SEO autopilot” care urcă site-ul pe prima pagină

- **Postare:** https://www.instagram.com/reel/Deu0eKalKi1/
- **Autor:** @nocodealex
- **Categorie:** seo › Automatizare SEO cu Claude Code
- **Relevanță:** ★★★★★

## Pe scurt
Un prompt (skill) open-source rulează zilnic în Claude Code pe repo-ul site-ului: verifică fiecare pagină din sitemap și repară link-uri rupte, titluri lipsă, redirect-uri și noindex; săptămânal ia căutările unde ești pe pagina 2, citește top 3 și rescrie pagina; întreabă ChatGPT, Perplexity și AI Overviews 25 de întrebări de cumpărător. Completezi 5 rânduri (site, produs, conversie, concurenți, PR/merge) și își ține notițele într-un folder seo/ în repo.

## Idei cheie
- Munca zilnică a unei agenții SEO poate rula ca prompt pe repo
- Starea se ține în fișiere: context, keyword map, backlog, log
- Pagina 2 → pagina 1 e cel mai rapid câștig
- Ai nevoie de codul site-ului în repo și ideal de Search Console conectat

## Pași de aplicat
1. Instalează: npx skills add Illyism/seo-skills
2. Completează cele 5 rânduri: site, produs, conversie, concurenți, mod de livrare
3. Rulează în repo-ul site-ului; prima rulare creează seo/ și repară top 3 probleme
4. Programează rularea zilnică
5. Conectează Search Console pentru date reale

## Resurse menționate
| Resursă | Tip | Link | La ce folosește |
|---|---|---|---|
| Illyism/seo-skills (seo-autopilot) | github | https://github.com/Illyism/seo-skills | Skill-uri SEO pentru Claude Code: autopilot, titluri, refresh de articole, backlinks |
| LinkDR | unealta | https://linkdr.com | Backlinks (opțional, plătit) |
| AI SEO Tracker | unealta | https://aiseotracker.com | Urmărește aparițiile în răspunsurile AI (opțional, plătit) |

## Cifre și afirmații
- Postarea originală a trecut de 2 milioane de vizualizări
- Înlocuiește o agenție de ~2.000$/lună (afirmația autorului)

## Cum aplicăm la Elevio
Se potrivește perfect: site-ul Elevio e în repo, în Next.js. Preluăm structura seo/ (context.md, keyword-map.csv, backlog.md, log.md, ai-prompts.md) și fluxul zilnic/săptămânal/lunar în skill-ul nostru seo-din-instagram, adaptat pe română.

## ⚠️ Atenție
Fără Search Console conectat lucrează pe ghicite. Skill-ul spune „merge când trece build-ul”; la noi rămânem pe PR cu review.

<details><summary>Transcriere completă</summary>

Someone open sourced the Claude prompt they use to push websites onto Google's first page. And the post hit 2 million views because it does what a $2,000 agency does. So every day, Claude checks every page on your site and fixes what's broken. Then, it finds the searches where you sit on page 2 and rewrites your page to Climb. So you don't need an SEO expert because it all runs free inside Claude. For the link, comment Climb.

</details>

<details><summary>Descrierea originală</summary>

Someone open-sourced the Claude prompt they use to push websites onto Google's first page, and the post passed 2 million views. Follow so the DM lands 📩

👇 READ BELOW for what's inside:

1. Every day, Claude requests every page in your sitemap and fixes broken links, missing titles, wrong redirects and stray noindex tags.

2. Every week, it takes the searches where you rank on page two, reads the top three results, and rewrites your page to beat them.

3. It also asks ChatGPT, Perplexity and Google's AI answers 25 buyer questions to see whether they mention you.

4. You fill in five lines (your site, product, goal, competitors, and whether it opens a PR or merges), and it keeps its notes in a seo folder in your repo.

Why it matters: this is the daily work an SEO agency bills for, run by your own Claude.

The catch: it needs your website's code in a repo, works best with Google Search Console connected, and the extra backlink tools it suggests are paid and optional.

For the link, comment "CLIMB"

#claudeai #claudecode #claude #claudetips

</details>
