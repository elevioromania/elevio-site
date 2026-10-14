import type { Metadata } from "next";
import ProfilMembru from "./ProfilMembru";

export const metadata: Metadata = { title: "Profil membru" };

export default async function Page({ params }: PageProps<"/echipa/app/admin/utilizatori/[id]">) {
  const { id } = await params;
  return <ProfilMembru id={id} />;
}
