"use server";
import { createDriverType } from "@/schemas/createDriverSchema";
import { prisma } from "../lib/prisma";
import { createAssignmentType } from "@/schemas/createAssignmentSchema";
import { DriverTypeDetailed } from "@/components/common/DriverDropdown";
import { AssignmentDetailsType } from "@/constants/types/assignment.types";
import { DriverType } from "@/constants/types/driver.types";

export async function createDriver(data: createDriverType, location: string) {
  try {
    const isAlreadyPresent = await prisma.driver.findFirst({
      where: {
        driverId: data.driverId,
      },
    });
    if (isAlreadyPresent) {
      throw new Error("Driver with this ID already exists");
    } else {
      const driver = await prisma.driver.create({
        data: {
          name: data.name,
          driverId: data.driverId,
          email: data.email,
          phone: data.phone,
          isCurrentlyBusy: false,
          location: location,
        },
      });
      if (!driver) {
        throw new Error("Cannot create driver at the moment");
      }
      return driver;
    }
  } catch (error: any) {
    throw new Error(error.message ?? "Cannot create new driver profile");
  }
}

export async function getAllDrivers() {
  try {
    const response = await prisma.driver.findMany();
    if (!response) {
      throw new Error("Cannot fetch drivers at the moment");
    }
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllAvailableDrivers(data: {
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
}) {
  try {
    const drivers = await prisma.driver.findMany();
    const availableDrivers = drivers.filter((driver) => {
      const scheduledAssignments = driver.assignedAssignments;
      if (scheduledAssignments.length == 0) {
        return true;
      }

      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      const newStartDateTime = new Date(data.startDate);
      newStartDateTime.setHours(startHours, startMinutes, 0, 0);

      const newEndDateTime = new Date(data.endDate);
      newEndDateTime.setHours(endHours, endMinutes, 0, 0);

      console.log("INPUT1", newStartDateTime, newEndDateTime);

      for (let i = 0; i < scheduledAssignments.length; i++) {
        const assignment = JSON.parse(scheduledAssignments[i]);

        const assignmentStartDateTime = new Date(assignment.startDate);
        const [assignmentStartHours, assignmentStartMinutes] =
          assignment.startTime.split(":").map(Number);
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

        if (
          (newStartDateTime >= assignmentStartDateTime &&
            newStartDateTime <= assignmentEndDateTime) ||
          (newEndDateTime >= assignmentStartDateTime &&
            newEndDateTime <= assignmentEndDateTime) ||
          (assignmentStartDateTime >= newStartDateTime &&
            assignmentStartDateTime <= newEndDateTime)
        ) {
          console.log("REJECTED", driver.name);
          return false;
        }
      }
      return true;
    });
    return availableDrivers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewAssignment(
  values: createAssignmentType,
  drivers: DriverTypeDetailed[]
) {
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const assignment = await prisma.assignment.create({
        data: {
          isAssigned: false,
          driverId: "",
          vecicle: values.vehicle,
          requestedTo: JSON.stringify(drivers),
          assignmentDate: values.startDate,
          startDate: values.startDate,
          startTime: values.startTime,
          endDate: values.endDate,
          endTime: values.endTime,
        },
      });

      const assignmentString = JSON.stringify(assignment);
      for (let i = 0; i < drivers.length; i++) {
        await prisma.driver.update({
          where: {
            id: drivers[i].id,
            driverId: drivers[i].driverId,
          },
          data: {
            scheduledAssignments: {
              push: assignmentString,
            },
          },
        });
      }
      return assignment;
    });

    if (!response) {
      throw new Error("Cannot create assignment at the moment");
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message ?? "Cannot create assignment at the moment");
  }
}

export async function getRecentAssignments(take: number = 3) {
  try {
    const response = await prisma.assignment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: take,
    });
    if (!response) {
      throw new Error("Cannot fetch assignments at the moment");
    }
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getActiveAssignments(
  skip: number = 0,
  take: number = 10
) {
  try {
    const response = await prisma.assignment.findMany({
      skip: skip,
      take: take,
      where: {
        isAssigned: true,
      },
    });
    if (!response) {
      throw new Error("Cannot fetch assignments at the moment");
    }
    console.log(response);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getPendingAssignments(
  skip: number = 0,
  take: number = 10
) {
  try {
    const response = await prisma.assignment.findMany({
      skip: skip,
      take: take,
      where: {
        isAssigned: false,
      },
    });
    if (!response) {
      throw new Error("Cannot fetch assignments at the moment");
    }
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleManualAssignment(
  item: AssignmentDetailsType,
  driver: DriverType
) {
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const assignment = await prisma.assignment.update({
        where: {
          id: item.id,
        },
        data: {
          isAssigned: true,
          driverId: driver.driverId,
        },
      });
      if (!assignment) {
        throw new Error("Cannot assign driver to the assignment");
      }
      const driverAssignments = await prisma.driver.update({
        where: {
          name: driver.name,
          driverId: driver.driverId,
        },
        data: {
          assignedAssignments: {
            push: JSON.stringify(assignment),
          },
        },
      });
      return driverAssignments;
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message ?? "Cannot assign driver to the assignment");
  }
}
export async function handleManualUnAssignment(
  item: AssignmentDetailsType,
  driver: DriverType
) {
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const assignment = await prisma.assignment.update({
        where: {
          id: item.id,
        },
        data: {
          isAssigned: false,
          driverId: "",
        },
      });
      if (!assignment) {
        throw new Error("Cannot unassign driver from the assignment");
      }

      const driverData = await prisma.driver.findUnique({
        where: {
          driverId: driver.driverId,
        },
        select: {
          assignedAssignments: true,
        },
      });

      if (!driverData) {
        throw new Error("Driver not found");
      }

      const updatedAssignments = driverData.assignedAssignments.filter(
        (assignedAssignment) =>
          JSON.parse(assignedAssignment).id !== assignment.id
      );

      const driverAssignments = await prisma.driver.update({
        where: {
          driverId: driver.driverId,
        },
        data: {
          assignedAssignments: updatedAssignments,
        },
      });

      return driverAssignments;
    });
    return response;
  } catch (error: any) {
    throw new Error(
      error.message ?? "Cannot unassign driver from the assignment"
    );
  }
}

