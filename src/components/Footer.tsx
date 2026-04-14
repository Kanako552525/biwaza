import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌿</span>
              <span className="text-lg font-bold text-[#6B8E6B]">ビワザ</span>
            </div>
            <p className="text-sm text-stone-500">
              みんなの美容ワザを共有するコミュニティ
            </p>
          </div>
          <div>
            <h3 className="font-medium text-stone-700 mb-2">カテゴリ</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block text-sm text-stone-500 hover:text-[#6B8E6B]"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-stone-700 mb-2">メニュー</h3>
            <div className="space-y-1">
              <Link href="/ranking" className="block text-sm text-stone-500 hover:text-[#6B8E6B]">
                ランキング
              </Link>
              <Link href="/post/new" className="block text-sm text-stone-500 hover:text-[#6B8E6B]">
                ワザを投稿する
              </Link>
              <Link href="/terms" className="block text-sm text-stone-500 hover:text-[#6B8E6B]">
                利用規約
              </Link>
              <Link href="/privacy" className="block text-sm text-stone-500 hover:text-[#6B8E6B]">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="block text-sm text-stone-500 hover:text-[#6B8E6B]">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-stone-100 text-center text-xs text-stone-400">
          &copy; {new Date().getFullYear()} ビワザ All rights reserved.
        </div>
      </div>
    </footer>
  );
}
