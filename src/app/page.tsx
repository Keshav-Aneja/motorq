"use client";
import { Button } from "@/components/ui/button";
import images from "@/constants/images";
import { ADMIN_DASHBOARD } from "@/constants/routes/admin.routes";
import {
  DRIVER_DASHBOARD,
  DRIVER_LOGIN,
} from "@/constants/routes/driver.routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiSteeringWheel } from "react-icons/gi";
export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full  h-screen relative flex items-center justify-between px-16">
      <nav className="w-full px-16 py-3 fixed top-0 left-0 bg-transparent flex justify-between items-center">
        <Image
          src={images.Logo}
          alt="logo"
          width={400}
          height={200}
          className="w-auto h-10"
        />
        <Button className=" rounded-none">Get Started</Button>
      </nav>
      <div className="w-1/2 h-full flex flex-col gap-4 items-start justify-center">
        <h1 className="text-7xl font-bold">
          Manage Rides
          <br />
          The Easy Way
        </h1>
        <p className="text-sm">
          Manage and assign rides effortlessly with our intuitive admin portal.
          Streamline operations, save time, and ensure smoother coordination
          with a platform designed for simplicity and speed.
        </p>
        <Button
          className="px-8 rounded-sm"
          onClick={() => {
            router.push(ADMIN_DASHBOARD);
          }}
        >
          Admin Portal
        </Button>
      </div>
      <div className="w-1/2 h-full flex items-end justify-center flex-col">
        <div className="flex items-center gap-3 ">
          <GiSteeringWheel size={60} />
          <h1 className="text-4xl font-semibold">Are you a driver?</h1>
        </div>
        <Button
          variant={"secondary"}
          className=""
          onClick={() => {
            router.push(DRIVER_LOGIN);
          }}
        >
          Driver Login
        </Button>
      </div>
      <Image
        src={images.Hero}
        width={500}
        height={2000}
        className="h-screen w-auto absolute left-1/2 -translate-x-1/2 top-0"
        alt=""
      />
    </main>
  );
}
