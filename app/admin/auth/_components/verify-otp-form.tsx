"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSigninOTP, useSigninVerify } from "@/query/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

import { Loader } from "lucide-react";
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

export const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: "Incorrect OTP" }),
});

const VerifyOtpForm = ({ email }: { email: string }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  const verify = useSigninVerify();
  const sendOtp = useSigninOTP();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  // verify otp
  const onSubmit = async (values: z.infer<typeof verifySchema>) => {
    verify.mutate(values, {
      onSuccess: ({ data }) => {
        console.log(data);
        toast.success("Logged in sucessfully");
        // @ts-ignore - token exists on data but ts is not able to infer
        setCookie("token", data.token);
        router.push("/admin/dashboard");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  // resend otp
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

        <div className="space-y-4">
          <Button
            className="w-full bg-lime-500 hover:bg-lime-600"
            type="submit"
            disabled={verify.isPending}
          >
            {verify.isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Verify"
            )}
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
