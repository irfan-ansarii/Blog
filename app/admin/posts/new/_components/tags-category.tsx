import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TagsCategory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tags & Categories</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Input />
        </div>
        <div className="space-y-1.5">
          <Label>Tags</Label>
          <Input />
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsCategory;
