import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ResetPasswordForm from "../_components/reset-form";

const ResetPasswordPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const { email } = searchParams;

  if (!email) {
    redirect("/admin/auth/recover");
  }

  return (
    <Card className="w-full max-w-lg border-0 sm:border sm:p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create Password</CardTitle>
        <CardDescription>
          Enter OTP sent to your email and choose a new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResetPasswordForm email={email} />
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
