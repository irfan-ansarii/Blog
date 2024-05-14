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
  Baseline,
  Bold,
  Check,
  ChevronsUpDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
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
import { useCallback } from "react";
import { Level } from "@tiptap/extension-heading";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

type Props = {
  editor: Editor;
};

const toolbarHeadings = [
  { value: "h1", Icon: Heading1, label: "Heading 1" },
  { value: "h2", Icon: Heading2, label: "Heading 2" },
  { value: "h3", Icon: Heading3, label: "Heading 3" },
  { value: "h4", Icon: Heading4, label: "Heading 4" },
  { value: "h5", Icon: Heading5, label: "Heading 5" },
  { value: "h6", Icon: Heading6, label: "Heading 6" },
  { value: "p", Icon: Baseline, label: "Paragraph" },
];

function getCurrentHeading(editor: Editor) {
  const attr = editor.getAttributes("heading").level;

  if (attr) return toolbarHeadings[attr];

  return {
    label: "Paragraph",
    value: "p",
  };
}

export function Toolbar({ editor }: Props) {
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

  const onChangeColor = useCallback(
    (color: string) => editor.chain().setColor(color).run(),
    [editor]
  );

  const onChangeHighlight = useCallback(
    (color: string) => editor.chain().setHighlight({ color }).run(),
    [editor]
  );

  return (
    <div className="flex items-center flex-wrap gap-2 divide-x border-y py-2">
      <div className="px-2">
        <Toggle size="sm">
          <Undo2 className="w-4 h-4" />
        </Toggle>
        <Toggle size="sm">
          <Redo2 className="w-4 h-4" />
        </Toggle>
      </div>
      <div className="px-2">
        <Popup
          variant="popover"
          content={
            <ToggleGroup
              type="single"
              value={getCurrentHeading(editor).value}
              onValueChange={(value) => onHeadingChange(value)}
              size="sm"
              className="flex flex-col"
            >
              {toolbarHeadings.map(({ value, Icon, label }) => (
                <ToggleItem value={value} key={value}>
                  <Icon className="w-4 h-4 mr-2" />
                  {label}

                  <Check
                    className={`ml-2 w-4 h-4 ${
                      getCurrentHeading(editor).value === value
                        ? "opacity-80"
                        : "opacity-0"
                    }`}
                  />
                </ToggleItem>
              ))}
            </ToggleGroup>
          }
        >
          <Toggle size="sm">
            {getCurrentHeading(editor).label}
            <ChevronsUpDown className="w-4 h-4 ml-4" />
          </Toggle>
        </Popup>
      </div>
      <div className="px-2">
        <Toggle size="sm">
          <Bold className="w-4 h-4" />
        </Toggle>
        <Toggle size="sm">
          <Italic className="w-4 h-4" />
        </Toggle>
        <Toggle size="sm">
          <Underline className="w-4 h-4" />
        </Toggle>
        <Toggle size="sm">
          <Strikethrough className="w-4 h-4" />
        </Toggle>
      </div>
      <div className="px-2">
        <ToggleGroup type="single" size="sm">
          <ToggleItem value="">
            <AlignLeft className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <AlignCenter className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <AlignRight className="w-4 h-4" />
          </ToggleItem>
          <ToggleItem value="">
            <AlignJustify className="w-4 h-4" />
          </ToggleItem>
        </ToggleGroup>
      </div>
      <div className="px-2">
        <ToggleGroup type="multiple" size="sm">
          <Popup
            variant="popover"
            content={
              <div className="space-y-4">
                <HexColorPicker
                  className="w-full"
                  onChange={onChangeHighlight}
                />
                <Toggle
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                >
                  Clear
                </Toggle>
              </div>
            }
          >
            <span>
              <Toggle
                pressed={editor.getAttributes("highlight")?.color || false}
              >
                <Highlighter className="w-4 h-4" />
              </Toggle>
            </span>
          </Popup>
          <Popup
            variant="popover"
            content={
              <div className="space-y-4">
                <HexColorPicker className="w-full" onChange={onChangeColor} />
                <Button variant="outline" size="sm" className="w-full">
                  Clear
                </Button>
              </div>
            }
          >
            <ToggleItem value="1">
              <Palette className="w-4 h-4" />
            </ToggleItem>
          </Popup>
        </ToggleGroup>
      </div>

      <div className="px-2">
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
      <div className="px-2">
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
