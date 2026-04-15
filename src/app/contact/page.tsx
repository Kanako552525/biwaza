"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const res = await fetch("https://formspree.io/f/myklkplb", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">お問い合わせ</h1>
        <p className="text-sm text-stone-500 mb-6">
          ご質問・ご要望・投稿の削除依頼など、お気軽にお問い合わせください。
        </p>

        {submitted ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🌿</div>
            <h2 className="text-lg font-bold text-stone-800 mb-2">
              お問い合わせありがとうございます
            </h2>
            <p className="text-sm text-stone-500 mb-4">
              内容を確認の上、必要に応じてご返信いたします。
            </p>
            <Link
              href="/"
              className="inline-block bg-[#6B8E6B] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#5a7a5a] transition-colors"
            >
              トップに戻る
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                お問い合わせの種類 <span className="text-red-400">*</span>
              </label>
              <select
                name="type"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
              >
                <option value="">選んでください</option>
                <option value="question">サイトに関するご質問</option>
                <option value="delete">投稿の削除依頼</option>
                <option value="report">不適切な投稿の報告</option>
                <option value="feedback">ご意見・ご要望</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                お名前（ニックネーム可）
              </label>
              <input
                name="name"
                type="text"
                placeholder="名無しさん"
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
              />
              <p className="text-xs text-stone-400 mt-1">
                返信が必要な場合のみ使用します。サイト上に公開されることはありません。
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                お問い合わせ内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="お問い合わせ内容をご記入ください..."
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B] resize-y"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#6B8E6B] text-white py-3 rounded-lg font-medium hover:bg-[#5a7a5a] transition-colors disabled:opacity-50"
            >
              {sending ? "送信中..." : "送信する"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
