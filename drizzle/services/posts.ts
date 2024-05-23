import { z } from "zod";
import {
  eq,
  or,
  and,
  getTableColumns,
  asc,
  desc,
  ilike,
  count,
} from "drizzle-orm";

import { db, findFirst } from "../db";
import { postCreateSchema, posts, postsCategories } from "../schemas";

export async function createPost(values: z.infer<typeof postCreateSchema>) {
  return await db
    .insert(posts)
    .values({ ...values })
    .returning()
    .then(findFirst);
}

export async function getPost(id: any, params?: Record<string, any>) {
  const { slug, accountId } = params || {};

  return await db
    .select({
      ...getTableColumns(posts),
      categoriesCount: count(postsCategories),
    })
    .from(posts)
    .leftJoin(postsCategories, eq(postsCategories.postId, posts.id))
    .where(
      and(
        accountId ? eq(posts.accountId, accountId) : undefined,
        or(
          id ? eq(posts.id, id) : undefined,
          slug ? eq(posts.slug, slug) : undefined
        )
      )
    )
    .groupBy(posts.id)
    .then(findFirst);
}

export async function getPosts(params: Record<string, any>) {
  const {
    q,
    accountId,
    page = 1,
    limit = 10,
    order = "id",
    direction,
  } = params;

  // filters
  const filters = and(
    accountId ? eq(posts.accountId, accountId) : undefined,
    q
      ? or(ilike(posts.title, `%${q}%`), ilike(posts.content, `%${q}%`))
      : undefined
  );

  // get posts
  const results = await db
    .select({
      ...getTableColumns(posts),
      categoriesCount: count(postsCategories),
    })
    .from(posts)
    .leftJoin(postsCategories, eq(postsCategories.postId, posts.id))
    .where(filters)
    .limit(limit)
    .orderBy(direction === "asc" ? asc(order) : desc(order))
    .offset((page - 1) * limit)
    .groupBy(posts.id);

  // get total record count
  const recordCount = await db
    .select({ total: count() })
    .from(posts)
    .where(filters)
    .then(findFirst);

  return {
    data: results,
    meta: {
      page: parseInt(page),
      size: limit,
      pages: Math.ceil(recordCount.total / limit),
      ...recordCount,
    },
  };
}

export const updatePost = async (
  id: any,
  params: z.infer<typeof postCreateSchema>
) => {
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
