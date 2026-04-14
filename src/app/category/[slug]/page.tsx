import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, desc, sql } from "drizzle-orm";
import { getCategoryBySlug } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.category, slug))
    .orderBy(desc(sql`COALESCE(${posts.lastCommentedAt}, ${posts.createdAt})`))
    .limit(50) as Post[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">
          {category.emoji} {category.name}
        </h1>
        <p className="text-sm text-stone-500 mt-1">{category.description}</p>
      </div>

      {categoryPosts.length > 0 ? (
        <div className="space-y-3">
          {categoryPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
          <p className="text-stone-400 mb-3">
            このカテゴリにはまだ投稿がありません
          </p>
          <Link
            href="/post/new"
            className="text-[#6B8E6B] hover:underline font-medium"
          >
            最初のワザを投稿してみませんか？
          </Link>
        </div>
      )}
    </div>
  );
}
