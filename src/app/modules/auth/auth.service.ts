import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.util";
import config from "../../config";

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match!");

  const jwt_payload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwt_payload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string
  );
  return {
    accessToken,
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

export const authService = {
  loginUser,
};
