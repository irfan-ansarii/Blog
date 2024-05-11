"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href?.replace(/\/\//g, "/")}
      className={buttonVariants({
        variant: pathname.includes(href) ? "default" : "ghost",
        size: "sm",
        className: "justify-between",
      })}
    >
      {children}
    </Link>
  );
}
