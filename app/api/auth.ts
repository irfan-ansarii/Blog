import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createUser, getUser } from "@/drizzle/services/users";
import { createAccount } from "@/drizzle/services/accounts";

const signupSchema = z.strictObject({
  accountName: z.string().min(5),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  phone: z.string().regex(/^\d{6,14}$/, {
    message: "Invalid phone number",
  }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const app = new Hono();

app.post("/signup", zValidator("json", signupSchema), async (c, next) => {
  const { accountName, firstName, lastName, phone, email } =
    c.req.valid("json");

  const userExist = await getUser(undefined, { email, phone });

  if (userExist) {
    return c.json(
      {
        name: "Bad request",
        message: "Phone or email already exist",
      },
      400
    );
  }

  const account = await createAccount({ name: accountName });

  const user = await createUser({
    firstName,
    lastName,
    phone,
    email,
    accountId: account.id,
  });

  return c.json({
    message: `sign up`,
    data: user,
  });
});

app.post("/signin", zValidator("json", signinSchema), (c) => {
  const validated = c.req.valid("json");
  console.log(validated);
  return c.json({
    message: "sign in ",
  });
});

export default app;
