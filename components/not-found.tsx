import React from "react";
import { cn } from "@/lib/utils";
import { FileSearch } from "lucide-react";

const NotFound = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center",
        className
      )}
    >
      <div className="flex gap-2 items-center flex-col">
        <span className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full inline-flex justify-center items-center">
          <FileSearch className="w-5 h-5" />
        </span>
        <p className="font-semibold">Page not found.</p>
        <p className="text-muted-foreground text-sm">
          The page you're looking for doesn't exist!
        </p>
      </div>
    </div>
  );
};

export default NotFound;
