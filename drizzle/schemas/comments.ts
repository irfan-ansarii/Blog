import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { accounts } from "./accounts";
import { posts } from "./posts";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, {
      onDelete: "cascade",
    }),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, {
      onDelete: "cascade",
    }),
  parentId: integer("parent_id"),
  comment: text("comment"),
  createdBy: integer("created_by").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const commentRelations = relations(comments, ({ one, many }) => ({
  account: one(accounts, {
    fields: [comments.accountId],
    references: [accounts.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  createdBy: one(users, {
    fields: [comments.createdBy],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
}));

export const createCommentSchema = createInsertSchema(comments);
