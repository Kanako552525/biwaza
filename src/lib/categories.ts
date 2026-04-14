export const categories = [
  { slug: "skincare", name: "スキンケア", emoji: "🧴", description: "卵パック、米のとぎ汁洗顔など" },
  { slug: "haircare", name: "ヘアケア", emoji: "💇", description: "ヘアパック、頭皮マッサージなど" },
  { slug: "bodycare", name: "ボディケア", emoji: "🧼", description: "ボディスクラブ、むくみケアなど" },
  { slug: "food", name: "食べ物・飲み物", emoji: "🍵", description: "美肌に良い食材、ドリンクなど" },
  { slug: "diet", name: "ダイエット", emoji: "🏃", description: "エクササイズ、食事法など" },
  { slug: "relax", name: "リラックス・睡眠", emoji: "🛁", description: "入浴法、アロマなど" },
  { slug: "makeup", name: "メイク・ネイル", emoji: "💄", description: "メイクテクニック、セルフネイルなど" },
  { slug: "other", name: "その他", emoji: "✨", description: "その他の美容ワザ" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
