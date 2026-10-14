import type { Metadata } from "next";
import ToateLeadurile from "./ToateLeadurile";

export const metadata: Metadata = { title: "Toate lead-urile" };

export default function Page() {
  return <ToateLeadurile />;
}
