/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const WORKING_HOURS = {
  startTime: "08:00",
  endTime: "18:00",
};

// Helper function to convert time to minutes
const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes to time string
const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

// Function to find available time ranges
export const findAvailableTimeSlots = (bookings: any[]) => {
  const availableSlots = [];
  const startOfDay = timeToMinutes(WORKING_HOURS.startTime);
  const endOfDay = timeToMinutes(WORKING_HOURS.endTime);

  // Sort bookings by startTime
  bookings.sort(
    (a: { startTime: any }, b: { startTime: any }) =>
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  // Check for availability before the first booking
  if (
    bookings.length === 0 ||
    timeToMinutes(bookings[0].startTime) > startOfDay
  ) {
    availableSlots.push({
      startTime: WORKING_HOURS.startTime,
      endTime:
        bookings.length === 0 ? WORKING_HOURS.endTime : bookings[0].startTime,
    });
  }

  // Check between bookings
  for (let i = 0; i < bookings.length - 1; i++) {
    const currentBookingEnd = timeToMinutes(bookings[i].endTime);
    const nextBookingStart = timeToMinutes(bookings[i + 1].startTime);

    if (nextBookingStart > currentBookingEnd) {
      availableSlots.push({
        startTime: minutesToTime(currentBookingEnd),
        endTime: minutesToTime(nextBookingStart),
      });
    }
  }

  // Check for availability after the last booking
  if (
    bookings.length > 0 &&
    timeToMinutes(bookings[bookings.length - 1].endTime) < endOfDay
  ) {
    availableSlots.push({
      startTime: bookings[bookings.length - 1].endTime,
      endTime: WORKING_HOURS.endTime,
    });
  }

  return availableSlots;
};
