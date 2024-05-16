import { Editor } from "@tiptap/react";
import {
  ToggleGroup,
  ToggleGroupItem as ToggleItem,
} from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Brush,
  Check,
  ChevronDown,
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
  Strikethrough,
  Underline,
  Video,
  Youtube,
} from "lucide-react";

import Popup from "@/components/custom-ui/popup";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { toolbarHeadings, useTiptap } from "./hooks/use-tiptap";
import TooltipToggle from "./tooltip-toggle";
import YoutubeForm from "./youtube-form";
import LinkForm from "./link-form";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  const tiptap = useTiptap(editor);

  const inlineOptions = [
    {
      title: "Bold",
      Icon: Bold,
      value: tiptap.isBold,
      action: tiptap.onBold,
    },
    {
      title: "Italic",
      Icon: Italic,
      value: tiptap.isItalic,
      action: tiptap.onItalic,
    },
    {
      title: "Underline",
      Icon: Underline,
      value: tiptap.isUnderline,
      action: tiptap.onUnderline,
    },
    {
      title: "Strikethrough",
      Icon: Strikethrough,
      value: tiptap.isStrike,
      action: tiptap.onStrike,
    },
  ];

  const alignOptions = [
    {
      title: "Left align",
      Icon: AlignLeft,
      value: tiptap.isAlignLeft,
      action: tiptap.onAlignLeft,
    },
    {
      title: "Center align",
      Icon: AlignCenter,
      value: tiptap.isAlignCenter,
      action: tiptap.onAlignCenter,
    },
    {
      title: "Right align",
      Icon: AlignRight,
      value: tiptap.isAlignRight,
      action: tiptap.onAlignRight,
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-y-2 divide-x border-y py-2 sticky top-4">
      {/* heading */}
      <div className="px-2 space-x-0.5">
        <Popup
          variant="popover"
          content={
            <ToggleGroup
              type="single"
              value={tiptap.currentHeading.value}
              onValueChange={(value) => tiptap.onHeadingChange(value)}
              size="sm"
              className="flex flex-col items-stretch"
            >
              {toolbarHeadings.map(({ value, Icon, label }) => (
                <ToggleItem value={value} key={value}>
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="mr-3">{label}</span>

                  <Check
                    className={`ml-auto w-4 h-4 ${
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

      {/* inline options */}
      <div className="px-2 space-x-0.5">
        {inlineOptions.map(({ Icon, ...rest }) => (
          <TooltipToggle
            key={rest.title}
            onChange={rest.action}
            value={rest.value}
            title={rest.title}
          >
            <Icon className="w-4 h-4" />
          </TooltipToggle>
        ))}
      </div>

      {/* alignment */}
      <div className="px-2 space-x-0.5">
        <Popup
          variant="popover"
          content={
            <div className="flex flex-col gap-1">
              {alignOptions.map(({ Icon, ...rest }) => (
                <Toggle
                  key={rest.title}
                  onPressedChange={rest.action}
                  pressed={rest.value}
                  size="sm"
                  className="justify-start"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {rest.title}
                </Toggle>
              ))}
            </div>
          }
        >
          <span>
            <TooltipToggle value={false} title="Alignment">
              <AlignLeft className="w-4 h-4" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </TooltipToggle>
          </span>
        </Popup>
      </div>

      <div className="px-2 space-x-0.5">
        {/* link */}
        <LinkForm
          onLink={tiptap.onLink}
          onUnlink={tiptap.onUnlink}
          isLink={tiptap.isLink}
        >
          <TooltipToggle
            value={tiptap.isLink || false}
            title={tiptap.isLink ? "Edit link" : "Add Link"}
          >
            <Link className="w-4 h-4" />
          </TooltipToggle>
        </LinkForm>

        <Popup
          variant="popover"
          content={
            <Tabs defaultValue="foreground">
              <TabsList className="w-full">
                <TabsTrigger value="foreground" className="flex-1">
                  Foreground
                </TabsTrigger>
                <TabsTrigger value="background" className="flex-1">
                  Background
                </TabsTrigger>
              </TabsList>
              <TabsContent value="foreground" className="space-y-2">
                <HexColorPicker
                  className="!w-full"
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
              </TabsContent>
              <TabsContent value="background" className="space-y-2">
                <HexColorPicker
                  className="!w-full"
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
              </TabsContent>
            </Tabs>
          }
        >
          <span>
            <TooltipToggle
              value={tiptap.currentHighlight || tiptap.currentColor}
              title="Color"
            >
              <Brush className="w-4 h-4" />
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
            <Video className="w-4 h-4" />
          </TooltipToggle>
        </YoutubeForm>
      </div>
    </div>
  );
}
