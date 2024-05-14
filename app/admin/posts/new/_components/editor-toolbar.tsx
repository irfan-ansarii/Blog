"use client";
import { Editor } from "@tiptap/react";
import { ToolbarInlineAdvanced } from "./text-inline-advanced";
// import { ToolbarAlignment } from "./ToolbarAlignment";
// import { ToolbarBlock } from "./ToolbarBlock";
// import { ToolbarCommands } from "./ToolbarCommands";
// import { ToolbarHeadings } from "./ToolbarHeadings";
// import { ToolbarInline } from "./ToolbarInline";
// import { ToolbarMedia } from "./ToolbarMedia";
// import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  editor: Editor;
};

export function EditorToolbar({ editor }: Props) {
  return (
    <div>
      <div>
        <ToolbarInlineAdvanced editor={editor} />
      </div>
      {/* <div className={styles.toolbarSection}>
        <ThemeToggle />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarCommands editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarHeadings editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarInline editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarAlignment editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarBlock editor={editor} />
      </div>
      <div className={styles.toolbarSection}>
        <ToolbarMedia editor={editor} />
      </div> */}
    </div>
  );
}
