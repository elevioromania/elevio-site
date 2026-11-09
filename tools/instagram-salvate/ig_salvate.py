#!/usr/bin/env python3
"""
ig_salvate.py — ia toate postările SALVATE de pe Instagram, le transcrie,
le clasifică (SEO / marketing / ... / irelevant), face breakdown pe fiecare
și transformă tot ce ține de SEO într-un skill + plan de implementare pentru site.

Pași (rulează-i în ordine sau pe toți cu `tot`):

  python ig_salvate.py login         # deschide browserul, te loghezi TU pe Instagram
  python ig_salvate.py descarca      # descarcă postările salvate (video, poze, descriere)
  python ig_salvate.py transcrie     # transcrie video-urile local (faster-whisper) + extrage cadre
  python ig_salvate.py analizeaza    # Claude: categorie + breakdown pentru fiecare postare
  python ig_salvate.py randeaza      # scrie folderele rezultate/<categorie>/*.md + INDEX
  python ig_salvate.py seo           # Claude: skill SEO + PLAN-SEO.md pentru site
  python ig_salvate.py tot           # descarca -> transcrie -> analizeaza -> randeaza -> seo

Parola de Instagram NU trece prin acest script: te loghezi în fereastra de
browser, iar scriptul păstrează doar cookie-ul de sesiune în date/sesiune.json.
"""
from __future__ import annotations

import argparse
import base64
import getpass
import json
import os
import random
import re
import subprocess
import sys
import time
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

try:  # consola Windows + diacritice
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
except Exception:
    pass

AICI = Path(__file__).resolve().parent
REPO = AICI.parent.parent
DATE = AICI / "date"                      # brut, NU se comite (video, cookie)
POSTARI = DATE / "postari"
SESIUNE = DATE / "sesiune.json"
REZULTATE = AICI / "rezultate"            # breakdown-uri pe categorii (se comit)
SKILL_SEO = REPO / ".claude" / "skills" / "seo-din-instagram" / "SKILL.md"
PLAN_SEO = REZULTATE / "PLAN-SEO.md"

MODEL = os.environ.get("IG_MODEL", "claude-opus-5-5")

# Categoriile = folderele din rezultate/. "irelevant" nu primește folder.
CATEGORII: dict[str, str] = {
    "seo": "SEO: Google, ranking, keyword research, backlinks, SEO tehnic, SEO local, AI SEO / GEO (apariție în ChatGPT/Perplexity), Google Business Profile, conținut pentru SEO, unelte și repo-uri GitHub pentru SEO",
    "marketing": "Marketing general: ads (Meta/Google/TikTok), social media, copywriting, branding, email, funnel-uri, content marketing, growth",
    "vanzari": "Vânzări: cold outreach, cold calling, închidere deal-uri, obiecții, pricing, oferte",
    "ai-automatizari": "AI și automatizări: unelte AI, agenți, prompturi, n8n/Make/Zapier, Claude/ChatGPT, voice AI, tool-uri no-code, repo-uri GitHub de AI",
    "web-design-dev": "Web design și dezvoltare: UI/UX, landing page-uri, Next.js, cod, hosting, CRO pe site",
    "business-idei": "Idei de business, antreprenoriat, strategie, mindset de business, studii de caz, idei de produse/servicii",
    "productivitate": "Productivitate, organizare, obiceiuri, unelte de lucru",
    "altele-utile": "Ceva util/educativ care nu intră în categoriile de mai sus",
    "irelevant": "Meme, umor, divertisment, muzică, viață personală, orice fără valoare practică pentru business",
}

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
IG_APP_ID = "936619743392459"  # app id-ul public al instagram.com (web)


# ───────────────────────────── utilitare ─────────────────────────────

def log(msg: str) -> None:
    print(msg, flush=True)


def citeste_json(p: Path, implicit=None):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return implicit


def scrie_json(p: Path, obj) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")


def slug(text: str, n: int = 50) -> str:
    t = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-zA-Z0-9]+", "-", t).strip("-").lower()
    return (t[:n].rstrip("-")) or "fara-titlu"


def pauza(a: float, b: float) -> None:
    time.sleep(random.uniform(a, b))


RECENTE = int(os.environ.get("IG_RECENTE", "0") or 0)  # setat din --recente


def toate_postarile() -> list[Path]:
    """Dosarele postărilor, de la cea mai recent salvată; doar primele RECENTE dacă e setat."""
    if not POSTARI.exists():
        return []
    dosare = [p for p in POSTARI.iterdir() if (p / "meta.json").exists()]
    dosare.sort(key=lambda p: (citeste_json(p / "meta.json", {}).get("ordine_salvare") or 10**9, p.name))
    return dosare[:RECENTE] if RECENTE else dosare


# ───────────────────────────── 1. login ─────────────────────────────

