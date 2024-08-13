"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DriverType } from "@/constants/types/driver.types";
import { Button } from "../ui/button";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import {
  handleManualAssignment,
  handleManualUnAssignment,
} from "@/services/admin";
import { toast } from "../ui/use-toast";
type Props = {
  driver: DriverType;
  item: AssignmentDetailsType;
};

const ManualUnAssignmentBtn = ({ driver, item }: Props) => {
  const [open, setOpen] = useState(false);
  const [mutex, setMutex] = useState(false);
  async function handleUnassignment() {
    try {
      setMutex(true);
      await handleManualUnAssignment(item, driver);
      setMutex(false);
      toast({
        title: "Success",
        description: "Ride unassigned successfully",
      });
      setOpen(false);
    } catch (error) {}
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-destructive px-6 py-2 rounded-md text-white text-xs">
          Unassign
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will unassign this ride from {driver.name}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center gap-4">
          <Button
            className="w-1/2"
            variant={"ghost"}
            type="button"
            disabled={mutex}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className="w-1/2"
            onClick={handleUnassignment}
            disabled={mutex}
          >
            Unassign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualUnAssignmentBtn;
