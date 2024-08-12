"use server";
import { createDriverType } from "@/schemas/createDriverSchema";
import { prisma } from "../lib/prisma";

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
