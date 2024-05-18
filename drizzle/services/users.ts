import { z } from "zod";
import { eq, or } from "drizzle-orm";
import { db, findFirst } from "../db";
import { accounts, users } from "../schemas";
import { userCreateSchema } from "../schemas";

export async function createUser(values: z.infer<typeof userCreateSchema>) {
  return await db
    .insert(users)
    .values({ ...values })
    .returning()
    .then(findFirst);
}

export async function getUser(id: any, params?: Record<string, string>) {
  const { phone, email } = params || {};
  return await db
    .select()
    .from(users)
    .leftJoin(accounts, eq(users.accountId, accounts.id))
    .where(
      or(
        id ? eq(users.id, id) : undefined,
        phone ? eq(users.phone, phone) : undefined,
        email ? eq(users.email, email) : undefined
      )
    )
    .then(findFirst);
}

export async function getUsers(params: Record<string, string>) {
  return await db
    .select()
    .from(users)
    .leftJoin(accounts, eq(users.accountId, accounts.id))
    .then(findFirst);
}

export const updateUser = async (id: any, params: Record<string, string>) => {
  return await db
    .update(users)
    .set(params)
    .where(eq(users.id, id))
    .returning()
    .then(findFirst);
};

export const deleteUser = async (id: any) => {
  return await db
    .delete(users)
    .where(eq(users.id, id))
    .returning()
    .then(findFirst);
};
