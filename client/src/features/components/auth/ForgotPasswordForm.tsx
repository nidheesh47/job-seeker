import React, { useState } from "react";
import axiosInstance from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState<"email" | "reset">("email");

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = async () => {
    if (!form.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axiosInstance.post("/auth/otp/request", { email: form.email });
      toast.success("OTP sent to your email!");
      setStep("reset");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!form.otp || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.put("/auth/user/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      toast.success("Password reset successful!");
      // Optionally redirect to login
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>

        {step === "email" ? (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your registered email"
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border rounded-lg"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              placeholder="Enter OTP"
            />

            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg pr-10"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                placeholder="New password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg pr-10"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                placeholder="Confirm password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
