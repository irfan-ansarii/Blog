import { relations } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { users } from "./users";
import { categories } from "./categories";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  title: text("title"),
  slug: text("slug").unique(),
  thumbnail: text("thumbnail"),
  content: text("content"),
  contentJson: json("content_json"),
  isProtected: boolean("is_protected").default(false),
  password: text("password"),
  createdBy: integer("created_by").references(() => users.id, {
    onDelete: "cascade",
  }),
  updatedBy: integer("updated_by").references(() => users.id, {
    onDelete: "cascade",
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
