import type { IntrareCautare } from "../components/CautareGhid";
import type { ParteCuprins } from "../components/CuprinsGhid";
import { parti, sectiuni } from "./ghid";

export function cuprins(): ParteCuprins[] {
  const toate = sectiuni();
  return parti().map((p) => ({
    numar: p.numar,
    titlu: p.titlu,
    sectiuni: toate.filter((s) => s.parte === p.numar).map((s) => ({ slug: s.slug, numar: s.numar, titlu: s.titlu })),
  }));
}

export function indexCautare(): IntrareCautare[] {
  return sectiuni().map((s) => ({
    href: `/echipa/app/ghid/${s.slug}`,
    titlu: `${s.numar}. ${s.titlu}`,
    eticheta: `Partea ${s.parte}`,
    text: s.text,
  }));
}
