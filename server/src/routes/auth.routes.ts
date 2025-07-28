import express from "express";
import { requestOTP, verifyOTP } from "../controllers/auth.controller";

const router = express.Router();

router.post("/otp/request", requestOTP);
router.post("/otp/verify", verifyOTP);

export default router;
