import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser, updateUser } from "@/drizzle/services/users";
import { createAccount } from "@/drizzle/services/accounts";

import { sanitizeOutput } from "../utils";
import { HTTPException } from "hono/http-exception";

import { setCookie } from "hono/cookie";

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

// signup schema
const signupSchema = z.object({
  accountName: z.string().min(5),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8),
});

// signin schema
const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1),
});

// login with otp
const otpLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

// verify otp
const otpVerifySchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  otp: z.string().length(6),
});

// reset password schema
const resetSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    otp: z.string().length(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const app = new Hono()
  /********************************************************************* */
  /**                           SIGNUP ROUTE                             */
  /********************************************************************* */
  .post("/signup", zValidator("json", signupSchema), async (c, next) => {
    const values = c.req.valid("json");
    const { email } = values;

    const userExist = await getUser(undefined, { email });

    if (userExist) {
      throw new HTTPException(400, { message: "User already registered" });
    }

    const userAccount = await createAccount({
      ...values,
    });

    const sanitized = sanitizeOutput(userAccount, {
      password: true,
      otp: true,
    });

    return c.json({
      success: true,
      data: sanitized,
    });
  })

  /********************************************************************* */
  /**                           SIGNIN ROUTE                             */
  /********************************************************************* */

  .post("/signin", zValidator("json", signinSchema), async (c) => {
    const data = c.req.valid("json");
    const { email, password } = data;

    const userData = await getUser(undefined, { email: email! });

    if (!userData || userData.password !== password) {
      throw new HTTPException(400, { message: "Invalid email or password" });
    }

    const payload = {
      id: userData.id,
      accountId: userData.accountId,
      role: userData.role,
      plan: userData.plan,
      exp: "30d",
    };

    const sanitized = sanitizeOutput(userData, { otp: true, password: true });

    const token = await sign(payload, "secret");

    setCookie(c, "token", token, {
      path: "/",
    });

    return c.json({
      success: true,
      data: {
        token,
        ...sanitized,
      },
    });
  })

  /********************************************************************* */
  /**                       SIGNIN WITH OTP ROUTE                        */
  /********************************************************************* */
  .post("/signin/otp", zValidator("json", otpLoginSchema), async (c) => {
    const data = c.req.valid("json");
    const { email } = data;

    const userData = await getUser(undefined, { email: email! });

    if (!userData) {
      throw new HTTPException(400, { message: "Invalid email" });
    }
    const otp = generateOTP();
    console.log(otp);
    await updateUser(userData.id, { otp });

    return c.json({
      success: true,
      data: {
        email,
      },
    });
  })

  /********************************************************************* */
  /**                          VERIFY OTP ROUTE                          */
  /********************************************************************* */
  .post("/signin/verify", zValidator("json", otpVerifySchema), async (c) => {
    const data = c.req.valid("json");
    const { email, otp } = data;

    const userData = await getUser(undefined, { email: email! });

    if (!userData) {
      throw new HTTPException(400, { message: "Invalid email" });
    }

    if (!userData.otp || userData.otp !== otp) {
      throw new HTTPException(400, { message: "Invalid otp" });
    }

    // await updateUser(userData.id, { otp: "" });

    const payload = {
      id: userData.id,
      accountId: userData.accountId,
      role: userData.role,
      plan: userData.plan,
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };

    const token = await sign(payload, "secret");

    setCookie(c, "token", token, {
      path: "/",
    });
    const sanitized = sanitizeOutput(userData, { otp: true, password: true });

    return c.json({
      data: {
        token,
        ...sanitized,
      },
    });
  })
  /********************************************************************* */
  /**                            RECOVER ROUTE                           */
  /********************************************************************* */
  .post("/recover", zValidator("json", otpLoginSchema), async (c) => {
    const data = c.req.valid("json");
    const { email } = data;

    const userData = await getUser(undefined, { email: email! });

    if (!userData) {
      throw new HTTPException(400, { message: "Invalid email" });
    }
    const otp = generateOTP();

    await updateUser(userData.id, { otp });

    return c.json({
      success: true,
      data: {
        email,
      },
    });
  })
  /********************************************************************* */
  /**                              RESET ROUTE                           */
  /********************************************************************* */
  .post("/reset", zValidator("json", resetSchema), async (c) => {
    const data = c.req.valid("json");
    const { email, otp, password, confirmPassword } = data;

    const userData = await getUser(undefined, { email: email! });

    if (!userData) {
      throw new HTTPException(400, { message: "Invalid email" });
    }

    if (!userData.otp || userData.otp !== otp) {
      throw new HTTPException(400, { message: "Invalid otp" });
    }

    await updateUser(userData.id, { otp: "", password: confirmPassword });

    const sanitized = sanitizeOutput(userData, { otp: true, password: true });

    return c.json({
      data: sanitized,
    });
  });

export default app;
