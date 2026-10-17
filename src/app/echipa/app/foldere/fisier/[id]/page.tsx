import type { Metadata } from "next";
import FisierLeaduri from "./FisierLeaduri";

export const metadata: Metadata = { title: "Fișier de lead-uri" };

export default async function FisierPage({ params }: PageProps<"/echipa/app/foldere/fisier/[id]">) {
  const { id } = await params;
  return <FisierLeaduri id={id} />;
}
