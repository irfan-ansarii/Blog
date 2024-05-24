import { Hono } from "hono";
import { handle } from "hono/vercel";
import { jwt } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

import liveblockHandler from "@/app/api/routes/liveblocks";

import authHandler from "@/app/api/routes/auth";
import usersHandler from "@/app/api/routes/users";
import postsHandler from "@/app/api/routes/posts";
import categroiesHandler from "@/app/api/routes/categories";
import commentsHandler from "@/app/api/routes/comments";
export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/liveblocks", liveblockHandler)
  .route("/auth", authHandler)
  .all("/*", jwt({ secret: "secret" }))
  .route("/users", usersHandler)
  .route("/posts", postsHandler)
  .route("/categories", categroiesHandler)
  .route("/comments", commentsHandler)

  .onError((err: any, c) => {
    let errorResponse = {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
      success: false,
    };
    if (err instanceof HTTPException) {
      const res = err.getResponse();
    }
    return c.json({
      ...errorResponse,
    });
  });

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
