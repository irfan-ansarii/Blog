import React from "react";
import Link from "next/link";
import Popup from "@/components/custom-ui/popup";

import { Button, buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ChevronDown, Filter, ListFilter, PlusCircle } from "lucide-react";

import SearchBar from "@/components/admin/search-bar";
import AddUser from "../_components/add-user";
const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mb-6 flex">
        <div className="space-y-1">
          <AddUser />
          <CardTitle>Posts</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur.
          </CardDescription>
        </div>
        <Link
          href="/admin/posts/new"
          className={buttonVariants({ className: "ml-auto w-32" })}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add Post
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row mb-6 justify-end gap-2">
        <Button
          className="justify-between lg:w-36 lg:order-2"
          variant="outline"
        >
          <span className="inline-flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Popup content={<div className="w-24">Content</div>} variant="popover">
          <Button
            className="justify-between lg:w-36 lg:order-3"
            variant="outline"
          >
            <span className="inline-flex items-center">
              <ListFilter className="w-4 h-4 mr-2" />
              Sort By
            </span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </Popup>
        <SearchBar containerClassName="flex-1 lg:order-1" />
      </div>
      {children}
    </>
  );
};

export default PostsLayout;
