import React from "react";
import Link from "next/link";
import {
  Calendar,
  EllipsisVertical,
  ExternalLink,
  Eye,
  LockKeyhole,
  PenSquare,
  Tags,
  User,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Tooltip from "@/components/custom-ui/tooltip";

const PostCard = () => {
  const isArchived = true;
  return (
    <Card
      className={`hover:border-foreground transition duration-500 overflow-hidden w-full`}
    >
      <CardContent className="p-4 md:p-6 space-y-1">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-1 gap-2 md:gap-4 overflow-hidden">
            <Avatar className="border-2 md:w-12 md:h-12">
              <AvatarImage
                src="https://api.dicebear.com/8.x/shapes/svg"
                className="p-1 rounded-full"
              />
              <AvatarFallback className="font-medium text-xs uppercase">
                A
              </AvatarFallback>
            </Avatar>

            <div className="flex-auto overflow-hidden">
              <Link
                href="/admin/posts/1/"
                className={`text-base md:text-lg font-medium truncate inline-flex items-center [&:hover>svg]:opacity-100 !focus-visible:ring-transparent ${
                  !isArchived ? "line-through text-muted-foreground" : ""
                }`}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <span>
                  <LockKeyhole className="w-4 h-4 ml-2 " />
                </span>
                <PenSquare className="w-4 h-4 ml-2 opacity-0" />
              </Link>

              <div className="flex items-center gap-2 max-w-fit font-medium text-sm md:text-base overflow-hidden">
                {!isArchived ? (
                  <p className="text-muted-foreground truncate">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                ) : (
                  <a
                    href="/"
                    target="_blank"
                    className={`truncate flex-1 inline-flex items-center hover:underline`}
                  >
                    Lorem ipsum dolor sit amet consectetur.
                    <ExternalLink className="w-4 h-4 ml-2 " />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center flex-none gap-1">
            <Tooltip
              content={
                <>
                  <p className="text-center font-medium text-sm">
                    10 total views
                  </p>
                  <p className="text-muted-foreground text-xs font-medium">
                    Last clicked today
                  </p>
                </>
              }
            >
              <Link href={`/analytics/`}>
                <Badge className="py-1">
                  <Eye className="w-4 h-4 mr-1 md:mr-2" />0
                  <span className="hidden md:inline ml-1"> Views</span>
                </Badge>
              </Link>
            </Tooltip>
          </div>

          <Button className="px-2" variant="ghost">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex gap-2 md:gap-4">
          <div className="w-10 md:w-12"></div>
          <div className="flex  items-center gap-2 text-sm overflow-hidden flex-1">
            <span className="inline-flex items-center text-muted-foreground gap-2">
              <Calendar className="w-4 h-4" />
              12 May
            </span>

            <p>•</p>

            <span className="inline-flex items-center text-muted-foreground gap-2">
              <User className="w-4 h-4" />
              Created By
            </span>

            <p>•</p>

            <Tooltip
              content={
                <>
                  <p>Content</p>
                </>
              }
              variant="card"
            >
              <span className="inline-flex items-center text-muted-foreground gap-2">
                <Tags className="w-4 h-4" />
                10 +
              </span>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
