import { Hono } from "hono";

const app = new Hono()

  .get("/", async (c) => {
    return c.json({
      message: `all posts`,
    });
  })

  .get("/:id", async (c) => {
    return c.json({
      message: `get post by id or slug`,
    });
  })

  .put("/:id", async (c) => {
    return c.json({
      message: `update a post`,
    });
  })

  .delete("/:id", async (c) => {
    return c.json({
      message: `delete a post`,
    });
  });

export default app;
