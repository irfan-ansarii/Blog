import { z } from "zod";
import { eq, or, and, getTableColumns, asc, desc } from "drizzle-orm";

import { db, findFirst } from "../db";
import {
  categories,
  postCreateSchema,
  posts,
  postsToCategories,
} from "../schemas";

export async function createPost(values: z.infer<typeof postCreateSchema>) {
  const post = await db
    .insert(posts)
    .values({ ...values })
    .returning()
    .then(findFirst);

  // await db.insert(postsToCategories).values({
  //   postId: post.id,
  //   categoryId: 1,
  // });

  return post;
}

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
          title ? eq(posts.title, title) : undefined,
          slug ? eq(posts.slug, slug) : undefined,
          category ? eq(categories.title, category) : undefined,
          categorySlug ? eq(categories.slug, categorySlug) : undefined
        )
      )
    )
    .limit(limit)
    .offset(0)
    .orderBy(desc(posts.id));
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
