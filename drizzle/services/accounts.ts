import { eq } from "drizzle-orm";
import { db, findFirst } from "../db";
import { accounts, users } from "../schemas";

export const createAccount = async (values: Record<string, string>) => {
  return await db.insert(accounts).values(values).returning().then(findFirst);
};

export const getAccount = async (id: any) => {
  return await db
    .select()
    .from(accounts)
    .leftJoin(users, eq(users.accountId, accounts.id))
    .where(eq(accounts.id, id))
    .then(findFirst);
};

export const getAccounts = async (params: Record<string, string>) => {
  return await db
    .select()
    .from(accounts)
    .leftJoin(users, eq(users.accountId, accounts.id));
};

export const updateAccount = async (
  id: any,
  params: Record<string, string>
) => {
  return await db
    .update(accounts)
    .set(params)
    .where(eq(accounts.id, id))
    .returning()
    .then(findFirst);
};

export const deleteAccount = async (id: any) => {
  return await db
    .delete(accounts)
    .where(eq(accounts.id, id))
    .returning()
    .then(findFirst);
};
