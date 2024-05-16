import React from "react";
import Tooltip from "../custom-ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface ToogleProps {
  title: string;
  value?: boolean | undefined;
  onChange?: (p: any) => void;
  children: React.ReactNode;
  disabled?: boolean;
}
const TooltipToggle = ({
  title,
  value,
  onChange,
  children,
  disabled,
  ...props
}: ToogleProps) => {
  return (
    <Tooltip content={title}>
      <span>
        <Toggle
          size="sm"
          pressed={value}
          onPressedChange={onChange}
          disabled={disabled}
          {...props}
        >
          {children}
        </Toggle>
      </span>
    </Tooltip>
  );
};

export default TooltipToggle;
