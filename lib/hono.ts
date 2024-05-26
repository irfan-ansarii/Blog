import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("token");

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
