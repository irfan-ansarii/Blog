import type { Config } from "drizzle-kit";

export default {
  schema: "drizzle/schemas",
  out: "drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://root:root@localhost:5432/blog",
  },
  verbose: true,
  strict: false,
} satisfies Config;
