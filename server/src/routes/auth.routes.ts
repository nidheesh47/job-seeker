import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
} from "../controllers/auth.controller";
import { requestOTP, verifyOTP } from "../controllers/otp.controller";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller";
import { isAuthenticated } from "../middlewares/auth";
import {
  resetPassword,
  sendResetPasswordEmail,
} from "../controllers/reset.password.controller";

const router = express.Router();
router.post("/otp/request", requestOTP);
router.post("/otp/verify", verifyOTP);
router.post("/user/signup", signupUser);
router.post("/user/login", loginUser);
router.put("/user/reset-password/:token", resetPassword);
router.post("/user/forgot-password", sendResetPasswordEmail);
router.get("/refresh-token", refreshAccessToken);
router.post("/user/logout", logoutUser);
router.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json({ success: true, user: (req as any).user });
});
export default router;
