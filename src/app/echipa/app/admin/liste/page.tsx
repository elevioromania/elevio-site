import type { Metadata } from "next";
import Liste from "./Liste";

export const metadata: Metadata = { title: "Liste de lead-uri" };

export default function Page() {
  return <Liste />;
}
