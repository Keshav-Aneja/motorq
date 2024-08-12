import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="w-[90%] h-full mx-auto flex items-start justify-between gap-4">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
