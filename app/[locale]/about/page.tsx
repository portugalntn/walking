import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { AboutPageContent } from "@/components/sections/about-page-content";

export const metadata: Metadata = { title: "About Us" };

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
