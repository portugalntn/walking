import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { withPageTexts } from "../lib/pages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Texts edited in FLOW (Site > Páginas) replace the ones in messages/*.json; empty ones keep the original.
    messages: withPageTexts((await import(`../messages/${locale}.json`)).default, locale),
  };
});
