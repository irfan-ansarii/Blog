import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: text("name"),
  plan: text("plan").$type<["starter", "pro", "enterprise"]>(),
  planCreatedAt: timestamp("plan_created_at"),
  planExpiresAt: timestamp("plan_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  users: many(users),
}));
