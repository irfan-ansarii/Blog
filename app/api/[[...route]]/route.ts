import { Hono } from "hono";
import { handle } from "hono/vercel";
import handler from "@/app/api/users";
import liveblockHandler from "@/app/api/liveblocks";

const app = new Hono().basePath("/api");

app.route("/liveblocks", liveblockHandler);

app.route("/users", handler);
app.route("/categories", handler);
app.route("/posts", handler);
app.route("/comments", handler);
app.route("/audiences", handler);
app.route("/keys", handler);
app.route("/webhooks", handler);

export const GET = handle(app);
export const POST = handle(app);
