import { userService } from "../user/user.service";
import catchAsync from "../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
});

export const authController = {
  loginUser,
};
