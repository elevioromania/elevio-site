import type { Metadata } from "next";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "Elevio Marketing — Recenzii Google Maps, site-uri și social media",
  description:
    "Divizia de marketing Elevio: recenzii Google Maps, optimizare profil, site-uri web și profile social media pentru afaceri locale.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-marketing-bg text-white">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
