import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { posts, comments } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { getCategoryBySlug } from "@/lib/categories";
import VoteButtons from "@/components/VoteButtons";
import CommentSection from "@/components/CommentSection";
import ImageGallery from "@/components/ImageGallery";
import type { Post, Comment } from "@/types";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);

  // Increment view count
  await db.update(posts)
    .set({ viewCount: sql`${posts.viewCount} + 1` })
    .where(eq(posts.id, postId));

  const rows = await db.select().from(posts).where(eq(posts.id, postId));
  const post = rows[0] as Post | undefined;

  if (!post) {
    notFound();
  }

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt) as Comment[];

  const category = getCategoryBySlug(post.category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <article className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-xs px-2 py-0.5 bg-[#6B8E6B]/10 text-[#6B8E6B] rounded-full hover:bg-[#6B8E6B]/20"
            >
              {category.emoji} {category.name}
            </Link>
          )}
          <span className="text-xs text-stone-400">{post.createdAt}</span>
          <span className="text-xs text-stone-400">👀 {post.viewCount}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
          {post.title}
        </h1>

        <div className="text-sm text-stone-600 whitespace-pre-wrap leading-relaxed mb-4">
          {post.body}
        </div>

        {post.images && (
          <ImageGallery images={JSON.parse(post.images)} />
        )}

        <div className="flex items-center justify-between border-t border-stone-100 pt-4">
          <VoteButtons
            postId={post.id}
            initialHelpful={post.helpfulCount}
            initialNotHelpful={post.notHelpfulCount}
          />
          <span className="text-sm text-stone-400">by {post.nickname}</span>
        </div>
      </article>

      {/* Ad placeholder */}
      <div className="bg-stone-100 rounded-xl border border-dashed border-stone-300 p-6 mb-6 text-center">
        <p className="text-xs text-stone-400">広告</p>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <CommentSection postId={post.id} initialComments={postComments} />
      </div>
    </div>
  );
}
