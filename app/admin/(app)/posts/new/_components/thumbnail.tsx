import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Thumbnail = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Featured Image</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Label
          htmlFor="file-input"
          className="rounded-md border border-dashed aspect-square flex flex-col items-center justify-center space-y-2"
        >
          <Upload className="w-6 h-6" />

          <p>Upload your file</p>
          <Button className="rounded-full" size="sm">
            Browse
          </Button>
          {/* <Image
            src="https://ui.shadcn.com/placeholder.svg"
            width={500}
            height={500}
            alt=""
            className="rounded-md"
          /> */}
        </Label>

        <Input type="file" id="file-input" className="hidden" />
      </CardContent>
    </Card>
  );
};

export default Thumbnail;
