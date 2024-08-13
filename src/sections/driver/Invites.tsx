"use client";
import Scroller from "@/components/common/Scroller";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  getDriverInvites,
  handleAcceptAssignment,
  handleRejectAssignment,
} from "@/services/driver";
import { format, formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { RiSteering2Line } from "react-icons/ri";

const Invites = () => {
  const { loggedInDriver } = useGlobalContext();
  if (!loggedInDriver) return null;
  return <InvitesWrapper id={loggedInDriver.driverId} />;
};

export default Invites;

function InvitesWrapper({ id }: { id: string }) {
  const [invitesData, setInvitesData] = useState<
    AssignmentDetailsType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const invites = await getDriverInvites({ id });
        setInvitesData(invites);
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
            <InviteCardSkeleton key={invite} />
          ))}
        </Scroller>
      </>
    );
  }
  return (
    <Scroller uniqueName="invites">
      {invitesData?.map((invite: AssignmentDetailsType, index) => (
        <>
          <InviteCard data={invite} key={index} />
        </>
      ))}
      {invitesData?.length === 0 && (
        <p className="text-muted-foreground">No invites yet</p>
      )}
    </Scroller>
  );
}

function InviteCard({ data }: { data: AssignmentDetailsType }) {
  const [mutex, setMutex] = useState(false);
  const router = useRouter();
  const { loggedInDriver } = useGlobalContext();
  if (!loggedInDriver) return null;
  async function handleReject() {
    try {
      setMutex(true);
      const response = await handleRejectAssignment(
        {
          name: loggedInDriver?.name ?? "",
          driverId: loggedInDriver?.driverId ?? "",
        },
        data.assignmentId
      );
      if (!response) {
        console.log("Here");
        throw new Error("Error rejecting assignment. Please try again later");
      }
      setMutex(false);
      toast({
        title: "Success",
        description: "Assignment rejected successfully",
      });
      router.refresh();
    } catch (error: any) {
      setMutex(false);
      toast({
        title: "Error",
        description:
          error.message ?? "Error rejecting assignment. Please try again later",
        variant: "destructive",
      });
    }
  }
  async function handleAccept() {
    try {
      setMutex(true);
      const response = await handleAcceptAssignment(
        {
          name: loggedInDriver?.name ?? "",
          driverId: loggedInDriver?.driverId ?? "",
        },
        data.assignmentId
      );
      if (!response) {
        throw new Error("Error accepting assignment. Please try again later");
      }
      setMutex(false);
      toast({
        title: "Success",
        description: "Assignment accepted successfully",
      });
      router.refresh();
    } catch (error: any) {
      setMutex(false);
      toast({
        title: "Error",
        description:
          error.message ?? "Error accepting assignment. Please try again later",
        variant: "destructive",
      });
    }
  }
  return (
    <div className=" bg-white border-[2px] border-primary/10 rounded-lg p-4 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm">
          <RiSteering2Line />
          <h1>{data.vecicle}</h1>
        </span>
        <span className="text-xs text-muted-foreground text-nowrap">
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
      <div className="w-full flex gap-2">
        <Button
          className="w-1/2 rounded-md"
          variant={"ghost"}
          disabled={mutex}
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button
          className="rounded-md w-1/2"
          disabled={mutex}
          onClick={handleAccept}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}

function InviteCardSkeleton() {
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
      <div className="w-full flex gap-2">
        <Skeleton className="w-full">
          <Button className="w-full rounded-md opacity-0" variant={"ghost"}>
            Reject
          </Button>
        </Skeleton>

        <Skeleton className="w-full">
          <Button className="rounded-md w-full opacity-0">Accept</Button>
        </Skeleton>
      </div>
    </div>
  );
}
