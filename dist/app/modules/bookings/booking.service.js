"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = require("../facility/facility.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const booking_utils_1 = require("./booking.utils");
const createBooking = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    //console.log(user._id);
    const bookingData = Object.assign(Object.assign({}, payload), { user: user === null || user === void 0 ? void 0 : user._id });
    const facility = yield facility_model_1.Facility.findById(payload.facility);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Facilty not found");
    }
    const result = yield booking_model_1.Booking.create(bookingData);
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate("user").populate("facility");
    return result;
});
const getSingleBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    const result = yield booking_model_1.Booking.findOne({ user: user === null || user === void 0 ? void 0 : user._id }).populate("facility");
    return result;
});
const deleteSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, { new: true });
    return result;
});
const checkAvailability = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = payload;
    console.log("input-date", date);
    const queryDate = date || new Date().toISOString().split("T")[0];
    const bookings = yield booking_model_1.Booking.find({ date: queryDate });
    console.log(bookings);
    const availableSlots = (0, booking_utils_1.findAvailableTimeSlots)(bookings);
    return availableSlots;
});
exports.bookingService = {
    createBooking,
    checkAvailability,
    getAllBookings,
    getSingleBooking,
    deleteSingleBooking,
};
