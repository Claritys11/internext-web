import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteGallery } from "@/lib/api/services";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteGallery(id);
    revalidatePath("/", "layout");
    revalidatePath("/gallery");
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
