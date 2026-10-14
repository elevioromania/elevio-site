import type { Metadata } from "next";
import { obiectii } from "@/echipa/lib/ghid";
import ModApel from "./ModApel";

export const metadata: Metadata = { title: "Mod apel" };

export default async function ModApelPage({ searchParams }: PageProps<"/echipa/app/mod-apel">) {
  const { lead } = await searchParams;
  return <ModApel leadId={typeof lead === "string" ? lead : null} obiectii={obiectii().lista} />;
}
