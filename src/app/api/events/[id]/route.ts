import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveEvent, deleteEvent } from "@/lib/api/services";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveEvent({ ...body, id });
    revalidatePath("/", "layout");
    revalidatePath("/events");
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteEvent(id);
    revalidatePath("/", "layout");
    revalidatePath("/events");
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
