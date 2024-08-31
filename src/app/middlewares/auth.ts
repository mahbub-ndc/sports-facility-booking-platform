import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../modules/utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route!"
      );
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "You have no access to this route!"
      );
    }
    console.log(user.role);

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
