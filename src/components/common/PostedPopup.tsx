"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";
import { ADMIN_ASSIGNMENTS } from "@/constants/routes/admin.routes";
import "@/styles/animations.css";
const PostedPopup = ({
  showPopup,
  label,
}: {
  showPopup: boolean;
  label: string;
}) => {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (showPopup) {
        setShowText(true);
      }
    }, 2000);
  }, [showPopup]);
  if (!showPopup) {
    return null;
  }
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 z-[2000] bg-[rgba(0,0,0,0)] backdrop-blur-md hidden md:block">
        <div className="bg-main  w-[25%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2200] anim-1 ">
          <div className="w-full h-full flex items-center justify-center flex-col gap-6 opacityPing">
            <h1 className="text-2xl md:text-4xl text-white font-semibold animate-text ">
              {label}
            </h1>
            <Link href={ADMIN_ASSIGNMENTS}>
              <Button className="flex items-center gap-2 text-main text-xs md:text-lg font-semibold rounded-full shadow-xl bg-white animate-text hover:scale-105 hover:bg-gray-200 hover:text-main">
                <p>See all</p>
                <MdArrowForward />
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-main/60 w-[45%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2100] anim-2 "></div>
        <div className="bg-main/20 w-[75%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2050] anim-3 "></div>
      </div>
      <div className="w-full h-screen fixed top-0 left-0 z-[2000] bg-[rgba(0,0,0,0)] backdrop-blur-md md:hidden">
        <div className="bg-main  w-[25%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2200] anim-3 md:anim-1 ">
          <div className="w-full h-full flex items-center justify-center flex-col gap-6 opacityPing">
            <h1 className="text-2xl md:text-4xl text-white font-semibold animate-text ">
              Job Posted 🚀
            </h1>
            <Link href={ADMIN_ASSIGNMENTS}>
              <Button className="flex items-center gap-2 text-main text-xs md:text-lg font-semibold rounded-full shadow-xl bg-white animate-text hover:scale-105 hover:bg-gray-200 hover:text-main">
                <p>Post more Jobs</p>
                <MdArrowForward />
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-main/60 w-[45%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2100] anim-4 md:anim-2 "></div>
        <div className="bg-main/20 w-[75%] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2050] anim-6 md:anim-3 "></div>
      </div>
    </>
  );
};

export default PostedPopup;
