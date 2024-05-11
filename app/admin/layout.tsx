import React from "react";

import Sidebar from "@/components/admin/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-col relative">
        <div className="absolute h-96 bg-indigo-700 left-0 top-0 inset-x-0 z-[-1]"></div>
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end"></header>
        <main className="flex flex-1 flex-col container p-4 md:p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
