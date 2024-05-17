import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, findFirst } from "../db";
import {
  categories,
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

export async function getPost(id: any) {
  return await db
    .select()
    .from(posts)
    .innerJoin(postsToCategories, eq(postsToCategories.postId, posts.id))
    .leftJoin(categories, eq(categories.id, postsToCategories.categoryId))
    .where(eq(posts.id, id))
    .then(findFirst);
}
export async function getPostBySlug(slug: string) {
  return await db
    .select()
    .from(posts)
    .innerJoin(postsToCategories, eq(postsToCategories.postId, posts.id))
    .leftJoin(categories, eq(categories.id, postsToCategories.categoryId))
    .where(eq(posts.slug, slug))
    .then(findFirst);
}

export async function getPosts(params: Record<string, string>) {
  return await db
    .select()
    .from(posts)
    .innerJoin(postsToCategories, eq(postsToCategories.postId, posts.id))
    .leftJoin(categories, eq(categories.id, postsToCategories.categoryId))
    .then(findFirst);
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
