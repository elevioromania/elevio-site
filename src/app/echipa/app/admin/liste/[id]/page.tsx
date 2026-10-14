import type { Metadata } from "next";
import Lista from "./Lista";

export const metadata: Metadata = { title: "Listă de lead-uri" };

export default async function Page({ params }: PageProps<"/echipa/app/admin/liste/[id]">) {
  const { id } = await params;
  return <Lista id={id} />;
}
