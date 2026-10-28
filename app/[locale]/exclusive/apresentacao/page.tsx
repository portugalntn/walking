import type { Metadata } from "next";
import { cookies } from "next/headers";

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
 * /api/exclusive/ver?lang=pt&ir=apresentacao&k=<EXCLUSIVE_PREVIEW_KEY>.
 */

export const metadata: Metadata = {
  title: { absolute: "Portugal NTN Exclusive" },
  robots: { index: false, follow: false },
};

export default async function ExclusiveApresentacao() {
  const aberto = (await cookies()).get(EX_ACCESS_COOKIE)?.value === "1";

  if (!aberto) {
    return (
      <div className={`ex ${exSerif.variable} ${exSans.variable}`}>
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
    <div className={`ex ex-deck ${exSerif.variable} ${exSans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: exThemeScript }} />
      <ExDeck />
    </div>
  );
}
