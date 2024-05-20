import { Hono } from "hono";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/drizzle/services/categories";
import { zValidator } from "@hono/zod-validator";
import { categoryCreateSchema } from "@/drizzle/schemas";
import { isAuthorized } from "@/lib/utils";

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
      return c.json(
        {
          message: "Not found",
        },
        404
      );
    }

    return c.json({
      data: result,
    });
  })
  /********************************************************************* */
  /**                       UPDATE CATEGORY ROUTE                        */
  /********************************************************************* */
  .put("/:id", zValidator("json", categorySchema), async (c, next) => {
    const values = c.req.valid("json");
    const { id } = c.req.param();

    const { id: userId, accountId, role } = c.get("jwtPayload");

    const result = await getCategory(id);

    if (accountId && result?.accountId !== accountId) {
      return c.json(
        {
          message: "Not found",
        },
        404
      );
    }

    // create custom middleware fundtion
    await isAuthorized(c, next);

    const updated = await updateCategory(id, { ...values, updatedBy: userId });

    return c.json({
      data: updated,
    });
  })
  /********************************************************************* */
  /**                       DELETE CATEGORY ROUTE                        */
  /********************************************************************* */
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const { accountId, role } = c.get("jwtPayload");

    const result = await getCategory(id);

    if (accountId && result.accountId !== accountId) {
      return c.json(
        {
          message: "Not found",
        },
        404
      );
    }

    if (role !== "admin" && role !== "super") {
      return c.json(
        {
          message: "you nedd higher level permission",
        },
        400
      );
    }

    const updated = await deleteCategory(id);

    return c.json({
      data: updated,
    });
  });

export default app;
