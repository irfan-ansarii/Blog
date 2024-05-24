"use client";
import React from "react";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import Thumbnail from "./_components/thumbnail";
import TagsCategory from "./_components/tags-category";
import StickyAction from "./_components/sticky-action";

import LiveblocksProvider from "@/components/tiptap/provider";
import TiptapEditor from "@/components/tiptap";

const PostForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: [],
      thumbnail: "",
      tags: [],
      categories: [],
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <LiveblocksProvider roomId="liveblocks">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-6"
        >
          <StickyAction form={form} />
          <div className="col-span-2 border rounded-md">
            <div className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Type title here..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Type slug here..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <TiptapEditor />
          </div>

          <div className="col-span-1 space-y-6">
            <div className="sticky top-24">
              <Tabs defaultValue="content" className="space-y-6">
                <TabsList className="w-full [&>button]:flex-1">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-6">
                  <Thumbnail />
                  <TagsCategory />
                </TabsContent>
                <TabsContent value="comments">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </form>
      </Form>
    </LiveblocksProvider>
  );
};

export default PostForm;
