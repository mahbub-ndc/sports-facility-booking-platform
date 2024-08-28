import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    token: result.accessToken,
    data: result.data,
  });
});

export const authController = {
  loginUser,
};
