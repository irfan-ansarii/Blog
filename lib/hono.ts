import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

import { cookies } from "next/headers";

const cookieStore = cookies();
// const token = cookieStore.get("token");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudElkIjoyLCJyb2xlIjoiZWRpdG9yIn0.vBXFi7ztlJOr5j7q68WQWNHqFbDKfGcpM_WuUiCR2oM";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