def cmd_login(args) -> None:
    DATE.mkdir(parents=True, exist_ok=True)
    if args.sessionid or args.manual:
        sid = args.sessionid or getpass.getpass("Lipește cookie-ul sessionid (nu se afișează): ").strip()
        cookies = {"sessionid": sid}
        m = re.match(r"(\d+)%3A", sid) or re.match(r"(\d+):", sid)
        if m:
            cookies["ds_user_id"] = m.group(1)
        scrie_json(SESIUNE, {"cookies": cookies, "salvat": datetime.now().isoformat()})
        log(f"Sesiune salvată în {SESIUNE}")
        verifica_sesiune()
        return

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("Lipsește Playwright: pip install playwright && python -m playwright install chromium")

    log("Se deschide un browser. Loghează-te pe Instagram (inclusiv 2FA dacă ai).")
    log("Fereastra se închide singură după ce ești logat. Ai 10 minute.")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        ctx = browser.new_context(user_agent=UA, locale="ro-RO")
        page = ctx.new_page()
        page.goto("https://www.instagram.com/accounts/login/")
        sfarsit = time.time() + 600
        cookies = {}
        while time.time() < sfarsit:
            cookies = {c["name"]: c["value"] for c in ctx.cookies("https://www.instagram.com")}
            if cookies.get("sessionid"):
                time.sleep(3)  # lasă IG să seteze și csrftoken etc.
                cookies = {c["name"]: c["value"] for c in ctx.cookies("https://www.instagram.com")}
                break
            time.sleep(1.5)
        browser.close()
    if not cookies.get("sessionid"):
        sys.exit("Nu am detectat logarea în 10 minute. Mai încearcă.")
    scrie_json(SESIUNE, {"cookies": cookies, "salvat": datetime.now().isoformat()})
    log(f"Logat. Sesiune salvată în {SESIUNE} (nu o trimite nimănui).")
    verifica_sesiune()


def sesiune_http():
    import requests

    data = citeste_json(SESIUNE)
    cookies = (data or {}).get("cookies") or {}
    if os.environ.get("IG_SESSIONID"):
        cookies["sessionid"] = os.environ["IG_SESSIONID"]
    if not cookies.get("sessionid"):
        sys.exit("Nu ești logat. Rulează întâi: python ig_salvate.py login")

    s = requests.Session()
    for k, v in cookies.items():
        s.cookies.set(k, v, domain=".instagram.com")
    if not cookies.get("csrftoken"):  # îl obținem de la instagram.com
        try:
            s.get("https://www.instagram.com/", headers={"User-Agent": UA}, timeout=30)
        except Exception:
            pass
    s.headers.update({
        "User-Agent": UA,
        "X-IG-App-ID": IG_APP_ID,
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": s.cookies.get("csrftoken", domain=".instagram.com") or s.cookies.get("csrftoken") or "",
        "Referer": "https://www.instagram.com/",
        "Accept": "*/*",
        "Accept-Language": "ro-RO,ro;q=0.9,en;q=0.8",
    })
    return s


def ig_get(s, url: str, params: dict | None = None) -> dict:
    for incercare in range(5):
        r = s.get(url, params=params, timeout=60)
        if r.status_code == 200:
            try:
                return r.json()
            except ValueError:
                sys.exit("Instagram a întors HTML în loc de JSON — sesiunea a expirat. Rulează din nou `login`.")
        if r.status_code in (401, 403) or "login_required" in r.text:
            sys.exit(f"Instagram cere logare din nou (HTTP {r.status_code}). Rulează `login`.")
        if r.status_code == 400 and "checkpoint" in r.text:
            sys.exit("Instagram cere o verificare de securitate. Deschide instagram.com în browser, confirmă, apoi rulează din nou `login`.")
        if r.status_code in (429, 500, 502, 503):
            asteapta = 60 * (incercare + 1)
            log(f"  Instagram limitează cererile (HTTP {r.status_code}); aștept {asteapta}s…")
            time.sleep(asteapta)
            continue
        sys.exit(f"Eroare Instagram HTTP {r.status_code}: {r.text[:300]}")
    sys.exit("Instagram a refuzat de prea multe ori. Mai încearcă peste o oră.")


def verifica_sesiune() -> None:
    s = sesiune_http()
    d = ig_get(s, "https://www.instagram.com/api/v1/feed/saved/posts/")
    n = len(d.get("items", []))
    log(f"Sesiune OK — prima pagină de salvate are {n} postări.")


# ───────────────────────────── 2. descărcare ─────────────────────────────

def _cea_mai_mare(versiuni: list[dict]) -> str | None:
    if not versiuni:
        return None
    return max(versiuni, key=lambda v: (v.get("width") or 0) * (v.get("height") or 0)).get("url")


def parseaza_media(m: dict) -> dict:
    """Transformă un obiect `media` din API-ul IG într-un meta.json simplu."""
    elemente = []
    surse = m.get("carousel_media") or [m]
    for it in surse:
        if it.get("video_versions"):
            elemente.append({"tip": "video", "url": _cea_mai_mare(it["video_versions"]),
                             "durata": it.get("video_duration")})
        else:
            cand = (it.get("image_versions2") or {}).get("candidates") or []
            if cand:
                elemente.append({"tip": "imagine", "url": _cea_mai_mare(cand)})
    caption = (m.get("caption") or {}).get("text") or ""
    user = m.get("user") or {}
    tip = {1: "imagine", 2: "video", 8: "carusel"}.get(m.get("media_type"), str(m.get("media_type")))
    if m.get("product_type") == "clips":
        tip = "reel"
    return {
        "cod": m.get("code"),
        "id": str(m.get("pk") or m.get("id")),
        "url": f"https://www.instagram.com/{'reel' if tip == 'reel' else 'p'}/{m.get('code')}/",
        "tip": tip,
        "autor": user.get("username"),
        "autor_nume": user.get("full_name"),
        "descriere": caption,
        "publicat": datetime.fromtimestamp(m.get("taken_at") or 0, tz=timezone.utc).isoformat(),
        "like_uri": m.get("like_count"),
        "elemente": elemente,
        "colectii": [],
    }


