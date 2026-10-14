import type { Metadata } from "next";
import ListaLeaduri from "./ListaLeaduri";

export const metadata: Metadata = { title: "Lead-urile mele" };

export default function LeaduriPage() {
  return <ListaLeaduri />;
}
