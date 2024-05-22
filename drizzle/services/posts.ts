import { z } from "zod";
import { eq, or, and, getTableColumns, asc, desc, sql } from "drizzle-orm";

import { db, findFirst } from "../db";
import {
  categories,
  createPostToCategorySchema,
  postCreateSchema,
  posts,
  postsToCategories,
} from "../schemas";

export async function createPost(values: z.infer<typeof postCreateSchema>) {
  return await db
    .insert(posts)
    .values({ ...values })
    .returning()
    .then(findFirst);
}

export const linkCategoryToPost = async (
  values: z.infer<typeof createPostToCategorySchema>[]
) => {
  return await db.insert(postsToCategories).values(values).returning();
};

export async function getPost(id: any, params?: Record<string, any>) {
  const { slug, accountId } = params || {};

  return await db
    .select({
      ...getTableColumns(posts),
      ...getTableColumns(categories),
    })
    .from(posts)
    .leftJoin(postsToCategories, eq(postsToCategories.postId, posts.id))
    .leftJoin(categories, eq(categories.id, postsToCategories.categoryId))
    .where(
      and(
        accountId ? eq(posts.accountId, accountId) : undefined,
        or(
          id ? eq(posts.id, id) : undefined,
          slug ? eq(posts.slug, slug) : undefined
        )
      )
    )
    .then(findFirst);
}

export async function getPosts(params: Record<string, any>) {
  const {
    title,
    slug,
    category,
    categorySlug,
    accountId,
    page,
    limit,
    order,
    sort,
  } = params;

  const sq = db.select().from(posts).as("sq");

  const result = await db
    .select()
    .from(postsToCategories)
    .leftJoin(sq, eq(postsToCategories.postId, sq.id));
  return result;
}

export const updatePost = async (id: any, params: Record<string, string>) => {
  return await db
    .update(posts)
    .set(params)
    .where(eq(posts.id, id))
    .returning()
    .then(findFirst);
};

export const deletePost = async (id: any) => {
  return await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning()
    .then(findFirst);
};
