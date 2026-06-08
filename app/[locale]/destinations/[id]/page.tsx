import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { ProductPageContent } from "@/components/sections/product-page-content";
import { getProgram } from "@/lib/programs";
import { routes } from "@/lib/destinations";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const program = getProgram(id);
  const route = routes.find((r) => r.id === id);
  const title = program?.title ?? route?.title ?? "Programa";
  return { title };
}

export default async function ProductPage({ params }: Props) {
  const { id, locale } = await params;
  const program = getProgram(id);
  const route = routes.find((r) => r.id === id);

  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      {program ? (
        <ProductPageContent program={program} />
      ) : (
        <main
          className="flex flex-col items-center justify-center text-center"
          style={{ minHeight: "70vh", padding: "160px 24px 100px" }}
        >
          <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: "16px" }}>
            {route ? `${route.region} · ${route.duration}` : "Portugal NTN Walking"}
          </p>
          <h1
            className="font-title"
            style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(2rem, 4vw, 3.25rem)", textTransform: "none", lineHeight: 1.1, marginBottom: "20px" }}
          >
            {route?.title ?? "Programa"}
          </h1>
          <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", maxWidth: "32rem", marginBottom: "36px" }}>
            Itinerário detalhado em breve.
          </p>
          <Link href={`/${locale}/destinations`} className="btn btn-ghost-dark" style={{ display: "inline-flex" }}>
            ← Destinos
          </Link>
        </main>
      )}
      <Footer />
    </>
  );
}
