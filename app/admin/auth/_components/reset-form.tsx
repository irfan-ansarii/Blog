"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Tooltip from "@/components/custom-ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const resetSchema = z.object({
  otp: z.string().length(6, { message: "Incorrect OTP" }),
  password: z.string().min(8, { message: "Required" }),
  confirmPassword: z.string().min(8, { message: "Required" }),
});

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>One-Time Password</FormLabel>
                <Link href="/admin/auth/signup">
                  <Badge>Resend</Badge>
                </Link>
              </div>

              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="[&>div]:flex-1  w-full">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="me@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  className="text-sm font-medium underline underline-offset-4"
                  href="/admin/auth/recover"
                >
                  Forgot password?
                </Link>
              </div>

              <FormControl>
                <Input
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              </FormControl>

              <Tooltip
                content={showPassword ? "Hide password" : "Show password"}
              >
                <Button
                  size="icon"
                  variant="link"
                  type="button"
                  className="absolute right-0 bottom-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </Tooltip>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button
            className="w-full bg-lime-500 hover:bg-lime-600"
            type="submit"
          >
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
              href="/admin/auth/signup"
              className={buttonVariants({
                variant: "link",
                className: "!px-2",
              })}
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
