import { Hono } from "hono";
import { handle } from "hono/vercel";
import authHandler from "@/app/api/auth";
import usersHandler from "@/app/api/users";
import postsHandler from "@/app/api/posts";
import categroiesHandler from "@/app/api/categories";
import liveblockHandler from "@/app/api/liveblocks";

const app = new Hono().basePath("/api");

app.route("/liveblocks", liveblockHandler);

app.route("/auth", authHandler);
app.route("/users", usersHandler);

app.route("/posts", postsHandler);
app.route("/categories", categroiesHandler);

// app.route("/comments", handler);
// app.route("/audiences", handler);
// app.route("/keys", handler);
// app.route("/webhooks", handler);

export const GET = handle(app);
export const POST = handle(app);
