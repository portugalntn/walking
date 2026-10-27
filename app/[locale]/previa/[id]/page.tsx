import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { ProductPageContent } from "@/components/sections/product-page-content";
import { toProgram } from "@/lib/programs";
import { getTrail } from "@/lib/trails";
import { COOKIE_PREVIA, marcaPrevia, produtoDoFlow } from "@/lib/previa";

/**
 * Pré-visualização de um produto para a equipa: a mesma página do site, com o que está
 * gravado agora no FLOW (ainda por publicar). Só abre com o cookie de /api/previa e não
 * entra nos motores de busca. O formulário de pedido fica desligado.
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Pré-visualização · ${id}`, robots: { index: false, follow: false } };
}

const quando = (iso: string) =>
  new Date(iso).toLocaleString("pt-PT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon" });

export default async function PreviaProduto({ params }: Props) {
  const { id } = await params;
  const marca = marcaPrevia();
  if (!marca || (await cookies()).get(COOKIE_PREVIA)?.value !== marca) notFound();
  const lido = await produtoDoFlow(id);
  if (!lido) notFound();
  const program = toProgram(lido.entrada);
  const notas = [
    lido.gravadoEm && `gravado no FLOW a ${quando(lido.gravadoEm)}`,
    lido.entrada.hidden && "oculto: não aparece no site",
    lido.entrada.hasPage === false && "sem página no site",
  ].filter(Boolean);

  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <ProductPageContent program={program} trail={getTrail(id) ?? program.profile} previa />
      <Footer />
      <p
        role="status"
        className="fixed left-1/2 -translate-x-1/2 bottom-24 lg:bottom-4 z-[70] text-center"
        style={{
          margin: 0, width: "max-content", maxWidth: "calc(100vw - 24px)", padding: "8px 14px", borderRadius: "999px",
          background: "#1a2510", color: "#f4f1e8", fontFamily: "var(--font-ui)", fontSize: "12px", lineHeight: 1.4,
          boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        }}
      >
        <strong style={{ color: "#bccf02", letterSpacing: "0.08em", textTransform: "uppercase" }}>Pré-visualização</strong>
        {" · "}ainda não publicado
        {notas.length > 0 && <span className="hidden lg:inline">{` · ${notas.join(" · ")}`}</span>}
      </p>
    </>
  );
}
