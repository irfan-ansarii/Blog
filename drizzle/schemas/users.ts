import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  accountId: integer("accountId"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone").unique(),
  email: text("email").unique(),
  password: text("password"),
  otp: text("otp"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one }) => ({
  author: one(accounts, {
    fields: [users.accountId],
    references: [accounts.id],
  }),
}));
