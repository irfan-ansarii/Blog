import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Toaster richColors position="top-center" />
      {children}
    </TooltipProvider>
  );
};

export default Provider;
