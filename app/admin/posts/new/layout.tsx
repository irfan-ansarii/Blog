import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";

const NewPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="space-y-1 mb-6">
        <CardTitle>Add Post</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur.
        </CardDescription>
      </div>

      {children}
    </>
  );
};

export default NewPostLayout;
