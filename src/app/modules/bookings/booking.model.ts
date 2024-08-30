import { model, Schema } from "mongoose";
import { TBookings } from "./booking.interface";
import { Facility } from "../facility/facility.model";

const bookingSchema = new Schema<TBookings>({
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payableAmount: {
    type: Number,
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
    required: true,
    default: "confirmed",
  },
});

//calculate payable amount
bookingSchema.pre("save", async function (next) {
  const facilityData = await Facility.findById(this.facility);

  const [startHours, startMinutes] = this.startTime.split(":").map(Number);
  const [endHours, endMinutes] = this.endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference in minutes
  const differenceInHours = (endTotalMinutes - startTotalMinutes) / 60;

  this.payableAmount =
    (facilityData?.pricePerHour as number) * differenceInHours;

  next();
});

export const Booking = model<TBookings>("Booking", bookingSchema);
