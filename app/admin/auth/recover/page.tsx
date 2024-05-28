import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import RecoverForm from "../_components/recover-form";

const RecoverPage = () => {
  return (
    <Card className="w-full max-w-lg border-0 sm:border sm:p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Recover Password</CardTitle>
        <CardDescription>
          Enter your email and we will send you an OTP.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecoverForm />
      </CardContent>
    </Card>
  );
};

export default RecoverPage;
