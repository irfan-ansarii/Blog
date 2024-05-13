import React from "react";
import Link from "next/link";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const NewPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mb-6 flex">
        <div className="space-y-1">
          <CardTitle>Add Post</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur.
          </CardDescription>
        </div>
        <Link
          href="/admin/posts/new"
          className={buttonVariants({ className: "ml-auto w-32" })}
        >
          Save
        </Link>
      </div>
      {children}
    </>
  );
};

export default NewPostLayout;
