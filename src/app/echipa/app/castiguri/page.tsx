import type { Metadata } from "next";
import Castiguri from "./Castiguri";

export const metadata: Metadata = { title: "Câștigurile mele" };

export default function CastiguriPage() {
  return <Castiguri />;
}
