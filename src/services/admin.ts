"use server";
import { createDriverType } from "@/schemas/createDriverSchema";
import { prisma } from "../lib/prisma";
import { createAssignmentType } from "@/schemas/createAssignmentSchema";
import { DriverTypeDetailed } from "@/components/common/DriverDropdown";

export async function createDriver(data: createDriverType, location: string) {
  try {
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
  } catch (error) {}
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

export async function createNewAssignment(
  values: createAssignmentType,
  drivers: DriverTypeDetailed[]
) {
  try {
    const response = await prisma.assignment.create({
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
    if (!response) {
      throw new Error("Cannot create assignment at the moment");
    }
    return response;
  } catch (error: any) {
    throw new Error(error.message ?? "Cannot create assignment at the moment");
  }
}

export async function getAssignments(skip: number = 0, take: number = 10) {
  try {
    const response = await prisma.assignment.findMany({
      skip: skip,
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
