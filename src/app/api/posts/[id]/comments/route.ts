import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, comments } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);

  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  return NextResponse.json(result);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);
  const { nickname, body } = await request.json();

  if (!body) {
    return NextResponse.json({ error: "コメント内容が必要です" }, { status: 400 });
  }

  // 文字数制限
  if (body.length > 2000) {
    return NextResponse.json({ error: "コメントは2000文字以内です" }, { status: 400 });
  }
  if (nickname && nickname.length > 30) {
    return NextResponse.json({ error: "ニックネームは30文字以内です" }, { status: 400 });
  }

  const commentRows = await db
    .insert(comments)
    .values({
      postId,
      nickname: nickname || "名無しさん",
      body,
    })
    .returning();

  // Update post: increment comment count + update last_commented_at
  await db.update(posts)
    .set({
      commentCount: sql`${posts.commentCount} + 1`,
      lastCommentedAt: sql`datetime('now', '+9 hours')`,
    })
    .where(eq(posts.id, postId));

  return NextResponse.json(commentRows[0], { status: 201 });
}
