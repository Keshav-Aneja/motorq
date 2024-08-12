"use client";
import { Button } from "@/components/ui/button";
import { ADMIN_DASHBOARD } from "@/constants/routes/admin.routes";
import { DRIVER_DASHBOARD } from "@/constants/routes/driver.routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main>
      Landing
      <Button
        onClick={() => {
          router.push(ADMIN_DASHBOARD);
        }}
      >
        Go To Admin
      </Button>
      <Button
        onClick={() => {
          router.push(DRIVER_DASHBOARD);
        }}
      >
        Go To Driver
      </Button>
    </main>
  );
}
