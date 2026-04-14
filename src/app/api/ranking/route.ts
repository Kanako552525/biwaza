import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "overall";

  let query;

  switch (type) {
    case "helpful":
      query = db.select().from(posts).orderBy(desc(posts.helpfulCount));
      break;
    case "comments":
      query = db.select().from(posts).orderBy(desc(posts.commentCount));
      break;
    case "views":
      query = db.select().from(posts).orderBy(desc(posts.viewCount));
      break;
    case "overall":
    default:
      query = db
        .select()
        .from(posts)
        .orderBy(
          desc(
            sql`${posts.helpfulCount} * 3 + ${posts.commentCount} * 2 + ${posts.viewCount} * 0.01`
          )
        );
      break;
  }

  const results = await query.limit(20);
  return NextResponse.json(results);
}
