"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-[#6B8E6B]">ビワザ</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="美容ワザを検索..."
              className="w-full px-4 py-2 rounded-full border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
            />
          </form>

          <div className="flex items-center gap-3">
            <Link
              href="/post/new"
              className="bg-[#6B8E6B] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5a7a5a] transition-colors"
            >
              投稿する
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 text-stone-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category navigation */}
        <nav className="hidden sm:flex gap-1 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-sm text-stone-600 hover:text-[#6B8E6B] hover:bg-[#6B8E6B]/10 rounded-full whitespace-nowrap transition-colors"
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="美容ワザを検索..."
                className="w-full px-4 py-2 rounded-full border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-[#6B8E6B]"
              />
            </form>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 text-sm text-stone-600 hover:text-[#6B8E6B] hover:bg-[#6B8E6B]/10 rounded-full transition-colors"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
