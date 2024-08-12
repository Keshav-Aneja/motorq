import Invites from "@/sections/driver/Invites";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const page = () => {
  return (
    <div className="w-[90%] h-[80vh] border-l-[2px] flex flex-col gap-8 border-primary/20 pl-12">
      <div className="w-full flex items-center justify-between">
        <section className="flex items-center gap-2">
          <FaUserCircle className="text-7xl text-primary/20" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Keshav Aneja</h1>
            <p className="text-muted-foreground text-sm">ID: 3849</p>
          </div>
        </section>
        <div className="flex items-center gap-4"></div>
      </div>
      {/* <h1 className="text-3xl font-semibold">Active Assignments</h1> */}
      <section className="">
        <h1 className="text-3xl font-semibold">Invites</h1>
        <Invites />
      </section>
    </div>
  );
};

export default page;
