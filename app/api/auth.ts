import { Hono } from "hono";

const app = new Hono();

app.post("/signup", (c, next) => {
  return c.json({
    message: `sign up`,
  });
});

app.post("/signin", (c) => {
  return c.json({
    message: "sign in ",
  });
});

export default app;
