import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);
  const { type } = await request.json();

  if (type !== "helpful" && type !== "not_helpful") {
    return NextResponse.json({ error: "無効な投票タイプ" }, { status: 400 });
  }

  const column = type === "helpful" ? posts.helpfulCount : posts.notHelpfulCount;

  await db.update(posts)
    .set({ [type === "helpful" ? "helpfulCount" : "notHelpfulCount"]: sql`${column} + 1` })
    .where(eq(posts.id, postId));

  return NextResponse.json({ success: true });
}
