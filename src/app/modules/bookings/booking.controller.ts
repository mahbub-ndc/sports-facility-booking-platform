import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
});
const checkAvailability = catchAsync(async (req, res) => {
  // console.log(req.query.date);
  const result = await bookingService.checkAvailability(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  checkAvailability,
};