def descarca_fisier(s, url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    try:
        with s.get(url, stream=True, timeout=120, headers={"Accept": "*/*"}) as r:
            if r.status_code != 200:
                return False
            tmp = dest.with_suffix(dest.suffix + ".part")
            with open(tmp, "wb") as f:
                for bucata in r.iter_content(1 << 16):
                    f.write(bucata)
            tmp.replace(dest)
        return True
    except Exception as e:
        log(f"    ! nu am putut descărca {dest.name}: {e}")
        return False


def colectii(s) -> dict[str, list[str]]:
    """{cod_postare: [nume colecții]} — folosit ca indiciu la clasificare."""
    rez: dict[str, list[str]] = {}
    try:
        d = ig_get(s, "https://www.instagram.com/api/v1/collections/list/",
                   {"collection_types": '["MEDIA"]'})
    except SystemExit:
        return rez
    for c in d.get("items", []):
        nume, cid = c.get("collection_name"), c.get("collection_id")
        if not cid:
            continue
        max_id = None
        while True:
            params = {"max_id": max_id} if max_id else None
            p = ig_get(s, f"https://www.instagram.com/api/v1/feed/collection/{cid}/posts/", params)
            for it in p.get("items", []):
                cod = (it.get("media") or {}).get("code")
                if cod:
                    rez.setdefault(cod, []).append(nume)
            if not p.get("more_available") or not p.get("next_max_id"):
                break
            max_id = p["next_max_id"]
            pauza(1.5, 3)
    if rez:
        log(f"  Colecții găsite: {sorted({n for v in rez.values() for n in v})}")
    return rez


def cmd_descarca(args) -> None:
    s = sesiune_http()
    POSTARI.mkdir(parents=True, exist_ok=True)
    log("Citesc colecțiile de salvate…")
    col = colectii(s)

    log("Citesc lista de postări salvate…")
    max_id, total, noi = None, 0, 0
    while True:
        params = {"max_id": max_id} if max_id else None
        d = ig_get(s, "https://www.instagram.com/api/v1/feed/saved/posts/", params)
        for it in d.get("items", []):
            m = it.get("media") or {}
            if not m.get("code"):
                continue
            total += 1
            meta = parseaza_media(m)
            meta["colectii"] = col.get(meta["cod"], [])
            dosar = POSTARI / meta["cod"]
            exista = (dosar / "meta.json").exists()
            dosar.mkdir(parents=True, exist_ok=True)
            vechi = citeste_json(dosar / "meta.json", {})
            meta["ordine_salvare"] = total
            scrie_json(dosar / "meta.json", {**vechi, **meta})
            if not exista:
                noi += 1
            log(f"[{total}] {meta['cod']} @{meta['autor']} ({meta['tip']}){'' if exista else ' — nou'}")
            for i, el in enumerate(meta["elemente"][: args.max_elemente], 1):
                if not el.get("url"):
                    continue
                ext = "mp4" if el["tip"] == "video" else "jpg"
                if el["tip"] == "imagine" and any(e["tip"] == "video" for e in meta["elemente"]):
                    continue  # la caruselele cu video ne interesează video-urile
                descarca_fisier(s, el["url"], dosar / f"{el['tip']}_{i}.{ext}")
            pauza(0.8, 2.0)
            if args.limita and total >= args.limita:
                break
        if args.limita and total >= args.limita:
            break
        if not d.get("more_available") or not d.get("next_max_id"):
            break
        max_id = d["next_max_id"]
        pauza(2.5, 5.0)
    log(f"Gata: {total} postări salvate ({noi} noi) în {POSTARI}")


# ─────── varianta FĂRĂ RISC: exportul oficial + descărcare fără cont ───────

RE_LINK = re.compile(r"https?://(?:www\.)?instagram\.com/(p|reel|reels|tv)/([A-Za-z0-9_-]{5,})")


def parseaza_export_html(t: str) -> dict[str, dict]:
    """Din saved_posts.html / saved_collections.html: cod → autor, descriere, data salvării."""
    import html as h

    rez: dict[str, dict] = {}
    bucati = re.split(r'URL<div><a target="_blank" href="', t)
    colectie = None
    for b in bucati[1:]:
        m = RE_LINK.match(b)
        if not m:
            continue
        cap = re.search(r'>Caption</td><td[^>]*>(.*?)</td>', b, re.S)
        user = re.search(r'>Username</td><td[^>]*>(.*?)</td>', b, re.S)
        data = re.search(r'_a6-o">([A-Z][a-z]{2} \d{1,2}, \d{4}[^<]*)</div>', b)
        rez[m.group(2)] = {
            "descriere": h.unescape(re.sub(r"<[^>]+>", "", cap.group(1))).strip() if cap else "",
            "autor": h.unescape(user.group(1)).strip() if user else None,
            "salvat_la": data.group(1).strip() if data else None,
        }
    return rez


def cmd_importa(args) -> None:
    """Citește exportul oficial Instagram („Descarcă informațiile tale” → Elemente salvate)
    și creează câte un dosar pentru fiecare postare salvată. Zero risc: nu atinge contul."""
    import zipfile

    sursa = Path(args.cale).expanduser()
    texte: list[str] = []
    if sursa.is_dir():
        for f in sorted(sursa.rglob("*")):
            if f.suffix.lower() in (".json", ".html", ".txt"):
                texte.append(f.read_text(encoding="utf-8", errors="ignore"))
    elif sursa.suffix.lower() == ".zip":
        with zipfile.ZipFile(sursa) as z:
            for n in z.namelist():
                if n.lower().endswith((".json", ".html")) and ("saved" in n.lower() or "salvat" in n.lower() or args.tot_zipul):
                    texte.append(z.read(n).decode("utf-8", errors="ignore"))
    else:
        texte.append(sursa.read_text(encoding="utf-8", errors="ignore"))

    vazute: dict[str, str] = {}
    detalii: dict[str, dict] = {}
    for t in texte:
        detalii.update({k: v for k, v in parseaza_export_html(t).items() if k not in detalii})
        for tip, cod in RE_LINK.findall(t.replace("\\/", "/")):
            vazute.setdefault(cod, "reel" if tip.startswith("reel") else tip)
    if not vazute:
        sys.exit("N-am găsit niciun link de postare în export. Verifică dacă ai bifat „Elemente salvate”.")
    noi = 0
    for i, (cod, tip) in enumerate(vazute.items(), 1):
        dosar = POSTARI / cod
        d = detalii.get(cod, {})
        vechi = citeste_json(dosar / "meta.json", None)
        if vechi:  # completăm doar ce lipsește
            for k in ("autor", "descriere", "salvat_la"):
                if d.get(k) and not vechi.get(k):
                    vechi[k] = d[k]
            scrie_json(dosar / "meta.json", vechi)
            continue
        scrie_json(dosar / "meta.json", {
            "cod": cod, "url": f"https://www.instagram.com/{'reel' if tip == 'reel' else 'p'}/{cod}/",
            "tip": tip, "autor": d.get("autor"), "descriere": d.get("descriere", ""),
            "salvat_la": d.get("salvat_la"), "elemente": [], "colectii": d.get("colectii", []),
            "ordine_salvare": i, "sursa": "export-oficial",
        })
        noi += 1
    log(f"Import: {len(vazute)} postări salvate găsite în export ({noi} noi) → {POSTARI}")


def cmd_descarca_fara_cont(args) -> None:
    """Descarcă postările importate ca vizitator anonim (fără cookie) — contul tău nu e implicat."""
    try:
        import yt_dlp
    except ImportError:
        sys.exit("Lipsește yt-dlp: pip install yt-dlp")
    de_facut = [d for d in toate_postarile()
                if not citeste_json(d / "meta.json", {}).get("descarcat_anonim") and not list(d.glob("video_*.mp4"))
                and (citeste_json(d / "analiza.json", {}) or {}).get("categorie") != "irelevant"]
    if args.prioritate:  # ex. cele de SEO primele
        prim = [c.strip() for c in args.prioritate.split(",") if c.strip()]
        de_facut.sort(key=lambda d: prim.index(d.name) if d.name in prim else len(prim))
    if args.limita:
        de_facut = de_facut[: args.limita]
    log(f"Descarc anonim {len(de_facut)} postări (încet, cu pauze)…")
    esecuri_la_rand = 0
    for i, dosar in enumerate(de_facut, 1):
        meta = citeste_json(dosar / "meta.json", {})
        opt = {"outtmpl": str(dosar / "video_%(playlist_index|1)s.%(ext)s"), "format": "best[ext=mp4]/best",
               "quiet": True, "no_warnings": True, "noprogress": True, "retries": 2,
               "cookiefile": None, "merge_output_format": "mp4"}
        try:
            for incercare in range(3):
                try:
                    with yt_dlp.YoutubeDL(opt) as ydl:
                        info = ydl.extract_info(meta["url"], download=True)
                    break
                except Exception as e:
                    if "429" not in str(e) or incercare == 2:
                        raise
                    asteapta = 120 * (incercare + 1)
                    log(f"    Instagram zice „prea multe cereri” — aștept {asteapta}s…")
                    time.sleep(asteapta)
            prim = (info.get("entries") or [info])[0] if info else {}
            meta.update({
                "descriere": meta.get("descriere") or (info or {}).get("description") or prim.get("description") or "",
                "autor": meta.get("autor") or prim.get("channel") or prim.get("uploader_id"),
                "autor_nume": prim.get("uploader"),
                "descarcat_anonim": True,
            })
            scrie_json(dosar / "meta.json", meta)
            esecuri_la_rand = 0
            log(f"[{i}/{len(de_facut)}] {dosar.name} @{meta.get('autor')} ✓")
        except Exception as e:
            esecuri_la_rand += 1
            mesaj = str(e).splitlines()[0][:160]
            meta["eroare_anonim"] = mesaj
            scrie_json(dosar / "meta.json", meta)
            log(f"[{i}/{len(de_facut)}] {dosar.name} ✗ {mesaj}")
            if esecuri_la_rand >= 6:
                log("8 eșecuri la rând — Instagram blochează accesul anonim acum. Opresc; reia mai târziu.")
                break
        pauza(args.pauza_min, args.pauza_min * 2)
    ok = sum(1 for d in toate_postarile() if citeste_json(d / "meta.json", {}).get("descarcat_anonim"))
    log(f"Gata. Descărcate anonim până acum: {ok}. Postările doar-cu-poze nu se pot lua anonim (rămân cu link).")


# ───────────────────────────── 3. transcriere ─────────────────────────────

def ffmpeg_exe() -> str | None:
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        from shutil import which
        return which("ffmpeg")


def extrage_cadre(video: Path, n: int) -> list[Path]:
    """Câteva cadre din video — ca să prindem textul de pe ecran (nume de unelte, link-uri)."""
    ff = ffmpeg_exe()
    if not ff or n <= 0:
        return []
    dosar = video.parent
    existente = sorted(dosar.glob(f"{video.stem}_cadru_*.jpg"))
    if existente:
        return existente
    try:
        out = subprocess.run([ff, "-i", str(video)], capture_output=True, text=True, errors="ignore").stderr
        m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
        durata = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3)) if m else 30.0
    except Exception:
        durata = 30.0
    cadre = []
    for i in range(n):
        t = durata * (i + 0.5) / n
        dest = dosar / f"{video.stem}_cadru_{i + 1}.jpg"
        subprocess.run([ff, "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", str(video),
                        "-frames:v", "1", "-vf", "scale=720:-2", "-q:v", "4", str(dest)],
                       capture_output=True)
        if dest.exists():
            cadre.append(dest)
    return cadre


