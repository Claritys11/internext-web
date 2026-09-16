import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProjects, saveProject } from "@/lib/api/services";
import { Project } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const projects = await getProjects(category);
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Project = await request.json();
    if (!body.id) {
      body.id = `p-${Date.now()}`;
    }
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    const saved = await saveProject(body);
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/members");
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
