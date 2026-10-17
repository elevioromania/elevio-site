import type { Metadata } from "next";
import { Suspense } from "react";
import { Incarcare } from "@/echipa/components/ui";
import FoldereleMele from "./FoldereleMele";

export const metadata: Metadata = { title: "Folderele mele" };

export default function FolderePage() {
  return (
    <Suspense fallback={<Incarcare />}>
      <FoldereleMele />
    </Suspense>
  );
}
