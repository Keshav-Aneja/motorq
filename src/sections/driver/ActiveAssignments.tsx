"use client";
import Scroller from "@/components/common/Scroller";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  getDriverActiveAssignments,
  getDriverInvites,
  handleAcceptAssignment,
  handleRejectAssignment,
} from "@/services/driver";
import { format, formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { RiSteering2Line } from "react-icons/ri";

const ActiveAssignments = () => {
  const { loggedInDriver } = useGlobalContext();
  if (!loggedInDriver) return null;
  return <AssignmentsWrapper id={loggedInDriver?.driverId} />;
};

export default ActiveAssignments;

function AssignmentsWrapper({ id }: { id: string }) {
  const [assignmentData, setAssignmentData] = useState<
    AssignmentDetailsType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const assignments = await getDriverActiveAssignments(id);
        setAssignmentData(assignments);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (loading) {
    return (
      <>
        <Scroller uniqueName="invites-skeleton">
          {[1, 2, 3, 4, 5].map((invite) => (
            <AssignmentCardSkeleton key={invite} />
          ))}
        </Scroller>
      </>
    );
  }
  return (
    <Scroller uniqueName="invites">
      {assignmentData?.map((invite: AssignmentDetailsType, index) => (
        <>
          <AssignmentCard data={invite} key={index} />
        </>
      ))}
      {assignmentData?.length === 0 && (
        <p className="text-muted-foreground">No Assigned tasks yet</p>
      )}
    </Scroller>
  );
}

function AssignmentCard({ data }: { data: AssignmentDetailsType }) {
  const { loggedInDriver } = useGlobalContext();
  const [mutex, setMutex] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white border-[2px] border-primary/10 rounded-lg p-4 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm">
          <RiSteering2Line />
          <h1>{data.vecicle}</h1>
        </span>
        <span className="text-xs text-muted-foreground">
          Posted {formatDistance(new Date(), data.createdAt)} ago
        </span>
      </div>
      <div className="w-full flex flex-col gap-2 text-sm">
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
    </div>
  );
}

function AssignmentCardSkeleton() {
  return (
    <div className="bg-white border-[2px] border-primary/10 rounded-lg p-4 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton>
          <span className="flex items-center gap-1 text-sm opacity-0">
            <RiSteering2Line />
            <h1>Audi R8</h1>
          </span>
        </Skeleton>
        <Skeleton>
          <span className="text-xs text-muted-foreground opacity-0">
            Posted 2 hours ago
          </span>
        </Skeleton>
      </div>
      <Skeleton className="h-[30px]">
        <span className="opacity-0">This is a sample</span>
      </Skeleton>
    </div>
  );
}
