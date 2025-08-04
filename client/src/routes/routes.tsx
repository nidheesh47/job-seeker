// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage";
import ForgotPassPage from "../pages/user/ForgotPassPage";
import UserLayout from "../layout/UserLayout";
import HomePage from "../pages/user/HomePage";
import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassPage />,
      },
      {
        element: <ProtectedRoute />, // protect below routes
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          // Add more protected routes here
        ],
      },
    ],
  },
]);

export default router;
