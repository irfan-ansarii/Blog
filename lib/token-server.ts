"use server";
import { cookies } from "next/headers";

const store = cookies();
const token = store.get("token")?.value;

console.log(token);

export { token };
