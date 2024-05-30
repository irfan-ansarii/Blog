import React from "react";
import Link from "next/link";
import { format } from "date-fns";

import { Calendar, CircleCheck, Heart, Reply } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CommentActions from "./comment-actions";

const CommentCard = ({ comment }) => {
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
                {/* {post.title.charAt(0)} */}F
              </AvatarFallback>
            </Avatar>

            <div className="flex-auto overflow-hidden">
              <Link
                href={`/admin/posts/${"1"}`}
                className={`text-base md:text-lg font-medium truncate inline-flex items-center [&:hover>svg]:opacity-100 !focus-visible:ring-transparent`}
              >
                User name
              </Link>

              <p className="text-muted-foreground truncate">
                {/* {comment.comment} */}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Similique error obcaecati corporis non explicabo, hic maxime
                pariatur inventore consequuntur deleniti, nam consequatur, eos
                rem nostrum. Nihil deserunt dolor unde voluptates? Iste sequi
                reiciendis voluptatibus voluptas recusandae amet inventore
                fugiat expedita illo. Excepturi harum veniam quidem dolor illum
                molestias deserunt at.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-none gap-1">
            <Badge className="py-1">
              <CircleCheck className="w-4 h-4" />
              <span className="hidden md:inline ml-2"> Active</span>
            </Badge>
            <CommentActions comment={comment} />
          </div>
        </div>

        <div className="flex gap-2 md:gap-4">
          <div className="w-10 md:w-12"></div>
          <div className="flex  items-center gap-2 text-sm overflow-hidden flex-1">
            <span className="inline-flex items-center text-muted-foreground gap-2">
              <Calendar className="w-4 h-4" />
              {format(comment.createdAt, "dd, MMM")}
            </span>
            <p>•</p>
            <span className="inline-flex items-center text-muted-foreground gap-2">
              <Heart className="w-4 h-4" />
              10+
              <span className="hidden md:inline"> Likes</span>
            </span>
            <p>•</p>
            <span className="inline-flex items-center text-muted-foreground gap-2">
              <Reply className="w-4 h-4" />
              10+
              <span className="hidden md:inline"> Replies</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
