import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  allowedRoles?: ("customer" | "vendor")[];
};

interface User {
  role?: "customer" | "vendor";
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user: User | null = null;

  try {
    user = JSON.parse(storedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    user?.role &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
