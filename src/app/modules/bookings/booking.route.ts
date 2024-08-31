import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contstant";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
const router = express.Router();
router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(bookingValidationSchema),
  bookingController.createBooking
);
router.get(
  "/bookings",
  auth(USER_ROLE.admin),
  bookingController.getAllBookings
);
router.get(
  "/bookings/user",
  auth(USER_ROLE.user),
  bookingController.getSingleBooking
);
router.delete(
  "/bookings/:id",
  auth(USER_ROLE.user),
  bookingController.deleteSingleBooking
);
router.get("/check-availability", bookingController.checkAvailability);

export const bookingRoute = router;
