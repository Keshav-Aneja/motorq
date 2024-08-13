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
import { AiOutlinePlus } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  createDriverSchema,
  createDriverType,
} from "@/schemas/createDriverSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PlaceAutoComplete from "@/lib/PlaceAutoComplete";
import images from "@/constants/images";
import Image from "next/image";
import { createDriver } from "@/services/admin";
import { toast } from "../ui/use-toast";
import { isWithinRadius } from "@/helpers/haversineDistance";
const AddDriverBtn = () => {
  const [location, setLocation] = useState<any>(null);
  const [mutex, setMutex] = useState(false);
  const form = useForm<createDriverType>({
    resolver: zodResolver(createDriverSchema),
  });
  const [open, setOpen] = useState(false);
  async function onSubmit(values: createDriverType) {
    if (!location) {
      toast({
        title: "Error",
        description: "Please select a location",
        variant: "destructive",
      });
    }
    try {
      setMutex(true);
      const driver = await createDriver(values, JSON.stringify(location));
      console.log(driver);
      if (driver) {
        toast({
          title: "Success",
          description: "Driver created successfully",
        });
        form.reset();
        setOpen(false);
        setMutex(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Cannot create driver at the moment",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="aspect-square flex items-center justify-center gap-4 flex-col group cursor-pointer">
          <span className=" rounded-lg w-[60%] aspect-square flex items-center justify-center text-white bg-main transition-all duration-200 ease-linear ">
            <AiOutlinePlus className="text-5xl group-hover:text-7xl transition-all duration-200 ease-linear " />
          </span>
          <span className="text-center w-[70%] ">
            <p className="text-xl ">Add new driver</p>
            <p className="text-xs">
              Add a new driver and start assigning rides
            </p>
          </span>
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
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Driver Name<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Phone Number<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="driverId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Driver Id<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Email<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PlaceAutoComplete setValue={setLocation} fullAdd={true} />
            <Button className="mt-4" disabled={mutex}>
              Add Driver
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverBtn;