export async function getUnavailableVehicleList({
  data,
}: {
  data: {
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
  };
}) {
  try {
    const { startDate, startTime, endDate, endTime } = data;

    const activeAssignments = await prisma.assignment.findMany({
      where: {
        isAssigned: true,
      },
      select: {
        vecicle: true,
        startDate: true,
        startTime: true,
        endDate: true,
        endTime: true,
      },
    });

    const selectedVehicles = activeAssignments
      .filter((assignment) => {
        const assignmentStartDateTime = new Date(assignment.startDate);
        const assignmentEndDateTime = new Date(assignment.endDate);
        const [assignmentStartHours, assignmentStartMinutes] =
          assignment.startTime.split(":").map(Number);
        assignmentStartDateTime.setHours(
          assignmentStartHours,
          assignmentStartMinutes,
          0,
          0
        );
        const [assignmentEndHours, assignmentEndMinutes] = assignment.endTime
          .split(":")
          .map(Number);
        assignmentEndDateTime.setHours(
          assignmentEndHours,
          assignmentEndMinutes,
          0,
          0
        );

        const newStartDateTime = new Date(startDate);
        const newEndDateTime = new Date(endDate);
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);

        newStartDateTime.setHours(startHours, startMinutes, 0, 0);

        newEndDateTime.setHours(endHours, endMinutes, 0, 0);

        return (
          (newStartDateTime >= assignmentStartDateTime &&
            newStartDateTime <= assignmentEndDateTime) ||
          (newEndDateTime >= assignmentStartDateTime &&
            newEndDateTime <= assignmentEndDateTime) ||
          (newStartDateTime <= assignmentStartDateTime &&
            newEndDateTime >= assignmentEndDateTime)
        );
      })
      .map((assignment) => assignment.vecicle);

    // console.log(selectedVehicles[0], selectedVehicles[1]);
    return selectedVehicles;
  } catch (error) {
    throw new Error("Cannot fetch vehicle list at the moment");
  }
}
