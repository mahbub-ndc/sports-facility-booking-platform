import { Model } from "mongoose";
import { USER_ROLE } from "./user.contstant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  phone: string;
  role: "user" | "admin";
  address: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
