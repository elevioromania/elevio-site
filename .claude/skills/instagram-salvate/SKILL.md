---
name: instagram-salvate
description: Procesează postările salvate pe Instagram ale lui Dydy (Elevio) — descărcare, transcriere, clasificare pe categorii (SEO, marketing, vânzări, AI...), breakdown pe fiecare și transformarea celor de SEO în skill + plan de implementare pentru site. Folosește-l când utilizatorul vorbește de „salvatele de pe Instagram”, „reel-urile salvate”, „ce am salvat pe insta” sau vrea să actualizeze skill-ul/planul SEO din ele.
---

# Postările salvate de pe Instagram → cunoștințe + plan SEO

Tool-ul e în `tools/instagram-salvate/ig_salvate.py` (vezi `tools/instagram-salvate/README.md`).

## Ce produce

- `tools/instagram-salvate/date/postari/<cod>/` — brut, necomis: `meta.json`, `video_N.mp4`, `video_N.txt` (transcriere), cadre `.jpg`, `analiza.json`.
- `tools/instagram-salvate/rezultate/<categorie>/*.md` — breakdown pe fiecare postare importantă; `rezultate/INDEX.md`.
- `.claude/skills/seo-din-instagram/SKILL.md` — skill-ul SEO sintetizat din toate reel-urile de SEO.
- `tools/instagram-salvate/rezultate/PLAN-SEO.md` — taskurile concrete pentru site.

## Flux

1. **Login** — se face pe calculatorul utilizatorului (are nevoie de fereastră de browser):
   `python ig_salvate.py login`. Nu cere niciodată parola de Instagram în chat. Dacă trebuie rulat
   într-o sesiune cloud, alternativa e `python ig_salvate.py login --manual` (utilizatorul lipește
   singur cookie-ul `sessionid` în terminal) sau variabila de mediu `IG_SESSIONID`.
2. `python ig_salvate.py descarca` (incremental; `--limita 5` pentru test).
3. `python ig_salvate.py transcrie` (local, gratuit; `--whisper medium` pentru română mai bună).
4. Analiză — două variante:
   - **Cu cheie API** (`ANTHROPIC_API_KEY` sau `ant auth login`): `python ig_salvate.py analizeaza`, apoi `seo`.
   - **Fără cheie API — o faci tu, Claude Code:** pentru fiecare dosar din `date/postari/` care nu are
     `analiza.json`, citește `meta.json`, `video_*.txt` și imaginile/cadrele `.jpg` (cu Read), apoi scrie
     `analiza.json` exact după schema din `python ig_salvate.py schema` (categoriile valide sunt în
     `CATEGORII` din script). Lucrează pe loturi; pentru multe postări folosește subagenți în paralel,
     fiecare cu un lot de dosare. Apoi rulează `python ig_salvate.py randeaza`. Pentru pasul SEO, citește
     toate `analiza.json` cu `categorie: "seo"` + transcrierile lor și scrie tu cele două fișiere
     (skill + plan) urmând cerințele din `cmd_seo` din script.
5. Comite `rezultate/` și skill-ul SEO (niciodată `date/` — conține cookie-ul de sesiune și video-urile).

## Reguli

- Nu inventa unelte sau link-uri GitHub: doar ce apare în audio, pe ecran sau în descriere.
- Totul în română; numele uneltelor rămân originale.
- Meme/umor → `irelevant` (apar doar ca listă în INDEX, fără fișier).
- După ce planul SEO există, implementarea taskurilor de cod se face pe branch separat, task cu task, cu `npm run build` și `npm run lint` verzi.
