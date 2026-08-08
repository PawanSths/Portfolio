import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(`contact:${clientKey(request)}`, 5, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { message: "Too many messages from this address. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;

    if (!apiKey || !to) {
      return NextResponse.json({ message: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><hr/><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: "Unable to send your message. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ message: "Message received. Thank you!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Unable to send your message. Please try again later." }, { status: 500 });
  }
}
