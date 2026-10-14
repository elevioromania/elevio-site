import type { Metadata } from "next";
import AuthCadru from "@/echipa/components/AuthCadru";
import FormularLogin from "./FormularLogin";

export const metadata: Metadata = { title: "Intră în cont" };

export default async function LoginPage({ searchParams }: PageProps<"/echipa/login">) {
  const { motiv } = await searchParams;
  return (
    <AuthCadru titlu="Intră în cont" subtitlu="Bine ai revenit. Hai să programăm întâlniri.">
      <FormularLogin dezactivat={motiv === "dezactivat"} />
    </AuthCadru>
  );
}
