import { deleteUser, getUser, getUsers } from "@/drizzle/services/users";
import { Hono } from "hono";

const app = new Hono()
  /******************************************************************* */
  /*                        GET ALL USERS ROUTE                        */
  /******************************************************************* */
  .get("/", async (c) => {
    const { accountId } = c.get("jwtPayload");

    const query = c.req.query();

    const users = await getUsers({ accountId: accountId, ...query });

    return c.json({
      data: users,
    });
  })
  /******************************************************************* */
  /*                              ME ROUTE                              */
  /******************************************************************* */
  .get("/me", async (c) => {
    const { id } = c.get("jwtPayload");

    const user = await getUser(id);

    return c.json({
      data: user,
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
      return c.json(
        {
          message: "Not Found",
        },
        400
      );
    }

    return c.json({
      data: user,
    });
  })
  /******************************************************************* */
  /*                         UPDATE SINGLE USER                        */
  /******************************************************************** */
  .put("/:id", async (c) => {
    const { id } = c.req.param();
    const { accountId, role } = c.get("jwtPayload");

    const user = await getUser(id);

    if (accountId && user.accountId !== accountId) {
      return c.json(
        {
          message: "Not Found",
        },
        404
      );
    }

    if (role !== "admin" && role !== "super") {
      return c.json(
        {
          message: "you nedd higher level permission",
        },
        400
      );
    }

    // update user profile
    return c.json({
      data: user,
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
      return c.json(
        {
          message: "Not Found",
        },
        404
      );
    }

    if (role !== "admin" && role !== "super") {
      return c.json(
        {
          message: "you nedd higher level permission",
        },
        400
      );
    }

    const deleted = await deleteUser(id);

    return c.json({
      data: deleted,
    });
  });

export default app;
