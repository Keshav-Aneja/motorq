import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllAssignments from "@/sections/admin/AllAssignments";

const AssignmentPage = () => {
  return (
    <div className="w-[90%] h-[80vh] border-l-[2px] flex flex-col gap-8 border-primary/20 pl-12">
      <h1 className="text-3xl font-semibold">Assignments</h1>
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Rides</TabsTrigger>
          <TabsTrigger value="pending">Pending Rides</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <AllAssignments status="active" />
        </TabsContent>
        <TabsContent value="pending">
          <AllAssignments status="pending" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentPage;
