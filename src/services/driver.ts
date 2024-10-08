"use server";
import { prisma } from "../lib/prisma";

export async function getDriverInvites({ id }: { id: string }) {
  try {
    const assignments = await prisma.assignment.findMany({});

    if (!assignments) {
      throw new Error("Cannot fetch invites at the moment");
    }
    const filteredAssignments = assignments.filter((assignment) => {
      if (!assignment.isAssigned) {
        const requestedTo = JSON.parse(assignment.requestedTo);
        return requestedTo.some((driver: any) => driver.driverId === id);
      }
    });

    return filteredAssignments;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleAcceptAssignment(
  driverDetails: {
    driverId: string;
    name: string;
  },
  assignmentId: string
) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        assignmentId,
      },
    });
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    if (assignment.isAssigned) {
      throw new Error("Assignment already assigned");
    }

    const driverAssignedAssignments = await prisma.driver.findUnique({
      where: {
        name: driverDetails.name,
        driverId: driverDetails.driverId,
      },
      select: {
        assignedAssignments: true,
      },
    });
    if (!driverAssignedAssignments) {
      throw new Error("Error accepting assignment. Please try again later");
    }

    const assignmentStartDateTime = new Date(assignment.startDate);
    const [assignmentStartHours, assignmentStartMinutes] = assignment.startTime
      .split(":")
      .map(Number);
    assignmentStartDateTime.setHours(
      assignmentStartHours,
      assignmentStartMinutes,
      0,
      0
    );

    const assignmentEndDateTime = new Date(assignment.endDate);
    const [assignmentEndHours, assignmentEndMinutes] = assignment.endTime
      .split(":")
      .map(Number);
    assignmentEndDateTime.setHours(
      assignmentEndHours,
      assignmentEndMinutes,
      0,
      0
    );

    // Check for conflicting assignments
    let isConflicting = false;
    for (
      let i = 0;
      i < driverAssignedAssignments.assignedAssignments.length;
      i++
    ) {
      const task = JSON.parse(driverAssignedAssignments.assignedAssignments[i]);

      const taskStartDateTime = new Date(task.startDate);
      const [taskStartHours, taskStartMinutes] = task.startTime
        .split(":")
        .map(Number);
      taskStartDateTime.setHours(taskStartHours, taskStartMinutes, 0, 0);

      const taskEndDateTime = new Date(task.endDate);
      const [taskEndHours, taskEndMinutes] = task.endTime
        .split(":")
        .map(Number);
      taskEndDateTime.setHours(taskEndHours, taskEndMinutes, 0, 0);

      if (
        assignmentStartDateTime < taskEndDateTime &&
        assignmentEndDateTime > taskStartDateTime
      ) {
        isConflicting = true;
        break;
      }
    }

    if (isConflicting) {
      throw new Error(
        "Assignment time conflicts with existing accepted assignments"
      );
    }

    // Proceed with assignment acceptance
    const requestedTo = JSON.parse(assignment.requestedTo);
    const response = await prisma.$transaction(async (prisma) => {
      if (
        requestedTo.some(
          (driver: any) => driver.driverId === driverDetails.driverId
        )
      ) {
        const updatedAssignment = await prisma.assignment.update({
          where: {
            assignmentId,
          },
          data: {
            isAssigned: true,
            driverId: driverDetails.driverId,
          },
        });

        if (!updatedAssignment) {
          throw new Error("Error accepting assignment. Please try again later");
        }

        const driver = await prisma.driver.update({
          where: {
            name: driverDetails.name,
            driverId: updatedAssignment.driverId,
          },
          data: {
            assignedAssignments: {
              push: JSON.stringify(updatedAssignment),
            },
          },
        });

        if (!driver) {
          throw new Error("Error accepting assignment. Please try again later");
        }

        return updatedAssignment;
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message ?? "Error accepting assignment");
  }
}

export async function handleRejectAssignment(
  driverDetails: {
    name: string;
    driverId: string;
  },
  assignmentId: string
) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        assignmentId: assignmentId,
      },
    });
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    const requestedTo = JSON.parse(assignment.requestedTo);
    const response = await prisma.$transaction(async (prisma) => {
      if (
        requestedTo.some(
          (driver: any) => driver.driverId === driverDetails.driverId
        )
      ) {
        const updatedAssignment = await prisma.assignment.update({
          where: {
            assignmentId,
          },
          data: {
            requestedTo: {
              set: JSON.stringify(
                requestedTo.filter(
                  (driver: any) => driver.driverId !== driverDetails.driverId
                )
              ),
            },
          },
        });
        if (!updatedAssignment) {
          console.log("here1");
          throw new Error("Error rejecting assignment. Please try again later");
        }
        const driverData = await prisma.driver.findUnique({
          where: {
            name: driverDetails.name,
            driverId: driverDetails.driverId,
          },
        });
        if (!driverData) {
          console.log("here2");

          throw new Error("Error rejecting assignment. Please try again later");
        }
        const updatedData = driverData.scheduledAssignments.filter(
          (assignment: any) => assignment.assignmentId !== assignmentId
        );
        const driver = await prisma.driver.update({
          where: {
            name: driverDetails.name,
            driverId: driverDetails.driverId,
          },
          data: {
            scheduledAssignments: {
              set: updatedData,
            },
          },
        });
        return updatedAssignment;
      }
    });
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message ?? "Error rejecting assignment");
  }
}

export async function getDriverInfo(values: {
  phone: string;
  driverId: string;
}) {
  try {
    const driver = await prisma.driver.findUnique({
      where: {
        driverId: values.driverId,
        phone: values.phone,
      },
    });
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getDriverActiveAssignments(id: string) {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        driverId: id,
        isAssigned: true,
      },
    });
    return assignments;
  } catch (error: any) {
    throw new Error(error.message ?? "Error fetching active assignments");
  }
}
