import catchAsync from "../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User registerd Successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
};
