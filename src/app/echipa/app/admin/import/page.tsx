import type { Metadata } from "next";
import ImportCsv from "./ImportCsv";

export const metadata: Metadata = { title: "Import CSV" };

export default function Page() {
  return <ImportCsv />;
}
