import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };
const uploadsDir = path.resolve(process.cwd(), "public", "uploads");

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path: segments } = await params;
    const requested = path.resolve(uploadsDir, ...segments);
    if (requested !== uploadsDir && !requested.startsWith(`${uploadsDir}${path.sep}`)) return new NextResponse("Not found", { status: 404 });
    const ext = path.extname(requested).toLowerCase();
    const contentType = MIME_TYPES[ext];
    if (!contentType) return new NextResponse("Not found", { status: 404 });
    const data = await fs.readFile(requested);
    return new NextResponse(data, { status: 200, headers: { "Content-Type": contentType, "X-Content-Type-Options": "nosniff", "Content-Disposition": "inline", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
