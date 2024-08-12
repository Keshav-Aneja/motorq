import { z } from "zod";

export const createDriverSchema = z.object({
  driverId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" }),
});

export type createDriverType = z.infer<typeof createDriverSchema>;
