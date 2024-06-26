"use client";
import React, { useState } from "react";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Popup from "../custom-ui/popup";
import { CornerDownLeft } from "lucide-react";
const YoutubeForm = ({
  onAddVideo,
  children,
}: {
  onAddVideo: (v: string) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: any) => {
    if (!values || !values.url) return;
    onAddVideo(values.url as string);
    setOpen(false);
  };

  return (
    <Popup
      open={open}
      onOpenChange={setOpen}
      variant="popover"
      content={
        <Form {...form}>
          <form className="p-2 pt-0" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Add youtube video</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input placeholder="https://" {...field} />

                      <Button
                        onClick={form.handleSubmit(onSubmit)}
                        className="absolute right-0 top-0"
                        variant="link"
                      >
                        <CornerDownLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      }
    >
      <span>{children}</span>
    </Popup>
  );
};

export default YoutubeForm;
