import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ALLOWED_TYPES: Record<string, { extension: string; magic: (buffer: Buffer) => boolean }> = {
  "image/png": { extension: ".png", magic: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
  "image/jpeg": { extension: ".jpg", magic: (buffer) => buffer.subarray(0, 3).equals(Buffer.from([255, 216, 255])) },
  "image/webp": { extension: ".webp", magic: (buffer) => buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP" },
  "image/gif": { extension: ".gif", magic: (buffer) => buffer.subarray(0, 6).toString("ascii") === "GIF87a" || buffer.subarray(0, 6).toString("ascii") === "GIF89a" },
};
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Tidak ada file gambar yang diunggah" }, { status: 400 });
    const rule = ALLOWED_TYPES[file.type];
    if (!rule) return NextResponse.json({ error: "Format file harus PNG, JPG, WebP, atau GIF" }, { status: 415 });
    if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Ukuran file maksimal 15 MB" }, { status: 413 });

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!rule.magic(buffer)) return NextResponse.json({ error: "Isi file tidak sesuai dengan tipe gambar" }, { status: 415 });

    const baseName = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30) || "upload";
    const fileName = `${baseName}_${Date.now()}${rule.extension}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, fileName), buffer, { flag: "wx" });

    return NextResponse.json({ success: true, url: `/uploads/${fileName}`, fileName, size: file.size, mimeType: file.type });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal mengunggah file gambar" }, { status: 500 });
  }
}
