import { getClient } from "@/lib/hono-server";

export const getCategories = async (id: string) => {
  const client = await getClient();
  const response = await client.api.categories.$get({
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

export const getCategory = async (id: string) => {
  const client = await getClient();
  const response = await client.api.categories[":id"].$get({
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
