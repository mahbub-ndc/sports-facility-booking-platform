import express from "express";
import { authController } from "./auth.controller";
import { userZodValidationSchema } from "../user/user.validation";
import { userController } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userZodValidationSchema),
  userController.createUser
);

router.post("/login", authController.loginUser);
export const authRoute = router;
