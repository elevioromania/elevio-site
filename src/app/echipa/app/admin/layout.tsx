import { redirect } from "next/navigation";
import NavAdmin from "./NavAdmin";
import { profilCurent } from "@/echipa/lib/sesiune";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profil = await profilCurent();
  if (profil.rol !== "admin") redirect("/echipa/app");
  return (
    <div>
      <NavAdmin />
      {children}
    </div>
  );
}
