import express from "express";
import { authController } from "./auth.controller";
import { userZodValidationSchema } from "../user/user.validation";
import { userController } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema } from "./auth.validation";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userZodValidationSchema),
  userController.createUser
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  authController.loginUser
);
export const authRoute = router;
