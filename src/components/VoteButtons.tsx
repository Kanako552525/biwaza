"use client";

import { useState, useEffect } from "react";

export default function VoteButtons({
  postId,
  initialHelpful,
  initialNotHelpful,
}: {
  postId: number;
  initialHelpful: number;
  initialNotHelpful: number;
}) {
  const [helpful, setHelpful] = useState(initialHelpful);
  const [notHelpful, setNotHelpful] = useState(initialNotHelpful);
  const [voted, setVoted] = useState<"helpful" | "not_helpful" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`vote_${postId}`);
    if (stored === "helpful" || stored === "not_helpful") {
      setVoted(stored);
    }
  }, [postId]);

  const handleVote = async (type: "helpful" | "not_helpful") => {
    if (voted) return;

    const res = await fetch(`/api/posts/${postId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    if (res.ok) {
      if (type === "helpful") {
        setHelpful((h) => h + 1);
      } else {
        setNotHelpful((h) => h + 1);
      }
      setVoted(type);
      localStorage.setItem(`vote_${postId}`, type);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote("helpful")}
        disabled={voted !== null}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          voted === "helpful"
            ? "bg-[#6B8E6B] text-white"
            : voted
            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
            : "bg-[#6B8E6B]/10 text-[#6B8E6B] hover:bg-[#6B8E6B]/20"
        }`}
      >
        👍 役に立った <span className="font-bold">{helpful}</span>
      </button>
      <button
        onClick={() => handleVote("not_helpful")}
        disabled={voted !== null}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          voted === "not_helpful"
            ? "bg-stone-500 text-white"
            : voted
            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
            : "bg-stone-100 text-stone-500 hover:bg-stone-200"
        }`}
      >
        👎 役に立たなかった <span className="font-bold">{notHelpful}</span>
      </button>
    </div>
  );
}
