import type { Metadata } from "next";
import Curatenie from "./Curatenie";

export const metadata: Metadata = { title: "Curățenie lead-uri" };

export default function Page() {
  return <Curatenie />;
}
