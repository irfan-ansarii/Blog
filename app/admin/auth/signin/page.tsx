import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChromeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <Card className="w-full max-w-md border-0 sm:border sm:p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-sm font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-50"
              href="/admin/auth/reset"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" required type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-6">
        <Button className="w-full bg-lime-500 hover:bg-lime-600" type="submit">
          Sign in
        </Button>

        <div className="flex items-center space-x-2 w-full">
          <hr className="flex-grow" />
          <span className="text-muted-foreground text-sm">OR</span>
          <hr className="flex-grow" />
        </div>
        <Link href="" className={buttonVariants({ className: "w-full" })}>
          Signin with OTP
        </Link>
        <div className="flex items-center justify-center w-full">
          <p className="text-sm text-muted-foreground">
            Dont have account yet?
          </p>

          <Link
            href=""
            className={buttonVariants({
              variant: "link",
              className: "!px-2",
            })}
          >
            Signup
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
