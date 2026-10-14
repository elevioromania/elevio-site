import type { Metadata } from "next";
import Comisioane from "./Comisioane";

export const metadata: Metadata = { title: "Lead-uri închise și comisioane" };

export default function Page() {
  return <Comisioane />;
}
