"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { client } from "@/lib/hono";
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

import { useRouter } from "next/navigation";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email" }),
});

const OtpSigninForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    const res = await client.api.auth.signin.otp.$post({
      json: {
        email: values.email,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
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

        <div className="space-y-4">
          <Button
            className="w-full bg-lime-500 hover:bg-lime-600"
            type="submit"
          >
            Send OTP
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

export default OtpSigninForm;
