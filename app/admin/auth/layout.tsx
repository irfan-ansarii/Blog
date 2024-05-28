import { redirect } from "next/navigation";
import { client } from "@/lib/hono-server";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await client.api.users.me.$get();
  const json = await user.json();

  if (json.success) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
