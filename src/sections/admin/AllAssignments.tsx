import React, { Suspense } from "react";
import { format, compareAsc } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPendingAssignments } from "@/services/admin";
import { DriverType } from "@/constants/types/driver.types";
const AllAssignments = ({ status }: { status: string }) => {
  return (
    <Suspense fallback={<AssignmentsSkeleton />}>
      {status === "active" && <PendingAssignmentsWrapper />}
    </Suspense>
  );
};

export default AllAssignments;

async function PendingAssignmentsWrapper() {
  const assignments = await getPendingAssignments(0, 10);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Vehicle</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Requested To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((item, index) => {
            const requestDrivers = JSON.parse(item.requestedTo);
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.vecicle}</TableCell>
                <TableCell>
                  {format(new Date(item.startDate), "MM/dd/yyyy")} -{" "}
                  {item.startTime}
                </TableCell>
                <TableCell>
                  {format(new Date(item.endDate), "MM/dd/yyyy")} -{" "}
                  {item.endTime}
                </TableCell>
                <TableCell className="text-right">
                  {requestDrivers.map((driver: DriverType) => (
                    <span className="ml-1" key={driver.driverId}>
                      {driver.name},
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

function AssignmentsSkeleton() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Vehicle</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Requested To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <TableRow key={index}>
                <Suspense>
                  <TableCell className="font-medium opacity-0">
                    --------
                  </TableCell>
                </Suspense>
                <Suspense>
                  <TableCell className="opacity-0">
                    ---------- - ----------
                  </TableCell>
                </Suspense>
                <Suspense>
                  <TableCell className="opacity-0">
                    ---------- - ----------
                  </TableCell>
                </Suspense>
                <Suspense>
                  <TableCell className="text-right opacity-0">
                    ----------------------------
                  </TableCell>
                </Suspense>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
