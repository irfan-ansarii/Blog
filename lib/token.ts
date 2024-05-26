"use server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("token");
export default token;
