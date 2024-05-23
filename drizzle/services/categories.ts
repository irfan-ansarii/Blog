import { z } from "zod";
import {
  eq,
  and,
  getTableColumns,
  or,
  count,
  inArray,
  ilike,
} from "drizzle-orm";

import { db, findFirst } from "../db";

import {
  categories,
  categoryCreateSchema,
  createPostCategorySchema,
  posts,
  postsCategories,
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
    .leftJoin(postsCategories, eq(postsCategories.categoryId, categories.id))
    .leftJoin(posts, eq(posts.id, postsCategories.postId))
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
  const { ids, accountId, q } = params;

  return await db
    .select({
      ...getTableColumns(categories),
      postCount: count(posts),
    })
    .from(categories)
    .leftJoin(postsCategories, eq(postsCategories.categoryId, categories.id))
    .leftJoin(posts, eq(postsCategories.postId, posts.id))
    .where(
      and(
        accountId ? eq(categories.accountId, accountId) : undefined,
        ids ? inArray(categories.id, ids) : undefined,
        q ? or(ilike(categories.title, `%${q}%`)) : undefined
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

export const createPostCategories = async (
  values: z.infer<typeof createPostCategorySchema>[]
) => {
  return await db
    .insert(postsCategories)
    .values(values)
    .onConflictDoNothing()
    .returning();
};

export const getPostCategories = async (postId: number) => {
  return await db
    .select({
      ...getTableColumns(categories),
    })
    .from(postsCategories)
    .leftJoin(categories, eq(postsCategories.categoryId, categories.id))
    .where(postId ? eq(postsCategories.postId, postId) : undefined)
    .groupBy(categories.id, postsCategories.postId);
};
