import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Image,
  Layers,
  LayoutDashboard,
  MessageCircle,
  Package2,
  Settings,
  Tags,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { NavItem } from "./nav-item";
import Logo from "../logo";

const items = [
  {
    title: "Dashboard",
    slug: "/dashboard",
    label: "New",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    slug: "/posts",
    icon: Layers,
  },
  {
    title: "Comments",
    slug: "/comments",
    icon: MessageCircle,
  },
  {
    title: "Media",
    slug: "/media",
    icon: Image,
  },
  {
    title: "Categories",
    slug: "/categories",
    icon: Tags,
  },
  {
    title: "Audience",
    slug: "/audience",
    icon: Users,
  },

  {
    title: "Settings",
    slug: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex h-full max-h-screen flex-col gap-2", className)}>
      <div className="flex h-[60px] items-center border-b px-5">
        <Link className="flex items-center gap-2 font-semibold" href="/admin">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavItem href={`/admin/${item.slug}`}>
                <span className="inline-flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {item.title}
                </span>
                {item.label && <Badge className="text-xs">{item.label}</Badge>}
              </NavItem>
            );
          })}
        </nav>
      </div>

      <div className="px-4 my-5">
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "!flex truncate !px-3 gap-2 h-12 !bg-accent",
          })}
          href="profile"
        >
          <Avatar className="flex-none w-8 h-8 border-2">
            <AvatarImage></AvatarImage>
            <AvatarFallback className="bg-blue-400">I</AvatarFallback>
          </Avatar>

          <span className="truncate">Irfan Ansarisdfdsiufgsoifgheysf</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
