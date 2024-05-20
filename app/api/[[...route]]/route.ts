import { Hono } from "hono";
import { handle } from "hono/vercel";
import { jwt } from "hono/jwt";

import liveblockHandler from "@/app/api/liveblocks";

import authHandler from "@/app/api/auth";
import usersHandler from "@/app/api/users";
import postsHandler from "@/app/api/posts";
import categroiesHandler from "@/app/api/categories";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/liveblocks", liveblockHandler)
  .route("/auth", authHandler)
  .all("/*", jwt({ secret: "secret" }))
  .route("/users", usersHandler)
  .route("/posts", postsHandler)
  .route("/categories", categroiesHandler);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
