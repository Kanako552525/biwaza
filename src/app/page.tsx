import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";
import PostCard from "@/components/PostCard";
import CategoryList from "@/components/CategoryList";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export default function Home() {
  const activePosts = db
    .select()
    .from(posts)
    .orderBy(desc(sql`COALESCE(${posts.lastCommentedAt}, ${posts.createdAt})`))
    .limit(20)
    .all() as Post[];

  const topPosts = db
    .select()
    .from(posts)
    .orderBy(desc(posts.helpfulCount))
    .limit(5)
    .all() as Post[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
          🌿 みんなの美容ワザを共有しよう
        </h1>
        <p className="text-stone-500 mb-4">
          試してよかった美容テクニックを投稿して、みんなで美しくなろう
        </p>
        <Link
          href="/post/new"
          className="inline-block bg-[#6B8E6B] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#5a7a5a] transition-colors"
        >
          ワザを投稿する
        </Link>
      </div>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-stone-800 mb-3">カテゴリ</h2>
        <CategoryList />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-stone-800">新着・注目のワザ</h2>
            <Link href="/ranking" className="text-sm text-[#6B8E6B] hover:underline">
              ランキング →
            </Link>
          </div>
          {activePosts.length > 0 ? (
            <div className="space-y-3">
              {activePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
              <p className="text-stone-400 mb-3">まだ投稿がありません</p>
              <Link
                href="/post/new"
                className="text-[#6B8E6B] hover:underline font-medium"
              >
                最初の美容ワザを投稿してみませんか？
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="bg-stone-100 rounded-xl border border-dashed border-stone-300 p-6 mb-4 text-center">
            <p className="text-xs text-stone-400">広告</p>
          </div>

          {topPosts.length > 0 && (
            <div className="bg-white rounded-xl border border-stone-200 p-4">
              <h3 className="font-bold text-stone-800 mb-3">👍 人気のワザ</h3>
              <div className="space-y-2">
                {topPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <span
                      className={`text-xs font-bold w-5 text-center ${
                        i === 0
                          ? "text-yellow-500"
                          : i === 1
                          ? "text-stone-400"
                          : i === 2
                          ? "text-orange-400"
                          : "text-stone-300"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-stone-700 line-clamp-2">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
