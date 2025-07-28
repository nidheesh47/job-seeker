import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const Userschema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["employee", "employer", "admin", "superadmin"],
      default: "employee",
    },
    name: { type: String },
    mobileNumber: {
      type: String,
      match: /^[6-9]\d{9}$/, //Indian mob number +91
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", Userschema);
