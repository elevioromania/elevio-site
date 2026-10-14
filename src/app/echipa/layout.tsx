import type { Metadata } from "next";
import "./echipa.css";

export const metadata: Metadata = {
  title: { default: "Echipa Elevio", template: "%s · Echipa Elevio" },
  description: "Platforma internă a echipei Elevio.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function EchipaLayout({ children }: { children: React.ReactNode }) {
  return <div className="echipa-root flex min-h-full flex-1 flex-col">{children}</div>;
}
