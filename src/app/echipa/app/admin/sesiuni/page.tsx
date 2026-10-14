import type { Metadata } from "next";
import Sesiuni from "./Sesiuni";

export const metadata: Metadata = { title: "Sesiuni și anunțuri" };

export default function Page() {
  return <Sesiuni />;
}
