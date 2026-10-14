import type { Metadata } from "next";
import RezumatAdmin from "./RezumatAdmin";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return <RezumatAdmin />;
}
