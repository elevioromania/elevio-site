import type { Metadata } from "next";
import AuthCadru from "@/echipa/components/AuthCadru";
import FormularParolaNoua from "./FormularParolaNoua";

export const metadata: Metadata = { title: "Parolă nouă" };

export default async function ParolaNouaPage({ searchParams }: PageProps<"/echipa/parola-noua">) {
  const { code } = await searchParams;
  return (
    <AuthCadru titlu="Alege o parolă nouă">
      <FormularParolaNoua cod={typeof code === "string" ? code : null} />
    </AuthCadru>
  );
}
