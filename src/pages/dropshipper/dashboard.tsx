import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DropshipperDashboard from "@/components/dropshipper/DropshipperDashboard";
import AuthGuard from "@/components/auth/AuthGuard";

const DropshipperDashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <DropshipperDashboard />
      </main>
      <Footer />
    </div>
  );
};

const DropshipperDashboardWithAuth = () => {
  return (
    <AuthGuard requiredRole="dropshipper">
      <DropshipperDashboardPage />
    </AuthGuard>
  );
};

export default DropshipperDashboardWithAuth;
