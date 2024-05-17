import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { accounts } from "./accounts";
import { posts } from "./posts";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id").references(() => accounts.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
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

export const categoriesRelations = relations(categories, ({ one }) => ({
  account: one(accounts, {
    fields: [categories.accountId],
    references: [accounts.id],
  }),
  post: one(posts, {
    fields: [categories.id],
    references: [posts.id],
  }),
  createdBy: one(users, {
    fields: [categories.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [categories.createdBy],
    references: [users.id],
  }),
}));
