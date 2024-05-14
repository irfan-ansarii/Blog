import Task from "@tiptap/extension-task-item";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Checkbox } from "../ui/checkbox";

// A custom task item that uses the checkbox primitive
export const TaskItem = Task.extend({
  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapCheckbox);
  },
});

function TiptapCheckbox({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper>
      <label contentEditable={false}>
        <Checkbox
          defaultChecked={false}
          checked={node.attrs.checked}
          onCheckedChange={(checked: boolean) => updateAttributes({ checked })}
        />
      </label>
      <NodeViewContent />
    </NodeViewWrapper>
  );
}
