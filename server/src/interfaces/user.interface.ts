import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "employee" | "employer" | "admin" | "superadmin";
  resetToken?: string;
  resetTokenExpiry?: Date;
}
