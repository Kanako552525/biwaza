import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="bg-white rounded-xl border border-stone-200 p-4 text-center hover:border-[#6B8E6B]/40 hover:shadow-sm transition-all group"
        >
          <div className="text-2xl mb-1">{cat.emoji}</div>
          <div className="text-sm font-medium text-stone-700 group-hover:text-[#6B8E6B]">
            {cat.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
