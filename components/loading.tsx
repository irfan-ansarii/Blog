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
      <div className="flex gap-2 items-center flex-col">
        <Loader className="w-6 h-6 animate-spin text-lime-500" />
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
