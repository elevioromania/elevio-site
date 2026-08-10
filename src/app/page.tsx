import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import Features from "@/components/Features";
import PriceAnchor from "@/components/PriceAnchor";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Verticals />
      <Features />
      <PriceAnchor showPricingLink />
      <FAQSection />
    </>
  );
}
