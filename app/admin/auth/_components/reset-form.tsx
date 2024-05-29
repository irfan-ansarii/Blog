"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { useSigninOTP } from "@/features/mutations/auth";

import { Eye, EyeOff, Loader } from "lucide-react";
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
import Tooltip from "@/components/custom-ui/tooltip";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const resetSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: "Incorrect OTP" }),
  password: z.string().min(8, { message: "Required" }),
  confirmPassword: z.string().min(8, { message: "Required" }),
});

const ResetPasswordForm = ({ email }: { email: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const sendOtp = useSigninOTP();
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otp = form.getValues("otp")?.length > 0;
  const password = form.getValues("password")?.length > 0;

  const onSubmit = () => {};

  const handleResendOtp = async () => {
    const email = form.getValues("email");

    sendOtp.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP sent sucessfully");
          setTimeLeft(60);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  // timeleft event listener
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>

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
              <div className="flex justify-between text-sm">
                <p className="text-sm text-muted-foreground">
                  {sendOtp.isPending ? "Sending..." : "Did not received OTP?"}
                </p>

                {sendOtp.isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : timeLeft > 0 ? (
                  <span className="text-sm font-medium">
                    Resend OTP in {timeLeft} seconds
                  </span>
                ) : (
                  <Button
                    className="underline py-0 px-0 h-auto"
                    variant="link"
                    type="button"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={!otp}
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>

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
        <FormField
          control={form.control}
          name="confirmPassword"
          disabled={!otp || !password}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button
            className="w-full bg-lime-500 hover:bg-lime-600"
            type="submit"
          >
            Create Password
          </Button>

          <div className="flex items-center space-x-2 w-full">
            <hr className="flex-grow" />
            <span className="text-muted-foreground text-sm">OR</span>
            <hr className="flex-grow" />
          </div>
          <Link
            href="/admin/auth/signin"
            className={buttonVariants({ className: "w-full" })}
          >
            Signin
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
