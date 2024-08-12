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
const AddDriverBtn = () => {
  const [location, setLocation] = useState<any>(null);
  const form = useForm<createDriverType>({
    resolver: zodResolver(createDriverSchema),
  });
  async function onSubmit(values: createDriverType) {
    console.log(values);
    const data = {
      ...values,
      location,
    };
  }
  return (
    <Dialog>
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
            <PlaceAutoComplete setValue={setLocation} />
            <Button className="mt-4">Add Driver</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverBtn;
