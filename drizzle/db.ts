import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schemas/index";

const client = new Client({
  connectionString: "postgres://root:root@localhost:5432/blog",
});

export const db = (() => {
  client
    .connect()
    .then(() => {
      console.info("Connected to databse");
    })
    .catch((err) => {
      console.error("Failed to connect to the database.");

      process.exit(0);
    });
  return drizzle(client, { schema: { ...schema } });
})();

export const findFirst = <T>(values: T[]): T => {
  return values[0]!;
};

export async function errorHandler<T>(fn: () => Promise<T>) {
  const fnReturn = fn();
  return await Promise.resolve(fnReturn).catch((err) => {
    return { code: err.code, message: err.message };
  });
}
