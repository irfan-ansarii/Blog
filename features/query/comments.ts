import { getClient } from "@/lib/hono-server";

export const getComments = async () => {
  const client = await getClient();
  const response = await client.api.comments.$get();
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

export const getComment = async (id: string) => {
  const client = await getClient();
  const response = await client.api.comments[":id"].$get({
    param: { id },
  });
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
