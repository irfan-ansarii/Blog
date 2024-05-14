import { Editor } from "@tiptap/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Popup from "@/components/custom-ui/popup";

import { Code, Highlighter, Link } from "lucide-react";

type Props = {
  editor: Editor;
};

export function ToolbarInlineAdvanced({ editor }: Props) {
  function toggleLink(link: string) {
    editor.chain().focus().toggleLink({ href: link }).run();
  }

  return (
    <>
      <Button
        variant="ghost"
        className="w-8 h-8 p-0 text-muted-foreground"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        data-active={editor.isActive("code") ? "is-active" : undefined}
      >
        <Code style={{ width: "18px" }} />
      </Button>

      <Button
        variant="ghost"
        className="w-8 h-8 p-0 text-muted-foreground"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        data-active={editor.isActive("highlight") ? "is-active" : undefined}
        aria-label="Highlight"
      >
        <Highlighter style={{ width: "18px" }} />
      </Button>
      {/* 
      <Popup
        content={
          <LinkPopover
            onSubmit={toggleLink}
            onRemoveLink={toggleLink}
            showRemove={editor.getAttributes("link").href}
          />
        }
      >
        <Button
          disabled={!editor.can().chain().focus().setLink({ href: "" }).run()}
          data-active={editor.isActive("link") ? "is-active" : undefined}
          aria-label="Link"
        >
          <Link style={{ width: "17px" }} />
        </Button>
      </Popup> */}
    </>
  );
}

type LinkPopoverProps = {
  onSubmit: (url: string) => void;
  onRemoveLink: (url: string) => void;
  showRemove: boolean;
};

function LinkPopover({ onSubmit, onRemoveLink, showRemove }: LinkPopoverProps) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <label>Add link to selected text</label>
      <div>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        {showRemove ? (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveLink(value);
            }}
            aria-label="Remove link"
          >
            link icon
          </Button>
        ) : null}
        <Button>Add link</Button>
      </div>
    </form>
  );
}
