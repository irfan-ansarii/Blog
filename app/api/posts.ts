import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  linkCategoryToPost,
  updatePost,
} from "@/drizzle/services/posts";

import { DELETE_ROLES } from "./utils";
import { postCreateSchema } from "@/drizzle/schemas";
import { zValidator } from "@hono/zod-validator";
import { getCategories } from "@/drizzle/services/categories";

const postSchema = postCreateSchema.omit({ accountId: true }).extend({
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

    // oraginize category ids and post id to link
    const categoriesToCreate = categories.map((value) => ({
      postId: result.id,
      categoryId: value.id,
    }));

    // link category to post
    await linkCategoryToPost(categoriesToCreate);

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
      data: posts,
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

  .put("/:id", async (c) => {
    const { id } = c.req.param();
    const { id: userId, accountId } = c.get("jwtPayload");

    const post = await getPost(id);

    if (accountId && post?.accountId !== accountId)
      throw new HTTPException(404, { message: "Not found" });

    const result = await updatePost(id, { title: "", updatedBy: userId });

    return c.json({
      success: true,
      data: result,
    });
  })

  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const { id: userId, role, accountId } = c.get("jwtPayload");
    const post = await getPost(id);

    if (accountId && post?.accountId !== accountId)
      throw new HTTPException(404, { message: "Not found" });

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
