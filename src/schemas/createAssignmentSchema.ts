import { z } from "zod";

export const createAssignmentSchema = z.object({
  vehicle: z.string(),
  startDate: z.coerce.date(),
  startTime: z.coerce.string(),
  endDate: z.coerce.date(),
  endTime: z.coerce.string(),
});

export type createAssignmentType = z.infer<typeof createAssignmentSchema>;
