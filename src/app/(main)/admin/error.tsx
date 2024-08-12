"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ADMIN_DASHBOARD } from "@/constants/routes/admin.routes";
const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  return (
    <div className="w-full h-full min-h-[70vh] flex flex-col gap-4 items-center justify-center font-FamilyMed">
      <h1 className="text-2xl text-destructive">Something went wrong!</h1>
      <Button asChild>
        <Link href={ADMIN_DASHBOARD}>&larr; Go back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
