import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getGallery, saveGallery } from "@/lib/api/services";
import { GalleryItem } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") as "photo" | "video") || undefined;
    const items = await getGallery(type);
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: GalleryItem = await request.json();
    if (!body.id) {
      body.id = `gal-${Date.now()}`;
    }
    const saved = await saveGallery(body);
    revalidatePath("/", "layout");
    revalidatePath("/gallery");
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
