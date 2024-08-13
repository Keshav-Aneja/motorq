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
    <div className="w-[90%] h-full border-l-[2px] flex flex-col gap-8 border-primary/5 pl-12 pt-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-medium">Dashboard Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <AddDriverBtn />
        <AddAssignmentBtn />
      </div>
      <section className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-medium">Recent Assignments</h1>
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
      </section>
    </div>
  );
}
