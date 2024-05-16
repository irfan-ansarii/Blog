import React from "react";

import { ClientSideSuspense } from "@liveblocks/react";
import { EditorContent } from "@tiptap/react";
import { useTiptapEditor } from "./hooks/use-tiptap-editor";
import { Toolbar } from "./toolbar";
import Loading from "@/components/loading";

const Content = ({ doc, provider }: any) => {
  const editor = useTiptapEditor({ doc, provider });
  if (!editor) return;
  return (
    <ClientSideSuspense fallback={<Loading />}>
      {() => (
        <div className="relativ flex flex-col flex-1 overflow-hidden">
          <Toolbar editor={editor!} />
          <div className="p-6">
            <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          </div>
        </div>
      )}
    </ClientSideSuspense>
  );
};

export default Content;
