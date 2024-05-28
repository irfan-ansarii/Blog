"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRecover } from "@/query/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
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

export const recoverSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email" }),
});

const RecoverForm = () => {
  const recover = useRecover();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(recoverSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof recoverSchema>) => {
    recover.mutate(values, {
      onSuccess: ({ data }) => {
        toast.success("OTP sent successfully");
        const path = `/admin/auth/reset?email=${data.email}`;
        router.push(path);
      },
      onError: (err) => toast.error(err.message),
    });
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
            disabled={recover.isPending}
          >
            {recover.isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Send OTP"
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
            Back to signin
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

export default RecoverForm;
