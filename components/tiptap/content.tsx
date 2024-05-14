import { Editor } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";
import React from "react";

const Content = ({ editor }: { editor: any }) => {
  return <EditorContent editor={editor} className="flex-1 overflow-y-auto" />;
};

export default Content;
