import { Hono } from "hono";
import { handle } from "hono/vercel";
import authHandler from "@/app/api/auth";
import usersHandler from "@/app/api/users";
import postsHandler from "@/app/api/posts";
import categroiesHandler from "@/app/api/categories";
import liveblockHandler from "@/app/api/liveblocks";

import { verify } from "hono/jwt";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/liveblocks", liveblockHandler);

app.route("/auth", authHandler);

app.all("/*", async (c, next) => {
  const credentials = c.req.raw.headers.get("Authorization");
  const parts = credentials.split(/\s+/);

  const payload = await verify(parts[1], "secret");
  console.log(payload);
  next();
});

app.route("/users", usersHandler);

app.route("/posts", postsHandler);
app.route("/categories", categroiesHandler);

// app.route("/comments", handler);
// app.route("/audiences", handler);
// app.route("/keys", handler);
// app.route("/webhooks", handler);

// app.onError((err) => {
//   console.log("http exception handler:", err);
//   if (err instanceof HTTPException) {
//     // Get the custom response
//     return err.getResponse();
//   }
// });

export const GET = handle(app);
export const POST = handle(app);
