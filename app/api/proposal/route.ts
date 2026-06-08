import { NextResponse } from "next/server";

/**
 * Proposal / contact request endpoint.
 *
 * Receives the product-page proposal form. Right now it validates the payload
 * and logs it server-side, returning success so the UI works end to end.
 *
 * To deliver the request by email, wire an email provider here (e.g. Resend):
 *   const { Resend } = await import("resend");
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "site@portugalntn.com",
 *     to: "info@portugalntn.com",
 *     subject: `Proposta: ${program} (${name})`,
 *     replyTo: email,
 *     text: `...`,
 *   });
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, phone, message, program } = data ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Placeholder delivery: log the lead so nothing is lost before email is wired.
    console.log("[proposal] new request", {
      name,
      email,
      company: company ?? "",
      phone: phone ?? "",
      program: program ?? "",
      message,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
