import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DesignUploadForm from "@/components/designer/DesignUploadForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const DesignerUploadPage = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not a designer
  if (!isAuthenticated || user?.role !== "designer") {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must be logged in as a designer to access this page.",
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Upload New Design</h1>
            <p className="text-gray-600 mt-2">
              Share your creativity with the world and earn royalties on every
              sale.
            </p>
          </div>

          <DesignUploadForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DesignerUploadPage;