def audio_16k(video: Path):
    """Decodează audio-ul cu ffmpeg (16 kHz mono float32) — nu depindem de PyAV."""
    import numpy as np

    ff = ffmpeg_exe()
    if not ff:
        return str(video)  # lăsăm faster-whisper să se descurce singur
    r = subprocess.run([ff, "-nostdin", "-loglevel", "error", "-i", str(video), "-vn", "-ac", "1",
                        "-ar", "16000", "-f", "s16le", "-"], capture_output=True)
    if r.returncode != 0 or not r.stdout:
        raise RuntimeError("video fără pistă audio")
    return np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32) / 32768.0


def cmd_transcrie(args) -> None:
    from faster_whisper import WhisperModel

    log(f"Încarc modelul Whisper „{args.whisper}” (prima dată se descarcă)…")
    model = WhisperModel(args.whisper, device="auto", compute_type="int8")
    for dosar in toate_postarile():
        for video in sorted(dosar.glob("video_*.mp4")):
            extrage_cadre(video, args.cadre)
            dest = video.with_suffix(".txt")
            if dest.exists() and not args.refa:
                continue
            log(f"Transcriu {dosar.name}/{video.name}…")
            try:
                segmente, info = model.transcribe(audio_16k(video), vad_filter=True, beam_size=5)
                text = " ".join(seg.text.strip() for seg in segmente).strip()
                dest.write_text(text, encoding="utf-8")
                meta = citeste_json(dosar / "meta.json", {})
                meta["limba_audio"] = info.language
                scrie_json(dosar / "meta.json", meta)
            except Exception as e:  # ex: video fără pistă audio
                log(f"  ! {e}")
                dest.write_text("", encoding="utf-8")
    log("Transcriere gata.")


