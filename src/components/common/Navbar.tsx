import images from "@/constants/images";
import { ADMIN_DASHBOARD } from "@/constants/routes/admin.routes";
import Image from "next/image";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";
export default function Navbar() {
  return (
    <>
      <nav className="w-full   bg-base  sticky top-0 left-0 border-b-[2px] border-primary/20">
        <div className="w-[90%] mx-auto flex justify-between h-[50px] items-center px-4 py-2">
          <Link
            href={ADMIN_DASHBOARD}
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
          <div className="md:flex gap-2 hidden items-center text-main">
            <RiAdminFill />
            <p className="text-sm font-medium">Admin Portal</p>
          </div>
        </div>
      </nav>
      ;
    </>
  );
}
