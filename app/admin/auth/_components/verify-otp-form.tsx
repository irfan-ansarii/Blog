"use client";

import Link from "next/link";
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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import { client } from "@/lib/hono";
import { useEffect, useState } from "react";

export const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: "Incorrect OTP" }),
});

const VerifyOtpForm = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifySchema>) => {
    const res = await client.api.auth.signin.verify.$post({
      json: {
        email: values.email,
        otp: values.otp,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  const handleResendOtp = async () => {
    const email = form.getValues("email");

    setResending(true);

    await new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 2000);
    });

    setResending(false);
    setTimeLeft(60);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>

              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="[&>div]:flex-1  [&>div]:h-12 w-full">
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
                  Did not received OTP?
                </p>

                {resending ? (
                  "Sending..."
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

        <div className="space-y-4">
          <Button
            className="w-full bg-lime-500 hover:bg-lime-600"
            type="submit"
          >
            Verify
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
            Signin with Password
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

export default VerifyOtpForm;
