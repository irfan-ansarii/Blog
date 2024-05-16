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
import { Switch } from "../ui/switch";

const LinkForm = ({
  onLink,
  isLink,
  onUnlink,
  children,
}: {
  onLink: (v: any) => void;
  isLink: boolean;
  onUnlink: () => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      href: "",
      targetBlank: false,
    },
  });

  const onSubmit = (values: any) => {
    if (!values || !values.href) return;
    const { href, targetBlank } = values;
    console.log(values);

    onLink({ href: href, target: targetBlank ? "_blank" : "" });
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
            className="p-2 pt-0 space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{isLink ? "Edit" : "Add"} URL</FormLabel>

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

            <FormField
              control={form.control}
              name="targetBlank"
              render={({ field }) => (
                <FormItem className="w-full flex justify-between space-y-0 items-center">
                  <FormLabel>Open link in new tab</FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLink && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full"
                onClick={onUnlink}
              >
                Remove
              </Button>
            )}
          </form>
        </Form>
      }
    >
      <span>{children}</span>
    </Popup>
  );
};

export default LinkForm;
