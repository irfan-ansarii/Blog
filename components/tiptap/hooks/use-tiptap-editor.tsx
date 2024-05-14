import { mergeAttributes, useEditor } from "@tiptap/react";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "../task-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextColor from "@tiptap/extension-color";

const classes: Record<number, string> = {
  1: "text-5xl",
  2: "text-4xl",
  3: "text-3xl",
  4: "text-2xl",
  5: "text-xl",
};

export const useTiptapEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "min-h-96",
        style: "outline: none",
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

        // The Collaboration extension comes with its own history handling
        horizontalRule: {
          HTMLAttributes: {
            class: "border-b",
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
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
        emptyEditorClass: "tiptap-empty",
      }),
      TaskItem,
      TaskList.configure({
        HTMLAttributes: {
          class: "tiptap-task-list",
        },
      }),

      Youtube.configure({
        modestBranding: true,
        HTMLAttributes: {
          class: "tiptap-youtube",
        },
      }),
      // Register the document with Tiptap
      //   Collaboration.configure({
      //     document: doc,
      //   }),
      // Attach provider and user info
      //   CollaborationCursor.configure({
      //     provider: provider,
      //     user: {
      //       name,
      //       color,
      //       picture,
      //     },
      //   }),
    ],
  });

  return editor;
};
