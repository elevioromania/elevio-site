export type FaqItem = {
  q: string;
  /** Poate conține linkuri [text](/ruta) și **bold**; în JSON-LD ajunge ca text simplu. */
  a: string;
};

export type Crumb = {
  name: string;
  /** Ruta relativă, de ex. "/ghid". */
  path: string;
};

export type LinkCard = {
  href: string;
  title: string;
  text: string;
};

/** Blocurile de conținut ale unui ghid (randate de GuideBody). */
export type Bloc =
  | { tip: "p"; text: string }
  | { tip: "h3"; text: string }
  | { tip: "lista"; items: string[]; numerotata?: boolean }
  | {
      tip: "tabel";
      cap: string[];
      randuri: string[][];
      legenda?: string;
      nota?: string;
    }
  | {
      tip: "nota";
      ton: "info" | "exemplu" | "atentie";
      titlu?: string;
      text: string;
    };

export type SectiuneGhid = {
  id: string;
  titlu: string;
  blocuri: Bloc[];
};
