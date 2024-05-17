import { Hono } from "hono";

const app = new Hono();

app.get("/", (c, next) => {
  return c.json({
    message: `all posts`,
  });
});

app.get("/:id", (c, next) => {
  return c.json({
    message: `get post by id or slug`,
  });
});

app.put("/:id", (c, next) => {
  return c.json({
    message: `update a post`,
  });
});

app.delete("/:id", (c, next) => {
  return c.json({
    message: `delete a post`,
  });
});

export default app;
