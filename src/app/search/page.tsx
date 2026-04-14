import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { like, or, desc } from "drizzle-orm";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let results: Post[] = [];

  if (query) {
    results = db
      .select()
      .from(posts)
      .where(or(like(posts.title, `%${query}%`), like(posts.body, `%${query}%`)))
      .orderBy(desc(posts.helpfulCount))
      .limit(50)
      .all() as Post[];
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <h1 className="text-xl font-bold text-stone-800 mb-1">
        「{query}」の検索結果
      </h1>
      <p className="text-sm text-stone-500 mb-6">{results.length}件の美容ワザが見つかりました</p>

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
          <p className="text-stone-400 mb-3">
            {query ? "該当する美容ワザが見つかりませんでした" : "検索キーワードを入力してください"}
          </p>
          <Link
            href="/post/new"
            className="text-[#6B8E6B] hover:underline font-medium"
          >
            新しいワザを投稿してみませんか？
          </Link>
        </div>
      )}
    </div>
  );
}
