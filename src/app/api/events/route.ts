import { NextResponse } from "next/server";
import { getEvents, saveEvent } from "@/lib/api/services";
import { EventItem } from "@/lib/types";

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: EventItem = await request.json();
    if (!body.id) {
      body.id = `ev-${Date.now()}`;
    }
    const saved = await saveEvent(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
