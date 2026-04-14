import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);

  // Increment view count
  db.update(posts)
    .set({ viewCount: sql`${posts.viewCount} + 1` })
    .where(eq(posts.id, postId))
    .run();

  const post = db.select().from(posts).where(eq(posts.id, postId)).get();

  if (!post) {
    return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
  }

  return NextResponse.json(post);
}
