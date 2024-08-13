import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f5f5f5]">
      <Navbar isDriver={true} />
      <main className="w-full h-full  flex items-start justify-between -mt-6">
        <div
          className="w-[20%] h-full bg-white"
          style={{ height: "calc(100vh - 60px" }}
        >
          <Sidebar />
        </div>
        <div
          className="w-[90%] overflow-y-auto"
          style={{ minHeight: "calc(100vh - 60px" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
