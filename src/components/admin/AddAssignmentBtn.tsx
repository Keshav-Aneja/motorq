"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import PlaceAutoComplete from "@/lib/PlaceAutoComplete";
import images from "@/constants/images";
import Image from "next/image";
import { createNewAssignment, getAllDrivers } from "@/services/admin";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  createAssignmentSchema,
  createAssignmentType,
} from "@/schemas/createAssignmentSchema";
import { DriverTypeDetailed } from "../common/DriverDropdown";
import { vechiles } from "@/constants/data/vechiles";
import DriverDropdown from "../common/DriverDropdown";
import { MdClose } from "react-icons/md";
import Dropdown from "../common/Dropdown";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
const AddDriverBtn = () => {
  const [mutex, setMutex] = useState(false);
  const { drivers, setDrivers } = useGlobalContext();
  const [selectedDrivers, setSelectedDrivers] = useState<DriverTypeDetailed[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const form = useForm<createAssignmentType>({
    resolver: zodResolver(createAssignmentSchema),
  });
  const router = useRouter();
  async function onSubmit(values: createAssignmentType) {
    try {
      setMutex(true);
      const response = await createNewAssignment(values, selectedDrivers);
      toast({
        title: "Success",
        description: "Ride requested successfully",
      });
      setMutex(false);
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
      });
    }
  }
  useEffect(() => {
    if (drivers.length == 0) {
      (async () => {
        const response = await getAllDrivers();
        setDrivers(response);
        console.log(response);
      })();
    }
  }, []);
  function handleSelection(driver: DriverTypeDetailed) {
    setSelectedDrivers((prev) => [...prev, driver]);
  }
  useEffect(() => {
    console.log(selectedDrivers);
  }, [selectedDrivers]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex flex-col items-center gap-2 p-4 px-8 rounded-md border-[2px] border-primary/20 border-dashed bg-main hover:bg-main/80">
          <Image
            src={images.Ride}
            alt="Ride"
            width={200}
            height={200}
            className="w-8 h-auto invert"
          />
          <p className="text-sm font-medium text-white">Assign a new ride</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Driver</DialogTitle>
          <DialogDescription>
            Add a new driver and start assigning rides.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="w-full grid grid-cols-2 gap-3">
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Start Date<strong>*</strong>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={field.value?.toString()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="startTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Start Time<strong>*</strong>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-3">
              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      End Date<strong>*</strong>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={field.value?.toString()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="endTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      End Time<strong>*</strong>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Dropdown
              data={vechiles}
              id="vehicle"
              form={form}
              label="Vehicle*"
            />
            <DriverDropdown
              form={form}
              id="driver"
              data={drivers as any}
              label="Select Driver*"
              onSelect={handleSelection}
            />
            <div className="w-full flex flex-col gap-2">
              {selectedDrivers &&
                selectedDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="w-full flex items-center p-2 border-[2px] border-primary/10 rounded-md text-xs justify-between"
                  >
                    <p>{driver.name}</p>
                    <MdClose
                      className="cursor-pointer w-4 h-3"
                      onClick={() =>
                        setSelectedDrivers((prev) => {
                          return prev.filter((item) => item.id !== driver.id);
                        })
                      }
                    />
                  </div>
                ))}
            </div>
            <Button className="mt-4" disabled={mutex}>
              Request Ride
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverBtn;
