import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="mt-auto">
      <Card className="sticky bottom-0 mt-4">
        <div className="flex justify-center gap-4 p-2 pb-2 items-center">
          <Link
            href="/"
            className={buttonVariants({ variant: "secondary", size: "icon" })}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <span>1</span>
          <Link
            href="/"
            className={buttonVariants({ variant: "secondary", size: "icon" })}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="text-center p-4 pt-0">
          <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default Pagination;
