"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Comment } from "@/types";

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

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: number;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const data = {
      nickname: (form.get("nickname") as string) || "名無しさん",
      body: form.get("body") as string,
    };

    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const comment = await res.json();
      setComments([...comments, comment]);
      e.currentTarget.reset();
      router.refresh();
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-stone-800 mb-4">
        💬 コメント ({comments.length})
      </h2>

      {comments.length > 0 ? (
        <div className="space-y-3 mb-6">
          {comments.map((comment, index) => (
            <div key={comment.id} className="bg-stone-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[#6B8E6B]">
                  {index + 1}.
                </span>
                <span className="text-sm font-medium text-stone-700">
                  {comment.nickname}
                </span>
                <span className="text-xs text-stone-400">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-stone-600 whitespace-pre-wrap">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-400 mb-6">
          まだコメントはありません。最初のコメントを書いてみましょう！
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
        <div>
          <input
            name="nickname"
            type="text"
            placeholder="ニックネーム（任意）"
            className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
          />
        </div>
        <div>
          <textarea
            name="body"
            required
            rows={3}
            placeholder="コメントを書く..."
            className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B] resize-y"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#6B8E6B] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#5a7a5a] transition-colors disabled:opacity-50"
        >
          {submitting ? "送信中..." : "コメントする"}
        </button>
      </form>
    </div>
  );
}
