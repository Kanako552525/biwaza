import PostForm from "@/components/PostForm";

export const metadata = {
  title: "ワザを投稿する — ビワザ",
};

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">🌿 美容ワザを投稿する</h1>
      <p className="text-sm text-stone-500 mb-6">
        あなたが試してよかった美容テクニックを共有しましょう
      </p>
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <PostForm />
      </div>
    </div>
  );
}
