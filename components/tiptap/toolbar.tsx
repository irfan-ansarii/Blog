import { Editor } from "@tiptap/react";
import {
  ToggleGroup,
  ToggleGroupItem as ToggleItem,
} from "@/components/ui/toggle-group";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronsUpDown,
  Code,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Palette,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
  Youtube,
} from "lucide-react";

import Popup from "@/components/custom-ui/popup";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { toolbarHeadings, useTiptap } from "./hooks/use-tiptap";
import TooltipToggle from "./tooltip-toggle";
import YoutubeForm from "./youtube-form";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  const tiptap = useTiptap(editor);

  return (
    <div className="flex items-center flex-wrap gap-2 divide-x border-y py-2 sticky top-4">
      <div className="px-2 space-x-0.5">
        <TooltipToggle
          onChange={tiptap.onUndo}
          value={false}
          title="Undo"
          disabled={tiptap.canUndo}
        >
          <Undo2 className="w-4 h-4" />
        </TooltipToggle>

        <TooltipToggle
          onChange={tiptap.onRedo}
          value={false}
          title="Redo"
          disabled={tiptap.canRedo}
        >
          <Redo2 className="w-4 h-4" />
        </TooltipToggle>
      </div>
      <div className="px-2 space-x-0.5">
        <Popup
          variant="popover"
          content={
            <ToggleGroup
              type="single"
              value={tiptap.currentHeading.value}
              onValueChange={(value) => tiptap.onHeadingChange(value)}
              size="sm"
              className="flex flex-col"
            >
              {toolbarHeadings.map(({ value, Icon, label }) => (
                <ToggleItem value={value} key={value}>
                  <Icon className="w-4 h-4 mr-2" />
                  {label}

                  <Check
                    className={`ml-2 w-4 h-4 ${
                      tiptap.currentHeading.value === value
                        ? "opacity-80"
                        : "opacity-0"
                    }`}
                  />
                </ToggleItem>
              ))}
            </ToggleGroup>
          }
        >
          <Toggle size="sm" className="w-32">
            {tiptap.currentHeading.label}
            <ChevronsUpDown className="w-4 h-4 ml-4" />
          </Toggle>
        </Popup>
      </div>

      <div className="px-2 space-x-0.5">
        <TooltipToggle
          onChange={tiptap.onBold}
          value={tiptap.isBold}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onItalic}
          value={tiptap.isItalic}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onUnderline}
          value={tiptap.isUnderline}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onStrike}
          value={tiptap.isStrike}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </TooltipToggle>
      </div>

      <div className="px-2 space-x-0.5">
        <TooltipToggle
          onChange={tiptap.onAlignLeft}
          value={tiptap.isAlignLeft}
          title="Align left"
        >
          <AlignLeft className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onAlignCenter}
          value={tiptap.isAlignCenter}
          title="Align center"
        >
          <AlignCenter className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onAlignRight}
          value={tiptap.isAlignRight}
          title="Align right"
        >
          <AlignRight className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          onChange={tiptap.onAlignJustify}
          value={tiptap.isAlignJustify}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </TooltipToggle>
      </div>

      <div className="px-2 space-x-0.5">
        <TooltipToggle
          onChange={tiptap.onAlignJustify}
          value={tiptap.isAlignJustify}
          title="Link"
        >
          <Link className="w-4 h-4" />
        </TooltipToggle>

        <Popup
          variant="popover"
          content={
            <div className="space-y-4">
              <HexColorPicker
                className="w-full"
                onChange={tiptap.onChangeHighlight}
              />
              <Toggle
                variant="outline"
                size="sm"
                className="w-full"
                onClick={tiptap.onClearHighlight}
              >
                Clear
              </Toggle>
            </div>
          }
        >
          <span>
            <TooltipToggle value={tiptap.currentHighlight} title="Highlight">
              <Highlighter className="w-4 h-4" />
            </TooltipToggle>
          </span>
        </Popup>

        <Popup
          variant="popover"
          content={
            <div className="space-y-4">
              <HexColorPicker
                className="w-full"
                onChange={tiptap.onChangeColor}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={tiptap.onClearColor}
              >
                Clear
              </Button>
            </div>
          }
        >
          <span>
            <TooltipToggle value={tiptap.currentColor} title="Color">
              <Palette className="w-4 h-4" />
            </TooltipToggle>
          </span>
        </Popup>
      </div>

      <div className="px-2 space-x-0.5">
        <TooltipToggle
          value={tiptap.isBulletList}
          title="Bullet list"
          onChange={tiptap.onToggleBulletList}
        >
          <List className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          value={tiptap.isOrderedList}
          onChange={tiptap.onToggleOrderedList}
          title="Ordered list"
        >
          <ListOrdered className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          value={tiptap.isBlockquote}
          onChange={tiptap.onToggleBlockquote}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle
          value={tiptap.isTaskList}
          onChange={tiptap.onToggleTaskList}
          title="Todo list"
        >
          <ListTodo className="w-4 h-4" />
        </TooltipToggle>
      </div>

      <div className="px-2 space-x-0.5">
        <TooltipToggle
          value={tiptap.isCodeBlock}
          onChange={tiptap.onToggleCodeBlock}
          title="Code"
        >
          <Code className="w-4 h-4" />
        </TooltipToggle>
        <TooltipToggle title="Image">
          <Image className="w-4 h-4" />
        </TooltipToggle>

        <YoutubeForm
          onAddVideo={(v) =>
            tiptap.onAddVideo({
              src: v,
            })
          }
        >
          <TooltipToggle title="Add video">
            <Youtube className="w-4 h-4" />
          </TooltipToggle>
        </YoutubeForm>
      </div>
    </div>
  );
}
