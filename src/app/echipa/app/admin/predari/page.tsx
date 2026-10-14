import type { Metadata } from "next";
import Predari from "./Predari";

export const metadata: Metadata = { title: "Întâlniri predate" };

export default function Page() {
  return <Predari />;
}
