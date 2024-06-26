import { z } from "zod";

import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";

import { createInsertSchema } from "drizzle-zod";

const roles = ["super", "admin", "author", "editor", "guest"] as const;

const status = ["invited", "active", "blocked"] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  accountId: integer("accountId").references(() => accounts.id, {
    onDelete: "cascade",
  }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  role: text("role", { enum: roles }).default("guest").notNull(),
  status: text("status", { enum: status }).default("active").notNull(),
  password: text("password"),
  otp: text("otp"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one }) => ({
  account: one(accounts, {
    fields: [users.accountId],
    references: [accounts.id],
  }),
}));

export const userCreateSchema = createInsertSchema(users, {
  email: z.string().email({ message: "Invalid email" }),
});
