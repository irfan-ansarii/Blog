import React from "react";

import Pagination from "@/components/admin/pagination";

import PostCard from "../_components/post-card";
const PostsPage = () => {
  return (
    <>
      <div className="grid gap-3">
        {[...Array(10)].map(() => (
          <PostCard />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default PostsPage;
