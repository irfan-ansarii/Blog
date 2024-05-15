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

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  const tiptap = useTiptap(editor);

  return (
    <div className="flex items-center flex-wrap gap-2 divide-x border-y py-2 sticky top-4">
      <div className="px-2 space-x-0.5">
        <Toggle
          size="sm"
          onPressedChange={tiptap.onUndo}
          disabled={tiptap.canUndo}
          pressed={false}
        >
          <Undo2 className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onRedo}
          disabled={tiptap.canRedo}
          pressed={false}
        >
          <Redo2 className="w-4 h-4" />
        </Toggle>
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
        <Toggle
          size="sm"
          onPressedChange={tiptap.onBold}
          pressed={tiptap.isBold}
        >
          <Bold className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onItalic}
          pressed={tiptap.isItalic}
        >
          <Italic className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onUnderline}
          pressed={tiptap.isUnderline}
        >
          <Underline className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onStrike}
          pressed={tiptap.isStrike}
        >
          <Strikethrough className="w-4 h-4" />
        </Toggle>
      </div>
      <div className="px-2 space-x-0.5">
        <Toggle
          size="sm"
          onPressedChange={tiptap.onAlignLeft}
          pressed={tiptap.isAlignLeft}
        >
          <AlignLeft className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onAlignCenter}
          pressed={tiptap.isAlignCenter}
        >
          <AlignCenter className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onAlignRight}
          pressed={tiptap.isAlignRight}
        >
          <AlignRight className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={tiptap.onAlignJustify}
          pressed={tiptap.isAlignJustify}
        >
          <AlignJustify className="w-4 h-4" />
        </Toggle>
      </div>
      <div className="px-2 space-x-0.5">
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
            <Toggle size="sm" pressed={tiptap.currentHighlight}>
              <Highlighter className="w-4 h-4" />
            </Toggle>
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
            <Toggle size="sm" pressed={tiptap.currentColor}>
              <Palette className="w-4 h-4" />
            </Toggle>
          </span>
        </Popup>
      </div>

      <div className="px-2 space-x-0.5">
        <ToggleGroup type="single" size="sm">
          <ToggleItem value="">
            <List className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <ListOrdered className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <Quote className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <ListTodo className="w-4 h-4" />
          </ToggleItem>
        </ToggleGroup>
      </div>

      <div className="px-2 space-x-0.5">
        <ToggleGroup type="single" size="sm">
          <ToggleItem value="">
            <Code className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <Image className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <Youtube className="w-4 h-4" />
          </ToggleItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
