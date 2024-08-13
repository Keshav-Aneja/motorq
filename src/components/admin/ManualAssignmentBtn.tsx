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
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

import {
  createAssignmentSchema,
  createAssignmentType,
} from "@/schemas/createAssignmentSchema";
import DriverDropdown from "../common/DriverDropdown";
import Dropdown from "../common/Dropdown";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { DriverType } from "@/constants/types/driver.types";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { handleManualAssignment } from "@/services/admin";
type Props = {
  drivers: DriverType[];
  item: AssignmentDetailsType;
};
const ManualAssignmentBtn = ({ drivers, item }: Props) => {
  const [mutex, setMutex] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverType | null>(null);
  const [open, setOpen] = useState(false);
  const form = useForm();
  const router = useRouter();

  async function onSubmit() {
    if (!selectedDriver) {
      toast({
        title: "Error",
        description: "Please select a driver to assign the ride",
        variant: "destructive",
      });
    } else {
      try {
        setMutex(true);
        await handleManualAssignment(item, selectedDriver);
        setMutex(false);
        toast({
          title: "Success",
          description: "Ride assigned successfully",
        });
        setOpen(false);
        router.refresh();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message ?? "Cannot assign ride at the moment",
        });
      }
    }
  }
  function handleSelection(driver: DriverType) {
    setSelectedDriver(driver);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="py-2 text-xs h-fit bg-main px-6 rounded-md text-white">
          Assign
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Driver</DialogTitle>
          <DialogDescription>
            Choose from the below drivers to assign the ride manually or wait
            for them to accept invitation
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DriverDropdown
              form={form}
              id="driver"
              data={drivers as any}
              label="Select Driver*"
              onSelect={handleSelection}
            />
            <Button className="mt-4" disabled={mutex}>
              Assign
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualAssignmentBtn;
