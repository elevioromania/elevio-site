# Instagram salvate → breakdown pe categorii + skill SEO

Ia toate postările tale **salvate** de pe Instagram, le transcrie, le clasifică
(SEO, marketing, vânzări, AI & automatizări, web, business, productivitate, altele utile, **irelevant** = meme),
face un breakdown pentru fiecare și transformă tot ce e despre SEO într-un **skill pentru Claude Code** și
un **plan de taskuri** pentru site.

## Instalare (o singură dată, pe calculatorul tău)

Ai nevoie de Python 3.10+.

```bash
cd tools/instagram-salvate
python -m venv .venv
# Windows:  .venv\Scripts\activate      macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
python -m playwright install chromium
```

Pentru pașii cu Claude (`analizeaza`, `seo`) ai nevoie de o cheie API Anthropic:
Windows `set ANTHROPIC_API_KEY=...` / macOS-Linux `export ANTHROPIC_API_KEY=...`.
**Fără cheie?** Rulează doar `login`, `descarca`, `transcrie`, apoi cere-i lui Claude Code să facă
analiza (skill-ul `instagram-salvate` îi explică exact cum).

## Folosire

```bash
python ig_salvate.py login            # se deschide un browser: te loghezi TU pe Instagram (cu 2FA)
python ig_salvate.py descarca --limita 5   # test pe 5 postări
python ig_salvate.py transcrie
python ig_salvate.py analizeaza
python ig_salvate.py seo

python ig_salvate.py tot              # tot lanțul, pe toate postările
```

Totul e incremental: dacă mai salvezi reel-uri, rulezi din nou `tot` și procesează doar ce e nou.

| Opțiune | Ce face |
|---|---|
| `--limita N` | doar primele N postări (pentru test) |
| `--whisper medium` | transcriere mai bună pe română (mai lentă). Implicit `small` |
| `--effort high` | analiză mai atentă (mai scumpă) |
| `--refa` | refă și ce e deja procesat |
| `IG_MODEL=...` | alt model Claude (implicit `claude-opus-5-5`) |

## Ce iese

```
rezultate/
  INDEX.md                 ← toate postările, pe categorii, sortate după relevanță
  seo/…md                  ← un breakdown pe postare: rezumat, idei, pași, unelte/GitHub, cum aplicăm la Elevio, transcriere
  marketing/…md
  ai-automatizari/…md
  …
  PLAN-SEO.md              ← taskuri P0/P1/P2 pentru site, cu fișierele afectate
../../.claude/skills/seo-din-instagram/SKILL.md   ← skill-ul SEO pe care Claude Code îl folosește automat
date/                      ← brut (video, poze, transcrieri, cookie) — NU se comite
```

## Siguranță și limite

- Parola nu trece prin script. Se păstrează doar cookie-ul de sesiune în `date/sesiune.json` —
  echivalent cu a fi logat; nu-l trimite nimănui. Ca să-l anulezi: Instagram → Setări → Activitate de logare → deconectează sesiunea.
- Scriptul citește doar salvatele tale, încet (pauze între cereri), ca un browser obișnuit.
  Totuși, automatizarea nu e oficial permisă de Instagram — rulează-l rar (ex. o dată pe săptămână).
- Dacă Instagram cere verificare („checkpoint”), deschide instagram.com în browser, confirmă, apoi `login` din nou.
- Cost estimativ cu Claude Opus 5.5: câțiva cenți pe postare (≈ 3–8 USD la 100 de postări, depinde de câte cadre/imagini are fiecare).
