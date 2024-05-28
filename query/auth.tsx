// import { client } from "@/lib/hono";
// import { InferRequestType, InferResponseType } from "hono";
// import { useMutation } from "@tanstack/react-query";

// type ResponseType = InferResponseType<typeof client.api.auth.signin.$post>;
// type RequestType = InferRequestType<
//   typeof client.api.auth.signin.$post
// >["json"];

// export const useSignin = () => {
//   return useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async (json) => {
//       const response = await client.api.auth.signin.$post({ json });
//       return await response.json();
//     },
//   });
// };

// export const useSignup = () => {
//   return useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async (json) => {
//       const response = await client.api.auth.signin.$post({ json });
//       return await response.json();
//     },
//   });
// };
