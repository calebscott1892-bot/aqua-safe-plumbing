import { NextResponse } from "next/server";

/*
  Enquiry form endpoint. Runs on Vercel as a serverless function (this is why
  the site left static export — GitHub Pages can't host it). Posts the form to
  Resend, which emails it to the business inbox with reply-to = the customer.

  Config via Vercel env vars (see .env.example):
    RESEND_API_KEY  — required; the secret Resend key (never in the repo).
    ENQUIRY_TO      — inbox enquiries land in. Defaults to the business email.
    ENQUIRY_FROM    — verified sender. Must be on a Resend-verified domain.
*/

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.ENQUIRY_TO || "info@aquasafeplumbing.com";
const FROM =
  process.env.ENQUIRY_FROM || "Aqua-Safe Website <enquiries@aquasafeplumbing.com.au>";

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  suburb?: unknown;
  service?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — real users never see or fill this
};

const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const isEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot tripped the honeypot — accept silently, send nothing.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const suburb = clean(body.suburb, 120);
  const service = clean(body.service, 120);
  const message = clean(body.message, 4000);

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Please tell us your name.";
  if (!isEmail(email)) fields.email = "Enter a valid email so we can reply.";
  if (!phone) fields.phone = "A contact number lets us call you back.";
  if (!message) fields.message = "Let us know what you need done.";
  if (Object.keys(fields).length) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not yet wired (e.g. local dev, or env var missing on the host).
    console.error("[enquiry] RESEND_API_KEY is not set, cannot send.");
    return NextResponse.json(
      { error: "The form isn't connected yet. Please call or email us directly." },
      { status: 503 }
    );
  }

  const rows = (
    [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Suburb", suburb],
      ["Service", service],
    ] as const
  ).filter(([, v]) => v);

  const subject = `Website enquiry: ${name}${service ? ` (${service})` : ""}`;

  const html = `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#163544;line-height:1.6;max-width:560px">
    <h2 style="margin:0 0 2px;color:#0f5c7a;font-size:19px">New website enquiry</h2>
    <p style="margin:0 0 18px;color:#476072;font-size:14px">Sent from the aquasafeplumbing.com.au contact form.</p>
    <table style="border-collapse:collapse;margin:0 0 18px;font-size:15px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:5px 18px 5px 0;color:#476072;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:5px 0;font-weight:600">${escapeHtml(
              v
            )}</td></tr>`
        )
        .join("")}
    </table>
    <div style="padding:14px 16px;background:#eef4f7;border-radius:12px">
      <div style="color:#476072;font-size:13px;margin-bottom:6px">Message</div>
      <div style="white-space:pre-wrap;font-size:15px">${escapeHtml(message)}</div>
    </div>
  </div>`;

  const text =
    `New website enquiry\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${message}\n`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[enquiry] Resend responded", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't send that just now. Please call or email us directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return NextResponse.json(
      { error: "We couldn't send that just now. Please call or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
