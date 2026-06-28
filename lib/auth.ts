import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "portfolio_admin_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET || "local-development-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function verifyCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@pawan.dev";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
  return email === adminEmail && password === adminPassword;
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    await jwtVerify(token, getSecret());
  } catch {
    throw new Error("Unauthorized");
  }
}
