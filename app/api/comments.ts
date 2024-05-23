import { createCommentSchema } from "@/drizzle/schemas/comments";
import {
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
  postId: true,
});

const app = new Hono()

  /******************************************************************* */
  /*                          GET COMMENTS                              */
  /******************************************************************* */
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");

    const results = await getComments({
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
  /*                         UPDATE COMMENTS                            */
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
  /*                          DELETE COMMENTS                          */
  /******************************************************************* */
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const { accountId } = c.get("jwtPayload");

    const comment = await getComment(id, {
      accountId,
    });

    if (!comment) throw new HTTPException(404, { message: "Not Found" });

    const result = await deleteComment(id);

    return c.json({
      success: true,
      data: result,
    });
  });

export default app;
