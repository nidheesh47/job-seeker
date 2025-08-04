import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  loginData: {
    email: string;
    password: string;
  };
  setLoginData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  onLogin,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600 text-sm">
          Log in to your account to connect with professionals and explore
          opportunities.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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

        <Link to={"forgot-password"}>
          <div className="text-right">
            <button
              type="button"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </Link>

        <button
          onClick={onLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
