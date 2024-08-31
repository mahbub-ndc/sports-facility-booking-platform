"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacilityValidationSchema = exports.facilityValidationZodSchema = void 0;
const zod_1 = require("zod");
exports.facilityValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        location: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