# ───────────────────────────── 4. analiză cu Claude ─────────────────────────────

from pydantic import BaseModel, Field  # noqa: E402

Categorie = Literal[tuple(CATEGORII)]  # type: ignore[valid-type]


class Resursa(BaseModel):
    nume: str = Field(description="Numele uneltei / repo-ului / site-ului / cărții")
    tip: Literal["github", "unealta", "site", "plugin", "carte-curs", "prompt", "altul"]
    link: str = Field(description="URL dacă e menționat sau evident (ex. github.com/owner/repo); altfel șir gol")
    la_ce_foloseste: str


class Analiza(BaseModel):
    categorie: Categorie  # type: ignore[valid-type]
    subcategorie: str = Field(description="Ex. pentru SEO: 'SEO tehnic', 'backlinks', 'AI SEO', 'SEO local', 'keyword research'")
    relevanta: int = Field(description="1 = inutil, 5 = foarte valoros / acționabil")
    titlu: str = Field(description="Titlu scurt, descriptiv, în română")
    rezumat: str = Field(description="3-5 propoziții, în română: ce spune, concret")
    idei_cheie: list[str]
    pasi_de_aplicat: list[str] = Field(description="Pași concreți, la imperativ, exact cum îi descrie autorul")
    resurse: list[Resursa] = Field(description="Toate uneltele, repo-urile GitHub, site-urile, prompturile menționate (în audio, pe ecran sau în descriere)")
    cifre_si_afirmatii: list[str] = Field(description="Cifre, rezultate, afirmații verificabile")
    aplicare_elevio: str = Field(description="Cum se aplică concret pentru Elevio (site + business); șir gol dacă nu se aplică")
    avertismente: str = Field(description="Ce e discutabil, depășit sau riscant (ex. tactici black-hat); șir gol dacă nimic")


CONTEXT_ELEVIO = (
    "Elevio (elevio.ro) este un recepționer vocal AI în limba română pentru firme mici din România "
    "(clinici, saloane, service-uri etc.): răspunde la telefon, face programări, preia lead-uri. "
    "Site-ul e făcut în Next.js (App Router), găzduit pe Netlify, pagini: acasă, prețuri, demo, despre, contact."
)

SISTEM_ANALIZA = f"""Analizezi postări salvate de pe Instagram ale fondatorului Elevio.
{CONTEXT_ELEVIO}

Primești: autorul, descrierea, colecția în care a fost salvată (dacă există), transcrierea
audio și cadre/imagini din postare. Textul de pe imagini contează la fel de mult ca audio-ul
(acolo apar des numele uneltelor și link-urile de GitHub).

Categorii posibile:
{chr(10).join(f'- {k}: {v}' for k, v in CATEGORII.items())}

Reguli:
- Alege o singură categorie. Dacă e meme/umor/divertisment fără valoare practică → "irelevant"
  (atunci restul câmpurilor pot fi scurte).
- Scrie totul în română, chiar dacă postarea e în engleză. Numele de unelte rămân cum sunt.
- Nu inventa resurse sau link-uri: pune doar ce apare efectiv; dacă un repo e doar numit,
  pune numele și lasă link gol, decât dacă e evident (ex. "github.com/owner/repo" pe ecran).
- La "pasi_de_aplicat" fii concret și fidel autorului, nu sfaturi generice."""


