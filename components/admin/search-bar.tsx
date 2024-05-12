import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components//ui/input";
import { Search } from "lucide-react";

const SearchBar = ({
  containerClassName,
  inputClassName,
}: {
  containerClassName?: string;
  inputClassName?: string;
}) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <span className="absolute left-0 inset-y-0 px-3 pointer-events-none inline-flex items-center justify-center">
        <Search className="w-4 h-4" />
      </span>
      <Input placeholder="Search..." className={cn("pl-10", inputClassName)} />
    </div>
  );
};

export default SearchBar;
