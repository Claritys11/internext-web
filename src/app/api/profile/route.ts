import { NextResponse } from "next/server";
import { getClassProfile, updateClassProfile } from "@/lib/api/services";

export async function GET() {
  try {
    const profile = await getClassProfile();
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateClassProfile(body);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
