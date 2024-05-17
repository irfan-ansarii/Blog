import { z } from "zod";
import { eq } from "drizzle-orm";
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

export async function getCategory(id: any) {
  return await db
    .select()
    .from(categories)
    .innerJoin(
      postsToCategories,
      eq(postsToCategories.categoryId, categories.id)
    )
    .leftJoin(posts, eq(posts.id, postsToCategories.postId))
    .where(eq(categories.id, id))
    .then(findFirst);
}

export async function getCategoryBySlug(slug: string) {
  return await db
    .select()
    .from(categories)
    .innerJoin(
      postsToCategories,
      eq(postsToCategories.categoryId, categories.id)
    )
    .leftJoin(posts, eq(posts.id, postsToCategories.postId))
    .where(eq(categories.slug, slug))
    .then(findFirst);
}

export async function getCategories(params: Record<string, string>) {
  return await db
    .select()
    .from(categories)
    .innerJoin(
      postsToCategories,
      eq(postsToCategories.categoryId, categories.id)
    )
    .leftJoin(posts, eq(posts.id, postsToCategories.postId))

    .then(findFirst);
}

export const updateCategory = async (
  id: any,
  params: Record<string, string>
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
