import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { profilCurent } from "@/echipa/lib/sesiune";
import Statistici from "./Statistici";

export const metadata: Metadata = { title: "Statistici" };

// Adminul și trainerul văd statisticile echipei.
export default async function StatisticiPage() {
  const profil = await profilCurent();
  if (profil.rol !== "admin" && profil.rol !== "trainer") redirect("/echipa/app");
  return <Statistici />;
}
