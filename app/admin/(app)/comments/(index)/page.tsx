import React from "react";
import { getComments } from "@/features/query/comments";
import CommentCard from "../_components/comment-card";
import Pagination from "@/components/admin/pagination";

const CommentsPage = async () => {
  const { data } = await getComments();

  return (
    <>
      <div className="grid gap-3 items-start">
        {data?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      <Pagination />
    </>
  );
};

export default CommentsPage;
