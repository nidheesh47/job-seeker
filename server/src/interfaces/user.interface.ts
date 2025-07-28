import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // ✅ Add this line to fix the _id unknown issue
  email: string;
  password: string;
  role: "employee" | "employer" | "admin" | "superadmin";
}
