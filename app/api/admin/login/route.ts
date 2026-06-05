import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
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
