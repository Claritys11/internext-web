import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getMembers, saveMember } from "@/lib/api/services";
import { Member } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("role") || undefined;
    const members = await getMembers(filter);
    return NextResponse.json(members);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Member = await request.json();
    if (!body.id) {
      body.id = `m-${Date.now()}`;
    }
    const saved = await saveMember(body);
    revalidatePath("/", "layout");
    revalidatePath("/members");
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
