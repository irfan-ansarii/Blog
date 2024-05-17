"use server";
import { z } from "zod";

import { db, errorHandler, findFirst } from "../db";
import { accounts, users } from "../schemas";
import { userCreateSchema } from "../schemas";

export async function createUser(values: z.infer<typeof userCreateSchema>) {
  const user = await db.insert(users).values(values).returning();
}

export async function getUser() {
  return await db.query.users.findFirst();
}
