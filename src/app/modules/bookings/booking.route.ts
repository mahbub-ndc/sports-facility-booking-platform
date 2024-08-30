import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contstant";
const router = express.Router();
router.post("/bookings", auth(USER_ROLE.user), bookingController.createBooking);
router.get("/check-availability", bookingController.checkAvailability);

export const bookingRoute = router;
