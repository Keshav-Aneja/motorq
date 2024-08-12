import React from "react";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import images from "@/constants/images";
import "@/styles/animations.css";
const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen bg-white ">
      <Image
        src={images.Logo}
        width={200}
        height={200}
        alt="motorq"
        className="w-20 md:w-32 loader-text "
      />
    </div>
  );
};

export default LoadingPage;
