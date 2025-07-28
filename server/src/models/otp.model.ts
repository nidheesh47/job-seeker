import { Schema, model } from "mongoose";
import { IOTP } from "../interfaces/otp.interface";
const OtpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default model<IOTP>("Otp", OtpSchema);
