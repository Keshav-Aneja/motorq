"use client";
import React from "react";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import {
  ADMIN_ASSIGNMENTS,
  ADMIN_DASHBOARD,
} from "@/constants/routes/admin.routes";
import { Button } from "../ui/button";
import { PiCarSimpleFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import images from "@/constants/images";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  DRIVER_ASSIGNMENTS,
  DRIVER_DASHBOARD,
} from "@/constants/routes/driver.routes";
const Sidebar = () => {
  const path = usePathname();
  const { loggedInDriver } = useGlobalContext();
  if (!loggedInDriver) return null;
  return (
    <section className="flex flex-col w-full h-full gap-4 p-3">
      <div className="w-full flex items-center justify-between">
        <section className="flex items-center gap-1 -ml-2">
          <Image
            src={images.Profile}
            alt=""
            width={400}
            height={400}
            className="w-16"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">
              Hey, {loggedInDriver.name}
            </h1>
            <p className="text-sm text-muted">
              ID : {loggedInDriver?.driverId}
            </p>
          </div>
        </section>
      </div>
      <h1 className="text-muted-foreground ">Driver Dashboard</h1>
      <Button
        asChild
        variant={"ghost"}
        className="justify-start hover:bg-main hover:text-white"
      >
        <Link
          href={DRIVER_DASHBOARD}
          className={cn(
            "gap-2 text-muted-foreground text-lg",
            !path.includes(DRIVER_ASSIGNMENTS) && "bg-main  text-white"
          )}
        >
          <MdSpaceDashboard size={20} />
          <p>Dashboard</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"ghost"}
        className="justify-start hover:bg-main hover:text-white"
      >
        <Link
          href={ADMIN_ASSIGNMENTS}
          className={cn(
            "gap-2 text-muted-foreground text-lg",
            path.includes(ADMIN_ASSIGNMENTS) && "bg-main text-white"
          )}
        >
          <PiCarSimpleFill size={20} />
          <p>Assignments</p>
        </Link>
      </Button>
    </section>
  );
};

export default Sidebar;
