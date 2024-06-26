import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/context/token";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login", "register"];
  const protectedByToken = [
    "/profile",
    "/edit-profile",
    "/history-borrow",
    "/dashboard",
    "cart"
  ];
  const roleProtected = ["/dashboard"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;