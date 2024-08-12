import React, { Suspense } from "react";
import { format } from "date-fns";
import { LuUser } from "react-icons/lu";
import { RiSteering2Fill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentAssignments } from "@/services/admin";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { cn } from "@/lib/utils";
const RecentAssignments = () => {
  return (
    <Suspense
      fallback={[1, 2, 3].map((card, index) => (
        <AssignmentCardSkeleton key={index} />
      ))}
    >
      <AssignmentCardWrapper />
    </Suspense>
  );
};

export default RecentAssignments;
async function AssignmentCardWrapper() {
  const assignments = await getRecentAssignments(3);
  return assignments.map((assignment) => (
    <AssignmentCard key={assignment.id} data={assignment} />
  ));
}
function AssignmentCard({ data }: { data: AssignmentDetailsType }) {
  return (
    <div className="w-full h-fit min-h-60 p-4 rounded-lg border-[2px] border-primary/10 flex flex-col gap-4">
      <span
        className={cn(
          "w-fit self-end px-4 py-1 rounded-full bg-main text-xs text-white",
          !data.isAssigned && "bg-destructive"
        )}
      >
        {data.isAssigned ? "Active" : "Pending"}
      </span>
      <div className="text-sm flex flex-col gap-1">
        <span className="flex items-center justify-between">
          <p className="text-muted-foreground">Start</p>
          <p className="font-medium">
            {format(new Date(data.startDate), "yyyy-MM-dd")} - {data.startTime}
          </p>
        </span>
        <span className="flex items-center justify-between">
          <p className="text-muted-foreground">End</p>
          <p className="font-medium">
            {format(new Date(data.endDate), "yyyy-MM-dd")} - {data.endTime}
          </p>
        </span>
      </div>
      <Separator />
      <div className="text-sm flex items-center justify-between">
        <p className="text-muted-foreground">Driver</p>
        {data.isAssigned && (
          <div className="flex flex-col gap-0">
            <span className="flex items-center gap-2 text-base font-medium">
              <LuUser />
              <p>{data.driverId}</p>
            </span>
            <p className="text-muted-foreground text-xs self-end">ID: 2345</p>
          </div>
        )}
        {!data.isAssigned && (
          <div className="flex flex-col gap-0">
            <span className="flex items-center gap-2 text-base font-medium self-center  ">
              <p>-</p>
            </span>
            <p className="text-muted-foreground text-xs self-end">
              Pending Assignment
            </p>
          </div>
        )}
      </div>
      <div className="text-sm flex items-center justify-between">
        <p className="text-muted-foreground">Vehicle</p>
        <div className="flex flex-col gap-0">
          <span className="flex items-center gap-2 text-base font-medium">
            <p>{data.vecicle}</p>
          </span>
          <p className="text-muted-foreground text-xs self-end">Plate: 2345</p>
        </div>
      </div>
    </div>
  );
}

function AssignmentCardSkeleton() {
  return (
    <div className="w-full h-fit min-h-60 p-4 rounded-lg border-[2px] border-primary/10 flex flex-col gap-4">
      <Skeleton>
        {" "}
        <span className="w-fit self-end px-4 py-1 rounded-full bg-main text-xs text-white opacity-0">
          Active
        </span>
      </Skeleton>
      <div className="text-sm flex flex-col gap-1">
        <span className="flex items-center justify-between">
          <Skeleton>
            <p className="text-muted-foreground opacity-0">Start</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium opacity-0">
              {format(new Date(2014, 1, 11), "yyyy-MM-dd")} - 9:00pm
            </p>
          </Skeleton>
        </span>
        <span className="flex items-center justify-between">
          <Skeleton>
            <p className="text-muted-foreground opacity-0">Start</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium opacity-0">
              {format(new Date(2014, 1, 11), "yyyy-MM-dd")} - 9:00pm
            </p>
          </Skeleton>
        </span>
      </div>
      <Separator />
      <div className="text-sm flex items-center justify-between">
        <Skeleton>
          <p className="text-muted-foreground opacity-0">Driver</p>
        </Skeleton>
        <div className="flex flex-col gap-0">
          <Skeleton>
            <span className="flex items-center gap-2 text-base font-medium opacity-0">
              <LuUser />
              <p>John Doe</p>
            </span>
          </Skeleton>
        </div>
      </div>
      <div className="text-sm flex items-center justify-between">
        <Skeleton>
          <p className="text-muted-foreground opacity-0">Driver</p>
        </Skeleton>
        <div className="flex flex-col gap-0">
          <Skeleton>
            <span className="flex items-center gap-2 text-base font-medium opacity-0">
              <LuUser />
              <p>John Doe</p>
            </span>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
