import { mergeAttributes, useEditor } from "@tiptap/react";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Image } from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextColor from "@tiptap/extension-color";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useSelf } from "@/lib/liveblocks.config";
import { buttonVariants } from "@/components/ui/button";

const classes: Record<number, string> = {
  1: "text-5xl",
  2: "text-4xl",
  3: "text-3xl",
  4: "text-2xl",
  5: "text-xl",
};

export const useTiptapEditor = (args: any) => {
  let collabConfig: any = [];

  const { info } = useSelf();

  if (args && args.doc) {
    const { doc, provider } = args;

    collabConfig = [
      Collaboration.configure({
        document: doc,
      }),

      CollaborationCursor.configure({
        provider: provider,
        user: {
          ...info,
        },
      }),
    ];
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "min-h-96",
        style: "outline: none",
      },
    },
    onUpdate({ editor }) {
      // console.log(editor.getHTML());
      // console.log(editor.getJSON());
    },
    extensions: [
      StarterKit.configure({
        codeBlock: {
          languageClassPrefix: "language-",
          HTMLAttributes: {
            class: "tiptap-code-block",
            spellcheck: false,
          },
        },

        history: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]} font-bold`,
            }),
            0,
          ];
        },
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextColor,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-zinc-900 rounded-md p-4 text-zinc-200",
        },
      }),
      Link.configure({
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          class: "underline text-blue-600",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
      }),

      TaskList.configure({
        HTMLAttributes: {
          class: "flex flex-col",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex gap-2 items-center",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "bg-secondary p-3 border-l-4",
        },
      }),

      Youtube.configure({
        controls: false,
        HTMLAttributes: {
          class: "rounded-md",
        },
      }),
      ...collabConfig,
    ],
  });

  return editor;
};
