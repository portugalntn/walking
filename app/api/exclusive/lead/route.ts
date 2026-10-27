import { NextResponse } from "next/server";
import { lerCampanha } from "@/lib/campanha";

import { EX_ACCESS_COOKIE as ACCESS_COOKIE, flowConfigurado, registarLeadNoFlow, type LeadSite } from "@/lib/flow-leads";

/**
 * Lead B2B do Exclusive: o formulário de acesso (portão) e o pedido de
 * dossier no fim da página. Grava no FLOW (área Comercial) e, se tudo
 * correr bem, deixa o cookie que abre a página.
 *
 * O portão é comercial, não é segurança: o conteúdo não tem preços.
 */

const UM_ANO = 60 * 60 * 24 * 365;

const TIPOS = new Set(["operador", "agencia", "dmc", "outro"]);
const INTERESSES = new Set(["catalogo", "tailor_made", "ambos"]);

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = ((await request.json()) ?? {}) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Campo escondido: só um robô o preenche. Finge sucesso sem gravar.
  if (clean(raw.website)) return NextResponse.json({ ok: true });

  const tipo = clean(raw.tipoEmpresa, 40);
  const interesse = clean(raw.interesse, 40);
  const lead: LeadSite = {
    nome: clean(raw.nome, 160),
    empresa: clean(raw.empresa, 160),
    email: clean(raw.email).toLowerCase(),
    telefone: clean(raw.telefone, 60),
    pais: clean(raw.pais, 80),
    tipoEmpresa: TIPOS.has(tipo) ? tipo : "",
    interesse: INTERESSES.has(interesse) ? interesse : "",
    mensagem: clean(raw.mensagem, 4000),
    idioma: clean(raw.idioma, 8),
    dados: {
      formulario: clean(raw.formulario, 40) || "acesso",
      pagina: clean(request.headers.get("referer"), 300),
      ...lerCampanha(request.headers.get("cookie")),
    },
  };

  if (!lead.nome || !lead.empresa || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Fica sempre no log da Vercel, para nenhuma falha de entrega perder o lead.
  console.log("[exclusive-lead]", JSON.stringify(lead));

  if (flowConfigurado()) {
    const r = await registarLeadNoFlow(lead);
    if (!r.ok) {
      console.error("[exclusive-lead] NÃO gravado no FLOW:", r.motivo);
      return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[exclusive-lead] FLOW não configurado nesta instalação.");
    return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, "1", {
    path: "/",
    maxAge: UM_ANO,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
