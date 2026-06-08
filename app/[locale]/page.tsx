import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { IntroSection } from "@/components/sections/intro-section";
import { WhyUsSection } from "@/components/sections/whyus-section";
import { RoutesSection } from "@/components/sections/routes-section";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { SustainabilitySection } from "@/components/sections/sustainability-section";
import { BlogTeaserSection } from "@/components/sections/blog-teaser-section";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";

export default function HomePage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <IntroSection />
        <WhyUsSection />
        <RoutesSection />
        <DestinationsSection />
        <SustainabilitySection />
        <BlogTeaserSection />
      </main>
      <Footer />
    </>
  );
}
