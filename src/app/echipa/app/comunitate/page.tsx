import type { Metadata } from "next";
import Comunitate from "./Comunitate";

export const metadata: Metadata = { title: "Echipa" };

export default function ComunitatePage() {
  return <Comunitate />;
}
