"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import Thumbnail from "./_components/thumbnail";
import TagsCategory from "./_components/tags-category";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostEditor = dynamic(() => import("./_components/editor"), {
  ssr: false,
});

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6"
      >
        <div className="col-span-2 space-y-6 border rounded-md min-h-screen">
          <PostEditor form={form} />
        </div>

        <div className="col-span-1 space-y-6">
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

        <Card className="sticky bottom-0 border p-4 col-span-3">
          <Button className="w-full">Submit</Button>
        </Card>
      </form>
    </Form>
  );
};

export default PostForm;
