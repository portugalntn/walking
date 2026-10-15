import { NextResponse } from "next/server";

import { flowConfigurado, registarPedidoNoFlow } from "@/lib/flow-leads";

/**
 * Proposal / contact request endpoint.
 *
 * Receives the proposal form from the home contact section and from every
 * product page ("Pedir proposta" and "Fazer uma pergunta").
 *
 * 1. It is saved as a lead in FLOW (Comercial > Atendimento), through
 *    registar_pedido_site() (flow-ntn/supabase/016). Needs FLOW_SUPABASE_URL
 *    and FLOW_SUPABASE_KEY, the same pair the build uses to read the content.
 * 2. It is also emailed through Resend when RESEND_API_KEY is set:
 *      RESEND_API_KEY   API key from resend.com
 *      PROPOSAL_TO      inbox that receives the leads   (default info@portugalntn.com)
 *      PROPOSAL_FROM    verified sender on that domain  (default site@portugalntn.com)
 *
 * The request succeeds when at least one of the two delivered it. Otherwise,
 * in production, it fails so the form shows its error and the direct email.
 */

const TO = process.env.PROPOSAL_TO || "info@portugalntn.com";
const FROM = process.env.PROPOSAL_FROM || "site@portugalntn.com";
const MAX = 4000;

type Lead = {
  kind: "proposta" | "pergunta";
  name: string;
  email: string;
  groupSize: string;
  phone: string;
  message: string;
  program: string;
  programId: string;
  locale: string;
  consent: boolean;
};

const clean = (v: unknown, max = MAX) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function plainBody(lead: Lead) {
  return [
    `Tipo:      ${lead.kind === "pergunta" ? "Pergunta" : "Pedido de proposta"}`,
    `Nome:      ${lead.name}`,
    `Email:     ${lead.email}`,
    `Telefone:  ${lead.phone || "não indicado"}`,
    `Pessoas:   ${lead.groupSize || "não indicado"}`,
    `Programa:  ${lead.program || "pedido geral (homepage)"}`,
    `Idioma:    ${lead.locale || "—"}`,
    `Aceita e-mails: ${lead.consent ? "sim" : "não"}`,
    "",
    "Mensagem:",
    lead.message,
    "",
    `Recebido em ${new Date().toISOString()}`,
  ].join("\n");
}

async function sendByEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "RESEND_API_KEY is not set" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Portugal NTN Walking <${FROM}>`,
      to: [TO],
      reply_to: lead.email,
      subject:
        lead.kind === "pergunta"
          ? `Pergunta${lead.program ? `: ${lead.program}` : ""} (${lead.name})`
          : lead.program
            ? `Pedido de proposta: ${lead.program} (${lead.name})`
            : `Pedido de contacto: ${lead.name}`,
      text: plainBody(lead),
    }),
  });

  if (!res.ok) {
    return { sent: false, reason: `Resend responded ${res.status}: ${await res.text()}` };
  }
  return { sent: true, reason: "" };
}

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = (data ?? {}) as Record<string, unknown>;

  // Hidden field: only a bot fills it. Pretend success without saving.
  if (clean(raw.website)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    kind: raw.kind === "pergunta" ? "pergunta" : "proposta",
    name: clean(raw.name, 160),
    email: clean(raw.email, 200).toLowerCase(),
    groupSize: clean(raw.groupSize, 6),
    phone: clean(raw.phone, 60),
    message: clean(raw.message),
    program: clean(raw.program, 200),
    programId: clean(raw.programId, 80),
    locale: clean(raw.locale, 8),
    consent: raw.consent === true,
  };

  if (!lead.name || !lead.email || !lead.message || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Always log the lead first, so a delivery failure never loses it.
  console.log("[proposal] new request\n" + plainBody(lead));

  let saved = false;
  if (flowConfigurado()) {
    const pessoas = Number(lead.groupSize);
    const r = await registarPedidoNoFlow({
      tipo: lead.kind,
      nome: lead.name,
      email: lead.email,
      telefone: lead.phone,
      pessoas: Number.isFinite(pessoas) && pessoas > 0 ? Math.round(pessoas) : null,
      mensagem: lead.message,
      produtoId: lead.programId,
      produtoTitulo: lead.program,
      idioma: lead.locale,
      consentimento: lead.consent,
      dados: { pagina: clean(request.headers.get("referer"), 300) },
    });
    saved = r.ok;
    if (!r.ok) console.error("[proposal] NOT saved in FLOW:", r.motivo);
  }

  const { sent, reason } = await sendByEmail(lead);
  if (!sent) console.error("[proposal] NOT delivered by email:", reason);

  if (saved || sent) return NextResponse.json({ ok: true });

  // In development the lead in the log is enough to work on the flow.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
}
