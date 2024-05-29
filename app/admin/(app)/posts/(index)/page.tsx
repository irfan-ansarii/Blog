import React from "react";
import { getPosts } from "@/features/query/posts";
import Pagination from "@/components/admin/pagination";
import PostCard from "../_components/post-card";

const PostsPage = async () => {
  const { data, meta } = await getPosts();

  return (
    <>
      <div className="grid gap-3 items-start">
        {data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination />
    </>
  );
};

export default PostsPage;
