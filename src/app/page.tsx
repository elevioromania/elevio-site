import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TrustStat from "@/components/TrustStat";
import AudioProof from "@/components/AudioProof";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import Features from "@/components/Features";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Hero />
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
