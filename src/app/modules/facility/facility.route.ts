import express from "express";
import { facilityController } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contstant";
import validateRequest from "../../middlewares/validateRequest";
import { facilityValidationZodSchema } from "./facility.validation";
const router = express.Router();
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(facilityValidationZodSchema),
  facilityController.createFacility
);
router.get("/", facilityController.getAllfacilities);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  facilityController.updateSingleFacility
);

export const facilityRoute = router;
