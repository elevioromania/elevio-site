import type { Metadata } from "next";
import Comisioane from "./Comisioane";

export const metadata: Metadata = { title: "Clienți și comisioane" };

export default function Page() {
  return <Comisioane />;
}
