import React from "react";
import PostEditor from "./_components/editor";
import Visibility from "./_components/visibility";
import Thumbnail from "./_components/thumbnail";
import TagsCategory from "./_components/tags-category";

const NewPostPage = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6 border rounded-md">
        <PostEditor />
      </div>

      <div className="col-span-1 space-y-6">
        <Visibility />
        <Thumbnail />
        <TagsCategory />
      </div>
    </div>
  );
};

export default NewPostPage;
