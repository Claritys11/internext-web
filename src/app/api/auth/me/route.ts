import { NextResponse } from "next/server";
import { hasAdminAuth } from "@/lib/security";

export async function GET(request: Request) {
  const authenticated = await hasAdminAuth(request);
  return NextResponse.json({
    authenticated,
    username: authenticated ? process.env.ADMIN_USERNAME : null,
  });
}
