"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/types";

const tabs = [
  { key: "overall", label: "総合", emoji: "🏆" },
  { key: "helpful", label: "役に立った", emoji: "👍" },
  { key: "comments", label: "コメント数", emoji: "💬" },
  { key: "views", label: "注目度", emoji: "👀" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function RankingTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("overall");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/ranking?type=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <div>
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-[#6B8E6B] text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-stone-400">読み込み中...</div>
      ) : posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post, index) => (
            <div key={post.id} className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-600"
                    : index === 1
                    ? "bg-stone-200 text-stone-600"
                    : index === 2
                    ? "bg-orange-100 text-orange-600"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-stone-400">まだ投稿がありません</p>
      )}
    </div>
  );
}
