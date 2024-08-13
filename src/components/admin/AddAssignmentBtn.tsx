"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  createNewAssignment,
  getAllAvailableDrivers,
  getAllDrivers,
} from "@/services/admin";
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
import { cn } from "@/lib/utils";
import { isWithinRadius } from "@/helpers/haversineDistance";
import { DriverType } from "@/constants/types/driver.types";

const AddDriverBtn = () => {
  const [mutex, setMutex] = useState(false);
  const { drivers, setDrivers, setLocationDrivers } = useGlobalContext();
  const [selectedDrivers, setSelectedDrivers] = useState<DriverTypeDetailed[]>(
    []
  );
  const [mounted, setMounted] = useState(false);
  const [allCurrentDrivers, setAllCurrentDrivers] = useState<DriverType[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [locationTabActive, setLocationTabActive] = useState(false);
  const [stage, setStage] = useState(1);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const form = useForm<createAssignmentType>({
    resolver: zodResolver(createAssignmentSchema),
  });
  const [formData, setFormData] = useState<createAssignmentType | null>(null);
  const router = useRouter();
  async function handleAssignmentSubmission() {
    if (formData) {
      try {
        setMutex(true);
        const response = await createNewAssignment(formData, selectedDrivers);
        toast({
          title: "Success",
          description: "Ride requested successfully",
        });
        setMutex(false);
        setOpen(false);
        setStage(1);
        router.refresh();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message ?? "Something went wrong",
        });
      }
    }
  }
  async function onSubmit(values: createAssignmentType) {
    setFormData(values);
    setStage(2);
    try {
      setMutex(true);
      setLoadingDrivers(true);
      const response = await getAllAvailableDrivers({
        startDate: values.startDate,
        startTime: values.startTime,
        endDate: values.endDate,
        endTime: values.endTime,
      });
      if (response) {
        setLoadingDrivers(false);
        setDrivers(response);
      }
      console.log(response);
      setMutex(false);
    } catch (error: any) {
      setLoadingDrivers(false);
      toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
      });
    }
  }
  function handleSelection(driver: DriverTypeDetailed) {
    setSelectedDrivers((prev) => [...prev, driver]);
  }
  useEffect(() => {
    if (location) {
      const updatedDrivers = (prev: any) => {
        const lat2 = location.lat;
        const lng2 = location.lng;
        const radius = 25;
        return drivers.filter((driver) => {
          const lat = JSON.parse(driver.location).lat;
          const lng = JSON.parse(driver.location).lng;
          console.log(lat, lng);
          return isWithinRadius(lat, lng, lat2, lng2, radius);
        });
      };
      setAllCurrentDrivers(updatedDrivers);
      setLocationDrivers(updatedDrivers);
    }
  }, [location]);
  useEffect(() => {
    console.log(locationTabActive);
  }, [locationTabActive]);
  useEffect(() => {
    if (typeof window !== undefined) {
      setMounted(true);
    }
  }, []);
  if (!mounted) {
    return null;
  }
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
      <DialogContent
        className={cn(
          stage === 2 &&
            locationTabActive &&
            location &&
            "w-full max-w-[80vw] max-h-[95vh] h-full"
        )}
      >
        <DialogHeader>
          <DialogTitle>
            {stage === 1 ? "Add new assignment" : "Available Drivers"}
          </DialogTitle>
          <DialogDescription>
            {stage === 1
              ? "Fill in the details to request a ride"
              : "Choose from the available drivers during the selected time"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col gap-2",
              stage === 2 ? "hidden" : "flex"
            )}
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
            <Button className="mt-4" disabled={mutex}>
              Select Driver &rarr;
            </Button>
          </form>
        </Form>
        {stage === 2 && (
          <>
            <Form {...form}>
              <form>
                <Tabs defaultValue="byName" className="w-full">
                  <TabsList>
                    <TabsTrigger
                      value="byName"
                      onClick={() => setLocationTabActive(false)}
                    >
                      By Name or Phone
                    </TabsTrigger>
                    <TabsTrigger
                      value="byLocation"
                      onClick={() => setLocationTabActive(true)}
                    >
                      By Location
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="byName">
                    {!loadingDrivers && (
                      <DriverDropdown
                        form={form}
                        id="driver"
                        data={drivers as any}
                        label="Select Driver*"
                        onSelect={handleSelection}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="byLocation">
                    <div className="flex flex-col gap-3">
                      <PlaceAutoComplete
                        setValue={setLocation}
                        fullAdd={true}
                      />
                      <p className="text-xs text-muted-foreground -mt-2">
                        Drivers within 25km of the current address will be
                        visible
                      </p>
                      {location && (
                        <DriverDropdown
                          form={form}
                          id="driver"
                          data={allCurrentDrivers as any}
                          label="Select Driver*"
                          onSelect={handleSelection}
                          showMap={true}
                        />
                      )}
                      {/* <UserLocationMap /> */}
                    </div>
                  </TabsContent>
                </Tabs>

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
                              return prev.filter(
                                (item) => item.id !== driver.id
                              );
                            })
                          }
                        />
                      </div>
                    ))}
                </div>
                <Button
                  className="mt-4 w-1/2"
                  disabled={mutex}
                  variant="ghost"
                  onClick={() => setStage(1)}
                  type="button"
                >
                  Back
                </Button>
                <Button
                  className="mt-4 w-1/2"
                  disabled={mutex}
                  onClick={handleAssignmentSubmission}
                >
                  Request Ride
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverBtn;
