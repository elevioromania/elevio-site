import Hero from "@/components/Hero";
import WorkModes from "@/components/WorkModes";
import SocialProof from "@/components/SocialProof";
import TrustStat from "@/components/TrustStat";
import AudioProof from "@/components/AudioProof";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import Features from "@/components/Features";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { websiteJsonLd } from "@/lib/seo/schema";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      {/* WebSite doar pe homepage: așa își ia Google numele site-ului (Elevio AI) și pagina principală. */}
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <WorkModes />
      <SocialProof />
      <TrustStat />
      <AudioProof />
      <HowItWorks />
      <Verticals />
      <Features />
      <PriceAnchor showPricingLink />
      <FAQSection />
    </>
  );
}
