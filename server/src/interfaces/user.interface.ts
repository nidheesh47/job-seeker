import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: "employee" | "employer" | "admin" | "superadmin";
  name: string;
  mobileNumber: string;
}
