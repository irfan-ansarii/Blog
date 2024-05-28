import React from "react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VerifyOtpForm from "../../_components/verify-otp-form";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Tooltip from "@/components/custom-ui/tooltip";

const VerifyOtpPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const { email } = searchParams;

  if (!email) {
    redirect("/admin/auth/otp");
  }

  return (
    <Card className="w-full max-w-md border-0 sm:border sm:p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">One-Time Password</CardTitle>
        <CardDescription className="flex items-center">
          Enter OTP sent to{" "}
          <span className="text-foreground ml-1">{email}</span>
          <Tooltip content="Change email">
            <Link href="/admin/auth/signin/otp" className="text-foreground">
              <Pencil className="w-4 h-4 ml-2" />
            </Link>
          </Tooltip>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <VerifyOtpForm email={email} />
      </CardContent>
    </Card>
  );
};

export default VerifyOtpPage;
