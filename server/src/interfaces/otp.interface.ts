import { Document } from "mongoose";
export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}
