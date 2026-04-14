"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";

export default function PostForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalFiles = imageFiles.length + files.length;

    if (totalFiles > 4) {
      alert("画像は4枚までです");
      return;
    }

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews(previews.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.currentTarget);

    // Upload images first
    let imagePaths: string[] = [];
    if (imageFiles.length > 0) {
      const uploadData = new FormData();
      imageFiles.forEach((file) => uploadData.append("images", file));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        alert(err.error || "画像のアップロードに失敗しました");
        setSubmitting(false);
        return;
      }

      const uploadResult = await uploadRes.json();
      imagePaths = uploadResult.paths;
    }

    const data = {
      title: form.get("title") as string,
      body: form.get("body") as string,
      nickname: (form.get("nickname") as string) || "名無しさん",
      category: form.get("category") as string,
      images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const post = await res.json();
      router.push(`/post/${post.id}`);
    } else {
      setSubmitting(false);
      alert("投稿に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          ニックネーム（任意）
        </label>
        <input
          name="nickname"
          type="text"
          placeholder="名無しさん"
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          カテゴリ <span className="text-red-400">*</span>
        </label>
        <select
          name="category"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
        >
          <option value="">カテゴリを選んでください</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          タイトル <span className="text-red-400">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="例：卵白パックで毛穴がツルツルに！"
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          美容ワザの内容 <span className="text-red-400">*</span>
        </label>
        <textarea
          name="body"
          required
          rows={8}
          placeholder="やり方、効果、注意点など、詳しく書いてみてください..."
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-[#6B8E6B] focus:ring-1 focus:ring-[#6B8E6B] resize-y"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          画像（最大4枚、各5MBまで）
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#6B8E6B] hover:bg-[#6B8E6B]/5 transition-colors"
        >
          <div className="text-3xl mb-2">📷</div>
          <p className="text-sm text-stone-500">
            クリックして画像を選択
          </p>
          <p className="text-xs text-stone-400 mt-1">
            JPEG, PNG, GIF, WebP対応
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Preview */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt={`プレビュー ${i + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-stone-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#6B8E6B] text-white py-3 rounded-lg font-medium hover:bg-[#5a7a5a] transition-colors disabled:opacity-50"
      >
        {submitting ? "投稿中..." : "ワザを投稿する 🌿"}
      </button>
    </form>
  );
}
