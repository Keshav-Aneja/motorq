import images from "@/constants/images";
import { ADMIN_DASHBOARD } from "@/constants/routes/admin.routes";
import { DRIVER_DASHBOARD } from "@/constants/routes/driver.routes";
import Image from "next/image";
import Link from "next/link";
import { RiAdminFill, RiSteering2Line } from "react-icons/ri";
export default function Navbar({ isDriver = false }: { isDriver?: boolean }) {
  return (
    <>
      <nav className="w-full   bg-base  sticky top-0 left-0 border-b-[2px] border-primary/20">
        <div className="w-[90%] mx-auto flex justify-between h-[50px] items-center px-4 py-2">
          <Link
            href={isDriver ? DRIVER_DASHBOARD : ADMIN_DASHBOARD}
            className="flex gap-1 h-full items-center"
          >
            <Image
              src={images.Logo}
              alt="Kustom"
              width={300}
              height={300}
              className="h-[100%] w-auto"
            />
          </Link>
          {!isDriver && (
            <div className="md:flex gap-2 hidden items-center text-main">
              <RiAdminFill />
              <p className="text-sm font-medium">Admin Portal</p>
            </div>
          )}
          {isDriver && (
            <div className="md:flex gap-2 hidden items-center text-main">
              <RiSteering2Line />
              <p className="text-sm font-medium">Driver Portal</p>
            </div>
          )}
        </div>
      </nav>
      ;
    </>
  );
}
