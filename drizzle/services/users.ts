import { z } from "zod";
import { eq, getTableColumns, or, and } from "drizzle-orm";
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
  const { email } = params || {};

  return await db
    .select({
      ...getTableColumns(users),
      accountName: accounts.name,
      plan: accounts.plan,
      planCreatedAt: accounts.planCreatedAt,
      planExpiresAt: accounts.planExpiresAt,
    })
    .from(users)
    .leftJoin(accounts, eq(users.accountId, accounts.id))
    .where(
      or(
        id ? eq(users.id, id) : undefined,

        email ? eq(users.email, email) : undefined
      )
    )
    .then(findFirst);
}

export async function getUsers(params: Record<string, any>) {
  const { accountId, firstName, lastName, email, accountName } = params;

  return await db
    .select({
      ...getTableColumns(users),
      accountName: accounts.name,
      plan: accounts.plan,
      planCreatedAt: accounts.planCreatedAt,
      planExpiresAt: accounts.planExpiresAt,
    })
    .from(users)
    .leftJoin(accounts, eq(accounts.id, users.accountId))
    .where(
      and(
        accountId ? eq(users.accountId, accountId) : undefined,
        or(
          firstName ? eq(users.firstName, firstName) : undefined,
          lastName ? eq(users.lastName, lastName) : undefined,
          email ? eq(users.email, email) : undefined,
          accountName ? eq(accounts.name, accountName) : undefined
        )
      )
    );
}

export const updateUser = async (id: any, params: Record<string, any>) => {
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
