import AddDriverBtn from "@/components/admin/AddDriverBtn";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/common/Navbar";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
export default function AdminDashboard() {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <main className="w-[90%] mx-auto flex items-start justify-between gap-4">
        <Sidebar />
        <div className="w-[90%] h-full border-l-[2px] border-primary/20 pl-12">
          <div className="w-full flex items-center justify-between">
            <section className="flex items-center gap-2">
              <FaUserCircle className="text-7xl text-primary/20" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Hey, Keshav</h1>
                <p>Welcome back</p>
              </div>
            </section>
            <AddDriverBtn />
          </div>
        </div>
      </main>
    </div>
  );
}
