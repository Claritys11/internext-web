import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasAdminAuth, isProtectedMutation, unauthorized } from "@/lib/security";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect backend CMS mutation APIs
  if (isProtectedMutation(pathname, request.method) && !(await hasAdminAuth(request))) {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
