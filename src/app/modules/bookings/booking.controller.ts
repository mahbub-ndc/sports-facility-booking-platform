import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is retrived successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getSingleBooking(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is retrived successfully",
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteSingleBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is canceled successfully",
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
  getAllBookings,
  getSingleBooking,
  deleteSingleBooking,
};
