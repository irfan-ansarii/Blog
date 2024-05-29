import { client } from "@/lib/hono-client";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { GLOBAL_ERROR } from "@/lib/utils";

type SigninResponseType = InferResponseType<
  typeof client.api.auth.signin.$post
>;
type SigninRequestType = InferRequestType<
  typeof client.api.auth.signin.$post
>["json"];

type SigninOTPResponseType = InferResponseType<
  typeof client.api.auth.signin.otp.$post
>;
type SigninOTPRequestType = InferRequestType<
  typeof client.api.auth.signin.otp.$post
>["json"];

type SigninVerifyResponseType = InferResponseType<
  typeof client.api.auth.signin.verify.$post
>;
type SigninVerifyRequestType = InferRequestType<
  typeof client.api.auth.signin.verify.$post
>["json"];

type SignupResponseType = InferResponseType<
  typeof client.api.auth.signup.$post
>;
type SignupRequestType = InferRequestType<
  typeof client.api.auth.signup.$post
>["json"];

type RecoverResponseType = InferResponseType<
  typeof client.api.auth.recover.$post
>;
type RecoverRequestType = InferRequestType<
  typeof client.api.auth.recover.$post
>["json"];

type ResetResponseType = InferResponseType<typeof client.api.auth.reset.$post>;
type ResetRequestType = InferRequestType<
  typeof client.api.auth.reset.$post
>["json"];

export const useSignin = () => {
  return useMutation<SigninResponseType, Error, SigninRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signin.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};

export const useSigninOTP = () => {
  return useMutation<SigninOTPResponseType, Error, SigninOTPRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signin.otp.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};

export const useSigninVerify = () => {
  return useMutation<SigninVerifyResponseType, Error, SigninVerifyRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signin.verify.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};

export const useSignup = () => {
  return useMutation<SignupResponseType, Error, SignupRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.signup.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};

export const useRecover = () => {
  return useMutation<RecoverResponseType, Error, RecoverRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.recover.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};

export const useReset = () => {
  return useMutation<ResetResponseType, Error, ResetRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.reset.$post({ json });

      if (!response.ok) throw GLOBAL_ERROR;
      const jsonResponse = await response.json();
      if (!jsonResponse.success) throw jsonResponse;
      return jsonResponse;
    },
  });
};
