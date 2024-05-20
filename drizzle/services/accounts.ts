import { eq } from "drizzle-orm";
import { db, findFirst } from "../db";
import { accounts, users } from "../schemas";

export const createAccount = async (values: Record<string, string>) => {
  const { accountName, firstName, lastName, phone, email, password } = values;

  const account = await db
    .insert(accounts)
    .values({ name: accountName })
    .returning()
    .then(findFirst);

  const user = await db
    .insert(users)
    .values({
      accountId: account.id,
      firstName,
      lastName,
      phone,
      email,
      password,
    })
    .returning()
    .then(findFirst);
  return { ...account, ...user };
  // return await db.transaction(async (tx) => {

  // });
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
