import Link from "next/link";
import RankingTabs from "@/components/RankingTabs";

export const metadata = {
  title: "ランキング — ビワザ",
};

export default function RankingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <h1 className="text-2xl font-bold text-stone-800 mb-6">🏆 ランキング</h1>

      <RankingTabs />
    </div>
  );
}
