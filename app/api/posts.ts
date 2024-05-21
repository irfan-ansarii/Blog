import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@/drizzle/services/posts";

import { DELETE_ROLES } from "./utils";
import { postCreateSchema } from "@/drizzle/schemas";
import { zValidator } from "@hono/zod-validator";

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

    const result = await createPost({
      ...values,
      accountId,
      createdBy: id,
      updatedBy: id,
    });

    return c.json({
      success: true,
      data: result,
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
