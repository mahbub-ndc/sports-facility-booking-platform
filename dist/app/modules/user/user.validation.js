"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.userZodValidationSchema = void 0;
const zod_1 = require("zod");
exports.userZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
        needsPasswordChange: zod_1.z.boolean().optional(),
        passwordChangedAt: zod_1.z.date().optional(),
        phone: zod_1.z.string().min(11, "Phone number must be at least 11 digits long"),
        role: zod_1.z.enum(["user", "admin"]),
        address: zod_1.z.string().min(1, "Address is required"),
    }),
});
exports.userValidation = {
    userZodValidationSchema: exports.userZodValidationSchema,
};
