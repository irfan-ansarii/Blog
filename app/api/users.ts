import { z } from "zod";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "@/drizzle/services/users";
import { userCreateSchema } from "@/drizzle/schemas";
import { DELETE_ROLES, sanitizeOutput } from "./utils";

const userSchema = userCreateSchema.pick({
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
});

const inviteUserSchema = userCreateSchema.pick({
  phone: true,
  email: true,
});

const app = new Hono()
  /******************************************************************* */
  /*                THIS IS ROUTE IS USED TO INVITE USER                */
  /******************************************************************* */
  .post("/", zValidator("json", inviteUserSchema), async (c) => {
    const { accountId } = c.get("jwtPayload");
    const values = c.req.valid("json");

    const user = await getUser(undefined, {
      phone: values.phone!,
      email: values.email!,
    });
    console.log(user, values);
    if (user)
      throw new HTTPException(400, {
        message: "Phone or email is already registed",
      });

    const result = await createUser({
      ...values,
      accountId: accountId,
      status: "invited",
    });

    const sanitized = sanitizeOutput(result, { password: true, otp: true });

    return c.json({
      success: true,
      data: sanitized,
    });
  })
  /******************************************************************* */
  /*                        GET ALL USERS ROUTE                        */
  /******************************************************************* */
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");

    const query = c.req.query();

    const users = await getUsers({ accountId: accountId, ...query });

    const sanitized = sanitizeOutput(users, { password: true, otp: true });

    return c.json({
      success: true,
      data: sanitized,
    });
  })
  /******************************************************************* */
  /*                              ME ROUTE                              */
  /******************************************************************* */
  .get("/me", async (c) => {
    const { id } = c.get("jwtPayload");

    const user = await getUser(id);

    return c.json({
      success: true,
      data: user,
    });
  })
  /******************************************************************* */
  /*                          UPDATE ME ROUTE                          */
  /******************************************************************* */
  .put("/me", zValidator("json", userSchema), async (c) => {
    const values = c.req.valid("json");
    const { id } = c.get("jwtPayload");

    const result = await updateUser(id, values);

    return c.json({
      success: true,
      data: result,
    });
  })
  /******************************************************************* */
  /*                          GET SINGLE USER                          */
  /******************************************************************** */
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const { accountId } = c.get("jwtPayload");

    const user = await getUser(id);

    if (accountId && user.accountId !== accountId) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    return c.json({
      success: true,
      data: user,
    });
  })
  /******************************************************************* */
  /*                         UPDATE SINGLE USER                        */
  /******************************************************************** */
  .put("/:id", zValidator("json", userSchema), async (c) => {
    const values = c.req.valid("json");
    const { id } = c.req.param();
    const { accountId, role } = c.get("jwtPayload");

    const user = await getUser(id);

    if (accountId && user.accountId !== accountId) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    if (!DELETE_ROLES.includes(role)) {
      throw new HTTPException(403, { message: "Access Denied" });
    }

    const updated = await updateUser(id, values);
    return c.json({
      success: true,
      data: updated,
    });
  })
  /******************************************************************* */
  /*                         DELETE SINGLE USER                        */
  /******************************************************************** */
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const { accountId, role } = c.get("jwtPayload");

    const user = await getUser(id);

    if (accountId && user.accountId !== accountId) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    if (!DELETE_ROLES.includes(role)) {
      throw new HTTPException(403, { message: "Access Denied" });
    }

    const deleted = await deleteUser(id);

    return c.json({
      success: true,
      data: deleted,
    });
  });

export default app;