def _img_block(p: Path) -> dict:
    return {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg",
                                        "data": base64.b64encode(p.read_bytes()).decode()}}


def continut_postare(dosar: Path) -> list[dict]:
    meta = citeste_json(dosar / "meta.json", {})
    transcrieri = []
    for t in sorted(dosar.glob("video_*.txt")):
        txt = t.read_text(encoding="utf-8").strip()
        transcrieri.append(f"[{t.stem}] {txt or '(fără vorbire — doar muzică/sunet)'}")
    imagini = sorted(dosar.glob("imagine_*.jpg"))[:10] + sorted(dosar.glob("video_*_cadru_*.jpg"))[:8]
    text = (
        f"Postare: {meta.get('url')}\nTip: {meta.get('tip')}\n"
        f"Autor: @{meta.get('autor')} ({meta.get('autor_nume') or ''})\n"
        f"Colecții în care am salvat-o: {', '.join(meta.get('colectii') or []) or '—'}\n\n"
        f"DESCRIERE:\n{meta.get('descriere') or '—'}\n\n"
        f"TRANSCRIERE AUDIO:\n{chr(10).join(transcrieri) or '— (nu e video)'}\n\n"
        f"Urmează {len(imagini)} imagini/cadre din postare."
    )
    return [{"type": "text", "text": text}] + [_img_block(p) for p in imagini]


def client_claude():
    try:
        import anthropic
    except ImportError:
        sys.exit("Lipsește SDK-ul: pip install anthropic")
    return anthropic.Anthropic()  # ANTHROPIC_API_KEY sau profil `ant auth login`


def cmd_analizeaza(args) -> None:
    import anthropic

    client = client_claude()
    dosare = toate_postarile()
    if args.limita:
        dosare = dosare[: args.limita]
    for i, dosar in enumerate(dosare, 1):
        dest = dosar / "analiza.json"
        if dest.exists() and not args.refa:
            continue
        log(f"[{i}/{len(dosare)}] Analizez {dosar.name}…")
        try:
            r = client.beta.messages.parse(
                model=MODEL,
                max_tokens=16000,
                system=SISTEM_ANALIZA,
                output_config={"effort": args.effort},
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
                messages=[{"role": "user", "content": continut_postare(dosar)}],
                output_format=Analiza,
            )
        except anthropic.RateLimitError:
            log("  limită de rată — aștept 60s și reîncerc data viitoare")
            time.sleep(60)
            continue
        except anthropic.APIStatusError as e:
            log(f"  ! eroare API {e.status_code}: {e.message}")
            continue
        if r.stop_reason == "refusal" or r.parsed_output is None:
            log(f"  ! fără rezultat (stop_reason={r.stop_reason}) — sar peste")
            continue
        scrie_json(dest, r.parsed_output.model_dump())
        log(f"  → {r.parsed_output.categorie} · {r.parsed_output.titlu}")
    cmd_randeaza(args)


def cmd_schema(args) -> None:
    """Schema JSON pentru analiza.json — utilă când analiza o face Claude Code fără cheie API."""
    print(json.dumps(Analiza.model_json_schema(), ensure_ascii=False, indent=2))


# ───────────────────────────── 5. foldere + markdown ─────────────────────────────

def md_postare(meta: dict, a: dict, dosar: Path) -> str:
    L = [f"# {a['titlu']}", "",
         f"- **Postare:** {meta.get('url')}",
         f"- **Autor:** @{meta.get('autor')}",
         f"- **Categorie:** {a['categorie']} › {a.get('subcategorie') or '—'}",
         f"- **Relevanță:** {'★' * int(a.get('relevanta') or 0)}{'☆' * (5 - int(a.get('relevanta') or 0))}",
         "", "## Pe scurt", a.get("rezumat", ""), ""]
    if a.get("idei_cheie"):
        L += ["## Idei cheie", *[f"- {x}" for x in a["idei_cheie"]], ""]
    if a.get("pasi_de_aplicat"):
        L += ["## Pași de aplicat", *[f"{i}. {x}" for i, x in enumerate(a["pasi_de_aplicat"], 1)], ""]
    if a.get("resurse"):
        L += ["## Resurse menționate", "| Resursă | Tip | Link | La ce folosește |", "|---|---|---|---|"]
        L += [f"| {r['nume']} | {r['tip']} | {r.get('link') or '—'} | {r['la_ce_foloseste']} |" for r in a["resurse"]]
        L += [""]
    if a.get("cifre_si_afirmatii"):
        L += ["## Cifre și afirmații", *[f"- {x}" for x in a["cifre_si_afirmatii"]], ""]
    if a.get("aplicare_elevio"):
        L += ["## Cum aplicăm la Elevio", a["aplicare_elevio"], ""]
    if a.get("avertismente"):
        L += ["## ⚠️ Atenție", a["avertismente"], ""]
    transcr = "\n\n".join(t.read_text(encoding="utf-8") for t in sorted(dosar.glob("video_*.txt")))
    if transcr.strip():
        L += ["<details><summary>Transcriere completă</summary>", "", transcr.strip(), "", "</details>", ""]
    if meta.get("descriere"):
        L += ["<details><summary>Descrierea originală</summary>", "", meta["descriere"].strip(), "", "</details>", ""]
    return "\n".join(L)


