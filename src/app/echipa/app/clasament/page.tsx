import type { Metadata } from "next";
import Clasament from "./Clasament";

export const metadata: Metadata = { title: "Clasament" };

export default function ClasamentPage() {
  return <Clasament />;
}
