import { NextResponse } from "next/server";
import { toggleChatReaction } from "@/lib/api/services";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messageId, emoji } = body;
    if (!messageId || !emoji) {
      return NextResponse.json(
        { error: "messageId and emoji are required" },
        { status: 400 }
      );
    }

    const updated = await toggleChatReaction(messageId, emoji);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
