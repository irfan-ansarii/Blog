import { createCommentSchema } from "@/drizzle/schemas/comments";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "@/drizzle/services/comments";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const commentSchema = createCommentSchema.omit({
  accountId: true,
});

const app = new Hono()

  /******************************************************************* */
  /*                         CREATE COMMENT                            */
  /******************************************************************* */
  .post("/", zValidator("json", commentSchema), async (c) => {
    const values = c.req.valid("json");
    const { accountId } = c.get("jwtPayload");

    const result = await createComment({
      ...values,
      accountId,
    });

    return c.json({
      success: true,
      data: result,
    });
  })

  /******************************************************************* */
  /*                          GET COMMENTS                             */
  /******************************************************************* */
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");

    const query = c.req.query();

    const results = await getComments({
      ...query,
      accountId,
    });

    return c.json({
      success: true,
      data: results,
    });
  })
  /******************************************************************* */
  /*                          GET COMMENT                              */
  /******************************************************************* */
  .get("/:id", async (c) => {
    const { id } = c.req.param();

    const { accountId } = c.get("jwtPayload");

    const comment = await getComment(id, {
      accountId,
    });

    if (!comment) throw new HTTPException(404, { message: "Not Found" });

    return c.json({
      success: true,
      data: comment,
    });
  })
  /******************************************************************* */
  /*                         UPDATE COMMENT                            */
  /******************************************************************* */
  .put("/:id", zValidator("json", commentSchema), async (c) => {
    const { id } = c.req.param();
    const values = c.req.valid("json");
    const { accountId } = c.get("jwtPayload");

    const comment = await getComment(id, {
      accountId,
    });

    if (!comment) throw new HTTPException(404, { message: "Not Found" });

    const result = await updateComment(id, {
      ...values,
    });

    return c.json({
      success: true,
      data: result,
    });
  })
  /******************************************************************* */
  /*                          DELETE COMMENT                            */
  /******************************************************************* */
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const { accountId } = c.get("jwtPayload");

    const comment = await getComment(id, {
      accountId,
    });

    if (!comment) throw new HTTPException(404, { message: "Not Found" });

    // if user is not admin or user throw error

    const result = await deleteComment(id);

    return c.json({
      success: true,
      data: result,
    });
  });

export default app;
