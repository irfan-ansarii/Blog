"use server";
import { db, errorHandler, findFirst } from "../db";
import { accounts, users } from "../schemas";

export async function createUser() {
  return errorHandler(async () => {
    const acc = await db
      .insert(accounts)
      .values({
        name: "Account Name",
      })
      .returning()
      .then(findFirst);

    const user = await db
      .insert(users)
      .values({
        firstName: "Irfan",
        lastName: "Ansari",
        phone: " 9958367688",
        email: "irfanansari",
        accountId: acc.id,
      })
      .returning();

    return user;
  });
}

export async function getUser() {
  return await db.query.users.findFirst();
}
