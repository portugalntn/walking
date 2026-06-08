import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/ui/motion-provider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt";
  const isSpanish = locale === "es";

  return {
    alternates: {
      canonical: `https://portugalntnwalking.com/${locale}`,
      languages: {
        en: "https://portugalntnwalking.com/en",
        pt: "https://portugalntnwalking.com/pt",
        es: "https://portugalntnwalking.com/es",
      },
    },
    ...(isPortuguese && {
      title: {
        default: "Portugal NTN Walking: Operadora de Caminhadas Premium",
        template: "%s | Portugal NTN Walking",
      },
      description:
        "Roteiros de caminhada guiados e self-guided pelas paisagens mais extraordinárias de Portugal. Operadora DMC especializada em turismo de caminhada premium.",
    }),
    ...(isSpanish && {
      title: {
        default: "Portugal NTN Walking: Operadora de Senderismo Premium",
        template: "%s | Portugal NTN Walking",
      },
      description:
        "Rutas de senderismo guiadas y autoguiadas por los paisajes más extraordinarios de Portugal. Operadora DMC especializada en turismo de senderismo premium.",
    }),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
