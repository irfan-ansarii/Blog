"use client";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import React from "react";

interface ErrorType {
  status: number;
  message: string;
  description?: string;
}
const ErrorFabblack = ({
  error,
  className,
}: {
  className?: string;
  error?: ErrorType;
}) => {
  const { status, message, description } = error || {};
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center",
        className
      )}
    >
      <div className="flex gap-2 items-center flex-col">
        <span className="w-12 h-12 bg-red-50 text-red-600 rounded-full inline-flex justify-center items-center">
          <TriangleAlert className="w-5 h-5" />
        </span>
        <p className="font-semibold">
          {error ? `${status} - ${message}` : "Something Went Wrong"}
        </p>
        <p className="text-muted-foreground text-sm">
          {description ? description : "An unexpected error has occurred"}
        </p>
      </div>
    </div>
  );
};

export default ErrorFabblack;
