import { Hono } from "hono";

const app = new Hono();

app.get("/", (c, next) => {
  return c.json({
    message: `all users`,
  });
});
app.get("/me", (c) => {
  return c.json({
    message: "Me user",
  });
});

app.get("/:id", (c, next) => {
  return c.json({
    message: `get user by id`,
  });
});

app.put("/:id", (c, next) => {
  return c.json({
    message: `update user`,
  });
});

app.delete("/:id", (c, next) => {
  return c.json({
    message: `delete`,
  });
});

export default app;
