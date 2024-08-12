import { createDriverType } from "@/schemas/createDriverSchema";

export type DriverType = createDriverType & {
  location: string;
};
