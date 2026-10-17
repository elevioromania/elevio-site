import type { Metadata } from "next";
import Liste from "./Liste";

export const metadata: Metadata = { title: "Foldere de lead-uri" };

export default function Page() {
  return <Liste />;
}
