import { type ClassValue, clsx } from "clsx";
import { Context, Next } from "hono";
import { twMerge } from "tailwind-merge";

interface SanitizeProps {
  [key: string]: any;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthorized = async (c: Context, next: Next) => {
  const { role } = c.get("jwtPayload");

  if (role !== "admin" && role !== "super") {
    return c.json(
      {
        message: "you nedd higher level permission",
      },
      400
    );
  }

  return await next();
};

export const sanitizeOutput = <T extends SanitizeProps>(
  data: T | T[],
  fieldsToExclude: SanitizeProps
) => {
  const sanitizeObject = (obj: T, fields: string[]) => {
    const sanitizedObj = { ...obj };
    for (const field of fields) {
      delete sanitizedObj[field];
    }
    return sanitizedObj;
  };

  const fields = Object.keys(fieldsToExclude);

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeObject(item, fields)) as T[];
  } else {
    return sanitizeObject(data, fields);
  }
};
