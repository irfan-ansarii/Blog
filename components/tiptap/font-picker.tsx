import { useCallback } from "react";
import Popup from "../custom-ui/popup";
import { Button } from "../ui/button";

const FONT_FAMILY_GROUPS = [
  {
    label: "Sans Serif",
    options: [
      { label: "Inter", value: "" },
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
    ],
  },
  {
    label: "Serif",
    options: [
      { label: "Times New Roman", value: "Times" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
    ],
  },
  {
    label: "Monospace",
    options: [
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options,
]).flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  value: string;
};

export const FontPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(" ")[0] || "Inter";

  const selectFont = useCallback(
    (font: string) => () => onChange(font),
    [onChange]
  );

  return (
    <Popup
      content={FONT_FAMILY_GROUPS.map((group) => (
        <div
          className="mt-2.5 first:mt-0 gap-0.5 flex flex-col"
          key={group.label}
        >
          <div className="text-xs text-muted-foreground">{group.label}</div>
          {group.options.map((font) => (
            <Button
              size="sm"
              isActive={value === font.value}
              onClick={selectFont(font.value)}
              key={`${font.label}_${font.value}`}
            >
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </Button>
          ))}
        </div>
      ))}
    >
      <Button size="sm">{currentFontLabel}</Button>
    </Popup>
  );
};
