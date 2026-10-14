import type { Metadata } from "next";
import LeadNou from "./LeadNou";

export const metadata: Metadata = { title: "Lead nou" };

export default function LeadNouPage() {
  return <LeadNou />;
}
