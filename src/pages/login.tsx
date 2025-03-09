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
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the page they were trying to access or home
      const from = location.state?.from || "/";
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await loginUser(email, password);

      if (result.success) {
        // Update auth context
        login(result.token, result.user);

        // Redirect based on user role
        if (result.user.role === "designer") {
          window.location.href = "/designer/dashboard";
        } else if (result.user.role === "dropshipper") {
          window.location.href = "/dropshipper/dashboard";
        } else if (result.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      console.error("Login error:", err);
    }
  };

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
