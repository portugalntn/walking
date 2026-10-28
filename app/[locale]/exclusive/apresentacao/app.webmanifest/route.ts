import { routing } from "@/i18n/routing";

/**
 * Manifesto da apresentação como app no tablet ("Adicionar ao ecrã principal"):
 * abre em ecrã inteiro, sem barras do browser, diretamente na apresentação da
 * língua em que foi instalada. Com o service worker (public/sw-apresentacao.js)
 * abre também sem internet.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return new Response("Not found", { status: 404 });

  const inicio = `/${locale}/exclusive/apresentacao`;
  return Response.json(
    {
      id: inicio,
      name: "Portugal NTN Exclusive",
      short_name: "NTN Exclusive",
      start_url: inicio,
      scope: inicio,
      display: "fullscreen",
      display_override: ["fullscreen", "standalone"],
      orientation: "any",
      background_color: "#1a1d15",
      theme_color: "#1a1d15",
      lang: locale,
      icons: [
        { src: "/images/exclusive/app-icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/images/exclusive/app-icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/images/exclusive/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } }
  );
}
