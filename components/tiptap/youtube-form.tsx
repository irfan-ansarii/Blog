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
          <form
            className="flex gap-3 items-end"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add youtube video</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button onClick={form.handleSubmit(onSubmit)}>Add video</Button>
          </form>
        </Form>
      }
    >
      <span>{children}</span>
    </Popup>
  );
};

export default YoutubeForm;
