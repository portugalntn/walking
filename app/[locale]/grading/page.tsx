import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { GradingPageContent } from "@/components/sections/grading-page-content";

export const metadata: Metadata = { title: "Walking Grades" };

export default function GradingPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <GradingPageContent />
      <Footer />
    </>
  );
}
