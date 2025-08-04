import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const Userschema = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      ],
    },

    role: {
      type: String,
      enum: ["employee", "employer", "admin", "superadmin"],
      default: "employee",
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },

  {
    timestamps: true,
  }
);

export default model<IUser>("User", Userschema);
