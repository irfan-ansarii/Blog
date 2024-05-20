import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql = neon(process.env.NEON_DATABASE_URL!);

export const db = drizzle(sql);

export const findFirst = <T>(values: T[]): T => {
  return values[0]!;
};

export async function errorHandler<T>(fn: () => Promise<T>) {
  const fnReturn = fn();
  return await Promise.resolve(fnReturn).catch((err) => {
    return { code: err.code, message: err.message };
  });
}
