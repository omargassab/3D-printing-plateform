import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { loginUser } from "@/api/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // Check if already authenticated and redirect
  useEffect(() => {
    if (isAuthenticated && !redirecting) {
      setRedirecting(true);
      const from = location.state?.from || "/";
      console.log("Already authenticated, redirecting to:", from);
      window.location.href = from;
    }
  }, [isAuthenticated, location.state, redirecting]);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("Login attempt for:", email);
      setError(null);

      // Login the user
      const result = await loginUser(email, password);

      if (result && result.success) {
        console.log("Login successful, updating auth context");
        setRedirecting(true);

        // Update auth context
        login(result.session, result.user);

        // Determine redirect destination
        let destination = "/";
        console.log("User role for redirect:", result.user.role);
        if (result.user.role === "designer") {
          destination = "/designer/dashboard";
        } else if (result.user.role === "dropshipper") {
          destination = "/dropshipper/dashboard";
        } else if (result.user.role === "admin") {
          destination = "/admin/dashboard";
        }

        console.log("Redirecting to:", destination);

        // Force redirect with window.location
        window.location.href = destination;
        return true;
      } else {
        setError("Login failed. Please check your credentials.");
        return false;
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
      return false;
    }
  };

  // If already redirecting, show a loading state
  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              3D Print Market
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your one-stop platform for 3D printing designs and fulfillment
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {location.state?.message && (
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertDescription>{location.state.message}</AlertDescription>
            </Alert>
          )}

          <LoginForm
            onLogin={handleLogin}
            onForgotPassword={() => navigate("/forgot-password")}
            onSignUp={() => navigate("/signup")}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
