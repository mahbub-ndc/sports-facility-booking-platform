import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBookings } from "./booking.interface";
import { Booking } from "./booking.model";
import { findAvailableTimeSlots } from "./booking.utils";

const createBooking = async (
  userData: Record<string, unknown>,
  payload: TBookings
) => {
  const { email } = userData;
  const user = await User.isUserExistsByEmail(email as string);

  //console.log(user._id);
  const bookingData = {
    ...payload,
    user: user?._id,
  };

  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facilty not found");
  }

  const result = await Booking.create(bookingData);
  return result;
};

const getAllBookings = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const getSingleBooking = async (payload: Record<string, unknown>) => {
  const { email } = payload;
  const user = await User.isUserExistsByEmail(email as string);
  const result = await Booking.findOne({ user: user?._id }).populate(
    "facility"
  );
  return result;
};

const deleteSingleBooking = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    { new: true }
  );
  return result;
};

const checkAvailability = async (payload: Partial<TBookings>) => {
  const { date } = payload;

  console.log("input-date", date);

  const queryDate = date || new Date().toISOString().split("T")[0];

  const bookings = await Booking.find({ date: queryDate });
  console.log(bookings);
  const availableSlots = findAvailableTimeSlots(bookings);
  return availableSlots;
};

export const bookingService = {
  createBooking,
  checkAvailability,
  getAllBookings,
  getSingleBooking,
  deleteSingleBooking,
};
