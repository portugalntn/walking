import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { COOKIE_CAMPANHA, campanhaDoUrl, opcoesCookie, valorCookie } from "./lib/campanha";

const handleI18n = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const res = handleI18n(request);
  // Chegou por um link de campanha (utm_…): fica guardado para o formulário dizer de onde veio o lead.
  const campanha = campanhaDoUrl(request.nextUrl);
  if (campanha) res.cookies.set(COOKIE_CAMPANHA, valorCookie(campanha), opcoesCookie);
  return res;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes
    // - Next.js internals
    // - Static files with extensions
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
