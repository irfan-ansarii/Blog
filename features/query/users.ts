import { getClient } from "@/lib/hono-server";

export const getSession = async () => {
  const client = await getClient();
  const response = await client.api.users.me.$get();
  if (!response.ok)
    throw {
      status: 500,
    };

  const result = await response.json();

  if (!result.success) {
    throw result;
  }
  return result;
};

export const getUser = async (id: string) => {
  const client = await getClient();

  const response = await client.api.users[":id"].$get({ param: { id } });

  if (!response.ok)
    throw {
      status: 500,
    };

  const result = await response.json();

  if (!result.success) {
    throw result;
  }
  return result;
};

export const getUsers = async () => {
  const client = await getClient();
  const response = await client.api.users.$get();
  if (!response.ok)
    throw {
      status: 500,
    };

  const result = await response.json();

  if (!result.success) {
    throw result;
  }
  return result;
};
