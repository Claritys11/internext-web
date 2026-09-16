import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveProject, deleteProject } from "@/lib/api/services";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveProject({ ...body, id });
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/members");
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
    await deleteProject(id);
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/members");
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
