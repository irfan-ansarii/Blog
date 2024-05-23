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
import { createCommentSchema } from "@/drizzle/schemas/comments";
import { createComment, getComments } from "@/drizzle/services/comments";

const postSchema = postCreateSchema.omit({ accountId: true }).extend({
  categories: z.array(z.string().or(z.number())),
});

const createCategoriesSchema = z.object({
  categories: z.array(z.string().or(z.number())),
});

const commentSchema = createCommentSchema.omit({
  accountId: true,
  postId: true,
});

const app = new Hono()

  /******************************************************************* */
  /*                           CREATE POSTS                            */
  /******************************************************************* */
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
  /******************************************************************* */
  /*                             GET POSTS                             */
  /******************************************************************* */
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
  /******************************************************************* */
  /*                             GET POST                             */
  /******************************************************************* */
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
  /******************************************************************* */
  /*                       CREATE POST CATEGORIES                      */
  /******************************************************************* */
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
  /******************************************************************* */
  /*                         GET POST CATEGORIES                        */
  /******************************************************************* */
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

  /******************************************************************* */
  /*                          CREATE COMMENT                           */
  /******************************************************************* */
  .post("/:id/comments", zValidator("json", commentSchema), async (c) => {
    const values = c.req.valid("json");
    const { id: postId } = c.req.param();
    const { id: userId, accountId } = c.get("jwtPayload");

    const result = await createComment({
      ...values,
      postId: Number(postId),
      accountId,
      createdBy: userId,
    });

    return c.json({
      success: true,
      data: result,
    });
  })
  /******************************************************************* */
  /*                          GET COMMENTS                              */
  /******************************************************************* */
  .get("/:id/comments", async (c) => {
    const { accountId } = c.get("jwtPayload");
    const { id: postId } = c.req.param();

    const post = await getPost(postId, { accountId });

    if (!post) throw new HTTPException(404, { message: "Not Found" });

    const results = await getComments({
      accountId,
      postId,
    });

    return c.json({
      success: true,
      data: results,
    });
  })
  /******************************************************************* */
  /*                           UPDATE POSTS                            */
  /******************************************************************* */
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
  /******************************************************************* */
  /*                           DELETE POSTS                            */
  /******************************************************************* */
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
