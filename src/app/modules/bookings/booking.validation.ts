import { z } from "zod";
export const bookingValidationSchema = z.object({
  body: z.object({
    facility: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});
