import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "internext_admin_session";

const protectedMutationPaths = [
  "/api/articles",
  "/api/members",
  "/api/projects",
  "/api/events",
  "/api/gallery",
  "/api/profile",
  "/api/upload",
  "/api/chat",
];

export function isProtectedMutation(pathname: string, method: string) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) return false;
  if (pathname === "/api/chat" && method !== "DELETE") return false;
  return protectedMutationPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

async function hmacSha256(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function generateAdminSessionToken(username: string): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD || "fallback-secret-internext";
  const timestamp = Date.now().toString();
  const signature = await hmacSha256(secret, `${username}:${timestamp}`);
  return `${btoa(username)}.${timestamp}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string | null | undefined
): Promise<boolean> {
  if (!token) return false;
  try {
    const cleanToken = decodeURIComponent(token);
    const [encodedUser, timestamp, signature] = cleanToken.split(".");
    if (!encodedUser || !timestamp || !signature) return false;

    const username = atob(encodedUser);
    const expectedUser = process.env.ADMIN_USERNAME;
    const secret = process.env.ADMIN_PASSWORD || "fallback-secret-internext";

    if (expectedUser && username !== expectedUser) return false;

    const expectedSig = await hmacSha256(secret, `${username}:${timestamp}`);
    if (signature !== expectedSig) return false;

    // Expire session after 7 days
    const ageMs = Date.now() - parseInt(timestamp, 10);
    if (isNaN(ageMs) || ageMs > 7 * 24 * 60 * 60 * 1000) return false;

    return true;
  } catch {
    return false;
  }
}

export function hasAdminBasicAuth(request: Request) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    return (
      separator >= 0 &&
      decoded.slice(0, separator) === expectedUser &&
      decoded.slice(separator + 1) === expectedPassword
    );
  } catch {
    return false;
  }
}

export async function hasAdminAuth(request: Request): Promise<boolean> {
  // 1. Check Cookie-based session
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, v.join("=")];
      })
    );
    const sessionToken = cookies[ADMIN_COOKIE_NAME];
    if (await verifyAdminSessionToken(sessionToken)) {
      return true;
    }
  }

  // 2. Check Basic Auth (for curl/CLI/automated scripts)
  if (hasAdminBasicAuth(request)) {
    return true;
  }

  return false;
}

export function unauthorized() {
  return NextResponse.json(
    { error: "Authentication required. Silakan login melalui /admin." },
    { status: 401 }
  );
}

export async function requireAdmin(request: Request) {
  return (await hasAdminAuth(request)) ? null : unauthorized();
}
