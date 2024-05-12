"use client";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: "sheet" | "dialog" | "popover";
}
const Popup = ({
  open,
  onOpenChange,
  content,
  children,
  variant = "dialog",
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop && variant === "dialog") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    );
  }

  if (isDesktop && variant === "sheet") {
    return (
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>{content}</SheetContent>
      </Sheet>
    );
  }
  if (isDesktop && variant === "popover") {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent side="bottom" className="w-auto">
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>{content}</DrawerContent>
    </Drawer>
  );
};

export default Popup;
