import DriverProfileBox from "@/components/driver/DriverProfileBox";
import { useGlobalContext } from "@/context/GlobalContext";
import ActiveAssignments from "@/sections/driver/ActiveAssignments";
import Invites from "@/sections/driver/Invites";
import React from "react";

const page = () => {
  return (
    <div className="w-[90%] h-full border-l-[2px] flex flex-col gap-8 border-primary/5 pl-12 pt-6">
      {/* <DriverProfileBox /> */}
      <section>
        <h1 className="text-3xl font-semibold">Invites</h1>
        <Invites />
      </section>
      <section>
        <h1 className="text-3xl font-semibold">Active Assignments</h1>
        <ActiveAssignments />
      </section>
    </div>
  );
};

export default page;
