"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginForm from "@/sections/LoginForm";
import { useRouter } from "next/navigation";
import images from "@/constants/images";
export type LoginData = {
  phone: string;
};
const RecruiterLogin = () => {
  const [loginStage, setLoginStage] = useState(1);
  const [loginData, setLoginData] = useState<LoginData>({ phone: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <div className="w-full h-screen  flex justify-between">
      <div className="hidden lg:block w-[55%] h-full relative">
        <Image
          src={images.Logo}
          className="h-12 w-auto relative top-4 left-4"
          width={500}
          height={400}
          alt=""
        />
        <Image
          src={images.cabRide}
          className="w-full h-full object-cover"
          width={1500}
          height={1400}
          alt=""
        />
        <div className="w-full h-[30%] absolute bottom-0 left-0 z-[30] bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)]"></div>
        <div className="text-5xl font-semibold absolute bottom-12 left-12 z-[50] text-white leading-[4rem]">
          Make your management process
          <br />
          <span className="text-blue-400">Fast</span>,{" "}
          <span className="text-blue-400">Simple</span> and{" "}
          <span className="text-blue-400">Efficient</span>
        </div>
      </div>
      <div className="w-full lg:w-[45%] h-full flex items-center flex-col p-4 md:p-8 px-6 lg:px-10 bg-white dark:bg-base_dark">
        {loginStage === 1 && <LoginForm />}
      </div>
    </div>
  );
};

export default RecruiterLogin;
