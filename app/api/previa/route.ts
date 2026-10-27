import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_PREVIA, chaveCerta, marcaPrevia } from "@/lib/previa";

/**
 * Entrada da pré-visualização de um produto, aberta no FLOW (editor do produto > Pré-visualizar).
 * Com a chave certa guarda o cookie da equipa por um dia e abre /[lang]/previa/[id];
 * sem ela, vai para a página publicada como qualquer pessoa.
 */
export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const lang = ["en", "pt", "es"].includes(q.get("lang") ?? "") ? q.get("lang")! : "pt";
  const id = /^[a-z0-9-]+$/.test(q.get("id") ?? "") ? q.get("id")! : "";
  const marca = marcaPrevia();
  if (!id || !marca || !chaveCerta(q.get("k") ?? "")) {
    return NextResponse.redirect(new URL(id ? `/${lang}/programas/${id}` : `/${lang}`, req.url));
  }
  const res = NextResponse.redirect(new URL(`/${lang}/previa/${id}`, req.url));
  res.cookies.set(COOKIE_PREVIA, marca, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
