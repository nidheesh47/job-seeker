import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import axiosInstance from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthForms: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/auth/user/login", loginData);
      toast.success("Login successful!");
      console.log("Login success", res.data);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error("Login failed:", err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axiosInstance.post("/auth/user/signup", signupData);
      toast.success("Signup successful!");
      console.log("Signup success", res.data);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error("Signup failed:", err);
    }
  };

  const handleSendLoginOtp = async () => {
    try {
      const res = await axiosInstance.post("/auth/otp/request", {
        email: loginData.email,
      });
      toast.success("OTP sent to your email!");
      console.log("Login OTP sent", res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP send failed");
      console.error("Login OTP send failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Zecser</h1>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === "login"
                  ? "bg-white text-blue-500 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === "signup"
                  ? "bg-white text-blue-500 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {activeTab === "login" ? (
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onLogin={handleLogin}
            onSendOtp={handleSendLoginOtp}
          />
        ) : (
          <SignupForm
            signupData={signupData}
            setSignupData={setSignupData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            onSignup={handleSignup}
            onSendOtp={handleSendSignupOtp}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForms;
