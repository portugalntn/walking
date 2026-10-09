import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { ProductPageV2 } from "@/components/sections/product-page-v2";
import { getProgram } from "@/lib/programs";
import { getTrail } from "@/lib/trails";
import { isHiddenRoute } from "@/lib/destinations";

/**
 * Design proposal v2 of the product page, for internal review.
 * Not linked from the site and kept out of search engines.
 */

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const program = getProgram(id);
  return { title: `${program?.title ?? "Programa"} · Proposta`, robots: { index: false, follow: false } };
}

export default async function ProductProposalPage({ params }: Props) {
  const { id } = await params;
  const program = getProgram(id);
  if (!program || isHiddenRoute(id) || program.format !== "roteiro") notFound();

  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <ProductPageV2 program={program} trail={getTrail(id)} />
      <Footer />
    </>
  );
}
