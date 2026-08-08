import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/services/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = rateLimit(`login:${clientKey(request)}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email || "");
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const valid = await verifyCredentials(email, password);

  if (!valid) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
