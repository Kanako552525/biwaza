import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, like, or, eq } from "drizzle-orm";
import { categories } from "@/lib/categories";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") || "active";

  let query = db.select().from(posts);

  if (category) {
    query = query.where(eq(posts.category, category)) as typeof query;
  }

  if (q) {
    query = query.where(
      or(like(posts.title, `%${q}%`), like(posts.body, `%${q}%`))
    ) as typeof query;
  }

  if (sort === "active") {
    query = query.orderBy(desc(posts.lastCommentedAt), desc(posts.createdAt)) as typeof query;
  } else if (sort === "new") {
    query = query.orderBy(desc(posts.createdAt)) as typeof query;
  }

  const results = await query.limit(50);
  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, body: postBody, nickname, category, images } = body;

  if (!title || !postBody || !category) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  // 文字数制限
  if (title.length > 100) {
    return NextResponse.json({ error: "タイトルは100文字以内です" }, { status: 400 });
  }
  if (postBody.length > 5000) {
    return NextResponse.json({ error: "本文は5000文字以内です" }, { status: 400 });
  }
  if (nickname && nickname.length > 30) {
    return NextResponse.json({ error: "ニックネームは30文字以内です" }, { status: 400 });
  }

  // カテゴリ検証
  const validSlugs = categories.map((c) => c.slug);
  if (!validSlugs.includes(category)) {
    return NextResponse.json({ error: "無効なカテゴリです" }, { status: 400 });
  }

  const rows = await db
    .insert(posts)
    .values({
      title,
      body: postBody,
      nickname: nickname || "名無しさん",
      category,
      images: images || null,
    })
    .returning();

  return NextResponse.json(rows[0], { status: 201 });
}
