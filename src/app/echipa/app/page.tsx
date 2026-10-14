import type { Metadata } from "next";
import TabloulDeBord from "./TabloulDeBord";

export const metadata: Metadata = { title: "Tabloul de bord" };

export default function AppPage() {
  return <TabloulDeBord />;
}
