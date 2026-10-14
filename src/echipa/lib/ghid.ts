// Ghidul de vânzări: citește fișierele Markdown din content/echipa și le randează în HTML.
// Rulează doar pe server.

import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";

const DIR = path.join(process.cwd(), "content", "echipa");

export type Sectiune = {
  slug: string;
  numar: number;
  parte: number;
  titlu: string;
  html: string;
  text: string;
};

export type Parte = {
  numar: number;
  titlu: string;
  html: string;
};

export type ElementGhid = {
  id: string;
  titlu: string;
  html: string;
  text: string;
  categorie?: string;
};

// ---------------------------------------------------------------------------
// Utilitare
// ---------------------------------------------------------------------------

export function slugify(s: string) {
  return s
    .replace(/[șş]/gi, "s")
    .replace(/[țţ]/gi, "t")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function faraMarkdown(md: string) {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[>#|\-\s]+/gm, "")
    .replace(/[*_|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function frontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {} as Record<string, string>, corp: raw };
  const meta: Record<string, string> = {};
  for (const linie of m[1].split("\n")) {
    const i = linie.indexOf(":");
    if (i > 0) meta[linie.slice(0, i).trim()] = linie.slice(i + 1).trim();
  }
  return { meta, corp: m[2] };
}

function textSimplu(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

// ---------------------------------------------------------------------------
// Randarea Markdown
// ---------------------------------------------------------------------------

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }: Tokens.Heading) {
      const continut = this.parser.parseInline(tokens);
      // Titlul secțiunii e afișat de pagină; „####” din ghid devine subtitlu (h2).
      const nivel = Math.min(Math.max(depth - 2, 2), 4);
      return `<h${nivel} id="${slugify(textSimplu(continut))}">${continut}</h${nivel}>\n`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      const continut = this.parser.parseInline(tokens);
      if (continut.startsWith("<strong>Tu:</strong>")) {
        return `<p class="replica"><span class="tu">Tu:</span>${continut.slice("<strong>Tu:</strong>".length)}</p>\n`;
      }
      if (continut.startsWith("<em>[")) {
        return `<p class="regie">${continut}</p>\n`;
      }
      return `<p>${continut}</p>\n`;
    },
    blockquote({ tokens }: Tokens.Blockquote) {
      let continut = this.parser.parse(tokens);
      // Prima linie complet îngroșată (de ex. „Ideea cea mai importantă...”) devine titlul casetei.
      continut = continut.replace(/^<p><strong>(?!Tu:)([^<]*)<\/strong><\/p>/, '<p class="caseta-titlu">$1</p>');
      return `<blockquote>${continut}</blockquote>\n`;
    },
    table(token: Tokens.Table) {
      const etichete = token.header.map((c) => textSimplu(this.parser.parseInline(c.tokens)));
      const cap = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
      const randuri = token.rows
        .map(
          (rand) =>
            `<tr>${rand
              .map((c, i) => `<td data-label="${etichete[i] ?? ""}">${this.parser.parseInline(c.tokens)}</td>`)
              .join("")}</tr>`,
        )
        .join("\n");
      return `<div class="tabel"><table><thead><tr>${cap}</tr></thead><tbody>${randuri}</tbody></table></div>\n`;
    },
    link({ href, tokens }: Tokens.Link) {
      const continut = this.parser.parseInline(tokens);
      const extern = /^https?:\/\//.test(href);
      return extern
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${continut}</a>`
        : `<a href="${href}">${continut}</a>`;
    },
  },
});

// Linkurile simple (https://...) din Markdown devin automat clickabile prin gfm.
export function randeaza(md: string) {
  return marked.parse(md, { async: false }) as string;
}

// ---------------------------------------------------------------------------
// Citirea fișierelor
// ---------------------------------------------------------------------------

let cacheSectiuni: Sectiune[] | null = null;

export function sectiuni(): Sectiune[] {
  if (cacheSectiuni && process.env.NODE_ENV === "production") return cacheSectiuni;
  const fisiere = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();
  const rezultat = fisiere.map((f) => {
    const { meta, corp } = frontmatter(fs.readFileSync(path.join(DIR, f), "utf8"));
    const slug = f.replace(/\.md$/, "").replace(/^\d+-/, "");
    return {
      slug,
      numar: Number(meta.numar) || 0,
      parte: Number(meta.parte) || 1,
      titlu: meta.titlu || slug,
      html: randeaza(corp),
      text: faraMarkdown(corp),
    };
  });
  rezultat.sort((a, b) => a.numar - b.numar);
  cacheSectiuni = rezultat;
  return rezultat;
}

export function sectiune(slug: string) {
  return sectiuni().find((s) => s.slug === slug) ?? null;
}

export function parti(): Parte[] {
  const dir = path.join(DIR, "parti");
  const fisiere = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
  const lista = fisiere.map((f) => {
    const { meta, corp } = frontmatter(fs.readFileSync(path.join(dir, f), "utf8"));
    return { numar: Number(meta.parte) || 1, titlu: meta.titlu || "", html: corp.trim() ? randeaza(corp) : "" };
  });
  // O parte fără fișier propriu (de exemplu una nouă) primește un titlu simplu.
  for (const s of sectiuni()) {
    if (!lista.some((p) => p.numar === s.parte)) lista.push({ numar: s.parte, titlu: "", html: "" });
  }
  return lista.sort((a, b) => a.numar - b.numar);
}

// ---------------------------------------------------------------------------
// Obiecțiile și întrebările frecvente, ca liste separate
// ---------------------------------------------------------------------------

function corpSectiune(slugIncepe: string) {
  const fisier = fs.readdirSync(DIR).find((f) => f.replace(/^\d+-/, "").startsWith(slugIncepe));
  if (!fisier) return "";
  return frontmatter(fs.readFileSync(path.join(DIR, fisier), "utf8")).corp;
}

// Împarte o secțiune după titlurile „####”.
function blocuri(md: string) {
  const parti = md.split(/^#### (.+)$/m);
  const intro = parti[0].trim();
  const lista: { titlu: string; corp: string }[] = [];
  for (let i = 1; i < parti.length; i += 2) lista.push({ titlu: parti[i].trim(), corp: parti[i + 1].trim() });
  return { intro, lista };
}

export function obiectii(): { intro: string; lista: ElementGhid[] } {
  const { intro, lista } = blocuri(corpSectiune("obiectii"));
  return {
    intro: intro ? randeaza(intro) : "",
    lista: lista.map((b) => ({
      id: slugify(b.titlu),
      titlu: b.titlu,
      html: randeaza(b.corp),
      text: faraMarkdown(b.titlu + " " + b.corp),
    })),
  };
}

function categorieIntrebare(intrebare: string) {
  const t = intrebare.toLowerCase();
  if (/gdpr|date|înregistr|ștergerea|uniunea|medicale|acord|agentul de la început|renunțăm/.test(t)) return "GDPR și date";
  if (/costă|preț|garanț/.test(t)) return "Preț și garanție";
  if (/cine e|clienți aveți/.test(t)) return "Despre Elevio";
  return "Produsul";
}

export function intrebari(): { lista: ElementGhid[]; categorii: string[]; notaGdpr: string } {
  const md = corpSectiune("intrebari-frecvente");
  const { intro, lista: subsectiuni } = blocuri(md);
  const rezultat: ElementGhid[] = [];

  // Rândurile tabelului: | Întrebarea | Răspunsul |
  const randuri = intro.split("\n").filter((l) => l.startsWith("|"));
  for (const rand of randuri.slice(2)) {
    const celule = rand.split("|").slice(1, -1).map((c) => c.trim());
    if (celule.length < 2) continue;
    const [intrebare, ...restul] = celule;
    const raspuns = restul.join(" | ");
    rezultat.push({
      id: slugify(intrebare),
      titlu: intrebare,
      html: randeaza(raspuns),
      text: faraMarkdown(intrebare + " " + raspuns),
      categorie: categorieIntrebare(intrebare),
    });
  }

  // Lista de întrebări despre GDPR: toate au același răspuns, spus în paragraful de deasupra.
  let notaGdpr = "";
  for (const sub of subsectiuni) {
    const linii = sub.corp.split("\n");
    const paragraf = linii.filter((l) => !l.startsWith("- ")).join("\n").trim();
    notaGdpr = randeaza(paragraf);
    const raspunsGdpr = paragraf.match(/\*\*(„[^*]+”)\*\*/)?.[1] ?? "";
    for (const l of linii.filter((l) => l.startsWith("- "))) {
      const intrebare = l.slice(2).trim();
      rezultat.push({
        id: slugify(intrebare),
        titlu: intrebare,
        html: randeaza(raspunsGdpr ? `**${raspunsGdpr}**` : paragraf),
        text: faraMarkdown(intrebare + " " + raspunsGdpr),
        categorie: "GDPR și date",
      });
    }
  }

  const ordine = ["Produsul", "Preț și garanție", "Despre Elevio", "GDPR și date"];
  const categorii = ordine.filter((c) => rezultat.some((r) => r.categorie === c));
  return { lista: rezultat, categorii, notaGdpr };
}
