import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { ZodSchema, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser, updateUser } from "@/drizzle/services/users";
import { createAccount } from "@/drizzle/services/accounts";
import bcrypt from "bcrypt";
import { sanitizeOutput } from "@/lib/utils";

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

// signup schema
const signupSchema = z.strictObject({
  accountName: z.string().min(5),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  phone: z.string().regex(/^\d{6,14}$/, {
    message: "Invalid phone number",
  }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8),
});

// Base schema for email and phone validation
const baseAuthSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// Utility function to add refinement
const withEmailOrPhone = <T extends ZodSchema>(schema: T) =>
  schema.refine((data) => data.email || data.phone, {
    message: "Email or phone is required",
    path: ["email", "phone"],
  });

// Signin schema with additional password field
const signinSchema = withEmailOrPhone(
  baseAuthSchema
    .extend({
      password: z.string(),
    })
    .strict()
);
// OTP login schema
const otpLoginSchema = withEmailOrPhone(baseAuthSchema.strict());

// OTP verify schema with additional otp field
const otpVerifySchema = withEmailOrPhone(
  baseAuthSchema
    .extend({
      otp: z.string(),
    })
    .strict()
);

const app = new Hono();

// signup
app.post("/signup", zValidator("json", signupSchema), async (c, next) => {
  const values = c.req.valid("json");
  const { phone, email, password } = values;

  const userExist = await getUser(undefined, { email, phone });

  if (userExist) {
    let message = "Email already exist";
    return c.json({ name: "Bad request", message }, 400);
  }

  // hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const userAccount = await createAccount({
    ...values,
    password: hashedPassword,
  });

  // sanitize the output
  const sanitized = sanitizeOutput(userAccount, { password: true, otp: true });

  return c.json({
    data: sanitized,
  });
});

// signin with email/phone and password
app.post("/signin", zValidator("json", signinSchema), async (c) => {
  const data = c.req.valid("json");
  const { phone, email, password } = data;

  const userData = await getUser(undefined, { phone: phone!, email: email! });

  if (!userData) {
    return c.json(
      { name: "Bad request", message: "User is not registered" },
      400
    );
  }
  const isValid = await bcrypt.compareSync(password, userData.password!);

  if (!isValid)
    return c.json({ name: "Bad request", message: "Incorrect password" }, 400);

  const payload = {
    id: userData.id,
    accountId: userData.accountId,
    role: userData.role,
    plan: userData.plan,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
  };

  const sanitized = sanitizeOutput(userData, { otp: true, password: true });
  // there is some error while sigining jwt
  // const token = await sign(payload, secret);

  return c.json({
    data: {
      // token,
      ...sanitized,
    },
  });
});

// generate otp
app.post("/signin/otp", zValidator("json", otpLoginSchema), async (c) => {
  const data = c.req.valid("json");
  const { email, phone } = data;

  const userData = await getUser(undefined, { phone: phone!, email: email! });

  if (!userData) {
    return c.json(
      { name: "Bad request", message: "User is not registered" },
      400
    );
  }
  const otp = generateOTP();

  const r = await updateUser(userData.id, { otp });

  return c.json({
    data: {
      ...r,
      phone,
      email,
    },
  });
});

// verify otp
app.post("/signin/verify", zValidator("json", otpVerifySchema), async (c) => {
  const data = c.req.valid("json");
  const { email, phone, otp } = data;

  const userData = await getUser(undefined, { phone: phone!, email: email! });

  if (!userData) {
    return c.json(
      { name: "Bad request", message: "User is not registered" },
      400
    );
  }

  if (!userData.otp) {
    return c.json({ name: "Bad request", message: "invalid request" }, 400);
  }

  if (userData.otp !== otp) {
    return c.json({ name: "Bad request", message: "invalid otp" }, 400);
  }

  await updateUser(userData.id, { otp: "" });

  // sign jwt and return
  const payload = {
    id: userData.id,
    accountId: userData.accountId,
    role: userData.role,
    plan: userData.plan,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
  };

  const sanitized = sanitizeOutput(userData, { otp: true, password: true });

  return c.json({
    data: {
      // token,
      ...sanitized,
    },
  });
});

export default app;
