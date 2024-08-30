import { TBookings } from "./booking.interface";
import { Booking } from "./booking.model";
import { findAvailableTimeSlots } from "./booking.utils";

const createBooking = async (payload: TBookings) => {
  const result = await Booking.create(payload);
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
};
