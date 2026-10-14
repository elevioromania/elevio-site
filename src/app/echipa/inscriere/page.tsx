import type { Metadata } from "next";
import AuthCadru from "@/echipa/components/AuthCadru";
import FormularInscriere from "./FormularInscriere";

export const metadata: Metadata = { title: "Înscriere" };

export default function InscrierePage() {
  return (
    <AuthCadru titlu="Intră în echipă" subtitlu="Ai nevoie de codul de invitație.">
      <FormularInscriere />
    </AuthCadru>
  );
}
