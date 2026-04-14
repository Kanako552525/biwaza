import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  nickname: text("nickname").notNull().default("名無しさん"),
  category: text("category").notNull(),
  helpfulCount: integer("helpful_count").notNull().default(0),
  notHelpfulCount: integer("not_helpful_count").notNull().default(0),
  viewCount: integer("view_count").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  images: text("images"), // JSON array of image paths
  lastCommentedAt: text("last_commented_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now', 'localtime'))`),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  nickname: text("nickname").notNull().default("名無しさん"),
  body: text("body").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now', 'localtime'))`),
});
