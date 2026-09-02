import { NextResponse } from "next/server";

/**
 * Proposal / contact request endpoint.
 *
 * Receives the proposal form from the home contact section and from every
 * product page, and delivers it by email through Resend.
 *
 * Required environment variables (set them in Vercel and in .env.local):
 *   RESEND_API_KEY   API key from resend.com
 *   PROPOSAL_TO      inbox that receives the leads   (default info@portugalntn.com)
 *   PROPOSAL_FROM    verified sender on that domain  (default site@portugalntn.com)
 *
 * If the key is missing we never pretend the lead was delivered: in production
 * the request fails so the form shows its error and its direct email fallback.
 */

const TO = process.env.PROPOSAL_TO || "info@portugalntn.com";
const FROM = process.env.PROPOSAL_FROM || "site@portugalntn.com";
const MAX = 4000;

type Lead = {
  name: string;
  email: string;
  groupSize: string;
  phone: string;
  message: string;
  program: string;
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function plainBody(lead: Lead) {
  return [
    `Nome:      ${lead.name}`,
    `Email:     ${lead.email}`,
    `Telefone:  ${lead.phone || "não indicado"}`,
    `Pessoas:   ${lead.groupSize || "não indicado"}`,
    `Programa:  ${lead.program || "pedido geral (homepage)"}`,
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
      subject: lead.program
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
  const lead: Lead = {
    name: clean(raw.name),
    email: clean(raw.email),
    groupSize: clean(raw.groupSize),
    phone: clean(raw.phone),
    message: clean(raw.message),
    program: clean(raw.program),
  };

  if (!lead.name || !lead.email || !lead.message || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Always log the lead first, so a delivery failure never loses it.
  console.log("[proposal] new request\n" + plainBody(lead));

  const { sent, reason } = await sendByEmail(lead);
  if (sent) return NextResponse.json({ ok: true });

  console.error("[proposal] NOT delivered by email:", reason);

  // In development the lead in the log is enough to work on the flow.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
}
