import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { EX_ACCESS_COOKIE } from "@/lib/flow-leads";

/**
 * Team preview of the EXCLUSIVE collection (the page behind the operator form),
 * opened from FLOW (Site > Páginas > EXCLUSIVE · Coleção > Ver no site).
 * With the right key it opens the collection for a day without creating a
 * lead; without it, it lands on the form like anyone else.
 * The key lives in EXCLUSIVE_PREVIEW_KEY, on this site and on FLOW.
 */
export function GET(req: NextRequest) {
  const lang = ["en", "pt", "es"].includes(req.nextUrl.searchParams.get("lang") ?? "") ? req.nextUrl.searchParams.get("lang")! : "pt";
  const res = NextResponse.redirect(new URL(`/${lang}/exclusive`, req.url));
  const key = process.env.EXCLUSIVE_PREVIEW_KEY ?? "";
  const given = req.nextUrl.searchParams.get("k") ?? "";
  const ok = key.length >= 12 && given.length === key.length && timingSafeEqual(Buffer.from(given), Buffer.from(key));
  if (ok) {
    res.cookies.set(EX_ACCESS_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
