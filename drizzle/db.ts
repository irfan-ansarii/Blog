import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: "postgres://root:root@localhost:5432/blog",
});

export const db = async () => {
  await client.connect();

  return drizzle(client);
};

export const findFirst = <T>(values: T[]): T => {
  return values[0]!;
};
