import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginRedirectProps {
  message?: string;
}

const LoginRedirect = ({
  message = "You need to be logged in to view this page",
}: LoginRedirectProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Authentication Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">{message}</p>
          <Button
            onClick={() =>
              (window.location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`)
            }
            className="w-full"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginRedirect;
