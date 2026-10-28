import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { ExNavbar, ExFooter } from "@/components/exclusive/ex-chrome";
import { ExDeck } from "@/components/exclusive/ex-deck";
import { ExGate } from "@/components/exclusive/ex-gate";
import { exThemeScript } from "@/components/exclusive/ex-theme-script";
import { exSans, exSerif } from "@/components/exclusive/ex-fonts";
import { EX_ACCESS_COOKIE } from "@/lib/flow-leads";
import { pageImage } from "@/lib/pages";

/**
 * Apresentação do EXCLUSIVE para tablet: o mesmo conteúdo da coleção, ecrã a
 * ecrã, para o vendedor conduzir o atendimento (feiras, reuniões).
 * Fica atrás do mesmo portão que a coleção. A equipa abre-a com
 * /api/exclusive/ver?lang=pt&ir=apresentacao&k=<EXCLUSIVE_PREVIEW_KEY>, ou com a
 * chave no fim do portão (a app instalada no iPad não partilha os cookies do Safari).
 * Instalada no ecrã principal, abre em ecrã inteiro e sem internet.
 */

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Portugal NTN Exclusive" },
    robots: { index: false, follow: false },
    manifest: `/${locale}/exclusive/apresentacao/app.webmanifest`,
    appleWebApp: { title: "NTN Exclusive", statusBarStyle: "black-translucent" },
    icons: { apple: "/images/exclusive/app-icon-180.png" },
  };
}

/** Ecrã inteiro no iPad instalado: o conteúdo vai até às margens e o CSS respeita as zonas seguras. */
export const viewport: Viewport = { viewportFit: "cover", themeColor: "#1a1d15" };

export default async function ExclusiveApresentacao({ params }: Props) {
  const { locale } = await params;
  const aberto = (await cookies()).get(EX_ACCESS_COOKIE)?.value === "1";

  if (!aberto) {
    const t = await getTranslations({ locale, namespace: "exclusive.deck" });
    return (
      <div className={`ex ${exSerif.variable} ${exSans.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: exThemeScript }} />
        <ExNavbar variant="gate" />
        <main>
          <ExGate image={pageImage("exclusive-entrada", "topo", "/images/programs/douro/douro-a.jpg")} />
          {/* Só nesta rota (os operadores não a conhecem): a equipa entra com a chave. */}
          <form action="/api/exclusive/ver" method="get" className="ex-wrap ex-dk-key">
            <input type="hidden" name="lang" value={locale} />
            <input type="hidden" name="ir" value="apresentacao" />
            <p className="ex-over ex-over-accent">{t("teamKey")}</p>
            <input className="ex-field" name="k" type="password" required autoComplete="off" placeholder={t("teamKeyLabel")} aria-label={t("teamKeyLabel")} />
            <button type="submit" className="ex-btn">
              {t("teamKeyEnter")}
            </button>
          </form>
        </main>
        <ExFooter />
      </div>
    );
  }

  return (
    <div className={`ex ex-deck ${exSerif.variable} ${exSans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: exThemeScript }} />
      <ExDeck />
    </div>
  );
}
