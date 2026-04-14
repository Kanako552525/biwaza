import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import type { Post } from "@/types";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "たった今";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}日前`;
  return dateStr.slice(0, 10);
}

export default function PostCard({ post }: { post: Post }) {
  const category = getCategoryBySlug(post.category);
  const images: string[] = post.images ? JSON.parse(post.images) : [];
  const thumbnail = images.length > 0 ? images[0] : null;

  return (
    <Link href={`/post/${post.id}`} className="block">
      <article className="bg-white rounded-xl border border-stone-200 p-4 hover:border-[#6B8E6B]/40 hover:shadow-sm transition-all">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {category && (
                <span className="text-xs px-2 py-0.5 bg-[#6B8E6B]/10 text-[#6B8E6B] rounded-full">
                  {category.emoji} {category.name}
                </span>
              )}
              <span className="text-xs text-stone-400">{timeAgo(post.createdAt)}</span>
              {images.length > 0 && (
                <span className="text-xs text-stone-400">📷 {images.length}</span>
              )}
            </div>
            <h3 className="font-medium text-stone-800 mb-1 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-stone-500 line-clamp-2">{post.body}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                👍 {post.helpfulCount}
              </span>
              <span className="flex items-center gap-1">
                💬 {post.commentCount}
              </span>
              <span className="flex items-center gap-1">
                👀 {post.viewCount}
              </span>
              <span className="ml-auto text-stone-400">by {post.nickname}</span>
            </div>
          </div>
          {thumbnail && (
            <div className="flex-shrink-0">
              <img
                src={thumbnail}
                alt=""
                className="w-20 h-20 object-cover rounded-lg border border-stone-200"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
