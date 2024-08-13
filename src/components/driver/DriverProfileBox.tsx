"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const DriverProfileBox = () => {
  const router = useRouter();
  const { loggedInDriver } = useGlobalContext();
  if (!loggedInDriver) {
    return (
      <div className="w-full flex items-center justify-between">
        <section className="flex items-center gap-2">
          <Skeleton className="rounded-full">
            <FaUserCircle className="text-7xl text-primary/20 opacity-0" />
          </Skeleton>
          <div className="flex flex-col">
            <Skeleton>
              <h1 className="text-2xl font-semibold opacity-0">Keshav Aneja</h1>
            </Skeleton>
            <Skeleton>
              <p className="text-muted-foreground text-sm opacity-0 mt-2">
                ID: 1234
              </p>
            </Skeleton>
          </div>
        </section>
        <div className="flex items-center gap-4"></div>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-between">
      <section className="flex items-center gap-2">
        <FaUserCircle className="text-7xl text-primary/20" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{loggedInDriver?.name}</h1>
          <p className="text-muted-foreground text-sm">
            ID: {loggedInDriver?.driverId}
          </p>
        </div>
      </section>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};

export default DriverProfileBox;
