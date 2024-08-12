import { z } from "zod";

export const loginSchema = z.object({
  driverId: z.string(),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    })
    .max(10, { message: "Phone number must be at most 10 characters long" }),
});

export type loginType = z.infer<typeof loginSchema>;
