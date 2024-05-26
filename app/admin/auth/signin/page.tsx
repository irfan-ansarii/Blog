import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import SigninForm from "../_components/signin-form";

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
        <SigninForm />
      </CardContent>
    </Card>
  );
};

export default SigninPage;
