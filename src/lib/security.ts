import { NextResponse } from "next/server";

const protectedMutationPaths = [
  "/api/articles",
  "/api/members",
  "/api/projects",
  "/api/events",
  "/api/gallery",
  "/api/profile",
  "/api/upload",
];

export function isProtectedMutation(pathname: string, method: string) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) return false;
  return protectedMutationPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Internext Admin", charset="UTF-8"' },
  });
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
    return separator >= 0 && decoded.slice(0, separator) === expectedUser && decoded.slice(separator + 1) === expectedPassword;
  } catch {
    return false;
  }
}

export function requireAdmin(request: Request) {
  return hasAdminBasicAuth(request) ? null : unauthorized();
}
