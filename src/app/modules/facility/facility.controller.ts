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

const getAllfacilities = catchAsync(async (req, res) => {
  const result = await facilityService.getAllfacilities(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateSingleFacility = catchAsync(async (req, res) => {
  const result = await facilityService.updateSingleFacility(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteSingleFacility = catchAsync(async (req, res) => {
  const result = await facilityService.deleteSingleFacility(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility is deleted successfully",
    data: result,
  });
});

export const facilityController = {
  createFacility,
  getAllfacilities,
  updateSingleFacility,
  deleteSingleFacility,
};
