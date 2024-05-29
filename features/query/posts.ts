import { getClient } from "@/lib/hono-server";

export const getPost = async (id: string) => {
  const client = await getClient();

  const response = await client.api.posts[":id"].$get({ param: { id } });

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

export const getPosts = async () => {
  const client = await getClient();
  const response = await client.api.posts.$get();
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

export const getPostCategories = async (id: string) => {
  const client = await getClient();
  const response = await client.api.posts[":id"].categories.$get({
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

export const getPostComments = async (id: string) => {
  const client = await getClient();
  const response = await client.api.posts[":id"].comments.$get({
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
