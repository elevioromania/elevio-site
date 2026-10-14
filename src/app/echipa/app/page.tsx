import type { Metadata } from "next";
import { sectiuni } from "@/echipa/lib/ghid";
import TabloulDeBord from "./TabloulDeBord";

export const metadata: Metadata = { title: "Tabloul de bord" };

export default function AppPage() {
  return <TabloulDeBord sectiuni={sectiuni().map((s) => ({ slug: s.slug, parte: s.parte }))} />;
}
