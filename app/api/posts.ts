import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { postCreateSchema } from "@/drizzle/schemas";
import {
  createPostCategories,
  getCategories,
  getPostCategories,
} from "@/drizzle/services/categories";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@/drizzle/services/posts";

import { DELETE_ROLES } from "./utils";

const postSchema = postCreateSchema.omit({ accountId: true }).extend({
  categories: z.array(z.string().or(z.number())),
});

const createCategoriesSchema = z.object({
  categories: z.array(z.string().or(z.number())),
});

const app = new Hono()
  .post("/", zValidator("json", postSchema), async (c) => {
    const { id, accountId } = c.get("jwtPayload");

    const values = c.req.valid("json");

    const post = await getPost(undefined, {
      slug: values.slug,
    });

    if (post) {
      throw new HTTPException(400, { message: "Slug already in use" });
    }

    // create post
    const result = await createPost({
      ...values,
      accountId,
      createdBy: id,
      updatedBy: id,
    });

    // get valid category ids
    const categories = await getCategories({
      accountId,
      ids: values.categories,
    });

    // organize category ids and post id
    const categoriesCreate = categories.map((value) => ({
      postId: result.id,
      categoryId: value.id!,
    }));

    // link categories to post
    await createPostCategories(categoriesCreate);

    return c.json({
      success: true,
      data: { ...result, categories },
    });
  })
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");
    const query = c.req.query();

    const posts = await getPosts({
      accountId,
      ...query,
    });

    return c.json({
      success: true,
      ...posts,
    });
  })

  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const { accountId } = c.get("jwtPayload");

    const post = await getPost(id);

    if (accountId && post?.accountId !== accountId) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    return c.json({
      success: true,
      data: post,
    });
  })

  .post(
    "/:id/categories",
    zValidator("json", createCategoriesSchema),
    async (c) => {
      const { id } = c.req.param();
      const { accountId } = c.get("jwtPayload");
      const values = c.req.valid("json");
      const post = await getPost(id, {
        accountId,
      });

      if (!post) {
        throw new HTTPException(404, { message: "Not Found" });
      }

      // get valid category ids
      const categories = await getCategories({
        accountId,
        ids: values.categories,
      });

      // organize categories
      const categoriesCreate = categories.map((value) => ({
        postId: Number(id),
        categoryId: value.id!,
      }));

      const results = await createPostCategories(categoriesCreate);

      return c.json({
        success: true,
        data: results,
      });
    }
  )

  .get("/:id/categories", async (c) => {
    const { id } = c.req.param();
    const { accountId } = c.get("jwtPayload");

    const post = await getPost(id, {
      accountId,
    });

    if (!post) {
      throw new HTTPException(404, { message: "Not Found" });
    }
    const categories = await getPostCategories(Number(id));

    return c.json({
      success: true,
      data: categories,
    });
  })

  .put("/:id", zValidator("json", postSchema), async (c) => {
    const { id } = c.req.param();
    const { id: userId, accountId } = c.get("jwtPayload");

    const values = c.req.valid("json");

    const post = await getPost(id, { accountId });

    if (!post) throw new HTTPException(404, { message: "Not found" });

    // get valid category ids
    const categories = await getCategories({
      accountId,
      ids: values.categories,
    });

    // get post categories

    const result = await updatePost(id, {
      ...values,
      accountId,
      updatedBy: userId,
    });

    return c.json({
      success: true,
      data: result,
    });
  })

  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const { id: userId, role, accountId } = c.get("jwtPayload");
    const post = await getPost(id, { accountId });

    if (!post) throw new HTTPException(404, { message: "Not found" });

    if (post.createdBy !== userId && !DELETE_ROLES.includes(role))
      throw new HTTPException(403, {
        message: "Access denied",
      });

    const result = await deletePost(id);

    return c.json({
      success: true,
      data: result,
    });
  });

export default app;
