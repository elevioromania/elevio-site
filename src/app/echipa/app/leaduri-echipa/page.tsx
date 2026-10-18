import type { Metadata } from "next";
import { Suspense } from "react";
import { Incarcare } from "@/echipa/components/ui";
import LeaduriEchipa from "./LeaduriEchipa";

export const metadata: Metadata = { title: "Lead-urile echipei" };

export default function LeaduriEchipaPage() {
  return (
    <Suspense fallback={<Incarcare />}>
      <LeaduriEchipa />
    </Suspense>
  );
}
