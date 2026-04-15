import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, votes } from "@/lib/schema";
import { eq, sql, and } from "drizzle-orm";
import { createHash } from "crypto";

function hashIP(ip: string): string {
  return createHash("sha256").update(ip + "biwaza-salt").digest("hex").slice(0, 16);
}

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

  // IPアドレスのハッシュで重複チェック
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIP(ip);

  // 既に投票済みかチェック
  const existing = await db
    .select()
    .from(votes)
    .where(and(eq(votes.postId, postId), eq(votes.ipHash, ipHash)));

  if (existing.length > 0) {
    return NextResponse.json({ error: "既に投票済みです" }, { status: 409 });
  }

  // 投票を記録
  await db.insert(votes).values({ postId, ipHash, type });

  // 投稿のカウントを更新
  const column = type === "helpful" ? posts.helpfulCount : posts.notHelpfulCount;
  await db.update(posts)
    .set({ [type === "helpful" ? "helpfulCount" : "notHelpfulCount"]: sql`${column} + 1` })
    .where(eq(posts.id, postId));

  return NextResponse.json({ success: true });
}
