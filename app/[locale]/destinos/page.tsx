import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { DestinosHubContent } from "@/components/sections/destinos-hub-content";

export const metadata: Metadata = { title: "Destinos · Portugal NTN Walking" };

export default function DestinosPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <DestinosHubContent />
      <Footer />
    </>
  );
}
