import AddAssignmentBtn from "@/components/admin/AddAssignmentBtn";
import AddDriverBtn from "@/components/admin/AddDriverBtn";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/common/Navbar";
import { Separator } from "@/components/ui/separator";
import { ADMIN_ASSIGNMENTS } from "@/constants/routes/admin.routes";
import RecentAssignments from "@/sections/admin/RecentAssignments";
import { getAllDrivers } from "@/services/admin";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
export default function AdminDashboard() {
  return (
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
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Recent Assignments</h1>
        <Link
          href={ADMIN_ASSIGNMENTS}
          className="text-main text-sm underline underline-offset-4"
        >
          View all
        </Link>
      </div>
      <div className="w-full h-full grid grid-cols-3 gap-6">
        <RecentAssignments />
      </div>
    </div>
  );
}
