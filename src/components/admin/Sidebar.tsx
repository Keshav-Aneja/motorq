import React from "react";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import {
  ADMIN_ASSIGNMENTS,
  ADMIN_DASHBOARD,
} from "@/constants/routes/admin.routes";
import { Button } from "../ui/button";
import { PiCarSimpleFill } from "react-icons/pi";
const Sidebar = () => {
  return (
    <section className="flex flex-col w-[20%] gap-4">
      <Button asChild variant={"ghost"} className="justify-start">
        <Link href={ADMIN_DASHBOARD} className="gap-2">
          <MdSpaceDashboard />
          <p>Dashboard</p>
        </Link>
      </Button>
      <Button asChild variant={"ghost"} className="justify-start">
        <Link href={ADMIN_ASSIGNMENTS} className="gap-2">
          <PiCarSimpleFill />
          <p>Assignments</p>
        </Link>
      </Button>
    </section>
  );
};

export default Sidebar;
