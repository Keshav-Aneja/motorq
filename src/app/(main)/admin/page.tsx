import AddAssignmentBtn from "@/components/admin/AddAssignmentBtn";
import AddDriverBtn from "@/components/admin/AddDriverBtn";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/common/Navbar";
import { Separator } from "@/components/ui/separator";
import RecentAssignments from "@/sections/admin/RecentAssignments";
import { getAllDrivers } from "@/services/admin";

import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
export default function AdminDashboard() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="w-[90%] h-full mx-auto flex items-start justify-between gap-4">
        <Sidebar />
        <div className="w-[90%] h-[80vh] border-l-[2px] flex flex-col gap-8 border-primary/20 pl-12">
          <div className="w-full flex items-center justify-between">
            <section className="flex items-center gap-2">
              <FaUserCircle className="text-7xl text-primary/20" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Hey, Keshav</h1>
                <p>Welcome back</p>
              </div>
            </section>
            <div className="flex items-center gap-4">
              <AddDriverBtn />
              <AddAssignmentBtn />
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-3">
            <RecentAssignments />
          </div>
        </div>
      </main>
    </div>
  );
}
