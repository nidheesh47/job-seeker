import express from "express";
import { loginUser, signupUser } from "../controllers/auth.controller";
import { requestOTP, verifyOTP } from "../controllers/otp.controller";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller";
const router = express.Router();

router.post("/otp/request", requestOTP);
router.post("/otp/verify", verifyOTP);
router.post("/user/signup", signupUser);
router.post("/user/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
