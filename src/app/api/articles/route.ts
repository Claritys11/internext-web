import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getArticles, saveArticle } from "@/lib/api/services";
import { Article } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const articles = await getArticles(category);
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Article = await request.json();
    if (!body.id) {
      body.id = `a-${Date.now()}`;
    }
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    const saved = await saveArticle(body);
    revalidatePath("/", "layout");
    revalidatePath("/news");
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
