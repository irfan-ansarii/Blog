import React from "react";
import { client } from "@/lib/hono";
import Pagination from "@/components/admin/pagination";
import PostCard from "../_components/post-card";

const PostsPage = async () => {
  const response = await client.api.posts.$get({
    query: {
      q: "1",
    },
  });

  if (!response.ok) throw new Error("");

  const { data, meta } = await response.json();

  return (
    <>
      <div className="grid gap-3 items-start flex-1">
        {data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default PostsPage;
