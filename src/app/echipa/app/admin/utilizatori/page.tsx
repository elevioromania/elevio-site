import type { Metadata } from "next";
import Utilizatori from "./Utilizatori";

export const metadata: Metadata = { title: "Utilizatori" };

export default function Page() {
  return <Utilizatori />;
}
