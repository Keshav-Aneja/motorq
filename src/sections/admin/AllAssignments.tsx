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
import { getActiveAssignments, getPendingAssignments } from "@/services/admin";
import { DriverType } from "@/constants/types/driver.types";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { Button } from "@/components/ui/button";
import ManualAssignmentBtn from "@/components/admin/ManualAssignmentBtn";
import ManualUnAssignmentBtn from "@/components/admin/ManualUnAssignmentBtn";
const AllAssignments = ({ status }: { status: string }) => {
  return (
    <Suspense fallback={<AssignmentsSkeleton />}>
      {status === "active" && <ActiveAssignmentsWrapper />}
      {status === "pending" && <PendingAssignmentsWrapper />}
    </Suspense>
  );
};

export default AllAssignments;
async function ActiveAssignmentsWrapper() {
  const assignments = await getActiveAssignments(0, 10);
  console.log("ACTIVE", assignments);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Vehicle</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Assigned To</TableHead>
            <TableHead>Unassign</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((item: AssignmentDetailsType, index: number) => {
            const requestDrivers = JSON.parse(item.requestedTo);
            const assignedDriver: DriverType = requestDrivers.find(
              (driver: DriverType) => driver.driverId === item.driverId
            );
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
                  {assignedDriver.name}
                </TableCell>
                <TableCell>
                  <ManualUnAssignmentBtn driver={assignedDriver} item={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
async function PendingAssignmentsWrapper() {
  const assignments = await getPendingAssignments(0, 10);
  console.log("PENDING", assignments);
  if (assignments.length === 0) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center text-xl text-muted-foreground">
        No Pending Assignments
      </div>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Vehicle</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Requested To</TableHead>
            <TableHead>Assign Manually</TableHead>
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
                <TableCell>
                  <ManualAssignmentBtn drivers={requestDrivers} item={item} />
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
      {[1, 2, 3, 4, 5].map((item) => (
        <Table key={item}>
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
      ))}
    </>
  );
}
