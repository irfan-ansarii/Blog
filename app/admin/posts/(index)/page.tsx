import React from "react";

import Pagination from "@/components/admin/pagination";

import PostCard from "../_components/post-card";
const PostsPage = () => {
  return (
    <>
      <div className="grid gap-3 items-start flex-1">
        {[...Array(21)].map(() => (
          <PostCard />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default PostsPage;
