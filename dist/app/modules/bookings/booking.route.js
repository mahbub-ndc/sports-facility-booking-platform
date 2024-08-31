"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_contstant_1 = require("../user/user.contstant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/bookings", (0, auth_1.default)(user_contstant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidationSchema), booking_controller_1.bookingController.createBooking);
router.get("/bookings", (0, auth_1.default)(user_contstant_1.USER_ROLE.admin), booking_controller_1.bookingController.getAllBookings);
router.get("/bookings/user", (0, auth_1.default)(user_contstant_1.USER_ROLE.user), booking_controller_1.bookingController.getSingleBooking);
router.delete("/bookings/:id", (0, auth_1.default)(user_contstant_1.USER_ROLE.user), booking_controller_1.bookingController.deleteSingleBooking);
router.get("/check-availability", booking_controller_1.bookingController.checkAvailability);
exports.bookingRoute = router;
