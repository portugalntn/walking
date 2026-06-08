import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { BlogPageContent } from "@/components/sections/blog-page-content";

export default function BlogPage() {
  return (
    <>
      <BrandElements />
      <Navbar />
      <BlogPageContent />
      <Footer />
    </>
  );
}
