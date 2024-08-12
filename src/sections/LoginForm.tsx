import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineArrowForward } from "react-icons/md";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { loginSchema, loginType } from "@/schemas/LoginSchema";
import { getDriverInfo } from "@/services/driver";
import { useGlobalContext } from "@/context/GlobalContext";
const LoginForm = () => {
  const [mutex, setMutex] = useState(false);
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });
  const { setLoggedInDriver } = useGlobalContext();
  async function onSubmit(values: loginType) {
    try {
      const response = await getDriverInfo(values);
      setLoggedInDriver(response);
      toast({
        title: "Success",
        description: "Login successful",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-16">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="driverId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-base font-semibold">
                    Driver ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your driver ID"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-base font-semibold">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={mutex}
              className="rounded-full py-3 mx-auto mt-4 px-12 font-semibold text-sm md:text-base text-center flex items-center gap-2 justify-center"
            >
              <p>Login</p>
              <MdOutlineArrowForward />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
