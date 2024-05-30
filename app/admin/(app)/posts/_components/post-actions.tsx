import React from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostActions = ({ post }) => {
  return (
    <Button className="px-2" variant="ghost">
      <EllipsisVertical className="w-5 h-5" />
    </Button>
  );
};

export default PostActions;
