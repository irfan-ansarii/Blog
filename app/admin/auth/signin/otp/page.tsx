import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OtpSigninForm from "../../_components/otp-signin-form";

const OTPLoginPage = () => {
  return (
    <Card className="w-full max-w-md border-0 sm:border sm:p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Signin with OTP</CardTitle>
        <CardDescription>
          Enter your email and we will send you an OTP.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <OtpSigninForm />
      </CardContent>
    </Card>
  );
};

export default OTPLoginPage;
