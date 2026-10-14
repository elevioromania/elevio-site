import type { Metadata } from "next";
import AuthCadru from "@/echipa/components/AuthCadru";
import FormularResetare from "./FormularResetare";

export const metadata: Metadata = { title: "Am uitat parola" };

export default function ResetarePage() {
  return (
    <AuthCadru titlu="Am uitat parola" subtitlu="Îți trimitem pe e-mail un link pentru o parolă nouă.">
      <FormularResetare />
    </AuthCadru>
  );
}
