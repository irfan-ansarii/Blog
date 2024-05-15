import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import {
  Baseline,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { useCallback } from "react";

export const useTiptap = (editor: Editor) => {
  const onBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor]
  );
  const onItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  );
  const onStrike = useCallback(
    () => editor.chain().focus().toggleStrike().run(),
    [editor]
  );
  const onUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  );
  const onCode = useCallback(
    () => editor.chain().focus().toggleCode().run(),
    [editor]
  );
  const onCodeBlock = useCallback(
    () => editor.chain().focus().toggleCodeBlock().run(),
    [editor]
  );

  const onAlignLeft = useCallback(
    () => editor.chain().focus().setTextAlign("left").run(),
    [editor]
  );
  const onAlignCenter = useCallback(
    () => editor.chain().focus().setTextAlign("center").run(),
    [editor]
  );
  const onAlignRight = useCallback(
    () => editor.chain().focus().setTextAlign("right").run(),
    [editor]
  );
  const onAlignJustify = useCallback(
    () => editor.chain().focus().setTextAlign("justify").run(),
    [editor]
  );

  const onChangeColor = useCallback(
    (color: string) => editor.chain().setColor(color).run(),
    [editor]
  );
  const onClearColor = useCallback(
    () => editor.chain().focus().unsetColor().run(),
    [editor]
  );

  const onChangeHighlight = useCallback(
    (color: string) => editor.chain().setHighlight({ color }).run(),
    [editor]
  );
  const onClearHighlight = useCallback(
    () => editor.chain().focus().unsetHighlight().run(),
    [editor]
  );

  const onLink = useCallback(
    (url: string, inNewTab?: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "" })
        .run(),
    [editor]
  );

  const onUndo = useCallback(
    () => editor.chain().focus()?.undo()?.run(),
    [editor]
  );

  const onRedo = useCallback(
    () => editor.chain().focus()?.redo()?.run(),
    [editor]
  );

  const onHeadingChange = useCallback(
    (value: string) => {
      if (!editor) {
        return;
      }

      switch (value) {
        case "p":
          editor.chain().focus().setParagraph().run();
          break;

        default:
          const level = parseInt(value.charAt(value.length - 1)) as Level;
          editor.chain().focus().setHeading({ level: level }).run();
          break;
      }
    },
    [editor]
  );

  return {
    onUndo,
    onRedo,
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onCode,
    onCodeBlock,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignJustify,
    onChangeColor,
    onClearColor,
    onChangeHighlight,
    onClearHighlight,
    onLink,
    onHeadingChange,

    canUndo: !editor.can().chain().undo().run(),
    canRedo: !editor.can().chain().redo().run(),
    isBold: editor.isActive("bold"),
    isItalic: editor.isActive("italic"),
    isStrike: editor.isActive("strike"),
    isUnderline: editor.isActive("underline"),
    isCode: editor.isActive("code"),
    isCodeBlock: editor.isActive("codeblock"),
    isAlignLeft: editor.isActive({ textAlign: "left" }),
    isAlignCenter: editor.isActive({ textAlign: "center" }),
    isAlignRight: editor.isActive({ textAlign: "right" }),
    isAlignJustify: editor.isActive({ textAlign: "justify" }),
    currentColor: editor.getAttributes("textStyle")?.color || false,
    currentHighlight: editor.getAttributes("highlight")?.color || false,
    currentHeading: getCurrentHeading(editor),
  };
};

function getCurrentHeading(editor: Editor) {
  const attr = editor.getAttributes("heading").level;

  if (attr) return toolbarHeadings[attr];

  return {
    label: "Paragraph",
    value: "p",
  };
}

export const toolbarHeadings = [
  { value: "h1", Icon: Heading1, label: "Heading 1" },
  { value: "h2", Icon: Heading2, label: "Heading 2" },
  { value: "h3", Icon: Heading3, label: "Heading 3" },
  { value: "h4", Icon: Heading4, label: "Heading 4" },
  { value: "h5", Icon: Heading5, label: "Heading 5" },
  { value: "h6", Icon: Heading6, label: "Heading 6" },
  { value: "p", Icon: Baseline, label: "Paragraph" },
];
