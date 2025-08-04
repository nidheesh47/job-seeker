import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  signupData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
  };
  setSignupData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      otp: string;
    }>
  >;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSignup: () => void;
  onSendOtp: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupData,
  setSignupData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onSignup,
  onSendOtp,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 text-sm">
          Sign up to connect with professionals and explore new opportunities.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
          />
          <button
            type="button"
            onClick={onSendOtp}
            className="text-sm text-blue-500 hover:underline mt-1"
          >
            Send OTP
          </button>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            OTP
          </label>
          <input
            type="text"
            value={signupData.otp}
            onChange={(e) =>
              setSignupData({ ...signupData, otp: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter OTP"
          />
        </div>

        <button
          onClick={onSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
