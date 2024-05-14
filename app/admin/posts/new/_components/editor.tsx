// "use client";
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/shadcn/style.css";

// import { GripVertical, Trash2 } from "lucide-react";

// import {
//   SideMenu,
//   SideMenuController,
//   useCreateBlockNote,
// } from "@blocknote/react";

// import { BlockNoteView } from "@blocknote/shadcn";
// import { FormField } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";

// async function uploadFile(file: File) {
//   const body = new FormData();
//   body.append("file", file);

//   const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
//     method: "POST",
//     body: body,
//   });
//   return (await ret.json()).data.url.replace(
//     "tmpfiles.org/",
//     "tmpfiles.org/dl/"
//   );
// }

// export default function Editor({ form }: { form: any }) {
//   const editor = useCreateBlockNote({

//     uploadFile,
//   });

//   return (
//     <FormField
//       control={form.control}
//       name="content"
//       render={({ field }) => (
//         <BlockNoteView
//           editor={editor}
//           theme="light"
//           onChange={() => {
//             field.onChange(editor.document);
//           }}
//           sideMenu={false}
//         >
//           <SideMenuController
//             sideMenu={(props) => (
//               <SideMenu {...props}>
//                 <Button
//                   {...props}
//                   size="icon"
//                   variant="ghost"
//                   className="text-muted-foreground w-8 h-8"
//                 >
//                   <GripVertical className="w-4 h-4" />
//                 </Button>
//               </SideMenu>
//             )}
//           />
//         </BlockNoteView>
//       )}
//     />
//   );
// }

"use client";

import { useEffect, useState } from "react";
import * as Y from "yjs";

import { ClientSideSuspense } from "@liveblocks/react";
import LiveblocksProvider from "@liveblocks/yjs";
import { EditorContent, useEditor } from "@tiptap/react";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";

import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";

import { useRoom, useSelf } from "@/lib/liveblocks.config";
import { EditorToolbar } from "./editor-toolbar";

// import { CustomTaskItem } from "./CustomTaskItem";
// import { SelectionMenu } from "./SelectionMenu";
// import { Toolbar } from "./Toolbar";

export default function TextEditor() {
  return (
    <ClientSideSuspense fallback={"Loading..."}>
      {() => <Editor />}
    </ClientSideSuspense>
  );
}

// Collaborative text editor with simple rich text and live cursors
export function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  const { name, color, picture } = useSelf((me) => me.info);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "asdghsfavsajvfg !outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "tiptap-blockquote",
          },
        },
        code: {
          HTMLAttributes: {
            class: "tiptap-code",
          },
        },
        codeBlock: {
          languageClassPrefix: "language-",
          HTMLAttributes: {
            class: "tiptap-code-block",
            spellcheck: false,
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        // The Collaboration extension comes with its own history handling
        history: false,
        horizontalRule: {
          HTMLAttributes: {
            class: "tiptap-hr",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "tiptap-list-item",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "tiptap-highlight",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
        emptyEditorClass: "tiptap-empty",
      }),
      // CustomTaskItem,
      // TaskList.configure({
      //   HTMLAttributes: {
      //     class: "tiptap-task-list",
      //   },
      // }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Youtube.configure({
        modestBranding: true,
        HTMLAttributes: {
          class: "tiptap-youtube",
        },
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name,
          color,
          picture,
        },
      }),
    ],
  });

  return (
    <div className="flex flex-col">
      <div className="border-y p-2">
        {editor && <EditorToolbar editor={editor} />}
      </div>
      <div className="p-6">
        {/* {editor && <SelectionMenu editor={editor} />} */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
