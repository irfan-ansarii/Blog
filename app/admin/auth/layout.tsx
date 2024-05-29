import { redirect } from "next/navigation";
import { getSession } from "@/features/query/users";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  let session = undefined;
  try {
    session = await getSession();
  } catch (error) {
    console.log(error);
  }
  if (session) {
    redirect("/admin/dashboard");
  }
  return (
    <main className="flex h-screen items-center justify-center relative">
      <div className="relative">{children}</div>
    </main>
  );
};

export default AuthLayout;
