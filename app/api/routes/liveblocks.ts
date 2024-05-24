import { Liveblocks } from "@liveblocks/node";
import { Hono } from "hono";

const secret =
  "sk_prod_DWso8uD0zVOpMPv_GRa6ZvL3HVT4JpwSTeEH_WrctEmAkUmctvgjQtbW_2iOTZKx";

const app = new Hono();

const liveblocks = new Liveblocks({
  secret,
});

app.post("/", async (c) => {
  const userId = Math.floor(Math.random() * 10) % USER_INFO.length;

  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: USER_INFO[userId],
  });

  session.allow(`liveblocks`, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return c.json(JSON.parse(body), {
    status,
  });
});

export default app;

const USER_INFO = [
  {
    name: "Charlie Layne",
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  },
  {
    name: "Mislav Abha",
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    name: "Tatum Paolo",
    color: "#F0D885",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    name: "Anjali Wanda",
    color: "#85EED6",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },
  {
    name: "Jody Hekla",
    color: "#85BBF0",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
  },
  {
    name: "Emil Joyce",
    color: "#8594F0",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
  },
  {
    name: "Jory Quispe",
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
  },
  {
    name: "Quinn Elton",
    color: "#87EE85",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
  },
];
