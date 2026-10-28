import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond } from "next/font/google";
import { getTranslations } from "next-intl/server";

import { ExNavbar, ExFooter } from "@/components/exclusive/ex-chrome";
import { ExHero } from "@/components/exclusive/ex-hero";
import { ExManifesto } from "@/components/exclusive/ex-manifesto";
import { ExJourneys } from "@/components/exclusive/ex-journeys";
import { ExItinerary } from "@/components/exclusive/ex-itinerary";
import { ExDayTours } from "@/components/exclusive/ex-daytours";
import { ExOperators } from "@/components/exclusive/ex-operators";
import { ExEnquiry } from "@/components/exclusive/ex-enquiry";
import { ExGate } from "@/components/exclusive/ex-gate";
import { exThemeScript } from "@/components/exclusive/ex-theme-script";
import { EX_ACCESS_COOKIE } from "@/lib/flow-leads";
import { pageImage } from "@/lib/pages";

/** Serifa de exibição só do EXCLUSIVE. O site público continua em DIN. */
const exSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-ex-serif",
  display: "swap",
});

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "exclusive" });

  return {
    title: { absolute: "Portugal NTN Exclusive" },
    // Página de trade com copy ainda provisória: fica fora dos motores de
    // busca até a copy estar fechada e o domínio próprio configurado.
    robots: { index: false, follow: false },
    description: t("hero.lead"),
    alternates: {
      canonical: `https://exclusive.portugalntn.com/${locale}`,
      languages: {
        en: "https://exclusive.portugalntn.com/en",
        pt: "https://exclusive.portugalntn.com/pt",
        es: "https://exclusive.portugalntn.com/es",
      },
    },
  };
}

export default async function ExclusivePage() {
  // Portão comercial: só operadores que se identificaram veem a coleção.
  const aberto = (await cookies()).get(EX_ACCESS_COOKIE)?.value === "1";

  if (!aberto) {
    return (
      <div className={`ex ${exSerif.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: exThemeScript }} />
        <ExNavbar variant="gate" />
        <main>
          <ExGate image={pageImage("exclusive-entrada", "topo", "/images/programs/douro/douro-a.jpg")} />
        </main>
        <ExFooter />
      </div>
    );
  }

  return (
    <div className={`ex ${exSerif.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: exThemeScript }} />
      <ExNavbar />
      <main>
        <ExHero />
        <ExManifesto />
        <ExJourneys />
        <ExItinerary />
        <ExDayTours />
        <ExOperators />
        <ExEnquiry />
      </main>
      <ExFooter />
    </div>
  );
}
