import { Model } from "mongoose";

export interface TUser {
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
}
