import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { facilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await facilityService.createFacility(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

export const facilityController = {
  createFacility,
};
