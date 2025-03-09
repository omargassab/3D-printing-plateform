import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm, { SignUpData } from "@/components/auth/SignUpForm";
import { registerUser } from "@/api/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSignUp = async (data: SignUpData) => {
    try {
      setError(null);
      const result = await registerUser(data);

      if (result.success) {
        // Update auth context
        login(result.token, result.user);

        // Redirect based on account type
        if (data.accountType === "designer") {
          window.location.href = "/designer/dashboard";
        } else if (data.accountType === "dropshipper") {
          window.location.href = "/dropshipper/dashboard";
        } else {
          window.location.href = "/";
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      console.error("Registration error:", err);
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
              Join our community of designers and dropshippers
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <SignUpForm
            onSignUp={handleSignUp}
            onLogin={() => navigate("/login")}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
