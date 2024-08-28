import express from "express";
import { facilityController } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contstant";
const router = express.Router();
router.post("/", auth(USER_ROLE.admin), facilityController.createFacility);

export const facilityRoute = router;
