"use client";

import React from "react";
import { useTiptapEditor } from "./hooks/use-tiptap-editor";
import Content from "./content";
import { Toolbar } from "./toolbar";

export const TiptapEditor = () => {
  const editor = useTiptapEditor();
  if (!editor) {
    return null;
  }

  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden">
      <Toolbar editor={editor} />
      <div className="p-6">
        <Content editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
