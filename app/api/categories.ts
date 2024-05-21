import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/drizzle/services/categories";
import { zValidator } from "@hono/zod-validator";
import { categoryCreateSchema } from "@/drizzle/schemas";

import { DELETE_ROLES } from "./utils";

const categorySchema = categoryCreateSchema.pick({
  title: true,
  slug: true,
  createdBy: true,
  updatedBy: true,
});

const app = new Hono()
  /********************************************************************* */
  /**                       CREATE CATEGORY ROUTE                        */
  /********************************************************************* */
  .post("/", zValidator("json", categorySchema), async (c) => {
    const values = c.req.valid("json");
    const { id, accountId } = c.get("jwtPayload");

    const result = await createCategory({
      ...values,
      accountId: accountId,
      createdBy: id,
      updatedBy: id,
    });

    return c.json({
      success: true,
      data: result,
    });
  })
  /********************************************************************* */
  /**                         GET CATEGORY ROUTE                         */
  /********************************************************************* */
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");
    const query = c.req.query();

    const results = await getCategories({
      accountId: accountId,
      ...query,
    });

    return c.json({
      success: true,
      data: results,
    });
  })
  /********************************************************************* */
  /**                      GET SINGLE CATEGORY ROUTE                     */
  /********************************************************************* */
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const { accountId } = c.get("jwtPayload");

    const result = await getCategory(id);

    if (accountId && result?.accountId !== accountId) {
      throw new HTTPException(404, { message: "Not found" });
    }

    return c.json({
      success: true,
      data: result,
    });
  })
  /********************************************************************* */
  /**                       UPDATE CATEGORY ROUTE                        */
  /********************************************************************* */
  .put("/:id", zValidator("json", categorySchema), async (c) => {
    const values = c.req.valid("json");
    const { id } = c.req.param();

    const { id: userId, accountId } = c.get("jwtPayload");

    const result = await getCategory(id);

    if (accountId && result?.accountId !== accountId)
      throw new HTTPException(404, { message: "Not found" });

    const updated = await updateCategory(id, {
      ...values,
      updatedBy: userId,
    });

    return c.json({
      success: true,
      data: updated,
    });
  })
  /********************************************************************* */
  /**                       DELETE CATEGORY ROUTE                        */
  /********************************************************************* */
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const { id: userId, accountId, role } = c.get("jwtPayload");

    const result = await getCategory(id);

    if (accountId && result?.accountId !== accountId)
      throw new HTTPException(404, { message: "Not found" });

    if (result.createdBy !== userId && !DELETE_ROLES.includes(role))
      throw new HTTPException(403, {
        message: "Access denied",
      });

    const deleted = await deleteCategory(id);

    return c.json({
      success: true,
      data: deleted,
    });
  });

export default app;
