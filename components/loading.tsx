import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center",
        className
      )}
    >
      <div className="inline-flex gap-2 items-center">
        <Loader className="w-5 h-5 animate-spin" /> Please wait...
      </div>
    </div>
  );
};

export default Loading;
