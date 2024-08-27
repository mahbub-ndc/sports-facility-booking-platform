import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }
};

export const authService = {
  loginUser,
};
