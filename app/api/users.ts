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

export default app;
