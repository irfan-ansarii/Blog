import { z } from "zod";
import { relations, sql } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  boolean,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { users } from "./users";
import { categories } from "./categories";
import { createInsertSchema } from "drizzle-zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  thumbnail: text("thumbnail"),
  content: text("content"),
  contentJson: json("content_json"),
  isProtected: boolean("is_protected").default(false),
  password: text("password").default(""),
  viewCount: integer("view_count").default(0),
  tags: text("tags")
    .array()
    .default(sql`ARRAY[]::text[]`),
  createdBy: integer("created_by").references(() => users.id, {
    onDelete: "set null",
  }),
  updatedBy: integer("updated_by").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  account: one(accounts, {
    fields: [posts.accountId],
    references: [accounts.id],
  }),
  createdBy: one(users, {
    fields: [posts.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [posts.createdBy],
    references: [users.id],
  }),
  categories: many(categories),
}));

export const postsToCategories = pgTable(
  "posts_to_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  })
);

export const postCreateSchema = createInsertSchema(posts).extend({
  tags: z.array(z.string()),
});
