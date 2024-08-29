import { TBookings } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBookings) => {
  const result = await Booking.create(payload);
  return result;
};

export const bookingService = {
  createBooking,
};
