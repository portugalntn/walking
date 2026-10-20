import type { Metadata } from "next";
import { uiText } from "@/lib/ui-texts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { AboutPageContent } from "@/components/sections/about-page-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: uiText("meta", "about", (await params).locale) };
}

export default function AboutPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <AboutPageContent />
      <Footer />
    </>
  );
}
