import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { categories } from "@/lib/categories";

export const revalidate = 3600;

const BASE_URL = "https://biwaza.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/ranking`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/search`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/company`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const rows = await db
    .select({ id: posts.id, createdAt: posts.createdAt, lastCommentedAt: posts.lastCommentedAt })
    .from(posts)
    .orderBy(desc(posts.id))
    .limit(5000);

  // SQLiteのJST文字列（例: "2026-04-22 10:30:00"）をDateに変換
  const toDate = (s: string | null | undefined): Date => {
    if (!s) return new Date();
    // JSTとして解釈するため "T" と "+09:00" を付与
    const iso = s.includes("T") ? s : s.replace(" ", "T") + "+09:00";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const postEntries: MetadataRoute.Sitemap = rows.map((r) => ({
    url: `${BASE_URL}/post/${r.id}`,
    lastModified: toDate(r.lastCommentedAt ?? r.createdAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
