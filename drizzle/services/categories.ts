import { z } from "zod";
import { eq, and, getTableColumns, or, count, sql, inArray } from "drizzle-orm";
import { db, findFirst } from "../db";
import {
  categories,
  categoryCreateSchema,
  posts,
  postsToCategories,
} from "../schemas";

export async function createCategory(
  values: z.infer<typeof categoryCreateSchema>
) {
  return await db
    .insert(categories)
    .values({ ...values })
    .returning()
    .then(findFirst);
}

export async function getCategory(id: any, params?: Record<string, any>) {
  const { slug } = params || {};

  return await db
    .select({
      ...getTableColumns(categories),
      postCount: count(posts),
    })
    .from(categories)
    .leftJoin(
      postsToCategories,
      eq(postsToCategories.categoryId, categories.id)
    )
    .leftJoin(posts, eq(posts.id, postsToCategories.postId))
    .where(
      or(
        id ? eq(categories.id, id) : undefined,
        slug ? eq(categories.slug, slug) : undefined
      )
    )
    .groupBy(categories.id)
    .then(findFirst);
}

export async function getCategories(params: Record<string, any>) {
  const { ids, accountId, title, slug } = params;

  return await db
    .select({
      ...getTableColumns(categories),
      postCount: count(posts),
    })
    .from(categories)
    .leftJoin(
      postsToCategories,
      eq(postsToCategories.categoryId, categories.id)
    )
    .leftJoin(posts, eq(posts.id, postsToCategories.postId))
    .where(
      and(
        accountId ? eq(categories.accountId, accountId) : undefined,
        or(
          title ? eq(categories.title, title) : undefined,
          slug ? eq(categories.slug, slug) : undefined,
          ids ? inArray(categories.id, ids) : undefined
        )
      )
    )
    .groupBy(categories.id);
}

export const updateCategory = async (
  id: any,
  params: z.infer<typeof categoryCreateSchema>
) => {
  return await db
    .update(categories)
    .set(params)
    .where(eq(categories.id, id))
    .returning()
    .then(findFirst);
};

export const deleteCategory = async (id: any) => {
  return await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning()
    .then(findFirst);
};
