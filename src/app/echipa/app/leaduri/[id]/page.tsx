import type { Metadata } from "next";
import DetaliiLead from "./DetaliiLead";

export const metadata: Metadata = { title: "Lead" };

export default async function LeadPage({ params }: PageProps<"/echipa/app/leaduri/[id]">) {
  const { id } = await params;
  return <DetaliiLead id={id} />;
}
