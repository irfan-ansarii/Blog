import { z } from "zod";
import { eq, and, getTableColumns, or } from "drizzle-orm";
import { db, findFirst } from "../db";
import { comments, createCommentSchema } from "../schemas/comments";
import { users } from "../schemas";

const updateCommentSchema = createCommentSchema.omit({
  postId: true,
  accountId: true,
  createdBy: true,
});

export const createComment = async (
  values: z.infer<typeof createCommentSchema>
) => {
  return await db.insert(comments).values(values).returning().then(findFirst);
};

export const getComments = async (params?: Record<string, any>) => {
  const { accountId } = params || {};
  return await db
    .select({
      ...getTableColumns(comments),
      createdBy: getTableColumns(users),
    })
    .from(comments)
    .leftJoin(users, eq(users.id, comments.createdBy))
    .where(and(accountId ? eq(comments.accountId, accountId) : undefined));
};

export const getComment = async (id: any, params?: Record<string, any>) => {
  const { accountId } = params || {};

  return await db
    .select({
      ...getTableColumns(comments),
      createdBy: getTableColumns(users),
    })
    .from(comments)
    .leftJoin(users, eq(users.id, comments.createdBy))
    .where(
      and(
        accountId ? eq(comments.accountId, accountId) : undefined,
        or(id ? eq(comments.id, id) : undefined)
      )
    )
    .then(findFirst);
};

export const updateComment = async (
  id: any,
  values: z.infer<typeof updateCommentSchema>
) => {
  return await db
    .update(comments)
    .set(values)
    .where(eq(comments.id, id))
    .returning()
    .then(findFirst);
};

export const deleteComment = async (id: any) => {
  return await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning()
    .then(findFirst);
};
