import { z } from "zod";
export const facilityValidationZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});
