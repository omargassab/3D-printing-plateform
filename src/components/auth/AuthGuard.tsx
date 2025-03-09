import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: "designer" | "dropshipper" | "admin" | "customer";
}

const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    // If a specific role is required, check if user has that role
    if (requiredRole && user?.role !== requiredRole) {
      // Redirect to home page if user doesn't have the required role
      navigate("/");
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  // Only render children if authenticated (and has required role if specified)
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null; // Or an unauthorized message
  }

  return <>{children}</>;
};

export default AuthGuard;