def cmd_randeaza(args=None) -> None:
    pe_categorii: dict[str, list[tuple[dict, dict, str]]] = {}
    for dosar in toate_postarile():
        a = citeste_json(dosar / "analiza.json")
        if not a:
            continue
        meta = citeste_json(dosar / "meta.json", {})
        pe_categorii.setdefault(a["categorie"], []).append((meta, a, dosar.name))
        if a["categorie"] == "irelevant":
            continue
        dest = REZULTATE / a["categorie"] / f"{dosar.name}-{slug(a['titlu'])}.md"
        for vechi in REZULTATE.glob(f"*/{dosar.name}-*.md"):  # dacă și-a schimbat categoria/titlul
            if vechi != dest:
                vechi.unlink()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(md_postare(meta, a, dosar), encoding="utf-8")

    L = ["# Postări salvate de pe Instagram — index", "",
         f"Generat: {datetime.now():%Y-%m-%d %H:%M}", "",
         "| Categorie | Postări |", "|---|---|"]
    for cat in CATEGORII:
        if cat in pe_categorii:
            L.append(f"| {cat} | {len(pe_categorii[cat])} |")
    for cat in CATEGORII:
        lst = pe_categorii.get(cat)
        if not lst or cat == "irelevant":
            continue
        L += ["", f"## {cat}", ""]
        for meta, a, cod in sorted(lst, key=lambda x: -int(x[1].get("relevanta") or 0)):
            f = f"{cat}/{cod}-{slug(a['titlu'])}.md"
            L.append(f"- {'★' * int(a.get('relevanta') or 0)} [{a['titlu']}]({f}) — @{meta.get('autor')} · {a.get('subcategorie', '')}")
    if pe_categorii.get("irelevant"):
        L += ["", "## Irelevante (meme etc.)", "",
              *[f"- {m.get('url')} — @{m.get('autor')} · {a['titlu']}" for m, a, _ in pe_categorii["irelevant"]]]
    REZULTATE.mkdir(parents=True, exist_ok=True)
    (REZULTATE / "INDEX.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    log(f"Rezultate scrise în {REZULTATE} ({sum(len(v) for v in pe_categorii.values())} postări analizate).")


# ───────────────────────────── 6. SEO → skill + plan ─────────────────────────────

def context_site() -> str:
    parti = [CONTEXT_ELEVIO, "", "Rute existente (src/app):"]
    app = REPO / "src" / "app"
    for p in sorted(app.rglob("page.tsx")):
        parti.append(f"- {p.relative_to(REPO).as_posix()}")
    for f in ["src/app/layout.tsx", "src/app/(site)/layout.tsx", "src/app/robots.ts",
              "src/app/sitemap.ts", "src/app/(site)/page.tsx", "next.config.ts"]:
        p = REPO / f
        if p.exists():
            parti += ["", f"=== {f} ===", p.read_text(encoding="utf-8")]
    return "\n".join(parti)


def postari_seo() -> list[dict]:
    rez = []
    for dosar in toate_postarile():
        a = citeste_json(dosar / "analiza.json")
        if not a or a["categorie"] != "seo":
            continue
        meta = citeste_json(dosar / "meta.json", {})
        transcr = "\n".join(t.read_text(encoding="utf-8") for t in sorted(dosar.glob("video_*.txt")))
        rez.append({"url": meta.get("url"), "autor": meta.get("autor"), "analiza": a,
                    "descriere": meta.get("descriere"), "transcriere": transcr})
    return rez


def genereaza_text(client, sistem: str, prompt: str, effort: str) -> str:
    with client.beta.messages.stream(
        model=MODEL, max_tokens=64000, system=sistem,
        output_config={"effort": effort},
        betas=["server-side-fallback-2026-07-01"], fallbacks="default",
        messages=[{"role": "user", "content": prompt}],
    ) as st:
        msg = st.get_final_message()
    if msg.stop_reason == "refusal":
        sys.exit("Claude a refuzat cererea.")
    return "".join(b.text for b in msg.content if b.type == "text").strip()


def cmd_seo(args) -> None:
    postari = postari_seo()
    if not postari:
        sys.exit("Nu există postări analizate în categoria „seo”. Rulează întâi `analizeaza`.")
    client = client_claude()
    material = json.dumps(postari, ensure_ascii=False, indent=1)
    log(f"Sintetizez {len(postari)} postări SEO…")

    sistem = ("Ești un consultant SEO senior care construiește un sistem de lucru pentru Elevio. "
              "Lucrezi strict din materialul primit (postări Instagram salvate de fondator) plus "
              "bunele practici SEO actuale; marchezi clar ce e sfat din reel și ce e completarea ta. "
              "Elimini dublurile, semnalezi tacticile riscante/black-hat și sfaturile depășite. Scrii în română.")

    skill = genereaza_text(client, sistem, f"""Construiește fișierul SKILL.md al unui skill Claude Code numit "seo-din-instagram".

Format obligatoriu: începe cu frontmatter YAML:
---
name: seo-din-instagram
description: <o frază: când se folosește — orice lucru de SEO pentru elevio.ro: audit, pagini noi, conținut, SEO tehnic, AI SEO, backlinks, SEO local; bazat pe sfaturile din postările Instagram salvate>
---

Apoi conținutul skill-ului — instrucțiuni pe care Claude le urmează când face SEO pentru site:
1. Principiile consolidate (grupate pe: SEO tehnic, on-page, conținut, SEO local / Google Business Profile, AI SEO / GEO, backlinks/autoritate, măsurare).
2. Checklist-uri concrete, verificabile, adaptate la Next.js App Router (metadata API, sitemap.ts, robots.ts, JSON-LD).
3. Tabel cu TOATE uneltele și repo-urile GitHub menționate: nume, link, ce face, cum îl folosim la Elevio, sursa (link reel).
4. Fluxuri de lucru pas cu pas (ex. „cum scriu o pagină nouă optimizată”, „cum fac audit lunar”).
5. Ce NU facem (tactici riscante).
Fiecare regulă trimite la reel-ul sursă (link). Returnează DOAR conținutul fișierului.

MATERIAL (postări SEO analizate, JSON):
{material}""", args.effort)
    SKILL_SEO.parent.mkdir(parents=True, exist_ok=True)
    SKILL_SEO.write_text(skill + "\n", encoding="utf-8")
    log(f"Skill scris: {SKILL_SEO}")

    plan = genereaza_text(client, sistem, f"""Scrie PLAN-SEO.md: planul de implementare pentru site-ul Elevio,
bazat pe sfaturile din postări și pe starea actuală a site-ului (mai jos).

Structură:
- Rezumat (5 rânduri): unde suntem, ce câștigăm.
- Taskuri ca checklist Markdown (`- [ ]`), grupate pe priorități: P0 (săptămâna asta), P1 (luna asta), P2 (continuu).
  Fiecare task: ce anume, de ce (link reel sursă), fișierele din repo afectate (căi exacte, dacă e cod),
  criteriu de „gata”, efort estimat (S/M/L).
- Taskuri care nu sunt de cod (Google Business Profile, backlinks, directoare, conținut) — separat.
- Unelte/repo-uri de instalat sau încercat, cu comenzile de instalare dacă sunt cunoscute.
- Cum măsurăm (Search Console, ce KPI, la ce interval).
Nu propune taskuri pe care site-ul le are deja făcute. Returnează DOAR conținutul fișierului.

STAREA ACTUALĂ A SITE-ULUI:
{context_site()}

MATERIAL (postări SEO analizate, JSON):
{material}""", args.effort)
    REZULTATE.mkdir(parents=True, exist_ok=True)
    PLAN_SEO.write_text(plan + "\n", encoding="utf-8")
    log(f"Plan scris: {PLAN_SEO}")


# ───────────────────────────── main ─────────────────────────────

def cmd_tot(args) -> None:
    cmd_descarca(args)
    cmd_transcrie(args)
    cmd_analizeaza(args)
    cmd_seo(args)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("login", help="logare în browser (sau --manual pentru cookie sessionid)")
    p.add_argument("--manual", action="store_true", help="lipești cookie-ul sessionid în loc să deschidă browserul")
    p.add_argument("--sessionid", help=argparse.SUPPRESS)
    p.set_defaults(f=cmd_login)

    def comune(p, descarcare=False, transcriere=False, analiza=False, prioritate=False):
        if prioritate:
            p.add_argument("--prioritate", default="", help="coduri de postări (separate prin virgulă) de procesat primele")
        p.add_argument("--limita", type=int, default=0, help="procesează doar primele N postări (test)")
        p.add_argument("--recente", type=int, default=0, help="lucrează doar pe cele mai recent salvate N postări")
        p.add_argument("--refa", action="store_true", help="refă și ce e deja făcut")
        p.add_argument("--pauza-min", type=float, default=8.0, help="pauza minimă (secunde) între postări la descărcarea anonimă")
        if descarcare:
            p.add_argument("--max-elemente", type=int, default=10, help="max. elemente dintr-un carusel")
        if transcriere:
            p.add_argument("--whisper", default="small", help="model Whisper: tiny/base/small/medium/large-v3")
            p.add_argument("--cadre", type=int, default=4, help="câte cadre să extragă din fiecare video")
        if analiza:
            p.add_argument("--effort", default="medium", choices=["low", "medium", "high", "xhigh", "max"])

    for nume, f, kw in [
        ("descarca", cmd_descarca, dict(descarcare=True)),
        ("descarca-fara-cont", cmd_descarca_fara_cont, dict(prioritate=True)),
        ("transcrie", cmd_transcrie, dict(transcriere=True)),
        ("analizeaza", cmd_analizeaza, dict(analiza=True)),
        ("randeaza", cmd_randeaza, {}),
        ("schema", cmd_schema, {}),
        ("seo", cmd_seo, dict(analiza=True)),
        ("tot", cmd_tot, dict(descarcare=True, transcriere=True, analiza=True)),
    ]:
        p = sub.add_parser(nume)
        comune(p, **kw)
        p.set_defaults(f=f)
        if nume == "seo":
            p.set_defaults(effort="high")  # sinteza merită mai multă gândire

    p = sub.add_parser("importa", help="importă exportul oficial Instagram (zip/folder/json) — fără risc")
    p.add_argument("cale")
    p.add_argument("--tot-zipul", action="store_true", help="caută link-uri în tot zip-ul, nu doar în fișierele „saved”")
    p.set_defaults(f=cmd_importa)

    args = ap.parse_args()
    global RECENTE
    if getattr(args, "recente", 0):
        RECENTE = args.recente
    args.f(args)


if __name__ == "__main__":
    main()
