"use server";
import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

import { cookies } from "next/headers";

const store = cookies();
const token = store.get("token")?.value;

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
