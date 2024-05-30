import React from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommentActions = ({ comment }) => {
  return (
    <Button className="px-2" variant="ghost">
      <EllipsisVertical className="w-5 h-5" />
    </Button>
  );
};

export default CommentActions;
