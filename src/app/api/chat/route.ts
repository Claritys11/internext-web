import { NextResponse } from "next/server";
import {
  getChatChannels,
  getChatMessages,
  saveChatMessage,
  deleteChatMessage,
} from "@/lib/api/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get("channelId") || undefined;

    const [channels, messages] = await Promise.all([
      getChatChannels(),
      getChatMessages(channelId),
    ]);

    return NextResponse.json({ channels, messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.message || !body.channelId) {
      return NextResponse.json(
        { error: "Message and channelId are required" },
        { status: 400 }
      );
    }

    const saved = await saveChatMessage({
      channelId: body.channelId,
      name: body.name || "Tamu Pengunjung",
      role: body.role || "Umum",
      message: body.message,
      timestamp: body.timestamp || "Baru saja",
      isBot: body.isBot || false,
      replyTo: body.replyTo,
      reactions: body.reactions || [],
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id parameter is required" }, { status: 400 });
    }
    await deleteChatMessage(id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
