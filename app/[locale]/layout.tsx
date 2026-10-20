import type { Metadata } from "next";
import { uiText } from "@/lib/ui-texts";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/ui/motion-provider";
import { HtmlLang } from "@/components/ui/html-lang";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `https://portugalntnwalking.com/${locale}`,
      languages: {
        en: "https://portugalntnwalking.com/en",
        pt: "https://portugalntnwalking.com/pt",
        es: "https://portugalntnwalking.com/es",
      },
    },
    // Editable in FLOW: Site > Páginas > Menu, rodapé e SEO.
    title: { default: uiText("meta", "siteTitle", locale), template: "%s | Portugal NTN Walking" },
    description: uiText("meta", "siteDescription", locale),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <HtmlLang locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <MotionProvider>
          {children}
        </MotionProvider>
      </NextIntlClientProvider>
    </>
  );
}
