import { Hono } from "hono";

const app = new Hono();

app.get("/", (c, next) => {
  return c.json({
    message: `all categories`,
  });
});

app.get("/:id", (c, next) => {
  return c.json({
    message: `get category by id or slug`,
  });
});

app.put("/:id", (c, next) => {
  return c.json({
    message: `update a category`,
  });
});

app.delete("/:id", (c, next) => {
  return c.json({
    message: `delete a category`,
  });
});

export default app;
